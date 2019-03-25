import { combineReducers } from 'redux'
import counter from './counter'
import userAuthorized from './userAuthorized.js'
import qrCode from './qrcode.js'
import home from './home.js'
import myInfo from './myInfo.js'

export default combineReducers({
    counter,
    userAuthorized,
    qrCode,
    home,
    myInfo,
})
