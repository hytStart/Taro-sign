import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import { AtButton } from 'taro-ui'
import globalData from '../../util/global.js'

export default class AuthorizedButton extends Component {
    state={}
    componentWillMount () {}
    componentDidMount () {
    } 
    componentWillReceiveProps (nextProps,nextContext) {} 
    componentWillUnmount () {} 
    componentDidShow () {} 
    componentDidHide () {} 
    componentDidCatchError () {} 
    componentDidNotFound () {} 
    onGetUserInfo = e => {
        console.log(this.props)
        const { closeAuthorizeButton } = this.props
        const {
            userInfo,
        } = e.detail
        globalData.userInfo = userInfo
        closeAuthorizeButton()
        // Taro.switchTab({url: '/pages/index/index'})
    }
    render() {
        console.log(this.props)
        return (
            <View>
                <AtButton
                    type='primary'
                    circle
                    openType='getUserInfo'
                    onGetUserInfo={this.onGetUserInfo}
                >
                    授权登录
                </AtButton>
            </View>
        );
    }
}