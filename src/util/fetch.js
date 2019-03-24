import Taro from '@tarojs/taro'

const defaultMethod = 'POST'
const successStatus = 200
const successFlag = 1

const messageToast = title => {
    Taro.showToast({
        title,
        icon: 'none',
        duration: 1000
    })
}

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
        data: JSON.stringify(params),
    }).then(response => {
        const { statusCode, data } = response
        if (statusCode != successStatus) {
            if (showErrorToast) {
                messageToast(data || '请求接口失败')
            }
            const errMessage = data || '请求接口失败'
            return Promise.reject(errMessage)
        } else {
            const { flag, message, data: datas } = data
            if (flag == successFlag) {
                return datas
            } else {
                if (showErrorToast) {
                    messageToast(message || '流程错误')
                }
                const errMessage = message || '流程错误'
                return Promise.reject(errMessage)
            }
        }
    }).catch(errors => {
        const { errMsg } = errors
        if (showErrorToast) {
            messageToast(errMsg || '发起请求异常')
        }
        const errMessage = errMsg || '发起请求异常'
        return Promise.reject(errMessage)
    })
}