import Taro from '@tarojs/taro'
import {
    SIGN_RECORD_SUCCEEDED,
    SIGN_RECORD_FAILED,
} from '@constants/home.js'

import {
    SIGN_RECORD_URL,
} from '@constants/urls'
import fetch from '@util/fetch'


export const dispatchSignRecord = (payload = {}) => {
    const { params, successCb = () => {} } = payload
    return dispatch => {
        fetch({
            url: SIGN_RECORD_URL,
            params,
        }).then(res => {
            if (successCb) successCb(res)
            dispatch({
                type: SIGN_RECORD_SUCCEEDED,
                payload: {
                    params: res,
                }
            })
        }).catch(err => {
            dispatch({
                type: SIGN_RECORD_FAILED,
                err,
            })
        })
    }
}