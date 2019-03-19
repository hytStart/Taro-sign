import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import { AtButton } from 'taro-ui'
import globalData from '../../util/global.js'

export default class Home extends Component {

   config = {
       navigationBarTitleText: '首页3'
    }

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
        const {
            userInfo,
        } = e.detail
        globalData.userInfo = userInfo
        Taro.switchTab({url: '/pages/index/index'})
    }
    render() {
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