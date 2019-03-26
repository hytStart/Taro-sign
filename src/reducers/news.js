import {
    GET_NEWS_LIST_SUCCEEDED, GET_NEWS_LIST_FAILED,
    GET_NEWS_DETAIL_SUCCEEDED, GET_NEWS_DETAIL_FAILED,
} from '../constants/news'

const INITIAL_STATE = {
    newsList: [],
    newsDetail: {},
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
    default:
        return state
    }
}
