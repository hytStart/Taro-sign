import { combineReducers } from 'redux'
import counter from './counter'
import userAuthorized from './userAuthorized.js'
import qrCode from './qrcode.js'

export default combineReducers({
    counter,
    userAuthorized,
    qrCode,
})
