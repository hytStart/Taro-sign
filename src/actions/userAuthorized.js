import Taro from '@tarojs/taro';
import {
    TEST,
    GET_USER_INFO_SUCCEEDED,
    GET_USER_INFO_FAILED,
} from '@constants/userAuthorized.js'

import { GET_STUDNET_USERINFO_URL } from '@constants/urls'
import fetch from '../util/fetch'

export const testActions = () => {
    return {
        type: TEST
    }
}

export const dispatchGetUserInfoActions = (payload = {}) => {
    const { params, successCb = () => {} } = payload
    return dispatch => {
        fetch({
            url: GET_STUDNET_USERINFO_URL,
            params,
        }).then(res => {
            if (successCb) successCb(res)
            dispatch({
                type: GET_USER_INFO_SUCCEEDED,
                payload: {
                    params: res,
                }
            })
        }).catch(err => {
            dispatch({
                type: GET_USER_INFO_FAILED,
                err,
            })
        })
    }
}

// export default dispatchBoundUser = (payload = {}) => {
//     const { params, successCb = () => {} } = payload
//     return dispatch => {

//     }
// }

// 异步的action
// export function asyncAdd () {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(add())
//     }, 2000)
//   }
// }
