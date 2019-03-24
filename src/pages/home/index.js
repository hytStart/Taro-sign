import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button, Image} from '@tarojs/components';
import { connect } from '@tarojs/redux'
import SaoMiao from '@assets/saomiao.png'
import ShengCheng from '@assets/shengcheng.png'
import util from '@util/util.js'
import './home.sass'


@connect(state => state, {
})
export default class Home extends Component {

    config = {
        navigationBarTitleText: '签到'
    }
    state={}
    componentDidMount () {
        console.log(this.props)
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
        const qrParams = {
            success(res) {
                const { result } = res
                const signParams = {
                    sid: result,
                    uid: 1111,
                    time: new Date(),
                }
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