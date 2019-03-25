import Taro from '@tarojs/taro';

const Util =  {
    getEventData(data, tag) {
        return data.currentTarget.dataset[tag];
    },
    showToast(title, icons, time) {
        Taro.showToast({
            title: title || '出问题了',
            icon: icons || 'none',
            duration: time || 1000
        }).then(res => console.log(res))
    },
    formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    },
    formatDate(date) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        return [year, month, day].map(Util.formatNumber).join('-')
    },
    formatTime(date) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        return [hour, minute].map(Util.formatNumber).join(':')
    },
}
export default Util