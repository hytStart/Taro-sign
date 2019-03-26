import {
    GET_ALL_SIGN_SUCCEEDED,
    GET_ALL_SIGN_FAILED,
    GET_SIGN_RECORD_DETAIL_SUCCEEDED,
    GET_SIGN_RECORD_DETAIL_FAILED,
} from '@constants/myInfo.js'

const INITIAL_STATE = {
    teacherSignInfo: [{
        sid: 122,
        username: 123,
        title: '',
        location: '',
        starttime: '',
        endtime: '',
    }],
    signRecordInfo: {
        sign: {
            sid: 122,
            name: 125,
            title: '',
            location: '',
            starttime: '',
            endtime: '',
            qrcode: '',
        },
        list: [{
            sid: 122,
            username: 125,
            name: '',
            time: '',
        }]
    }
}

export default function myInfo(state = INITIAL_STATE, action) {
    switch (action.type) {
    case GET_ALL_SIGN_SUCCEEDED:
        const {
            payload: {
                params,
            }
        } = action
        return {
            ...state,
            teacherSignInfo: params,
        }
    case GET_ALL_SIGN_FAILED:
        const {
            err,
        } = action
        return {
            ...state,
        }
    // 详细内容
    case GET_SIGN_RECORD_DETAIL_SUCCEEDED:
        const {
            payload: {
                params: signRecordInfo,
            }
        } = action
        return {
            ...state,
            signRecordInfo,
        }
    case GET_SIGN_RECORD_DETAIL_FAILED:
        return {
            ...state,
        }
    default:
        return state
    }
}
