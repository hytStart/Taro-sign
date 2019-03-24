import Taro , { Component } from '@tarojs/taro';
import { View, Image} from '@tarojs/components';
import { connect } from '@tarojs/redux'
import { AtInput, AtButton } from 'taro-ui'

import {
    testActions,
    dispatchGetUserInfoActions,
    dispatchBoundUser,
} from '@actions/userAuthorized.js'
import schoolImg from '@assets/swiper1.jpg'
import './userAu.sass'

import globalData from '../../util/global.js'
import AuthorizedButton from '../../component/AuthorizedButton/index.js'

const showTost = title => {
    Taro.showToast({
        title: title || '出问题了',
        icon: 'none',
        duration: 1000
    }).then(res => console.log(res))
}

// @connect(state => state, (dispatch) => ({
//     testCom() {
//         dispatch(testActions())
//     },
//     // dispatchGetUserInfoFn(payload) {
//     //     dispatch(getUserInfoActions(payload))
//     // },
//     dispatchGetUserInfoActions,
// }))
@connect(state => state.userAuthorized, {
    dispatchGetUserInfoActions,
    dispatchBoundUser,
})

class UserAtuthorized extends Component {
    config = {
        navigationBarTitleText: ''
    }
    constructor() {
        super(...arguments)
        this.state = {
            authorizeButton: false, // 授权登录button state
            boundModuleState: false, // 是否需要绑定的view
            stuid: '',
            password: '',
        }
    }
    componentDidMount () {
        const { userInfo } = globalData
        if (Object.keys(userInfo).length > 0) {
            this.setState({
                authorizeButton: false,
            },
            () => {
                this.isBoundStudentId()
            })
        } else {
            this.setState({
                authorizeButton: true,
            })
        }
    }
    closeAuthorizeButton = () => {
        this.setState({
            authorizeButton: false,
        },
        () => {
            this.isBoundStudentId()
        })
    }
    isBoundStudentId = () => {
        const params = {
            success: (res) => {
                if (res.code) {
                    const { code } = res
                    const payload = {
                        params: {
                            code,
                        },
                        successCb: data => {
                            const { username } = data
                            if (!!username) {
                                Taro.switchTab({ url: '/pages/home/index' }).then()
                            } else {
                                this.setState({
                                    boundModuleState: true,
                                })
                            }
                        }
                    }
                    this.props.dispatchGetUserInfoActions(payload)
                } else {
                    Taro.showToast({
                        title: '登录失败！' + res.errMsg || '似乎有些小问题',
                        icon: 'none',
                        duration: 1000
                    })
                }
            }
        }
        Taro.login(params).then()
    }
    handleStuidChange = stuid => {
        this.setState({
            stuid,
        })
    }
    handlePasswordChange = password =>{
        this.setState({
            password,
        })
    }
    handleBind = () => {
        const { stuid, password } = this.state
        const { openid } = this.props
        if (!stuid || !password) {
            showTost('学号或者密码不可为空')
            return
        }
        const payload = {
            params: {
                username: stuid,
                password,
                isteacher: 0, // 不知道是不是老师，暂定传0
                openid,
            },
            successCb: () => {
                showTost('绑定成功')
                Taro.switchTab({url: '/pages/home/index'})
            },
            failCb: () => {
                showTost('用户已经绑定')
                Taro.switchTab({url: '/pages/home/index'})
            },
        }
        this.props.dispatchBoundUser(payload)
    }
    render() {
        const { authorizeButton, boundModuleState } = this.state
        return (
            <View>
                {
                    authorizeButton ?
                        <AuthorizedButton onCloseAuthorizeFn={this.closeAuthorizeButton} value={1} /> : null
                }
                {
                    boundModuleState ?
                        <View>
                            <Image className='bind_img' src={schoolImg} />
                            <AtInput
                                name='stuid'
                                title='学号'
                                type='idcard'
                                placeholder='请输入学号'
                                value={this.state.stuid}
                                onChange={this.handleStuidChange}
                            />
                            <AtInput
                                name='password'
                                title='密码'
                                type='password'
                                placeholder='密码为身份证后六位'
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                            <AtButton onClick={this.handleBind} className='bind_btn' type='primary'>绑定</AtButton>
                        </View> : null
                }
            </View>
        );
    }
}

export default UserAtuthorized