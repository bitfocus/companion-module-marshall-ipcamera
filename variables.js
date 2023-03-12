// variables


let variables = []


function newVar(id, label, value) {
    variables.push({id: id, label: label, default: value})
    return {variableId: id, name: label}
}


function getVariables(inst) {
    return [
        // audio
        newVar('audio_delay_time', 'Audio Delay Time', ''),
        newVar('audio_level', 'Audio Level', ''),
        newVar('audio_volume', 'Audio Volume', ''),

        // camera
        newVar('camera_image_orientation', 'Image Orientation', ''),
        newVar('camera_model', 'Model', ''),
        newVar('camera_uptime', 'Uptime', ''),
        newVar('camera_video_norm', 'Video Norm', ''),

        // exposure
        newVar('exposure_compensation', 'Exposure Compensation', ''),
        newVar('exposure_shutter_speed', 'Shutter Speed', ''),
        newVar('exposure_gain', 'Gain', ''),
        newVar('exposure_iris', 'Iris', ''),
        newVar('exposure_mode', 'Exposure Mode', ''),

        // focus
        newVar('focus_mode', 'Focus Mode', ''),

        // image
        newVar('image_2d_noise_reduction', '2D Noise Reduction', ''),
        newVar('image_3d_noise_reduction', '3D Noise Reduction', ''),
        newVar('image_brightness', 'Brightness', ''),
        newVar('image_gamma', 'Gamma', ''),
        newVar('image_hue', 'Hue', ''),
        newVar('image_saturation', 'Saturation', ''),
        newVar('image_sharpness', 'Sharpness', ''),
        newVar('image_wdr', 'Wide Dynamic Range', ''),

        // pan/tilt
        newVar('pt_motion_speed', 'Motion Speed'),
        newVar('pt_pan_left_limit', 'Pan Left Limit', ''),
        newVar('pt_pan_right_limit', 'Pan Right Limit', ''),
        newVar('pt_tilt_down_limit', 'Tilt Down Limit', ''),
        newVar('pt_tilt_up_limit', 'Tilt Up Limit', ''),

        // presets
        newVar('preset_call_mode', 'Preset Call Mode', ''),
        newVar('preset_execution_speed', 'Preset Execution Speed', ''),

        // streams
        newVar('stream1_bitrate', 'Stream1 Bitrate', ''),
        newVar('stream1_frame_rate', 'Stream1 Frame Rate', ''),
        // newVar('stream1_keyframe_interval', 'Stream1 Keyframe Interval', ''),
        newVar('stream1_mode', 'Stream1 Mode', ''),
        newVar('stream1_resolution', 'Stream1 Resolution', ''),
        newVar('stream2_bitrate', 'Stream2 Bitrate', ''),
        newVar('stream2_frame_rate', 'Stream2 Frame Rate', ''),
        // newVar('stream2_keyframe_interval', 'Stream2 Keyframe Interval', ''),
        newVar('stream2_mode', 'Stream2 Mode', ''),
        newVar('stream2_resolution', 'Stream2 Resolution', ''),
        newVar('stream3_bitrate', 'Stream3 Bitrate', ''),
        newVar('stream3_frame_rate', 'Stream3 Frame Rate', ''),
        // newVar('stream3_keyframe_interval', 'Stream3 Keyframe Interval', ''),
        newVar('stream3_mode', 'Stream3 Mode', ''),
        newVar('stream3_resolution', 'Stream3 Resolution', ''),

        // white balance
        newVar('wb_gain_blue', 'Blue Gain', ''),
        newVar('wb_gain_red', 'Red Gain', ''),
        newVar('wb_mode', 'White balance Mode', ''),

        // zoom
        newVar('zoom_digital_zoom_limit', 'Digital Zoom Limit', ''),
        newVar('zoom_speed', 'Zoom Speed'),
    ]
}


function defaultVariables() {
    let output = {}
    variables.forEach((variable) => {
        Object.assign(output, {[variable.id]: variable.default})
    })
    return output
}


module.exports = { getVariables, defaultVariables }