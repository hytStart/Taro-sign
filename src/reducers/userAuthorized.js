import {
    TEST,
    GET_USER_INFO_SUCCEEDED,
    GET_USER_INFO_FAILED,
} from '@constants/userAuthorized.js'

const INITIAL_STATE = {
    username: 2018140442,
    isteacher: 1,
    name: "",
    openid: "",
}

export default function userAuthorized(state = INITIAL_STATE, action) {
    switch (action.type) {
    case TEST:
        return {
            ...state,
            stuId: 2222,
        }
    case GET_USER_INFO_SUCCEEDED:
        const {
            payload: {
                params,
            }
        } = action
        return {
            ...state,
            ...params,
        }
    case GET_USER_INFO_FAILED:
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
