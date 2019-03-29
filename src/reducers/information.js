import {
    GET_INFORMATION_SUCCEEDED,
    GET_INFORMATION_FAILED,
    GET_INFORMATION_DETAIL_SUCCEEDED,
    GET_INFORMATION_DETAIL_FAILED,
} from '@constants/information.js'

const INITIAL_STATE = {
    allInformation: [{
        rid: 1,
        title: '',
        content: '',
        url: '',
    }],
    informationDetal: {
        rid: 1,
        title: '',
        content: '',
        url: '',
    },
}

export default function information(state = INITIAL_STATE, action) {
    switch (action.type) {
    case GET_INFORMATION_SUCCEEDED:
        const {
            payload: {
                params,
            }
        } = action
        return {
            ...state,
            allInformation: params,
        }
    case GET_INFORMATION_FAILED:
        const {
            err,
        } = action
        return {
            ...state,
        }
    case GET_INFORMATION_DETAIL_SUCCEEDED:
        const {
            payload: {
                params: informationDetal,
            }
        } = action
        return {
            ...state,
            informationDetal: informationDetal[0],
        }
    case GET_INFORMATION_DETAIL_FAILED:
        return {
            ...state,
        }
    default:
        return state
    }
}
