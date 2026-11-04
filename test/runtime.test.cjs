const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const path = require('node:path')
const http = require('node:http')
const crypto = require('node:crypto')
const { createRequire } = require('node:module')

// Capture the actual module class without starting the SDK IPC entrypoint.
function loadInstance() {
	let Instance
	const timers = new Set()
	const source = path.resolve(__dirname, '../index.js')
	const localRequire = createRequire(source)
	const sdk = localRequire('@companion-module/base')
	vm.runInNewContext(fs.readFileSync(source, 'utf8'), {
		require: (id) =>
			id === '@companion-module/base'
				? {
						...sdk,
						InstanceBase: class {},
						runEntrypoint: (value) => {
							Instance = value
						},
					}
				: localRequire(id),
		console: { log() {} },
		setInterval: (callback) => {
			timers.add(callback)
			return callback
		},
		clearInterval: (timer) => timers.delete(timer),
	})
	const instance = new Instance()
	instance.updateStatus = () => {}
	instance.setActionDefinitions = (value) => {
		instance.actions = value
	}
	instance.setFeedbackDefinitions = (value) => {
		instance.feedbacks = value
	}
	instance.setVariableDefinitions = () => {}
	instance.setVariableValues = (value) => {
		instance.variables = value
	}
	instance.setPresetDefinitions = () => {}
	instance.checkFeedbacks = () => {
		instance.feedbackUpdates = (instance.feedbackUpdates || 0) + 1
	}
	return { instance, timers }
}

const md5 = (value) => crypto.createHash('md5').update(value).digest('hex')

test('HTTP digest authentication, camera actions, numeric parameters and inquiry decoding', async () => {
	const requests = []
	const server = http.createServer((req, res) => {
		if (req.url === '/command/user.cgi') {
			res.writeHead(401, { 'WWW-Authenticate': 'Digest realm="camera", nonce="testnonce", qop="auth", algorithm=MD5' })
			res.end()
			return
		}
		const auth = Object.fromEntries(
			[...req.headers.authorization.matchAll(/(\w+)=(?:"([^"]*)"|([^, ]+))/g)].map((m) => [m[1], m[2] ?? m[3]]),
		)
		const expected = md5(
			`${md5('admin:camera:secret')}:testnonce:00000001:${auth.cnonce}:auth:${md5(`GET:${req.url}`)}`,
		)
		requests.push({ url: req.url, valid: auth.response === expected && auth.uri === req.url })
		res.writeHead(200)
		res.end(
			req.url.startsWith('/command/inquiry.cgi')
				? 'var ModelName="CV730"\r\nvar AbsolutePTZF="0000,0000,0010,0000"\r\n'
				: '',
		)
	})
	await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
	try {
		const { instance } = loadInstance()
		instance.config = { host: `127.0.0.1:${server.address().port}`, username: 'admin', password: 'secret' }
		instance.initActions()
		// Action callbacks intentionally dispatch without awaiting the network request.
		const pending = []
		const makeRequest = instance.makeRequest.bind(instance)
		instance.makeRequest = (...args) => {
			const result = makeRequest(...args)
			pending.push(result)
			return result
		}
		instance.data.AudioDelay = 'off'
		await instance.actions.audio_delay.callback({ options: { delay: 'toggle' } })
		await instance.actions.audio_delay_time.callback({ options: { mode: 'set', time: 123 } })
		await Promise.all(pending)
		const inquiry = await makeRequest('inquiry', [
			['inqjs', 'camera'],
			['inqjs', 'ptzf'],
		])
		assert.equal(inquiry.status, 200)
		assert.equal(inquiry.data.inquiry.ModelName, 'CV730')
		assert.equal(inquiry.data.inquiry.AbsolutePTZF, '0000,0000,0010,0000')
		assert.deepEqual(
			requests.map((r) => r.url),
			[
				'/command/camera.cgi?AudioDelay=on',
				'/command/camera.cgi?AudioDelayTime=123',
				'/command/inquiry.cgi?inqjs=camera&inqjs=ptzf',
			],
		)
		assert.ok(requests.every((r) => r.valid))
	} finally {
		server.closeAllConnections()
		await new Promise((resolve) => server.close(resolve))
	}
})

test('camera state updates variables, zoom and feedbacks with fresh option values', async () => {
	const { instance } = loadInstance()
	const data = {
		...instance.data,
		AbsolutePTZF: '0000,0000,0010,0000',
		Mirror: 'off',
		ModelName: 'CV730',
		Resolution: '1080p_50',
		ExposureCompensation: '5',
		ExposureExposureTime: '15',
		ExposureIris: '14',
		ImageSize1: '1920,1080',
		ImageSize2: '1280,720',
		ImageSize3: '640,360',
		WhiteBalanceMode: 'manual',
	}
	instance.updateData(data, instance.data, Object.keys(data))
	assert.equal(instance.variables.camera_model, 'CV730')
	assert.equal(instance.variables.stream1_resolution, '1920x1080')
	assert.equal(instance.data.CurrentZoomPos, 16)
	assert.equal(instance.feedbackUpdates, 1)
	instance.initFeedbacks()
	const feedback = instance.feedbacks.whitebalance_select_mode
	assert.equal(await feedback.callback({ options: { mode: 'manual', invert: false } }), true)
	assert.equal(await feedback.callback({ options: { mode: 'auto', invert: false } }), false)
	assert.equal(await feedback.callback({ options: { mode: 'auto', invert: true } }), true)
})

test('successful connection transitions to polling and destroy clears polling', async () => {
	const { instance, timers } = loadInstance()
	await instance.init({ host: '127.0.0.1', pollInterval: 200 })
	assert.equal(timers.size, 1)
	instance.makeRequest = async () => ({ status: 200 })
	await instance.init_api()
	assert.equal(instance.communicationInitiated, true)
	assert.equal(timers.size, 1)
	await instance.destroy()
	assert.equal(timers.size, 0)
})
