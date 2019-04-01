import Taro , { Component } from '@tarojs/taro';
import { View, Text , Image, Picker } from '@tarojs/components';
import { AtInput, AtButton }  from 'taro-ui'
import { connect } from '@tarojs/redux'
import util from '@util/util.js'
import {
    dispatchCreactQr,
} from '@actions/qrcode.js'
import './qrcode.sass'

import QQMapWX from './qqmap-wx-jssdk.min.js'

@connect(state => state, {
    dispatchCreactQr,
})
export default class Qrcode extends Component {

    config = {
        navigationBarTitleText: '发起签到'
    }
    constructor() {
        super()
        this.qqmapsdk = new QQMapWX({
            key: '2LMBZ-NXFKU-BV6VX-45UBC-GMB7O-6GBTN'
        })
        this.state={
            title: '',
            location: '',
            dateSel: util.formatDate(new Date()),
            timeSel: util.formatTime(new Date()),
            qrSrc: '',
            qrState: false,
        }
    }
    componentDidMount () {
    }
    moveToLocation =  () => {
        const that = this
        Taro.chooseLocation({
            success: function (res) {
                const {
                    name,
                    latitude,
                    longitude,
                } = res
                that.setState({
                    location: name,
                    latitude,
                    longitude,
                })
            },
            fail: function (err) {
                console.log(err)
            }
        })
    }
    onTitleChange = title => {
        this.setState({
            title,
        })
    }
    onLocationChange = location => {
        // this.setState({
        //     location,
        // })
        this.moveToLocation()
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
            userAuthorized: {
                username,
            },
        } = this.props
        const {
            title,
            location,
            dateSel,
            timeSel,
            longitude,
            latitude,
        } = this.state
        const payload = {
            params: {
                username,
                title,
                location,
                endtime: `${dateSel} ${timeSel}`,
                longitude,
                latitude,
            },
            successCb: (res) => {
                const { qrcode } = res
                this.setState({
                    qrSrc: qrcode,
                    qrState: true,
                })
            },
            failCb: () => {},
        }
        this.props.dispatchCreactQr(payload)
    }
    onReturn = () => {
        const { qrState } = this.state
        this.setState({
            qrState: !qrState,
        })
    }
    onGohome = () => {
        Taro.switchTab({url: '/pages/home/index'})
    }
    render() {
        const { title, location, dateSel, timeSel, qrSrc, qrState } = this.state
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
                    {/* <AtInput
                        name='value'
                        title='签到地点'
                        type='text'
                        placeholder='签到地点'
                        value={location}
                        onChange={this.onLocationChange}
                    /> */}
                    <View style={{ display: 'flex', alignItems: 'center', paddingLeft: '20rpx' }}>
                        <AtButton size='small' onClick={this.onLocationChange} className='picker_btn' type='primary'>选择地点</AtButton>
                        <Text>{!!location ? `(${location})` : null}</Text>
                    </View>
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
                    {
                        qrSrc ?
                            <AtButton onClick={this.onReturn} className='picker_btn' type='primary'>查看签到码</AtButton> : null
                    }
                </View>
                {
                    qrState ?
                        <View className='qr_container'>
                            <Image className='qr_img' src={qrSrc}></Image>
                            <Text>{title}</Text>
                            <AtButton onClick={this.onReturn} className='picker_btn' type='primary'>返回重新生成签到码</AtButton>
                            <AtButton onClick={this.onGohome} className='picker_btn' type='primary'>返回首页</AtButton>
                        </View> : null
                }
            </View>
        );
    }
}