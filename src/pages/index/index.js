import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image, ScrollView } from '@tarojs/components'
import { AtSearchBar, AtCard  } from 'taro-ui'
import { connect } from '@tarojs/redux'

import util from '@util/util'
import SwiperImg1 from '@assets/swiper1.jpg'
import SwiperImg2 from '@assets/swiper2.jpg'
import SwiperImg3 from '@assets/swiper3.jpg'

import {
    dispatchGetNewsList,
    dispatchGetNewsDetail,
} from '@actions/news.js'

import './index.sass'

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
const selector = ['时政消息', '党史知识', '学院要闻']

let time = null

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
    dispatchGetNewsList,
    dispatchGetNewsDetail,
})
class Index extends Component {

    config = {
        navigationBarTitleText: '北邮时政'
    }
    state = {
        searchValue: '',
        categoryState: false,
    }

    componentWillReceiveProps (nextProps) {
        // console.log(this.props, nextProps)
    }
    componentDidMount() {
        const payload = {
            params: {
                newsType: 'all',
                newsValue: '',
            },
            successCb: () => {}
        }
        this.props.dispatchGetNewsList(payload)
    }
    onChange = searchValue => {
        this.setState({
            searchValue,
        })
    }
    onFocus = () => {
        clearTimeout(time)
        this.setState({
            categoryState: true,
        }, () => {
            time = setTimeout(() => {
                this.setState({
                    categoryState: false,
                })
            }, 4000)
        })
    }
    categoryClick = e => {
        const categoryValue = util.getEventData(e, 'categoryvalue')
        const payload = {
            params: {
                newsType: 'category',
                newsValue: categoryValue,
            },
            successCb: () => {
                this.setState({
                    categoryState: false,
                    searchValue: categoryValue,
                })
            }
        }
        this.props.dispatchGetNewsList(payload)
    }
    onActionClick = () => {
        const { searchValue } = this.state
        let type = 'keyword'
        if (!searchValue) type = 'all'
        const payload = {
            params: {
                newsType: type,
                newsValue: searchValue,
            },
            successCb: () => {
                this.setState({
                    categoryState: false,
                })
            }
        }
        this.props.dispatchGetNewsList(payload)
    }

    onScrolltoupper = () => {
        util.showToast('到顶了')
    }
    onScrollToLower = () => {
        util.showToast('我是有底线的')
    }
    gotoDetail = e => {
        const nid = util.getEventData(e,'articleid')
        const payload = {
            params: {
                newsType: 'nid',
                newsValue: nid,
            },
            successCb: () => {
                Taro.navigateTo({url: `/pages/index/newsDetail?nid=${nid}`})
            }
        }
        this.props.dispatchGetNewsDetail(payload)
    }
    render () {
        const { searchValue, categoryState } = this.state
        const { news: { newsList } } = this.props
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
                    <AtSearchBar
                        showActionButton
                        value={searchValue}
                        onChange={this.onChange}
                        onFocus={this.onFocus}
                        onActionClick={this.onActionClick}
                    />
                    {
                        categoryState ? 
                            <View className='category-container'>
                                {
                                    selector.map((item, index) => (
                                        <View className='category-item' key={index} data-categoryvalue={item} onClick={this.categoryClick}>
                                            {item}
                                        </View>
                                    ))
                                }
                            </View> : null
                    }
                </View>
                {/* 内容 */}
                <ScrollView
                    className='scrollview'
                    scrollY
                    scrollWithAnimation
                    scrollTop='0'
                    style='height:calc(100vh - 484rpx)'
                    lowerThreshold='20'
                    upperThreshold='20'
                    onScrolltoupper={this.onScrolltoupper}
                    onScrollToLower={this.onScrollToLower}
                    // onScroll={this.onScroll}
                >
                    {
                        newsList.map((item, index) => {
                            const {
                                nid,
                                time,
                                title,
                                newsimg,
                                content,
                                category,
                            } = item
                            return (
                                <View key={index} style='margin-bottom: 10rpx;' data-articleid={nid} onClick={this.gotoDetail}>
                                    <AtCard
                                        thumb={newsimg}
                                        title={title}
                                        note={time}
                                        extra={category}
                                    >
                                        {content && content.slice(0, 26)}
                                    </AtCard>
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
