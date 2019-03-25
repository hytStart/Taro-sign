import {
    SIGN_RECORD_SUCCEEDED,
    SIGN_RECORD_FAILED,
} from '@constants/home.js'

const INITIAL_STATE = {
}

export default function home(state = INITIAL_STATE, action) {
    switch (action.type) {
    case SIGN_RECORD_SUCCEEDED:
        const {
            payload: {
                params,
            }
        } = action
        return {
            ...state,
            // ...params,
        }
    case SIGN_RECORD_FAILED:
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
