// actions

function changeInfo(element, time='some') {
    return {
        type: 'static-text',
        id: 'info',
        label: `IMPORTANT: A change will restart internal ${element} components. This may take ${time} seconds and will disable ${element} related actions temporarily!`,
    }
}

function ndiInfo() {
    return {
        type: 'static-text',
        id: 'info',
        label: 'IMPORTANT: This action only works with NDI disabled and "Stream" selected as output!',
    }
}

function streamInfo() {
    return {
        type: 'static-text',
        id: 'info',
        label: 'IMPORTANT: This action only works when selected stream is enabled!',
    }
}

function cameraInfo() {
    return {
        type: 'static-text',
        id: 'info',
        label: `IMPORTANT: A change will restart the camera. This may take some seconds and will disable this instance temporarily!`,
    }
}

function toggle(source, target, options) {
    if (source == 'toggle') {
        source = (target == options[0]) ? options[1] : options[0]
    }
    return source
}

function cycle(source, target, options) {
    if (source == 'cycle') {
        let n = options.indexOf(target)+1
        if (n >= options.length) {
            n = 0
        }
        source = options[n]
    }
    return source
}

function change(mode, value, source) {
    if (mode != 'set') {
        value = (mode == 'inc') ? parseInt(source)+value : parseInt(source)-value
    }
    return value
}



