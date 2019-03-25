import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Image, Picker, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import util from '@util/util'
import SwiperImg1 from '@assets/swiper1.jpg'
import SwiperImg2 from '@assets/swiper2.jpg'
import SwiperImg3 from '@assets/swiper3.jpg'

import XIALA from '@assets/xiala.png'

import { add, minus, asyncAdd } from '@actions/news.js'

import './index.sass'

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
const selector = ['全部', '时政消息', '党史知识', '学院要闻']

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


// @connect(state => (
//     state
// ), (dispatch) => ({
//     add () {
//         dispatch(add())
//     },
//     dec () {
//         dispatch(minus())
//     },
//     asyncAdd () {
//         dispatch(asyncAdd())
//     }
// }))
@connect(state => (
    state
), {
    add,
    minus,
    asyncAdd,
})
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
        // this.props.dispatchPropsFn.add()
    }

    onPickerChange = e => {
        this.setState({
            selectorChecked: e.detail.value,
        })
    }
    onScrolltoupper = () => {
        util.showToast('到顶了')
    }
    onScrollToLower = () => {
        util.showToast('我是有底线的')
    }
    gotoDetail = e => {
        const id = util.getEventData(e,'articleid')
        console.log(id)
    }
    render () {
        console.log(this.props)
        return (
            <View className='index'>
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
                                当前选择：<Text className='picker_value'>{selector[this.state.selectorChecked]}</Text>（点击选择）
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
