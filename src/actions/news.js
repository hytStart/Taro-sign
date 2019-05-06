import {
    GET_NEWS_LIST_SUCCEEDED,
    GET_NEWS_LIST_FAILED,
    GET_NEWS_DETAIL_SUCCEEDED,
    GET_NEWS_DETAIL_FAILED,
    GET_NEWS_COMMENTS_SUCCEEDED,
    GET_NEWS_COMMENTS_FAILED,
    ADD_NEWS_COMMENTS_SUCCEEDED,
    ADD_NEWS_COMMENTS_FAILED,
} from '@constants/news'

import {
    GET_NEWS_LIST_URL,
    GET_NEWS_COMMENTS_URL,
    ADD_NEWS_COMMENTS_URL,
} from '@constants/urls'

import fetch from '@util/fetch'


export const dispatchGetNewsList = (payload = {}) => {
    const { params, successCb = () => {} } = payload
    return dispatch => {
        fetch({
            url: GET_NEWS_LIST_URL,
            params,
        }).then(res => {
            if (successCb) successCb(res)
            dispatch({
                type: GET_NEWS_LIST_SUCCEEDED,
                payload: {
                    params: res,
                }
            })
        }).catch(err => {
            dispatch({
                type: GET_NEWS_LIST_FAILED,
                err,
            })
        })
    }
}

export const dispatchGetNewsDetail = (payload = {}) => {
    const { params, successCb = () => {} } = payload
    return dispatch => {
        fetch({
            url: GET_NEWS_LIST_URL,
            params,
        }).then(res => {
            if (successCb) successCb(res)
            dispatch({
                type: GET_NEWS_DETAIL_SUCCEEDED,
                payload: {
                    params: res,
                }
            })
        }).catch(err => {
            dispatch({
                type: GET_NEWS_DETAIL_FAILED,
                err,
            })
        })
    }
}

export const dispatchGetNewsComments = (payload = {}) => {
    const { params, successCb = () => {} } = payload
    return dispatch => {
        fetch({
            url: GET_NEWS_COMMENTS_URL,
            params,
        }).then(res => {
            if (successCb) successCb(res)
            dispatch({
                type: GET_NEWS_COMMENTS_SUCCEEDED,
                payload: {
                    params: res,
                }
            })
        }).catch(err => {
            dispatch({
                type: GET_NEWS_COMMENTS_FAILED,
                err,
            })
        })
    }
}

export const dispatchAddNewsComments = (payload = {}) => {
    const { params, successCb = () => {} } = payload
    return dispatch => {
        fetch({
            url: ADD_NEWS_COMMENTS_URL,
            params,
        }).then(res => {
            if (successCb) successCb(res)
            dispatch({
                type: ADD_NEWS_COMMENTS_SUCCEEDED,
                payload: {
                    params: res,
                }
            })
        }).catch(err => {
            dispatch({
                type: ADD_NEWS_COMMENTS_FAILED,
                err,
            })
        })
    }
}