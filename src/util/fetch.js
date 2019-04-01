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
        data: params,
    }).then(response => {
        const { statusCode, data } = response
        // 不是200以外的
        if (statusCode != successStatus) {
            const { error } = data
            // 因为走了这个错误，还会继续走catch，所以写成对象，reject出去。showToast在catch里执行。
            // if (showErrorToast) {
            //     messageToast(data || '请求接口失败')
            // }
            // var error = new Error(data);
            // error.response = response;
            // throw error;
            const errMessage = {errMsg: error || '请求接口失败'}
            return Promise.reject(errMessage)
        } else {
            // flag是不是1的判断
            const { flag, message, data: datas } = data
            if (flag == successFlag) {
                return Promise.resolve(datas)
            } else {
                // if (showErrorToast) {
                //     messageToast(message || '流程错误')
                // }
                const errMessage = {errMsg: message || '流程错误'}
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