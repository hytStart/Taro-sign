import { combineReducers } from 'redux'
import news from './news'
import userAuthorized from './userAuthorized.js'
import qrCode from './qrcode.js'
import home from './home.js'
import myInfo from './myInfo.js'

export default combineReducers({
    news,
    userAuthorized,
    qrCode,
    home,
    myInfo,
})
