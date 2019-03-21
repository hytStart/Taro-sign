import { combineReducers } from 'redux'
import counter from './counter'
import userAuthorized from './userAuthorized.js'

export default combineReducers({
    counter,
    userAuthorized,
})
