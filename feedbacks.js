// feedbacks

const { combineRgb } = require('@companion-module/base')



function simple(a, b, invert=false) {
    if (a == b) {
        return (invert) ? false : true
    }
    return (invert) ? true : false
}

function simpleN(a, b, invert=false) {
    if (a !== b) {
        return (invert) ? false : true
    }
    return (invert) ? true : false
}

function simpleD(a, b, c, d, invert=false) {
    if (a == b && c == d) {
        return (invert) ? false : true
    }
    return (invert) ? true : false
}



function getFeedbacks(inst) {
    return {

        //audio
        audio_delay: {
            type: 'boolean',
            name: 'Audio: Delay ON/OFF',
            description: 'Show feedback for active Audio Delay',
            options: [
				{
					type: 'checkbox',
					label: 'Inactive:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                return simple(inst.data.AudioDelay, 'on', event.options.invert)
            }
        },
        audio_input: {
            type: 'boolean',
            name: 'Audio: Input ON/OFF',
            description: 'Show feedback for active Audio Input',
            options: [
				{
					type: 'checkbox',
					label: 'Inactive:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                return simple(inst.data.AudioIn, 'on', event.options.invert)
            }
        },

        // camera
        camera_hdmi_output_color: {
            type: 'boolean',
            name: 'Camera: HDMI Output Format',
            description: 'Show feedback for HDMI format',
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
                },
				{
					type: 'checkbox',
					label: 'Invert:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                return simple(inst.data.HdmiColor, event.options.format, event.options.invert)
            }
        },
        camera_output_source: {
            type: 'boolean',
            name: 'Camera: Output Source',
            description: 'Show feedback for output source',
            options: [
                {
                    type: 'dropdown',
                    label: 'Output:',
                    id: 'output',
                    default: 'hdmi',
                    choices: [
                        {id: 'hdmi', label: 'HDMI only'},
                        {id: 'stream', label: 'Stream only'},
                        {id: 'hdmi+stream', label: 'HDMI + Stream'},
                        {id: 'hdmi+uvc', label: 'HDMI + UVC (USB)'},
                    ]
                },
				{
					type: 'checkbox',
					label: 'Invert:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                return simple(inst.data.OutputSource, event.options.output, event.options.invert)
            }
        },
        camera_overlay: {
            type: 'boolean',
            name: 'Camera: Overlay ON/OFF',
            description: 'Show feedback for Overlays',
            options: [
                {
                    type: 'dropdown',
                    label: 'Area:',
                    id: 'area',
                    default: 'both',
                    choices: [
                        {id: 'both', label: 'Top Left & Right'},
                        {id: 'OverlayTopLeftMode', label: 'Top Left'},
                        {id: 'OverlayTopRightMode', label: 'Top Right'}
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
					type: 'checkbox',
					label: 'Invert',
					id: 'invert',
					default: true,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(255, 0, 0)
            },
            callback: (event) => {
                if (event.options.area == 'both' && inst.data.OverlayTopLeftMode == event.options.overlay && inst.data.OverlayTopRightMode == event.options.overlay) {
                    return (event.options.invert) ? false : true
                }
                else if (event.options.area !== 'both' && inst.data[event.options.area] == event.options.overlay) {
                    return (event.options.invert) ? false : true
                }
                return (event.options.invert) ? true : false
            }
        },
        camera_video_norm: {
            type: 'boolean',
            name: 'Camera: Video Norm',
            description: 'Show feedback for current Video Norm',
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
                        {id: '1080i_60', label: '1080i/60'},
                        {id: '1080i_5994', label: '1080i/59.94'},
                        {id: '1080i_50', label: '1080i/50'}
                    ]
                },
				{
					type: 'checkbox',
					label: 'Invert:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(255, 0, 0)
            },
            callback: (event) => {
                return simple(inst.data.Resolution, event.options.norm, event.options.invert)
            }
        },

        // exposure
        exposure_mode: {
            type: 'boolean',
            name: 'Exposure: Mode',
            description: 'Show feedback for Exposure Mode',
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
                },
				{
					type: 'checkbox',
					label: 'Inactive:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                return simple(inst.data.ExposureMode, event.options.mode, event.options.invert)
            }
        },

        // focus
        focus_face_prio: {
            type: 'boolean',
            name: 'Focus: Face Priority',
            description: 'Show feedback for active Face Priority',
            options: [
				{
					type: 'checkbox',
					label: 'Inactive:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                return simple(inst.data.SmartAF, 'on', event.options.invert)
            }
        },
        focus_mode: {
            type: 'boolean',
            name: 'Focus: Mode',
            description: 'Show feedback for Focus Mode',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'manual',
                    choices: [
                        {id: 'manual', label: 'Manual Focus'},
                        {id: 'auto', label: 'Auto Focus'}
                    ]
                },
				{
					type: 'checkbox',
					label: 'Inactive:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                return simple(inst.data.FocusMode, event.options.mode, event.options.invert)
            }
        },
        focus_ptz_assist: {
            type: 'boolean',
            name: 'Focus: PTZ Assist ON/OFF',
            description: 'Show feedback for active PTZ Assist',
            options: [
				{
					type: 'checkbox',
					label: 'Inactive:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                return simple(inst.data.PTZAssist, 'on', event.options.invert)
            }
        },

        // image
        image_custom: {
            type: 'boolean',
            name: 'Image: Custom ON/OFF',
            description: 'Show feedback for active Custom Image',
            options: [
				{
					type: 'checkbox',
					label: 'Inactive:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                return simple(inst.data.ImageMode, 'custom', event.options.invert)
            }
        },
        image_picture_effect: {
            type: 'boolean',
            name: 'Image: Picture Effect',
            description: 'Show feedback for current Picture Effect',
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
                },
				{
					type: 'checkbox',
					label: 'Inactive:',
					id: 'invert',
					default: true,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                return simple(inst.data.PictureEffect, event.options.effect, event.options.invert)
            }
        },

        //ndi
        ndi_active: {
            type: 'boolean',
            name: 'NDI: ON/OFF',
            description: 'Show feedback for active NDI output',
            options: [
				{
					type: 'checkbox',
					label: 'Inactive:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                return simple(inst.data.NdiEnable, 'on', event.options.invert)
            }
        },

        // pan/tilt
        pt_motion_speed: {
            type: 'boolean',
            name: 'Pan/Tilt: Motion Speed',
            description: 'Show feedback for specific Motion Speed',
            options: [
                {
                    type: 'number',
                    label: 'Speed (1 - 24)',
                    id: 'speed',
                    default: 1,
                    min: 1,
                    max: 24
                },
				{
					type: 'checkbox',
					label: 'Inactive:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                return simple(inst.data.MotionSpeed, event.options.speed, event.options.invert)
            }
        },
        pt_limit: {
            type: 'boolean',
            name: 'Pan/Tilt: Limit ON/OFF',
            description: 'Show feedback for active pan/tilt limit',
            options: [
				{
					type: 'checkbox',
					label: 'Inactive:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                return simple(inst.data.PanTiltLimit, 'on', event.options.invert)
            }
        },
        pt_speed_comp: {
            type: 'boolean',
            name: 'Pan/Tilt: Speed Compensation ON/OFF',
            description: 'Show feedback for active PTZ Speed Compensation',
            options: [
				{
					type: 'checkbox',
					label: 'Inactive:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                return simple(inst.data.PTZSpeedComp, 'on', event.options.invert)
            }
        },

        // presets
        presets_call_mode: {
            type: 'boolean',
            name: 'Presets: Call Mode',
            description: 'Show feedback for Preset Call Mode',
            options: [
                {
                    type: 'dropdown',
                    label: 'Preset Call Mode:',
                    id: 'mode',
                    default: 'normal',
                    choices: [
                        {id: 'normal', label: 'Normal'},
                        {id: 'freeze', label: 'Freeze'}
                    ]
                }
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                return simple(inst.data.CallMode, event.options.mode)
            }
        },
        presets_execution_speed: {
            type: 'boolean',
            name: 'Presets: Execution Speed',
            description: 'Show feedback for Preset Execution Speed',
            options: [
                {
                    type: 'dropdown',
                    label: 'Speed:',
                    id: 'speed',
                    default: 7,
                    choices: [
                        {id: 7, label: '300 deg/sec'},
                        {id: 6, label: '200 deg/sec'},
                        {id: 5, label: '160 deg/sec'},
                        {id: 4, label: '120 deg/sec'},
                        {id: 3, label: '80 deg/sec'},
                        {id: 2, label: '50 deg/sec'},
                        {id: 1, label: '25 deg/sec'},
                        {id: 0, label: '5 deg/sec'}
                    ]
                },
				{
					type: 'checkbox',
					label: 'Invert:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                return simple(inst.data.PresetSpeed, String(event.options.speed), event.options.invert)
            }
        },
        presets_preload_af: {
            type: 'boolean',
            name: 'Presets: Preload AF ON/OFF',
            description: 'Show feedback for active Preload AF',
            options: [
				{
					type: 'checkbox',
					label: 'Inactive:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                return simple(inst.data.PresetAF, 'on', event.options.invert)
            }
        },
        presets_ptz_motion_sync: {
            type: 'boolean',
            name: 'Presets: PTZ Motion Sync ON/OFF',
            description: 'Show feedback for active PTZ Motion Sync',
            options: [
				{
					type: 'checkbox',
					label: 'Inactive:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                return simple(inst.data.PTZMotionSync, 'on', event.options.invert)
            }
        },
        presets_select_action: {
            type: 'boolean',
            name: 'Presets: Selected Action',
            description: 'Show feedback for selected Action for presets',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'PresetSet',
                    choices: [
                        {id: 'PresetCall', label: 'Call Preset'},
                        {id: 'PresetSet', label: 'Set Preset'},
                        {id: 'PresetClear', label: 'Clear Preset'}
                    ]
                },
				{
					type: 'checkbox',
					label: 'Invert:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0)
            },
            callback: (event) => {
                return simple(inst.data.selectedPresetAction, event.options.mode, event.options.invert)
            }
        },

        // restarts
        restarts: {
            type: 'boolean',
            name: 'Restart: Events',
            description: 'Show feedback for internal restarts of specific components',
            options: [
                {
                    type: 'dropdown',
                    label: 'Event:',
                    id: 'event',
                    default: 'stream',
                    choices: [
                        {id: 'camera', label: 'Camera'},
                        {id: 'stream', label: 'Stream'}
                    ]
                },
				{
					type: 'checkbox',
					label: 'Invert',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                text: '...',
                size: 44,
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 0)
            },
            callback: (event) => {
                return simple(inst.data.restartEvents[event.options.event], true, event.options.invert)
            }
        },

        // streams
        streams_live: {
            type: 'boolean',
            name: 'Streams: Live ON/OFF',
            description: 'Show feedback for active Live Stream',
            options: [
                {
                    type: 'dropdown',
                    label: 'Protocol:',
                    id: 'protocol',
                    default: 'RtmpEnable',
                    choices: [
                        {id: 'RtmpEnable', label: 'RTMP / RTMPS'},
                        {id: 'SRTEnable', label: 'SRT'},
                        {id: 'MPEG2TSEnable', label: 'MPEG-TS'}
                    ]
                },
				{
					type: 'checkbox',
					label: 'Stream OFF:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(255, 0, 0)
            },
            callback: (event) => {
                return simple(inst.data[event.options.protocol], 'on', event.options.invert)
            }
        },
        streams_stream: {
            type: 'boolean',
            name: 'Streams: Stream ON/OFF',
            description: 'Show feedback for active Stream',
            options: [
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
					type: 'checkbox',
					label: 'Stream OFF:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(255, 0, 0)
            },
            callback: (event) => {
                return simpleN(inst.data['ImageCodec' + event.options.stream], 'off', event.options.invert)
            }
        },

        // tally
        tally_control: {
            type: 'boolean',
            name: 'Tally: ON/OFF',
            description: 'Show feedback for active Tally',
            options: [
				{
					type: 'checkbox',
					label: 'Tally OFF:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(255, 0, 0)
            },
            callback: async (event) => {
                return simple(inst.data.TallyControl, 'on', event.options.invert)
            }
        },

        // white balance
        whitebalance_select_mode: {
            type: 'boolean',
            name: 'White Balance: Mode',
            description: 'Show feedback for current White Balance Mode',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mode:',
                    id: 'mode',
                    default: 'manual',
                    choices: [
                        {id: 'manual', label: 'Manual White Balance'},
                        {id: 'onepushwb', label: 'One Push White Balance'},
                        {id: 'atw', label: 'Full Auto White Balance  (1700k - 10000k)'},
                        {id: 'auto', label: 'Limited Auto White Balance (4000k - 7000k)'},
                    ]
                },
				{
					type: 'checkbox',
					label: 'Invert:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                return simple(inst.data.WhiteBalanceMode, event.options.mode, event.options.invert)
            }
        },
        whitebalance_select_preset: {
            type: 'boolean',
            name: 'White Balance: Preset',
            description: 'Show feedback for current White Balance Preset',
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
					label: 'Invert:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                let [red, blue] = event.options.preset.split(',')
                return simpleD(inst.data.WhiteBalanceCrGain, red, inst.data.WhiteBalanceCbGain, blue, event.options.invert)
            }
        },

        // zoom
        zoom_active_zooming: {
            type: 'boolean',
            name: 'Zoom: Active Zooming',
            description: 'Show feedback for active zooming',
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
					type: 'checkbox',
					label: 'Invert:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                if (event.options.direction == 'stop' && inst.data.CurrentZoomPos == inst.data.LastZoomPos) {
                    return true
                }
                else if (event.options.direction == 'tele' && inst.data.CurrentZoomPos > inst.data.LastZoomPos) {
                    return true
                }
                else if (event.options.direction == 'wide' && inst.data.CurrentZoomPos < inst.data.LastZoomPos) {
                    return true
                }
                return false
            }
        },
        zoom_digital_zoom_limit: {
            type: 'boolean',
            name: 'Zoom: Digital Zoom Limit',
            description: 'Show feedback for Digital Zoom Limit',
            options: [
                {
                    type: 'dropdown',
                    label: 'Limit: (2160p_5994/2160p_50 does NOT support this setting in hdmi+stream mode)',
                    id: 'limit',
                    default: 'x1',
                    choices: [
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
                },
				{
					type: 'checkbox',
					label: 'Invert:',
					id: 'invert',
					default: false,
				}
            ],
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 255)
            },
            callback: (event) => {
                return simple(inst.data.DZoomLimit, event.options.limit, event.options.invert)
            }
        },
        // camera_zoom_tracking: {
        //     type: 'boolean',
        //     name: 'Camera: Zoom Tracking ON/OFF',
        //     description: 'Show feedback for active Zoom Tracking',
        //     options: [
		// 		{
		// 			type: 'checkbox',
		// 			label: 'Inactive:',
		// 			id: 'invert',
		// 			default: false,
		// 		}
        //     ],
        //     defaultStyle: {
        //         color: combineRgb(255, 255, 255),
        //         bgcolor: combineRgb(0, 0, 255)
        //     },
        //     callback: (event) => {
        //         return simple(inst.data.ZoomTracking, 'on', event.options.invert)
        //     }
        // },
    }
}

module.exports = getFeedbacks