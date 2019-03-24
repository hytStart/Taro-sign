import Taro from '@tarojs/taro';
import {
    TEST,
    GET_USER_INFO_SUCCEEDED,
    GET_USER_INFO_FAILED,
    // BOUND_USER_INFO_SUCCEEDED,
    // BOUND_USER_INFO_FAILED,
} from '@constants/userAuthorized.js'

import {
    GET_STUDNET_USERINFO_URL,
    BOUND_STUDNET_USERINFO_URL,
} from '@constants/urls'
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

export const dispatchBoundUser = (payload = {}) => {
    const {
        params,
        successCb = () => {},
        failCb = () => {},
    } = payload
    return dispatch => {
        fetch({
            url: BOUND_STUDNET_USERINFO_URL,
            params,
        }).then(res => {
            const { username } = res // 这里建议，已经绑定不要这么判断。待和达哥商量确定
            if (!!username) {
                if (successCb) successCb(res)
            } else {
                if (failCb) failCb(res)
            }
            dispatch({
                type: GET_USER_INFO_SUCCEEDED, // data一样，作用一样，走get的reducer
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

// 异步的action
// export function asyncAdd () {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(add())
//     }, 2000)
//   }
// }
