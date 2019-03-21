import Taro, { Component, hideToast } from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Image, Picker, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import globalData from '../../util/global.js'
import { add, minus, asyncAdd } from '../../actions/counter'

import './index.sass'

import SwiperImg1 from '@assets/swiper1.jpg'
import SwiperImg2 from '@assets/swiper2.jpg'
import SwiperImg3 from '@assets/swiper3.jpg'

import XIALA from '@assets/xiala.png'

const getEventData = (data, tag) => {
    return data.currentTarget.dataset[tag];
}
const swiperData = [
    {
        url: SwiperImg1,
        name: '1',
    },
    {
        url: SwiperImg2,
        name: '2',
    },
    {
        url: SwiperImg3,
        name: '3',
    },
]
const selector = ['全部', '美国', '中国', '巴西', '日本']

const ListData = [
    {
        id: '1',
        title: '标题1',
        time: '2018-01-02',
    },
    {
        id: '2',
        title: '标题2',
        time: '2018-01-02',
    },
    {
        id: '3',
        title: '标题3',
        time: '2018-01-02',
    },
    {
        id: '4',
        title: '标题4',
        time: '2018-01-02',
    },
]


@connect(({ counter }) => ({
    counter
}), (dispatch) => ({
    add () {
        dispatch(add())
    },
    dec () {
        dispatch(minus())
    },
    asyncAdd () {
        dispatch(asyncAdd())
    }
}))
class Index extends Component {

    config = {
        navigationBarTitleText: '北邮时政'
    }
    state = {
        selectorChecked: 0,
    }

    componentWillReceiveProps (nextProps) {
        // console.log(this.props, nextProps)
    }
    componentDidMount() {
    }

    onPickerChange = e => {
        this.setState({
            selectorChecked: e.detail.value,
        })
    }
    onScrolltoupper = () => {
        Taro.showToast({
            title: '到顶了',
            icon: 'none',
            duration: 1000
        })
    }
    onScrollToLower = () => {
        Taro.showToast({
            title: '我是有底线的',
            icon: 'none',
            duration: 1000
        })
    }
    gotoDetail = e => {
        const id = getEventData(e,'articleid')
        console.log(id)
    }
    render () {
        return (
            <View className='index'>
                {/* <Button className='add_btn' onClick={this.props.add}>+</Button>
                <Button className='dec_btn' onClick={this.props.dec}>-</Button>
                <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
                <View><Text>{this.props.counter.num}</Text></View>
                <View><Text className='test'>Hello, World</Text></View> */}
                <Swiper
                    className='test-h'
                    indicatorColor='#999'
                    indicatorActiveColor='#333'
                    vertical={false}
                    circular
                    indicatorDots
                    autoplay
                    style={{ height: '400rpx' }}
                >
                    {
                        swiperData.map((item, index) => (
                            <SwiperItem key={index}>
                                <Image className='swiper-img' src={item.url} />
                            </SwiperItem>
                        ))
                    }
                </Swiper>
                {/* 查询框 */}
                <View className='page-section'>
                    <Text>主题查询</Text>
                    <View className='select_container'>
                        <Picker mode='selector' range={selector} onChange={this.onPickerChange} className='picker_self'>
                            <View className='picker' style={{ width: '100%', height: '100rpx' }}>
                                当前选择：{selector[this.state.selectorChecked]}
                                <Image className='picker_icon' src={XIALA} />
                            </View>
                        </Picker>
                    </View>
                </View>
                {/* 内容 */}
                <ScrollView
                    className='scrollview'
                    scrollY
                    scrollWithAnimation
                    scrollTop='0'
                    style='height: 450rpx;'
                    lowerThreshold='20'
                    upperThreshold='20'
                    onScrolltoupper={this.onScrolltoupper}
                    onScrollToLower={this.onScrollToLower}
                    // onScroll={this.onScroll}
                >
                    {
                        ListData.map((item, index) => {
                            const {
                                id,
                                title,
                                time,
                            } = item
                            return (
                                <View key={index} style='height:150px' data-articleid={item.id} onClick={this.gotoDetail}>
                                    <Text>标题：{title}</Text>
                                    <Text>时间：{time}</Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}

export default Index
