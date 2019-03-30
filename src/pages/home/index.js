import Taro , { Component } from '@tarojs/taro';
import { View, Text, Image} from '@tarojs/components';
import { connect } from '@tarojs/redux'
import SaoMiao from '@assets/saomiao.png'
import ShengCheng from '@assets/shengcheng.png'
import util from '@util/util.js'
import {
    dispatchSignRecord,
} from '@actions/home.js'
import './home.sass'


@connect(state => state, {
    dispatchSignRecord,
})
export default class Home extends Component {

    config = {
        navigationBarTitleText: '签到'
    }
    state={}
    componentDidMount () {
    }
    creatCode = () => {
        const { userAuthorized: { isteacher } } = this.props
        if (isteacher == 0) {
            util.showToast('只有老师有该权限哦')
            return
        }
        const goParams = {
            url: '/pages/qrcode/qrcode',
        }
        Taro.navigateTo(goParams).then()
    }
    scanCode = () => {
        const { userAuthorized: { isteacher } } = this.props
        if (isteacher == 1) {
            util.showToast('只有学生有该权限哦')
            return
        }
        const qrParams = {
            success: (res) => {
                const { result } = res
                const { userAuthorized: { username, name } } = this.props
                const payload = {
                    params: {
                        sid: result,
                        username,
                        name,
                        longitude: 36,
                        latitude: 85,
                    },
                    successCb: () => {
                        util.showToast('签到成功', 'success', 2000)
                    }
                }
                this.props.dispatchSignRecord(payload)
            }
        }
        Taro.scanCode(qrParams).then()
    }
    render() {
        return (
            <View className='container'>
                <View className='container_item' onClick={this.creatCode}>
                    <Image className='icon_main' src={ShengCheng} />
                    <Text className='item_text'>发起签到</Text>
                </View>
                <View className='container_item' onClick={this.scanCode}>
                    <Image className='icon_main' src={SaoMiao} />
                    <Text className='item_text'>扫码签到</Text>
                </View>
            </View>
        );
    }
}