import Taro from '@tarojs/taro'
import {
    GET_INFORMATION_SUCCEEDED,
    GET_INFORMATION_FAILED,
    GET_INFORMATION_DETAIL_SUCCEEDED,
    GET_INFORMATION_DETAIL_FAILED,
} from '@constants/information.js'

import {
    GET_INFORMATION_LIST_URL,
} from '@constants/urls'
import fetch from '@util/fetch'

export const a = 1

export const dispatchGetInformation = (payload = {}) => {
    const { params, successCb = () => {} } = payload
    return dispatch => {
        fetch({
            url: GET_INFORMATION_LIST_URL,
            params,
        }).then(res => {
            if (successCb) successCb(res)
            dispatch({
                type: GET_INFORMATION_SUCCEEDED,
                payload: {
                    params: res,
                }
            })
        }).catch(err => {
            dispatch({
                type: GET_INFORMATION_FAILED,
                err,
            })
        })
    }
}

export const dispatchGetInformationDetail = (payload = {}) => {
    const { params, successCb = () => {} } = payload
    return dispatch => {
        fetch({
            url: GET_INFORMATION_LIST_URL,
            params,
        }).then(res => {
            if (successCb) successCb(res)
            dispatch({
                type: GET_INFORMATION_DETAIL_SUCCEEDED,
                payload: {
                    params: res,
                }
            })
        }).catch(err => {
            dispatch({
                type: GET_INFORMATION_DETAIL_FAILED,
                err,
            })
        })
    }
}