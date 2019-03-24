import Taro from '@tarojs/taro'
import {
    CREAT_QRCODE_SUCCESSED,
    CREAT_QRCODE_FAILED,
} from '@constants/qrcode.js'

import {
    CREAT_QRCODE_URL,
} from '@constants/urls'
import fetch from '@util/fetch'


export const dispatchCreactQr = (payload = {}) => {
    const { params, successCb = () => {} } = payload
    return dispatch => {
        fetch({
            url: CREAT_QRCODE_URL,
            params,
        }).then(res => {
            if (successCb) successCb(res)
            dispatch({
                type: CREAT_QRCODE_SUCCESSED,
                payload: {
                    params: res,
                }
            })
        }).catch(err => {
            dispatch({
                type: CREAT_QRCODE_FAILED,
                err,
            })
        })
    }
}