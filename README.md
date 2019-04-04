# Taro-sign
思政教育签到
```
taro redux thunk taro-ui

yarn install -> npm run dev:weapp
```
继去年毕设，使用小程序原生语言开发了一个英语学习小程序[（smart英语学习》》）](https://github.com/hytStart/smart-english-study)以后，一年没有写过小程序了。最近心血来潮，准备用很火的Taro(类似于react语法，多端)开发一个课堂签到小程序，踩踩坑，感受一下。
##### 本文概要
1. 使用Taro，redux开发的学生课堂签到小程序展示
2. *Taro的基本使用
3. *作为React开发者，使用的注意事项（仅包括实践中遇到的）
4. 实际开发中的处理
5. Taro以及微信小程序开发中遇到的问题总结
6. TODO

#### 一、签到小程序
> 功能概述：基于地理位置（经纬度）的签到平台。另外包括校内新闻模块，word资料下载模块，个人信息模块等。扫码登录： 学生体验账号 123456，密码 123456。
    
  ![小程序码](https://user-gold-cdn.xitu.io/2019/4/4/169e686add307ee6?w=258&h=258&f=png&s=83526)
  [源码戳这里》》》](https://github.com/hytStart/Taro-sign)  
  
##### 1. 基于腾讯api经纬度的签到  

![](https://user-gold-cdn.xitu.io/2019/4/4/169e683cf6af662a?w=1440&h=1080&f=png&s=622214)
##### 2. 新闻部分，word资料下载


![](https://user-gold-cdn.xitu.io/2019/4/4/169e684be1145c2a?w=1440&h=1080&f=png&s=1065020)
##### 3. 个人信息模块


![](https://user-gold-cdn.xitu.io/2019/4/4/169e684ea0eab136?w=1080&h=1080&f=png&s=313092)
#### 二、Taro的基本使用

 1. `yarn global add @tarojs/cli`，使用 yarn 安装 CLI 
 2. `taro init myApp` 创建模板项目(按照一系列默认命令，即可创建redux ，mobx等生成器模板)。并且之后会默认安装依赖。  
 3. `npm un dev:weap` ，进入微信开发工具查看自己的小程序。
 4. 具体组件和api和小程序相似，可查看[Taro文档](https://nervjs.github.io/taro/docs/README.html)自行了解。
 5. 之后开发就类似于React了。注意`componentDidShow、 componentDidMount`生命周期在小程序中的不同表现。tab页`componentDidMount`只走一次。
 
 备注：Taro 默认对小程序的异步 API 进行了包装，可以像使用 Promise 那样进行调用。

```
// WX
wx.request({
    url: '', // 仅为示例，并非真实的接口地址
    data: {},
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {}
})
// Taro
Taro.request(url).then(function (res) {
    console.log(res)
})
```
 

####  三、作为React开发者，使用的注意事项（仅包括实践中遇到的）

- `sourcemap`不能用就很xxxxx

- 不能解构传值，需要`key value`传给子组件

- 不能在`render`之外写`jsx`

- `this.props`传来的函数必须`on`或者`dispatch`开头

- 父组件传来的`props`,必须定义在`static defaultProps`里，要不然获取不到

- `componentDidMount`,在微信/百度/字节跳动/支付宝小程序中这一生命周期方法对应 app 的 `onLaunch`

- `componentDidShow`在微信/百度/字节跳动/支付宝小程序中这一生命周期方法对应 `onShow`

- `componentDidHide`在微信/百度/字节跳动/支付宝小程序中这一生命周期方法对应 `onHide`

- JS 代码里必须书写单引号，特别是 JSX 中，如果出现双引号，可能会导致编译错误

- 环境变量 `process.env` 的使用,不要以解构的方式来获取通过 `env` 配置的 `process.env` 环境变量，请直接以完整书写的方式 `process.env.NODE_ENV` 来进行使用

- 使用 `this.$componentType` 来判断当前 `Taro.Component` 是页面还是组件,可能取值分别为 `PAGE` 和 `COMPONENT`

- 不支持无状态组件

- 不能在包含 JSX 元素的 `map` 循环中使用 `if` 表达式

- 不能使用 `Array#map` 之外的方法操作 JSX 数组

- 父组件要往子组件传递函数，属性名必须以 `on` 开头


以上是使用过程中遇到的问题，[更多注意事项请查阅官方文档](https://nervjs.github.io/taro/docs/best-practice.html)

#### 四、实际开发中的处理
##### 1. alias同样可以使用。
 
```
// config/index.js
alias: {
    '@actions': path.resolve(__dirname, '..', 'src/actions'),
    '@assets': path.resolve(__dirname, '..', 'src/assets'),
    '@components': path.resolve(__dirname, '..', 'src/components'),
    '@constants': path.resolve(__dirname, '..', 'src/constants'),
    '@reducers': path.resolve(__dirname, '..', 'src/reducers'),
    '@style': path.resolve(__dirname, '..', 'src/style'),
    '@util': path.resolve(__dirname, '..', 'src/util')
  },
```
##### 2. Taro.requset()的简单处理

```
// feth.js
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
            // reject出去。showToast在catch里执行。
            const errMessage = {errMsg: error || '请求接口失败'}
            return Promise.reject(errMessage)
        } else {
            // flag是不是1的判断
            const { flag, message, data: datas } = data
            if (flag == successFlag) {
                return Promise.resolve(datas)
            } else {
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
```
#### 五、Taro以及微信小程序开发中遇到的问题总结
##### 1. doc文档的下载与预览
> 小程序目前提供了wx.downloadFile的API，但目前只支持长传和下载图片，语音，视频 三种类型的文件。doc文件会下载为临时路径的 .myword文件，可供预览（安卓手机默认微信内置浏览器打开,可转发至电脑。ios tbd）。

```
Taro.showLoading()
const params = {
    url,
    fileType: "doc",
    success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
            const wxPath = res.tempFilePath
            Taro.openDocument({
                filePath: wxPath,
                fileType: "doc",
                success: function (ress) {
                    Taro.hideLoading()
                    console.log(ress)
                },
                fail: function (resfo) {
                    Taro.hideLoading()
                    util.showToast('打开文档失败')
                }
            })
        }
    },
    fail: function (resfd) {
        Taro.hideLoading()
        util.showToast('文件下载失败')
    },
}
Taro.downloadFile(params).then()
```
##### 2. 获取地理位置，经纬度，用于签到

```
wx.getLocation({
  type: 'gcj02', // wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
  success(res) {
    const { latitude, longitude } = res
  }
})
```

> ①、wx.getLocation，调用前需要 用户授权。scope.userLocation  
②、发起签到与扫码签到时，应保证`type`相同。
```
// 用户授权，app.js中配置项
permission: {
    "scope.userLocation": {
        "desc": "获取用户的签到位置"
    }
},
```

![](https://user-gold-cdn.xitu.io/2019/4/4/169e6c43a907af8e?w=1077&h=1725&f=png&s=353779)


##### 3. 不能长按识别(除小程序码外的)二维码 (tbd)
> 预览二维码图片以后，不支持识别二维码。

```
getEventData(data, tag) {
    return data.currentTarget.dataset[tag];
},
previewImage = (e) => {
    const current = getEventData(e, 'src')
    Taro.previewImage({
        current: current, // 当前显示图片的http链接   
        urls: [current] // 需要预览的图片http链接列表   
    })
}
```
![二维码](https://user-gold-cdn.xitu.io/2019/4/4/169e6e3c930ca93d?w=1080&h=1716&f=png&s=126282)

#### 六、TODO
- 发挥多端的优势，尝试其他小程序，h5等的打包发布。
- 继续跟进word文档下载，更换二维码为小程序二维码带参数（`wxacode.getUnlimited`）
- openid对于多端的影响
#### 尾语
==菜的抠脚，大佬轻喷。内容较粗糙，有问题请指正。== 
有必要夸一下，小程序的处理速度还是很快的，两个小时审核就通过了。
![](https://user-gold-cdn.xitu.io/2019/4/4/169e6f3c8fbeeedf?w=1301&h=274&f=png&s=24244)
