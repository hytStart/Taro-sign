import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button, Image} from '@tarojs/components';
import SaoMiao from '@assets/saomiao.png'
import ShengCheng from '@assets/shengcheng.png'
import './home.sass'

export default class Home extends Component {

    config = {
        navigationBarTitleText: '首页3'
    }
    state={}
    componentDidMount () {
    }
    creatCode = () => {
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
                    <Image
                        className='icon_main'
                        src={ShengCheng}
                    />
                    <Text className='item_text'>发起签到</Text>
                </View>
                <View className='container_item' onClick={this.scanCode}>
                    <Image
                        className='icon_main'
                        src={SaoMiao}
                    />
                    <Text className='item_text'>扫码签到</Text>
                </View>
            </View>
        );
    }
}