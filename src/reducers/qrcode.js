import {
    CREAT_QRCODE_SUCCESSED,
    CREAT_QRCODE_FAILED,
} from '@constants/qrcode.js'

const INITIAL_STATE = {
}

export default function qrCode(state = INITIAL_STATE, action) {
    switch (action.type) {
    case CREAT_QRCODE_SUCCESSED:
        // const {
        //     payload: {
        //         params,
        //     }
        // } = action
        return {
            ...state,
            // ...params,
        }
    case CREAT_QRCODE_FAILED:
        const {
            err,
        } = action
        return {
            ...state,
        }
    default:
        return state
    }
}
