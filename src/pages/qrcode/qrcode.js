import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button, Image, Picker } from '@tarojs/components';
import { AtInput, AtButton }  from 'taro-ui'
import qrcode from '@assets/qrcode.png'
import './qrcode.sass'

export default class Qrcode extends Component {

    config = {
        navigationBarTitleText: '发起签到信息'
    }
    state={
        timeSel: '12:01',
        dateSel: '2018-04-22',
    }
    componentDidMount () {
    }
    render() {
        return (
            <View className='container'>
                <View>
                    <AtInput
                        name='value'
                        title='签到主题'
                        type='text'
                        placeholder='签到主题'
                        // value={this.state.value}
                        // onChange={this.handleChange.bind(this)}
                    />
                    <AtInput
                        name='value'
                        title='签到地点'
                        type='text'
                        placeholder='签到地点'
                        // value={this.state.value}
                        // onChange={this.handleChange.bind(this)}
                    />
                    <View className='page-section'>
                        <Text className='picker_text'>截止时间</Text>
                        <View className='picker_item'>
                            <Picker mode='date' onChange={this.onDateChange}>
                                <View className='picker'>
                                当前选择：{this.state.dateSel}(点击选择时间)
                                </View>
                            </Picker>
                        </View>
                        <View className='picker_item'>
                            <Picker mode='time' onChange={this.onTimeChange}>
                                <View className='picker'>
                                当前选择：{this.state.timeSel}(点击选择时间)
                                </View>
                            </Picker>
                        </View>
                    </View>
                    <AtButton className='picker_btn' type='primary'>生成签到码</AtButton>
                </View>
                <View className='qr_container'>
                    <Image src={qrcode}></Image>
                    <Text>签到主题</Text>
                </View>
            </View>
        );
    }
}