function getActions(inst) {
    return {

        // audio
        audio_delay: {
            name: 'Audio: Delay ON/OFF',
            options: [
                {
                    type: 'dropdown',
                    label: 'Delay:',
                    id: 'delay',
                    default: 'on',
                    choices: [
                        {id: 'toggle', label: 'Toggle'},
                        {id: 'on', label: 'Enable'},
                        {id: 'off', label: 'Disable'}
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('camera', [['AudioDelay', toggle(event.options.delay, inst.data.AudioDelay, ['on', 'off'])]])
            }
        },
        audio_delay_time: {
            name: 'Audio: Delay Time',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'set',
                    choices: [
                        {id: 'set', label: 'Set'},
                        {id: 'inc', label: 'Increase'},
                        {id: 'dec', label: 'Decrease'}
                    ]
                },
                {
                    type: 'number',
                    label: 'Time: (1 - 500)',
                    id: 'time',
                    default: 1,
                    min: 1,
                    max: 500
                }
            ],
            callback: async (event) => {
                inst.makeRequest('camera', [['AudioDelayTime', change(event.options.mode, event.options.time, inst.data.AudioDelayTime)]])
            }
        },
        audio_level: {
            name: 'Audio: Input Level',
            options: [
                {
                    type: 'dropdown',
                    label: 'Level:',
                    id: 'level',
                    default: 'mic',
                    choices: [
                        {id: 'toggle', label: 'Toggle'},
                        {id: 'mic', label: 'Mic'},
                        {id: 'line', label: 'Line'}
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('camera', [['MicLineSelect', toggle(event.options.level, inst.data.MicLineSelect, ['mic', 'line'])]])
            }
        },
        audio_input: {
            name: 'Audio: Input ON/OFF',
            options: [
                cameraInfo(),
                {
                    type: 'dropdown',
                    label: 'Input:',
                    id: 'input',
                    default: 'on',
                    choices: [
                        {id: 'toggle', label: 'Toggle'},
                        {id: 'on', label: 'Enable'},
                        {id: 'off', label: 'Disable'}
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('camera', [['AudioIn', toggle(event.options.input, inst.data.AudioIn, ['on', 'off'])]])
            }
        },
        audio_volume: {
            name: 'Audio: Input Volume',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'set',
                    choices: [
                        {id: 'set', label: 'Set'},
                        {id: 'inc', label: 'Increase'},
                        {id: 'dec', label: 'Decrease'}
                    ]
                },
                {
                    type: 'number',
                    label: 'Volume: (0 - 10)',
                    id: 'volume',
                    default: 1,
                    min: 0,
                    max: 10
                }
            ],
            callback: async (event) => {
                inst.makeRequest('camera', [['AudioInVolume', change(event.options.mode, event.options.volume, inst.data.AudioInVolume)]])
            }
        },
        audio_codec: {
            name: 'Audio: Set Codec',
            options: [
                {
                    type: 'dropdown',
                    label: 'Codec:',
                    id: 'codec',
                    default: 'aac_48k',
                    choices: [
                        {id: 'aac_48k', label: 'AAC (48 kHz)'},
                        {id: 'aac_44.1k', label: 'AAC (44.1 kHz)'},
                        {id: 'aac_16k', label: 'AAC (16 kHz)'},
                        {id: 'g711_16k', label: 'G711 (16 kHz)'},
                        {id: 'g711_8k', label: 'G711 (8 kHz)'}
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('camera', [['AudInCodec', event.options.codec]])
            }
        },

        // camera
        camera_hdmi_ouput_color: {
            name: 'Camera: HDMI Output Format',
            options: [
                {
                    type: 'dropdown',
                    label: 'Format',
                    id: 'format',
                    default: 'yuv422',
                    choices: [
                        {id: 'yuv420', label: 'YUV 420'},
                        {id: 'yuv422', label: 'YUV 422'},
                        {id: 'rgb', label: 'RGB'}
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('camera', [['HdmiColor', event.options.format]])
            }
        },
        camera_image_orientation: {
            name: 'Camera: Image Orientation',
            options: [
                {
                    type: 'dropdown',
                    label: 'Orinetation:',
                    id: 'orientation',
                    default: 'off',
                    choices: [
                        {id: 'cycle', label: 'Cycle'},
                        {id: 'off', label: 'Normal'},
                        {id: 'mirror', label: 'Mirror'},
                        {id: 'flip', label: 'Flip'},
                        {id: 'mirror+flip', label: 'Mirror & Flip'}
                    ]
                },
				{
					type: 'checkbox',
					label: 'Pan Correction:',
					id: 'pan',
					default: true,
				},
				{
					type: 'checkbox',
					label: 'Tilt Correction:',
					id: 'tilt',
					default: true,
				}
            ],
            callback: async (event) => {
                event.options.orientation = cycle(event.options.orientation, inst.data.Mirror, ['off', 'mirror', 'flip', 'mirror+flip'])
                inst.makeRequest('camera', [
                    ['Mirror', event.options.orientation],
                    ['PanFlip', (!event.options.pan && event.options.orientation.includes('mirror')) ? 'on' : 'off'],
                    ['TiltFlip', (!event.options.tilt && event.options.orientation.includes('flip')) ? 'on' : 'off']
                ])
            }
        },
        camera_overlay: {
            name: 'Camera: Image Overlay',
            options: [
                {
                    type: 'dropdown',
                    label: 'Area:',
                    id: 'area',
                    default: 'both',
                    choices: [
                        {id: 'both', label: 'Top Left & Right'},
                        {id: 'OverlayTopLeft', label: 'Top Left'},
                        {id: 'OverlayTopRight', label: 'Top Right'}
                    ]
                },
                {
                    type: 'dropdown',
                    label: 'Overlay:',
                    id: 'overlay',
                    default: 'off',
                    choices: [
                        {id: 'off', label: 'Disable'},
                        {id: 'daytime', label: 'Daytime'},
                        {id: 'text', label: 'Text'}
                    ]
                },
                {
                    type: 'textinput',
                    label: 'Text:',
                    id: 'text',
                    default: ''
                }
                
            ],
            callback: async (event) => {
                let parameters = []
                if (event.options.area == 'both') {
                    parameters.push(['OverlayTopLeftMode', event.options.overlay])
                    parameters.push(['OverlayTopRightMode', event.options.overlay])
                }
                else {
                    parameters.push([event.options.area + 'Mode', event.options.overlay])
                }
                if (event.options.overlay == 'text') {
                    if (event.options.area == 'both') {
                        parameters.push(['OverlayTopLeftText', event.options.text])
                        parameters.push(['OverlayTopRightText', event.options.text])
                    }
                    else {
                        parameters.push([event.options.area + 'Text', event.options.text])
                    }
                }
                inst.makeRequest('camera', parameters)
            }
        },
        camera_output_source: {
            name: 'Camera: Output Source',
            options: [
                cameraInfo(),
                {
                    type: 'dropdown',
                    label: 'Output',
                    id: 'output',
                    default: 'hdmi',
                    choices: [
                        {id: 'hdmi+stream', label: 'HDMI + Stream (active NDI will replace Stream!)'},
                        {id: 'hdmi+uvc', label: 'HDMI + UVC (USB)'},
                        {id: 'hdmi', label: 'HDMI only (*CV420)'},
                        {id: 'stream', label: 'Stream only (*CV420, active NDI will replace Stream!)'}
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('camera', [['OutputSource', event.options.output]])
            }
        },
        camera_video_norm: {
            name: 'Camera: Set Video Norm',
            options: [
                {
                    type: 'dropdown',
                    label: 'Norm:',
                    id: 'norm',
                    default: '1080p_50',
                    choices: [
                        {id: '2160p_5994', label: '2160p/59.94'},
                        {id: '2160p_50', label: '2160p/50'},
                        {id: '2160p_2997', label: '2160p/29.97'},
                        {id: '2160p_25', label: '2160p/25'},
                        {id: '1080p_5994', label: '1080p/59.94'},
                        {id: '1080p_50', label: '1080p/50'},
                        {id: '1080p_2997', label: '1080p/29.97'},
                        {id: '1080p_25', label: '1080p/25'},
                        {id: '720p_5994', label: '720p/59.94'},
                        {id: '720p_50', label: '720p/50'},
                        {id: '720p_2997', label: '720p/29.97'},
                        {id: '720p_25', label: '720p/25'},
                        // {id: '1080i_60', label: '1080i/60'},
                        // {id: '1080i_5994', label: '1080i/59.94'},
                        // {id: '1080i_50', label: '1080i/50'}
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('camera', [['Resolution', event.options.norm]])
            },
        },

        // custom
        custom_command: {
            name: 'Custom: Send CGI Command',
            options: [
                {
                    type: 'static-text',
                    id: 'info',
                    label: 'IMPORTANT: Use at own risk!\nTest before production.',
                },
                {
                    type: 'dropdown',
                    label: 'CGI Name:',
                    id: 'name',
                    default: 'camera',
                    choices: [
                        {id: 'camera', label: 'camera'},
                        {id: 'freedconfig', label: 'freedconfig'},
                        {id: 'imaging', label: 'imaging'},
                        {id: 'main', label: 'main'},
                        {id: 'mpeg2ts', label: 'mpeg2ts'},
                        {id: 'ndi', label: 'ndi'},
                        {id: 'network', label: 'network'},
                        {id: 'presetposition', label: 'presetposition'},
                        {id: 'ptzf', label: 'ptzf'},
                        {id: 'rtmp', label: 'rtmp'},
                        {id: 'srt', label: 'srt'},
                        {id: 'system', label: 'system'},
                        {id: 'tally', label: 'tally'},
                        {id: 'user', label: 'user'}
                    ]
                },
                {
                    type: 'textinput',
                    id: 'parameter',
                    label: 'Parameter Name:',
                    default: '',
                },
                {
                    type: 'textinput',
                    id: 'value',
                    label: 'Value:',
                    default: '',
                }
            ],
            callback: async (event) => {
                inst.makeRequest(event.options.name, [[event.options.parameter, event.options.value]])
            },
        },

        // exposure
        exposure_gain: {
            name: 'Exposure: Gain',
            options: [
                {
                    type: 'dropdown',
                    label: 'Gain:',
                    id: 'gain',
                    default: 5,
                    choices: [
                        {id: 'dec', label: 'Lower'},
                        {id: 1, label: '+0 dB'},
                        {id: 2, label: '+3 dB'},
                        {id: 3, label: '+6 dB'},
                        {id: 4, label: '+9 dB'},
                        {id: 5, label: '+12 dB'},
                        {id: 6, label: '+15 dB'},
                        {id: 7, label: '+18 dB'},
                        {id: 8, label: '+21 dB'},
                        {id: 9, label: '+24 dB'},
                        {id: 10, label: '+27 dB'},
                        {id: 11, label: '+30 dB'},
                        {id: 12, label: '+33 dB'},
                        {id: 13, label: '+36 dB'},
                        {id: 14, label: '+39 dB'},
                        {id: 15, label: '+42 dB'},
                        {id: 16, label: '+45 dB'},
                        {id: 'inc', label: 'Higher'}
                    ]
                },
				{
					type: 'checkbox',
					label: 'Force Manual Exposure:',
					id: 'force',
					default: true,
				}
            ],
            callback: async (event) => {
                let parameters = []
                if (event.options.force) {
                    parameters.push(['ExposureMode', 'manual'])
                }
                if (event.options.gain == 'inc') {
                    event.options.gain = parseInt(inst.data.ExposureGain)+1
                }
                else if (event.options.gain == 'dec') {
                    event.options.gain = parseInt(inst.data.ExposureGain)-1
                }
                parameters.push(['ExposureGain', event.options.gain])
                inst.makeRequest('imaging', parameters)
            }
        },
        exposure_iris: {
            name: 'Exposure: Iris',
            options: [
                {
                    type: 'dropdown',
                    label: 'Iris:',
                    id: 'iris',
                    default: 9,
                    choices: [
                        {id: 'inc', label: 'Open Up'},
                        {id: 14, label: 'F 1.6'},
                        {id: 13, label: 'F 2.0'},
                        {id: 12, label: 'F 2.2'},
                        {id: 11, label: 'F 2.7'},
                        {id: 10, label: 'F 3.2'},
                        {id: 9, label: 'F 3.8'},
                        {id: 8, label: 'F 4.5'},
                        {id: 7, label: 'F 5.4'},
                        {id: 6, label: 'F 6.3'},
                        {id: 5, label: 'F 7.8'},
                        {id: 4, label: 'F 9.0'},
                        {id: 3, label: 'F 11'},
                        {id: 2, label: 'F 13'},
                        {id: 1, label: 'F 16'},
                        {id: 0, label: 'F 18'},
                        {id: 'dec', label: 'Close Down'},
                        {id: 15, label: 'Close Completely'}
                    ]
                },
				{
					type: 'checkbox',
					label: 'Force Manual Exposure:',
					id: 'force',
					default: true,
				}
            ],
            callback: async (event) => {
                let parameters = []
                let iris = (inst.data.ExposureMode == 'iris') ? parseInt(inst.data.ExposureIrisPri) : parseInt(inst.data.ExposureIris)
                let compare = (inst.data.ExposureMode == 'iris') ? inst.data.ExposureIrisPri : inst.data.ExposureIris
                if (event.options.force) {
                    parameters.push(['ExposureMode', 'manual'])
                }
                if (event.options.iris == 'inc') {
                    if (compare == '15') {
                        event.options.iris = 0
                    }
                    else if (compare !== '14') {
                        event.options.iris = iris+1
                    }
                }
                else if (event.options.iris == 'dec') {
                    if (compare == '0') {
                        event.options.iris = 15
                    }
                    else if (compare !== '15') {
                        event.options.iris = iris-1
                    }
                }
                parameters.push(['ExposureIris', event.options.iris])
                inst.makeRequest('imaging', parameters)
            }
        },
        exposure_compensation: {
            name: 'Exposure: Set Compensation',
            options: [
                {
                    type: 'dropdown',
                    label: 'Compensation:',
                    id: 'comp',
                    default: 5,
                    choices: [
                        {id: 'dec', label: 'Decrease'},
                        {id: 0, label: '-5.0dB / -8.0dB'},
                        {id: 1, label: '-4.0dB / -6.4dB'},
                        {id: 2, label: '-3.0dB / -4.8dB'},
                        {id: 3, label: '-2.0dB / -3.2dB'},
                        {id: 4, label: '-1.0dB / -1.6dB'},
                        {id: 5, label: ' 0.0dB / 0.0dB'},
                        {id: 6, label: '+5.0dB / +1.6dB'},
                        {id: 7, label: '+5.0dB / +3.2dB'},
                        {id: 8, label: '+5.0dB / +4.8dB'},
                        {id: 9, label: '+5.0dB / +6.4dB'},
                        {id: 10, label: '+5.0dB / +8.0dB'},
                        {id: 'inc', label: 'Increase'},
                    ]
                }
            ],
            callback: async (event) => {
                if (event.options.comp == 'inc') {
                    event.options.comp = parseInt(inst.data.ExposureCompensation)+1
                }
                else if (event.options.comp == 'dec') {
                    event.options.comp = parseInt(inst.data.ExposureCompensation)-1
                }
                inst.makeRequest('imaging', [['ExposureCompensation', event.options.comp]])
            }
        },
        exposure_mode: {
            name: 'Exposure: Set Mode',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'manual',
                    choices: [
                        {id: 'auto', label: 'Full Auto'},
                        {id: 'shutter', label: 'Shutter Priority'},
                        {id: 'iris', label: 'Iris Priority'},
                        {id: 'manual', label: 'Manual'}
                    ]
                }
            ],
            callback: async (event) => {
                let parameters = [['ExposureMode', event.options.mode]]
                if (event.options.mode == 'shutter') {
                    parameters.push(['ExposureExposureTime', inst.data.ExposureExposureTime])
                }
                else if (event.options.mode == 'iris') {
                    parameters.push(['ExposureIris', inst.data.ExposureIris])
                }
                else if (event.options.mode == 'manual') {
                    if (inst.data.ExposureMode == 'shutter') {
                        parameters.push(['ExposureExposureTime', inst.data.ExposureExposureTimePri])
                    }
                    else if (inst.data.ExposureMode == 'iris') {
                        parameters.push(['ExposureIris', inst.data.ExposureIrisPri])
                    }
                }
                inst.makeRequest('imaging', parameters)
            }
        },
        exposure_shutter_speed: {
            name: 'Exposure: Shutter Speed',
            options: [
                {
                    type: 'dropdown',
                    label: 'Shutter Speed:',
                    id: 'shutter',
                    default: 13,
                    choices: [
                        {id: 'inc', label: 'Longer'},
                        {id: 21, label: '1/1'},
                        {id: 20, label: '1/2'},
                        {id: 19, label: '1/4'},
                        {id: 18, label: '1/8'},
                        {id: 17, label: '1/15 | 1/12'},
                        {id: 16, label: '1/30 | 1/25'},
                        {id: 15, label: '1/60 | 1/50'},
                        {id: 14, label: '1/90 | 1/75'},
                        {id: 13, label: '1/100'},
                        {id: 12, label: '1/120'},
                        {id: 11, label: '1/180 | 1/150'},
                        {id: 10, label: '1/250 | 1/215'},
                        {id: 9, label: '1/350 | 1/300'},
                        {id: 8, label: '1/500 | 1/425'},
                        {id: 7, label: '1/725 | 1/600'},
                        {id: 6, label: '1/1000'},
                        {id: 5, label: '1/1500 | 1/1250'},
                        {id: 4, label: '1/2000 | 1/1750'},
                        {id: 3, label: '1/2500'},
                        {id: 2, label: '1/3000'},
                        {id: 1, label: '1/5000'},
                        {id: 0, label: '1/10000'},
                        {id: 'dec', label: 'Shorter'}
                    ]
                },
				{
					type: 'checkbox',
					label: 'Force Manual Exposure:',
					id: 'force',
					default: true,
				}
            ],
            callback: async (event) => {
                let parameters = []
                let time = (inst.data.ExposureMode == 'shutter') ? parseInt(inst.data.ExposureExposureTimePri) : parseInt(inst.data.ExposureExposureTime)
                if (event.options.force) {
                    parameters.push(['ExposureMode', 'manual'])
                }
                if (event.options.shutter == 'inc') {
                    event.options.shutter = time+1
                }
                else if (event.options.shutter == 'dec') {
                    event.options.shutter = time-1
                }
                parameters.push(['ExposureExposureTime', event.options.shutter])
               
                inst.makeRequest('imaging', parameters)
            }
        },

        // focus
        focus_af_frame: {
            name: 'Focus: AF Frame',
            options: [
                {
                    type: 'dropdown',
                    label: 'Frame:',
                    id: 'frame',
                    default: 'full',
                    choices: [
                        {id: 'full', label: 'Full'},
                        {id: 'center', label: 'Center'},
                        {id: 'auto', label: 'Auto'}
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('camera', [['AFFrame', event.options.frame]])
            }
        },
        focus_af_sensitivity: {
            name: 'Focus: AF Sensitivity',
            options: [
                {
                    type: 'dropdown',
                    label: 'Sensitivity:',
                    id: 'sensitivity',
                    default: 'low',
                    choices: [
                        {id: 'low', label: 'Low'},
                        {id: 'middle', label: 'Middle'},
                        {id: 'high', label: 'High'}
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('camera', [['AFSensitivity', event.options.sensitivity]])
            }
        },
        focus_manual_adjust: {
            name: 'Focus: Manual Adjust',
            options: [
                {
                    type: 'dropdown',
                    label: 'Direction:',
                    id: 'direction',
                    default: 'far',
                    choices: [
                        {id: 'stop', label: 'Stop'},
                        {id: 'far', label: 'Far'},
                        {id: 'near', label: 'Near'}
                    ]
                },
                {
                    type: 'number',
                    label: 'Speed: (1 - 8)',
                    id: 'speed',
                    default: 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                if (event.options.direction == 'stop') {
                    event.options.speed = 'focus'
                }
                else {
                    event.options.speed -= 1
                }
    
                inst.makeRequest('ptzf', [['Move', `${event.options.direction},${event.options.speed}`]])
            },
        },
        focus_ptz_assist: {
            name: 'Focus: PTZ Assist ON/OFF',
            options: [
                {
                    type: 'static-text',
                    id: 'info',
                    label: 'IMPORTANT: This action only works in manual focus mode!',
                },
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'toggle',
                    choices: [
                        {id: 'toggle', label: 'Toggle'},
                        {id: 'on', label: 'Enable'},
                        {id: 'off', label: 'Disable'}
                    ]
                },
				{
					type: 'checkbox',
					label: 'Force Manual Focus Mode:',
					id: 'focus',
					default: true,
				}
            ],
            callback: async (event) => {
                let parameters = []
                event.options.mode = toggle(event.options.mode, inst.data.PTZAssist, ['on', 'off'])
                if (event.options.focus && event.options.mode == 'on') {
                    parameters.push(['FocusMode', 'manual'])
                }
                parameters.push(['PTZAssist', event.options.mode])
                inst.makeRequest('camera', parameters)
            },
        },
        focus_mode: {
            name: 'Focus: Set Mode',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'manual',
                    choices: [
                        {id: 'toggle', label: 'Toggle'},
                        {id: 'manual', label: 'Manual Focus'},
                        {id: 'auto', label: 'Auto Focus'}
                    ]
                },
                cameraInfo(),
				{
					type: 'checkbox',
					label: 'Face Priority:',
					id: 'face',
					default: false,
				}
            ],
            callback: async (event) => {
                let parameters = [['FocusMode', toggle(event.options.mode, inst.data.FocusMode, ['manual', 'auto'])]]

                if (parameters[0][1] == 'auto') {
                    parameters.push(['SmartAF', (event.options.face) ? 'on' : 'off'])
                }

                inst.makeRequest('camera', parameters)
            }
        },
        focus_one_push_trigger: {
            name: 'Focus: One Push AF Trigger',
            options: [
                {
                    type: 'checkbox',
                    label: 'Force To Manual Focus:',
                    id: 'force',
                    default: true,
                }
            ],
            callback: async (event) => {
                if (event.options.force) {
                    await inst.makeRequest('camera', [['FocusMode', 'manual']])
                }
                inst.makeRequest('ptzf', [['Move', 'onepushaf,0']])
            }
        },

        //image
        image_custom_brightness: {
            name: 'Image: Custom Brightness',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'set',
                    choices: [
                        {id: 'set', label: 'Set'},
                        {id: 'inc', label: 'Increase'},
                        {id: 'dec', label: 'Decrease'}
                    ]
                },
                {
                    type: 'number',
                    label: 'Brightness: (0 - 15)',
                    id: 'value',
                    default: 7,
                    min: 0,
                    max: 15
                },
				{
					type: 'checkbox',
					label: 'Force Custom Image Mode:',
					id: 'force',
					default: true,
				}
            ],
            callback: async (event) => {
                let parameters = []
                if (event.options.force) {
                    parameters.push(['ImageMode', 'custom'])
                }
                parameters.push(['DigitalBrightLevel', change(event.options.mode, event.options.value, inst.data.DigitalBrightLevel)])
                inst.makeRequest('imaging', parameters)
            }
        },
        image_custom_gamma: {
            name: 'Image: Custom Gamma',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'set',
                    choices: [
                        {id: 'set', label: 'Set'},
                        {id: 'inc', label: 'Increase'},
                        {id: 'dec', label: 'Decrease'}
                    ]
                },
                {
                    type: 'number',
                    label: 'Gamma: (0 - 3)',
                    id: 'value',
                    default: 3,
                    min: 0,
                    max: 3
                },
				{
					type: 'checkbox',
					label: 'Force Custom Mode:',
					id: 'force',
					default: true,
				}
            ],
            callback: async (event) => {
                let parameters = []
                if (event.options.force) {
                    parameters.push(['ImageMode', 'custom'])
                }
                parameters.push(['GammaLevel', change(event.options.mode, event.options.value, inst.data.GammaLevel)])
                inst.makeRequest('imaging', parameters)
            }
        },
        image_custom_hue: {
            name: 'Image: Custom Hue',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'set',
                    choices: [
                        {id: 'set', label: 'Set'},
                        {id: 'inc', label: 'Increase'},
                        {id: 'dec', label: 'Decrease'}
                    ]
                },
                {
                    type: 'number',
                    label: 'Hue: (0 - 15)',
                    id: 'value',
                    default: 7,
                    min: 0,
                    max: 15
                },
				{
					type: 'checkbox',
					label: 'Force Custom Image Mode:',
					id: 'force',
					default: true,
				}
            ],
            callback: async (event) => {
                let parameters = []
                if (event.options.force) {
                    parameters.push(['ImageMode', 'custom'])
                }
                parameters.push(['ColorHue', change(event.options.mode, event.options.value, inst.data.ColorHue)])
                inst.makeRequest('imaging', parameters)
            }
        },
        image_custom: {
            name: 'Image: Custom ON/OFF',
            options: [
                {
                    type: 'dropdown',
                    label: 'Custom Mode:',
                    id: 'mode',
                    default: 'custom',
                    choices: [
                        {id: 'toggle', label: 'Toggle'},
                        {id: 'custom', label: 'Enable'},
                        {id: 'default', label: 'Disable'}
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('imaging', [['ImageMode', toggle(event.options.mode, inst.data.ImageMode, ['custom', 'default'])]])
            }
        },
        image_custom_saturation: {
            name: 'Image: Custom Saturation',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'set',
                    choices: [
                        {id: 'set', label: 'Set'},
                        {id: 'inc', label: 'Increase'},
                        {id: 'dec', label: 'Decrease'}
                    ]
                },
                {
                    type: 'number',
                    label: 'Saturation: (0 - 15)',
                    id: 'value',
                    default: 7,
                    min: 0,
                    max: 15
                },
				{
					type: 'checkbox',
					label: 'Force Custom Image Mode:',
					id: 'force',
					default: true,
				}
            ],
            callback: async (event) => {
                let parameters = []
                if (event.options.force) {
                    parameters.push(['ImageMode', 'custom'])
                }
                parameters.push(['ColorSaturation', change(event.options.mode, event.options.value, inst.data.ColorSaturation)])
                inst.makeRequest('imaging', parameters)
            }
        },
        image_custom_sharpness: {
            name: 'Image: Custom Sharpness',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'set',
                    choices: [
                        {id: 'set', label: 'Set'},
                        {id: 'inc', label: 'Increase'},
                        {id: 'dec', label: 'Decrease'}
                    ]
                },
                {
                    type: 'number',
                    label: 'Sharpness: (0 - 14)',
                    id: 'value',
                    default: 7,
                    min: 0,
                    max: 14
                },
				{
					type: 'checkbox',
					label: 'Force Custom Image Mode:',
					id: 'force',
					default: true,
				}
            ],
            callback: async (event) => {
                let parameters = []
                if (event.options.force) {
                    parameters.push(['ImageMode', 'custom'])
                }
                parameters.push(['DetailLevel', change(event.options.mode, event.options.value, inst.data.DetailLevel)])
                inst.makeRequest('imaging', parameters)
            }
        },
        image_noise_reduction: {
            name: 'Image: Noise Reduction',
            options: [
                {
                    type: 'dropdown',
                    label: '2D NR:',
                    id: 'two',
                    default: 0,
                    choices: [
                        {id: null, label: 'Ignore'},
                        {id: 0, label: 'Disable'},
                        {id: 1, label: 'Low'},
                        {id: 2, label: 'Mid'},
                        {id: 3, label: 'High'}
                    ]
                },
                {
                    type: 'dropdown',
                    label: '3D NR:',
                    id: 'three',
                    default: 0,
                    choices: [
                        {id: null, label: 'Ignore'},
                        {id: 0, label: 'Disable'},
                        {id: 1, label: 'Low'},
                        {id: 2, label: 'Mid'},
                        {id: 3, label: 'High'}
                    ]
                }
            ],
            callback: async (event) => {
                let parameters = []
                if (event.options.two !== null) {
                    parameters.push(['NoiseReduction2DLevel', event.options.two])
                }
                if (event.options.three !== null) {
                    parameters.push(['NoiseReduction3DLevel', event.options.three])
                }
                if (parameters.length > 0) {
                    inst.makeRequest('imaging', parameters)
                }
            }
        },
        image_picture_effect: {
            name: 'Image: Picture Effect',
            options: [
                {
                    type: 'dropdown',
                    label: 'Effect:',
                    id: 'effect',
                    default: 'off',
                    choices: [
                        {id: 'off', label: 'Normal'},
                        {id: 'neg', label: 'Negative'},
                        {id: 'bw', label: 'Black & White'}
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('camera', [['PictureEffect', event.options.effect]])
            }
        },
        image_wide_dynamic_range: {
            name: 'Image: Wide Dynamic Range',
            options: [
                {
                    type: 'dropdown',
                    label: 'WDR:',
                    id: 'wdr',
                    default: 0,
                    choices: [
                        {id: 'cycle', label: 'Cycle All'},
                        {id: 0, label: 'Disable'},
                        {id: 1, label: 'Low'},
                        {id: 2, label: 'Mid'},
                        {id: 3, label: 'High'}
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('imaging', [['VisibilityEnhancerLevel', cycle(event.options.wdr, inst.data.VisibilityEnhancerLevel, ['0', '1', '2', '3'])]])
            }
        },

        // ndi
        ndi_active: {
            name: 'NDI: ON/OFF',
            options: [
                cameraInfo(),
                {
                    type: 'dropdown',
                    label: 'NDI:',
                    id: 'ndi',
                    default: 'toggle',
                    choices: [
                        {id: 'toggle', label: 'Toggle'},
                        {id: 'on', label: 'Enable'},
                        {id: 'off', label: 'Disable'}
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('ndi', [['NdiEnable', toggle(event.options.ndi, inst.data.NdiEnable, ['on', 'off'])]])
            }
        },

        // pan/tilt
        pt_motion_speed: {
            name: 'Pan/Tilt: Motion Speed',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'set',
                    choices: [
                        {id: 'set', label: 'Set'},
                        {id: 'inc', label: 'Increase'},
                        {id: 'dec', label: 'Decrease'}
                    ]
                },
                {
                    type: 'number',
                    label: 'Speed (1 - 24)',
                    id: 'speed',
                    default: 1,
                    min: 1,
                    max: 24
                }
            ],
            callback: async (event) => {
                event.options.speed = change(event.options.mode, event.options.speed, inst.data.MotionSpeed)
                if (event.options.speed >= 1 && event.options.speed <= 24) {
                    inst.data.MotionSpeed = event.options.speed
                }
            },
        },
        pt_move: {
            name: 'Pan/Tilt: Move',
            options: [
                {
                    type: 'dropdown',
                    label: 'Direction',
                    id: 'direction',
                    default: 'up',
                    choices: [
                        {id: 'stop', label: 'Stop'},
                        {id: 'up', label: 'Up'},
                        {id: 'up-right', label: 'Up-Right'},
                        {id: 'right', label: 'Right'},
                        {id: 'down-right', label: 'Down-Right'},
                        {id: 'down', label: 'Down'},
                        {id: 'down-left', label: 'Down-Left'},
                        {id: 'left', label: 'Left'},
                        {id: 'up-left', label: 'Up-Left'}
                    ]
                },
                {
                    type: 'number',
                    label: 'Speed (1 - 24, 0 = selected speed)',
                    id: 'speed',
                    default: 1,
                    min: 0,
                    max: 24
                }
            ],
            callback: async (event) => {
                if (event.options.direction == 'stop') {
                    event.options.speed = 'motor'
                }
                else if (event.options.speed > 0) {
                    event.options.speed -= 1
                }
                else {
                    event.options.speed = inst.data.MotionSpeed-1
                }
    
                inst.makeRequest('ptzf', [['Move', `${event.options.direction},${event.options.speed}`]])
            }
        },
        pt_limit: {
            name: 'Pan/Tilt: Set Limits',
            options: [
                {
                    type: 'dropdown',
                    label: 'Limit ON/OFF: (disabling will ignore all following settings!)',
                    id: 'active',
                    default: 'on',
                    choices: [
                        {id: null, label: 'Ingnore'},
                        {id: 'toggle', label: 'Toggle'},
                        {id: 'on', label: 'Enable'},
                        {id: 'off', label: 'Disable'}
                    ]
                },
                {
                    type: 'number',
                    label: 'Pan Left Limit: (-170 - 0, empty = ignore)',
                    id: 'left',
                    default: -170,
                    min: -170,
                    max: 0
                },
                {
                    type: 'number',
                    label: 'Pan Right Limit: (0 - 170, empty = ignore)',
                    id: 'right',
                    default: 170,
                    min: 0,
                    max: 170
                },
                {
                    type: 'number',
                    label: 'Tilt Up Limit: (0 - 90, empty = ignore)',
                    id: 'up',
                    default: 90,
                    min: 0,
                    max: 90
                },
                {
                    type: 'number',
                    label: 'Tilt Down Limit: (-30 - 0, empty = ignore)',
                    id: 'down',
                    default: -30,
                    min: -30,
                    max: 0
                }
            ],
            callback: async (event) => {
                let parameters = []
                if (event.options.left !== '') { // add pan left Limit to parameters if not ignored
                    parameters.push(['PanLeftLimit', event.options.left])
                }
                if (event.options.right !== '') { // add pan right Limit to parameters if not ignored
                    parameters.push(['PanRightLimit', event.options.right])
                }
                if (event.options.up !== '') { // add tilt up Limit to parameters if not ignored
                    parameters.push(['TiltUpLimit', event.options.up])
                }
                if (event.options.down !== '') { // add tilt down Limit to parameters if not ignored
                    parameters.push(['TiltDownLimit', event.options.down])
                }
                if (event.options.active == 'on' || (event.options.active == 'toggle' && inst.data.PanTiltLimit == 'off')) {
                    parameters.push(['PanTiltLimit', 'on']) // enable pan tilt limit
                }
                else if (event.options.active !== null) {
                    parameters = [['PanTiltLimit', 'off']] // disable pan tilt limit
                }
                
                if (parameters.length > 0) {
                    inst.makeRequest('camera', parameters)
                }
            }
        },
        pt_init_position: {
            name: 'Pan/Tilt: Set Startup Position',
            options: [
                {
                    type: 'dropdown',
                    label: 'Position',
                    id: 'position',
                    default: 'lastmem',
                    choices: [
                        {id: 'lastmem', label: 'Last Position'},
                        {id: '1stpreset', label: '1st Preset'}
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('camera', [['InitPosition', event.options.position]])
            }
        },
        pt_speed_comp: {
            name: 'Pan/Tilt: Speed Compensation ON/OFF',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'toggle',
                    choices: [
                        {id: 'toggle', label: 'Toggle'},
                        {id: 'on', label: 'Enable'},
                        {id: 'off', label: 'Disable'}
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('camera', [['PTZSpeedComp', toggle(event.options.mode, inst.data.PTZSpeedComp, ['on', 'off'])]])
            },
        },

        // presets
        presets_actions: {
            name: 'Presets: Execute Action',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'PresetCall',
                    choices: [
                        {id: 'PresetCall', label: 'Call Preset'},
                        {id: 'PresetSet', label: 'Set Preset'},
                        {id: 'PresetClear', label: 'Clear Preset'},
                        {id: 'selected', label: 'Selected Preset Action'}
                    ]
                },
                {
                    type: 'number',
                    label: 'Number: (0 - 255)',
                    id: 'value',
                    default: 0,
                    min: 0,
                    max: 255
                }
            ],
            callback: async (event) => {
                inst.makeRequest('presetposition', [[(event.options.mode == 'selected') ? inst.data.selectedPresetAction : event.options.mode, event.options.value]])
            },
        },
        presets_home_pos: {
            name: 'Presets: Call Home Position',
            options: [],
            callback: async (event) => {
                inst.makeRequest('presetposition', [['HomePos', 'recall']])
            },
        },
        presets_call_mode: {
            name: 'Presets: Call Mode',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode',
                    id: 'mode',
                    default: 'normal',
                    choices: [
                        {id: 'toggle', label: 'Toggle'},
                        {id: 'normal', label: 'Normal'},
                        {id: 'freeze', label: 'Freeze'}
                    ]
                }
            ],
            callback: async (event) => {
                if (event.options.mode == 'toggle') {
                    event.options.mode = (inst.data.CallMode == 'normal') ? 'freeze' : 'normal'
                }
                inst.makeRequest('presetposition', [['CallMode', event.options.mode]])
            },
        },
        presets_execution_speed: {
            name: 'Presets: Execution Speed',
            options: [
                {
                    type: 'dropdown',
                    label: 'Speed:',
                    id: 'speed',
                    default: 7,
                    choices: [
                        {id: 'cycle', label: 'Cycle All'},
                        {id: 7, label: '300 deg/sec'},
                        {id: 6, label: '200 deg/sec'},
                        {id: 5, label: '160 deg/sec'},
                        {id: 4, label: '120 deg/sec'},
                        {id: 3, label: '80 deg/sec'},
                        {id: 2, label: '50 deg/sec'},
                        {id: 1, label: '25 deg/sec'},
                        {id: 0, label: '5 deg/sec'}
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('camera', [['PresetSpeed', cycle(event.options.speed, parseInt(inst.data.PresetSpeed), [7, 6, 5, 4, 3, 2, 1, 0])]])
            },
        },
        presets_preload_af: {
            name: 'Presets: Preload AF',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'on',
                    choices: [
                        {id: 'toggle', label: 'Toggle'},
                        {id: 'on', label: 'Enable'},
                        {id: 'off', label: 'Disable'}
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('camera', [['PresetAF', toggle(event.options.mode, inst.data.PresetAF, ['on', 'off'])]])
            },
        },
        presets_ptz_motion_sync: {
            name: 'Presets: PTZ Motion Sync ON/OFF',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'toggle',
                    choices: [
                        {id: 'toggle', label: 'Toggle'},
                        {id: 'on', label: 'Enable'},
                        {id: 'off', label: 'Disable'}
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('camera', [['PTZMotionSync', toggle(event.options.mode, inst.data.PTZMotionSync, ['on', 'off'])]])
            },
        },
        presets_select_action: {
            name: 'Presets: Select Action',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'PresetCall',
                    choices: [
                        {id: 'PresetCall', label: 'Call Preset'},
                        {id: 'PresetSet', label: 'Set Preset'},
                        {id: 'PresetClear', label: 'Clear Preset'}
                    ]
                }
            ],
            callback: async (event) => {
                if (event.options.mode == 'PresetCall') {
                    inst.data.selectedPresetAction = event.options.mode
                }
                else if (!inst.data.restartEvents.camera) {
                    inst.data.selectedPresetAction = event.options.mode
                }
            },
        },

        // streams
        streams_live: {
            name: 'Streams: Live ON/OFF',
            options: [
                {
                    type: 'dropdown',
                    label: 'Protocol:',
                    id: 'protocol',
                    default: 'rtmp,RtmpEnable',
                    choices: [
                        {id: 'rtmp,RtmpEnable', label: 'RTMP / RTMPS'},
                        {id: 'srt,SRTEnable', label: 'SRT'},
                        {id: 'mpeg2ts,MPEG2TSEnable', label: 'MPEG-TS'}
                    ]
                },
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'toggle',
                    choices: [
                        {id: 'toggle', label: 'Toggle'},
                        {id: 'on', label: 'Enable'},
                        {id: 'off', label: 'Disable'}
                    ]
                },
                {
                    type: 'dropdown',
                    label: 'Source: (SRT & MPEG-TS only)',
                    id: 'source',
                    default: 'stream2',
                    choices: [
                        {id: 'stream1', label: 'Stream 1 (HEVC)'},
                        {id: 'stream2', label: 'Stream 2 (H.264)'}
                    ]
                }
            ],
            callback: async (event) => {
                let [cgi, cmd] = event.options.protocol.split(',')
                parameters = [[cmd, toggle(event.options.mode, inst.data[cmd], ['on', 'off'])]]
                if (cgi == 'srt') {
                    parameters.push(['SRTSource', event.options.source])
                }
                else if (cgi == 'mpeg2ts') {
                    parameters.push(['MPEG2TSSource', event.options.source])
                }
                console.log(cgi, parameters)
                inst.makeRequest(cgi, parameters)
            }
        },
        streams_config: {
            name: 'Streams: Set Config',
            options: [
                ndiInfo(),
                changeInfo('stream', 'about 20'),
                streamInfo(),
                {
                    type: 'dropdown',
                    label: 'Stream:',
                    id: 'stream',
                    default: 1,
                    choices: [
                        {id: 1, label: 'Stream 1'},
                        {id: 2, label: 'Stream 2'},
                        {id: 3, label: 'Stream 3'}
                    ]
                },
                {
                    type: 'dropdown',
                    label: 'ON/OFF: (disabling will ignore all following settings!)',
                    id: 'active',
                    default: 'on',
                    choices: [
                        {id: null, label: 'Ingnore'},
                        {id: 'toggle', label: 'Toggle'},
                        {id: 'on', label: 'Enable'},
                        {id: 'off', label: 'Disable'}
                    ]
                },
                {
                    type: 'dropdown',
                    label: 'Resolution: (stream2 only!)',
                    id: 'resolution',
                    default: '1920,1080',
                    choices: [
                        {id: undefined, label: 'Ingnore'},
                        {id: '1920,1080', label: 'FHD (1920x1080)'},
                        {id: '1280,720', label: 'HD (1280x720)'}
                    ]
                },
                {
                    type: 'dropdown',
                    label: 'Frame Rate: (stream2 only!)',
                    id: 'framerate',
                    default: 50,
                    choices: [
                        {id: null, label: 'Ingnore'},
                        {id: 59.94, label: '59.94'},
                        {id: 50, label: '50'},
                        {id: 29.97, label: '29.97'},
                        {id: 25, label: '25'}
                    ]
                },
                {
                    type: 'number',
                    label: 'Bit Rate: (Stream 1/2: 2000 - 20000 kBit/s | Stream 3: 512 - 5000 kBit/s, 0 = Ingnore)',
                    id: 'bitrate',
                    default: 5000,
                    min: 0,
                    max: 20000
                },
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'on',
                    choices: [
                        {id: null, label: 'Ingnore'},
                        {id: 'toggle', label: 'Toggle'},
                        {id: 'on', label: 'CBR'},
                        {id: 'off', label: 'VBR'}
                    ]
                },
                {
                    type: 'dropdown',
                    label: 'Keyframe Interval: (not all streams support every interval on every frame rate!)',
                    id: 'interval',
                    default: 1,
                    choices: [
                        {id: null, label: 'Ingnore'},
                        {id: 1, label: '1.0 Seconds'},
                        {id: 0.5, label: '0.5 Seconds'},
                        {id: 0.33, label: '0.33 Seconds'},
                        {id: 0.25, label: '0.25 Seconds'},
                        {id: 0.16, label: '0.16 Seconds'}
                    ]
                }
            ],
            callback: async (event) => {
                let parameters = []
                if (event.options.resolution !== null && event.options.stream == 2) { // add resolution to parameters if not ignored (stream2 only)
                    parameters.push(['ImageSize2', event.options.resolution])
                }
                if (event.options.framerate !== null && event.options.stream == 2) { // add frame rate to parameters if not ignored (stream2 only)
                    parameters.push(['FrameRate2', event.options.framerate]) 
                }
                if (event.options.bitrate >= 2000 && event.options.bitrate <= 20000) { // add bit rate to parameters if not ignored
                    parameters.push(['BitRate' + event.options.stream, event.options.bitrate])
                }
                if (event.options.mode !== null) { // add mode to parameters if not ignored
                    if (event.options.mode == 'toggle') {
                        parameters.push(['CBR' + event.options.stream, (inst.data.CBR2 == 'on') ? 'off' : 'on'])
                    }
                    else {
                        parameters.push(['CBR' + event.options.stream, event.options.mode])
                    }
                }
                if (event.options.interval !== null) { // try to add interval to parameters if not ignored
                    if (event.options.framerate !== null && event.options.stream == 2) { // set interval based on new frame rate
                        event.options.interval = inst.iFrameMapping.stream2[event.options.framerate][event.options.interval]
                    }
                    else { // set interval based on current frame rate
                        event.options.interval = inst.iFrameMapping.stream2[inst.data['FrameRate' + event.options.stream]][event.options.interval]
                    }
                    if (event.options.interval !== undefined) { // add interval to parameters if not undifined
                        parameters.push(['IFrameRatio2', event.options.interval])
                    }
                }
                if (event.options.active == 'on') {
                    parameters.push(['ImageCodec' + event.options.stream, (event.options.stream == 1) ? 'h265' : 'h264'])
                }
                else if (event.options.active == 'toggle' && inst.data['ImageCodec' + event.options.stream] == 'off') {
                    parameters.push(['ImageCodec' + event.options.stream, (event.options.stream == 1) ? 'h265' : 'h264'])
                }
                else if (event.options.active !== null) {
                    parameters = [['ImageCodec' + event.options.stream, 'off']]
                }
                if (parameters.length > 0) {
                    inst.makeRequest('camera', parameters)
                }
            }
        },
        streams_stream: {
            name: 'Streams: Streams ON/OFF',
            options: [
                changeInfo('stream', 'about 6'),
                {
                    type: 'dropdown',
                    label: 'Stream:',
                    id: 'stream',
                    default: 1,
                    choices: [
                        {id: 0, label: 'All'},
                        {id: 1, label: 'Stream 1'},
                        {id: 2, label: 'Stream 2'},
                        {id: 3, label: 'Stream 3'}
                    ]
                },
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'on',
                    choices: [
                        {id: 'toggle', label: 'Toggle'},
                        {id: 'on', label: 'Enable'},
                        {id: 'off', label: 'Disable'}
                    ]
                }
            ],
            callback: async (event) => {
                let parameters = []
                let start = (event.options.stream > 0) ? event.options.stream : 1
                let end = (event.options.stream > 0) ? event.options.stream : 3
                for (event.options.stream = start; event.options.stream <= end; event.options.stream++) {
                    if (event.options.mode == 'on') {
                        parameters.push(['ImageCodec' + event.options.stream, (event.options.stream == 1) ? 'h265' : 'h264'])
                    }
                    else if (event.options.mode == 'toggle' && inst.data['ImageCodec' + event.options.stream] == 'off') {
                        parameters.push(['ImageCodec' + event.options.stream, (event.options.stream == 1) ? 'h265' : 'h264'])
                    }
                    else {
                        parameters.push(['ImageCodec' + event.options.stream, 'off'])
                    }
                }
                
                inst.makeRequest('camera', parameters)
            }
        },

        // tally
        tally_level: {
            name: 'Tally: Brightness',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'high',
                    choices: [
                        {id: 'cycle', label: 'Cycle All'},
                        {id: 'off', label: 'Off'},
                        {id: 'low', label: 'Low'},
                        {id: 'high', label: 'High'},
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('tally', [['TallyLevel', cycle(event.options.mode, inst.data.TallyLevel, ['off', 'low', 'high'])]])
            }
        },
        tally_cmmd_mode: {
            name: 'Tally: Command Mode',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'normal',
                    choices: [
                        {id: 'toggle', label: 'Toggle'},
                        {id: 'normal', label: 'Normal'},
                        {id: 'link', label: 'Link (Auto Change)'}
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('tally', [['TallyCMMDMode', toggle(event.options.mode, inst.data.TallyCMMDMode, ['normal', 'link'])]])
            }
        },
        tally_control: {
            name: 'Tally: ON/OFF',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'toggle',
                    choices: [
                        {id: 'toggle', label: 'Toggle'},
                        {id: 'on', label: 'Enable'},
                        {id: 'off', label: 'Disable'}
                    ]
                }
            ],
            callback: async (event) => {
                inst.makeRequest('tally', [['TallyControl', toggle(event.options.mode, inst.data.TallyControl, ['on', 'off'])]])
            }
        },

        // white balance
        whitebalance_red_blue_gain: {
            name: 'White Balance: Red/Blue Gain',
            options: [
                {
                    type: 'dropdown',
                    label: 'Channel:',
                    id: 'channel',
                    default: 'WhiteBalanceCrGain',
                    choices: [
                        {id: 'WhiteBalanceCrGain', label: 'Red Channel (Cr)'},
                        {id: 'WhiteBalanceCbGain', label: 'Blue Channel (Cb)'}
                    ]
                },
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'set',
                    choices: [
                        {id: 'set', label: 'Set'},
                        {id: 'inc', label: 'Increase'},
                        {id: 'dec', label: 'Decrease'}
                    ]
                },
                {
                    type: 'number',
                    label: 'Gain: (0 - 128)',
                    id: 'gain',
                    default: 42,
                    min: 0,
                    max: 128
                },
				{
					type: 'checkbox',
					label: 'Force Manual White Balance:',
					id: 'force',
					default: true,
				}
            ],
            callback: async (event) => {
                let parameters = []

                if (event.options.force) {
                    parameters.push(['WhiteBalanceMode', 'manual'])
                }

                if (event.options.mode == 'inc') {
                    event.options.gain = parseInt(inst.data[event.options.channel])+1
                }
                else if (event.options.mode == 'dec') {
                    event.options.gain = parseInt(inst.data[event.options.channel])-1
                }
                parameters.push([event.options.channel, event.options.gain])

                inst.makeRequest('imaging', parameters)
            }
        },
        whitebalance_select_mode: {
            name: 'White Balance: Select Mode',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'manual,',
                    choices: [
                        {id: 'manual,', label: 'Manual White Balance'},
                        {id: 'onepushwb,', label: 'One Push White Balance'},
                        {id: 'onepushwb,on', label: 'One Push White Balance + Trigger'},
                        {id: 'atw,', label: 'Full Auto White Balance  (1700k - 10000k)'},
                        {id: 'auto,', label: 'Limited Auto White Balance (4000k - 7000k)'},
                    ]
                }
            ],
            callback: async (event) => {
                let [mode, trigger] = event.options.mode.split(',')
                let parameters = [['WhiteBalanceMode', mode]]
                if (trigger == 'on') {
                    parameters.push(['WhiteBalanceOnePushTrg', 'on'])
                }
                inst.makeRequest('imaging', parameters)
            }
        },
        whitebalance_select_preset: {
            name: 'White Balance: Select Preset',
            options: [
                {
                    type: 'dropdown',
                    label: 'Preset:',
                    id: 'preset',
                    default: '42,54',
                    choices: [
                        {id: '42,54', label: 'Bright Sunlight'},
                        {id: '36,68', label: 'Incandescent Bulbs'},
                        {id: '40,63', label: 'Fluorescent Bulbs'},
                        {id: '42,59', label: 'Mixed Light'},
                        {id: '43,50', label: 'Cloudy'}
                    ]
                },
				{
					type: 'checkbox',
					label: 'Force Manual White Balance:',
					id: 'force',
					default: true,
				}
            ],
            callback: async (event) => {
                let parameters = []

                if (event.options.force) {
                    parameters.push(['WhiteBalanceMode', 'manual'])
                }

                let [red, blue] = event.options.preset.split(',')
                parameters.push(['WhiteBalanceCrGain', red])
                parameters.push(['WhiteBalanceCbGain', blue])

                inst.makeRequest('imaging', parameters)
            }
        },

        // zoom
        zoom_digital_zoom_limit: {
            name: 'Zoom: Digital Zoom Limit',
            options: [
                {
                    type: 'dropdown',
                    label: 'Limit: (2160p_5994/2160p_50 does NOT support this setting in hdmi+stream mode)',
                    id: 'limit',
                    default: 'x1',
                    choices: [
                        {id: 'cycle', label: 'Cycle All'},
                        {id: 'x1', label: 'Disable'},
                        {id: 'x2', label: 'x2'},
                        {id: 'x3', label: 'x3'},
                        {id: 'x4', label: 'x4'},
                        {id: 'x5', label: 'x5'},
                        {id: 'x6', label: 'x6'},
                        {id: 'x7', label: 'x7'},
                        {id: 'x8', label: 'x8'},
                        {id: 'x9', label: 'x9'},
                        {id: 'x10', label: 'x10'},
                        {id: 'x11', label: 'x11'},
                        {id: 'x12', label: 'x12'},
                    ]
                }
            ],
            callback: async (event) => {
                
                inst.makeRequest('camera', [['DZoomLimit', cycle(event.options.limit, inst.data.DZoomLimit, ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'])]])
            }
        },
        zoom_manual_adjust: {
            name: 'Zoom: Manual Adjust',
            options: [
                {
                    type: 'dropdown',
                    label: 'Direction:',
                    id: 'direction',
                    default: 'tele',
                    choices: [
                        {id: 'stop', label: 'Stop'},
                        {id: 'tele', label: 'Zoom In'},
                        {id: 'wide', label: 'Zoom Out'}
                    ]
                },
                {
                    type: 'number',
                    label: 'Speed: (1 - 8, 0 = selected speed)',
                    id: 'speed',
                    default: 1,
                    min: 0,
                    max: 8
                }
            ],
            callback: async (event) => {
                if (event.options.direction == 'stop') {
                    event.options.speed = 'zoom'
                }
                else if (event.options.speed > 0) {
                    event.options.speed -= 1
                }
                else {
                    event.options.speed = inst.data.ZoomSpeed-1
                }
    
                inst.makeRequest('ptzf', [['Move', `${event.options.direction},${event.options.speed}`]])
            }
        },
        zoom_speed: {
            name: 'Zoom: Speed',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'set',
                    choices: [
                        {id: 'set', label: 'Set'},
                        {id: 'inc', label: 'Increase'},
                        {id: 'dec', label: 'Decrease'}
                    ]
                },
                {
                    type: 'number',
                    label: 'Speed (1 - 8)',
                    id: 'speed',
                    default: 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                event.options.speed = change(event.options.mode, event.options.speed, inst.data.ZoomSpeed)
                if (event.options.speed >= 1 && event.options.speed <= 8) {
                    inst.data.ZoomSpeed = event.options.speed
                }
            },
        },
        // zoom_tracking: {
        //     name: 'Zoom: Tracking ON/OFF',
        //     options: [
        //         {
        //             type: 'dropdown',
        //             label: 'Mode:',
        //             id: 'mode',
        //             default: 'toggle',
        //             choices: [
        //                 {id: 'toggle', label: 'Toggle'},
        //                 {id: 'on', label: 'Enable'},
        //                 {id: 'off', label: 'Disable'}
        //             ]
        //         }
        //     ],
        //     callback: async (event) => {
        //         inst.makeRequest('camera', [['ZoomTracking', toggle(event.options.mode, inst.data.ZoomTracking, ['on', 'off'])]])
        //     },
        // },
    }
}

module.exports = getActions