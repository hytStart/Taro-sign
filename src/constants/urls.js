export const host = 'http://localhost:8227/api'
const prodUrl = 'https://www.niushaoda.club:8080'


// export const GET_STUDNET_USERINFO_URL = `${prodUrl}/getOpenid`
// 通过code获取绑定信息
export const GET_STUDNET_USERINFO_URL = `${host}/getuserinfo`
export const BOUND_STUDNET_USERINFO_URL = `${host}/bind`

// 老师发起签到
export const CREAT_QRCODE_URL = `${host}/signIn`

