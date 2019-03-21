import Taro , { Component } from '@tarojs/taro';
import { View, Text , Image} from '@tarojs/components';
import { connect } from '@tarojs/redux'
import { AtInput, AtButton } from 'taro-ui'

import { testActions } from '@actions/userAuthorized.js'
import { GET_STUDNET_USERINFO } from '@constants/urls'
import schoolImg from '@assets/swiper1.jpg'
import './userAu.sass'

import globalData from '../../util/global.js'
import AuthorizedButton from '../../component/AuthorizedButton/index.js'

@connect(state => state, (dispatch) => ({
    testCom() {
        dispatch(testActions())
    },
}))

class UserAtuthorized extends Component {
    config = {
        navigationBarTitleText: ''
    }
    constructor() {
        super(...arguments)
        this.state = {
            authorizeButton: false, // 授权登录button state
            boundModuleState: true, // 是否需要绑定的view
            stuid: '',
            password: '',
        }
    }
    componentDidMount () {
        const { userInfo } = globalData
        if (Object.keys(userInfo).length > 0) {
            this.setState({
                authorizeButton: false,
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
        const that = this
        const params = {
            success(res) {
                if (res.code) {
                    // 发起网络请求
                    Taro.request({
                        url: GET_STUDNET_USERINFO,
                        data: {
                            code: res.code
                        },
                        method: 'POST'
                    }).then(response => {
                        const { data } = response
                        console.log(data)
                        console.log(that.props)
                        that.props.testCom()
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
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