import Taro , { Component } from '@tarojs/taro';
import { View, Text , Image, Picker } from '@tarojs/components';
import { AtInput, AtButton }  from 'taro-ui'
import { connect } from '@tarojs/redux'
import util from '@util/util.js'
import {
    dispatchCreactQr,
} from '@actions/qrcode.js'
import './qrcode.sass'

@connect(state => state, {
    dispatchCreactQr,
})
export default class Qrcode extends Component {

    config = {
        navigationBarTitleText: '发起签到'
    }
    state={
        title: '',
        location: '',
        dateSel: util.formatDate(new Date()),
        timeSel: util.formatTime(new Date()),
    }
    componentDidMount () {
    }
    onTitleChange = title => {
        this.setState({
            title,
        })
    }
    onLocationChange = location => {
        this.setState({
            location,
        })
    }
    onDateChange = e => {
        this.setState({
            dateSel: e.detail.value,
        })
    }
    onTimeChange = e => {
        this.setState({
            timeSel: e.detail.value,
        })
    }
    onCreactQr = () => {
        const { 
            title,
            location,
            dateSel,
            timeSel,
        } = this.state
        const payload = {
            params: {
                title,
                location,
                dateSel,
                timeSel,
            },
            successCb: () => {},
            failCb: () => {},
        }
        this.props.dispatchCreactQr(payload)
    }
    render() {
        const { title, location, dateSel, timeSel } = this.state
        return (
            <View className='container'>
                <View>
                    <AtInput
                        name='value'
                        title='签到主题'
                        type='text'
                        placeholder='签到主题'
                        value={title}
                        onChange={this.onTitleChange}
                    />
                    <AtInput
                        name='value'
                        title='签到地点'
                        type='text'
                        placeholder='签到地点'
                        value={location}
                        onChange={this.onLocationChange}
                    />
                    <View className='page-section'>
                        <Text className='picker_text'>截止时间</Text>
                        <View className='picker_item'>
                            <Picker mode='date' onChange={this.onDateChange} value={dateSel}>
                                <View className='picker'>
                                当前选择：{dateSel}(点击选择时间)
                                </View>
                            </Picker>
                        </View>
                        <View className='picker_item'>
                            <Picker mode='time' onChange={this.onTimeChange} value={timeSel}>
                                <View className='picker'>
                                当前选择：{timeSel}(点击选择时间)
                                </View>
                            </Picker>
                        </View>
                    </View>
                    <AtButton onClick={this.onCreactQr} className='picker_btn' type='primary'>生成签到码</AtButton>
                </View>
                <View className='qr_container'>
                    <Image src='https://www.niushaoda.club/qrcode/30.jpg'></Image>
                    <Text>签到主题</Text>
                </View>
            </View>
        );
    }
}