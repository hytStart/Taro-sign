import Taro from '@tarojs/taro'

const defaultMethod = 'POST'
const successStatus = 200
const successFlag = 1

export default function fetch(options) {
    const { 
        url,
        method = defaultMethod,
        params,
        showErrorToast = true,
    } = options
    return Taro.request({
        url,
        method,
        data: params,
    }).then(response => {
        const { statusCode, data } = response
        if (statusCode != successStatus) {
            if (showErrorToast) {
                Taro.showToast({
                    title: data || '请求接口失败',
                    icon: 'none',
                    duration: 1000
                })
            }
            const errMessage = data || '请求接口失败'
            return Promise.reject(errMessage)
        } else {
            const { flag, message, data: datas } = data
            if (flag == successFlag) {
                return datas
            } else {
                if (showErrorToast) {
                    Taro.showToast({
                        title: message || '流程错误',
                        icon: 'none',
                        duration: 1000
                    })
                }
                const errMessage = message || '流程错误'
                return Promise.reject(errMessage)
            }
        }
    }).catch(errors => {
        const { errMsg } = errors
        if (showErrorToast) {
            Taro.showToast({
                title: errMsg || '发起请求异常',
                icon: 'none',
                duration: 1000
            })
        }
        const errMessage = errMsg || '发起请求异常'
        return Promise.reject(errMessage)
    })
}