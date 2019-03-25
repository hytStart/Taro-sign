import Taro from '@tarojs/taro'
import {
    GET_ALL_SIGN_SUCCEEDED,
    GET_ALL_SIGN_FAILED,
    GET_SIGN_RECORD_DETAIL_SUCCEEDED,
    GET_SIGN_RECORD_DETAIL_FAILED,
} from '@constants/myInfo.js'

import {
    GET_ALL_SIGN_URL,
    GET_SIGN_DETAIL_URL,
} from '@constants/urls'
import fetch from '@util/fetch'

export const dispatchGetAllSign = (payload = {}) => {
    const { params, successCb = () => {} } = payload
    return dispatch => {
        fetch({
            url: GET_ALL_SIGN_URL,
            params,
        }).then(res => {
            if (successCb) successCb(res)
            dispatch({
                type: GET_ALL_SIGN_SUCCEEDED,
                payload: {
                    params: res,
                }
            })
        }).catch(err => {
            dispatch({
                type: GET_ALL_SIGN_FAILED,
                err,
            })
        })
    }
}

export const dispatchGetSignDetail = (payload = {}) => {
    const { params, successCb = () => {} } = payload
    return dispatch => {
        fetch({
            url: GET_SIGN_DETAIL_URL,
            params,
        }).then(res => {
            if (successCb) successCb(res)
            dispatch({
                type: GET_SIGN_RECORD_DETAIL_SUCCEEDED,
                payload: {
                    params: res,
                }
            })
        }).catch(err => {
            dispatch({
                type: GET_SIGN_RECORD_DETAIL_FAILED,
                err,
            })
        })
    }
}