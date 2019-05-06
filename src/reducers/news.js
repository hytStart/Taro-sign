import {
    GET_NEWS_LIST_SUCCEEDED, GET_NEWS_LIST_FAILED,
    GET_NEWS_DETAIL_SUCCEEDED, GET_NEWS_DETAIL_FAILED,
    GET_NEWS_COMMENTS_SUCCEEDED,
    GET_NEWS_COMMENTS_FAILED,
    ADD_NEWS_COMMENTS_SUCCEEDED,
    ADD_NEWS_COMMENTS_FAILED,
} from '../constants/news'

const INITIAL_STATE = {
    newsList: [],
    newsDetail: {},
    newsComments: [],
}

export default function news (state = INITIAL_STATE, action) {
    switch (action.type) {
    case GET_NEWS_LIST_SUCCEEDED:
        const {
            payload: {
                params,
            }
        } = action
        return {
            ...state,
            newsList: params,
        }
    case GET_NEWS_LIST_FAILED:
        const {
            err,
        } = action
        return {
            ...state,
        }
    case GET_NEWS_DETAIL_SUCCEEDED:
        const {
            payload: {
                params: newsDetail,
            }
        } = action
        return {
            ...state,
            newsDetail,
        }
    case GET_NEWS_DETAIL_FAILED:
        return {
            ...state,
        }
    case GET_NEWS_COMMENTS_SUCCEEDED:
        const {
            payload: {
                params: newsComments,
            }
        } = action
        return {
            ...state,
            newsComments,
        }
    case GET_NEWS_COMMENTS_FAILED:
        return {
            ...state,
        }
    case ADD_NEWS_COMMENTS_SUCCEEDED:
        return {
            ...state,
        }
    case ADD_NEWS_COMMENTS_FAILED:
        return {
            ...state,
        }
    default:
        return state
    }
}
