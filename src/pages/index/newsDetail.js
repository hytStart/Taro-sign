import Taro , { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtCard, AtDivider, AtIcon, AtTextarea, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'

import {
    dispatchGetNewsComments,
    dispatchAddNewsComments,
} from '@actions/news.js'
import util from '@util/util.js'

import './index.sass'

@connect(state => state, {
    dispatchGetNewsComments,
    dispatchAddNewsComments,
})
export default class NewsDetail extends Component {

    config = {
        navigationBarTitleText: '新闻'
    }
    constructor(props) {
        super(props)
        this.state = {
            comments: '',
        }
    }
    componentDidMount () {
        this.getNewsComments()
    }
    getNewsComments = () => {
        const { nid } = this.$router.params
        const payload = {
            params: {
                nid,
            },
            successCb: () => {}
        }
        this.props.dispatchGetNewsComments(payload)
    }
    toggleComments = () => {
        Taro.createSelectorQuery().select('#comments-id').boundingClientRect(function(rect){
            // 使页面滚动到响应位置
            Taro.pageScrollTo({
                scrollTop: rect.bottom
            })
        }).exec()
    }
    toggleTop = () => {
        const params = {
            scrollTop: 0,
        }
        Taro.pageScrollTo(params)
    }
    handleCommentsChange = event => {
        this.setState({
            comments: event.target.value,
        })
    }
    addComments = () => {
        const { nid } = this.$router.params
        const {
            userAuthorized: {
                username,
            }
        } = this.props
        const { comments } = this.state
        if (!comments) {
            util.showToast('内容不能为空')
            return
        }
        const payload = {
            params: {
                nid,
                username,
                content: comments,
            },
            successCb: () => {
                util.showToast('评论成功', 'success', 2000)
                this.setState({
                    comments: '',
                })
                this.getNewsComments()
            },
        }
        this.props.dispatchAddNewsComments(payload)
    }
    render() {
        const {
            news: {
                newsDetail: {
                    category,
                    content,
                    newsimg,
                    time,
                    title,
                },
                newsComments,
            }
        } = this.props
        return (
            <View className='at-article'>
                <View className='at-article__h1'>
                    {title}
                </View>
                <View className='at-article__info'>
                    {time}
                </View>
                <View className='at-article__content'>
                    <View className='at-article__section'>
                        <View className='at-article__h3'>{category}</View>
                        {!!content && content.split('\r\n').map((item, index) => (
                            <View className='at-article__p' key={index}>
                                {item}
                            </View>
                        ))}
                        {
                            !!newsimg && 
                                <Image 
                                    className='at-article__img' 
                                    src={newsimg}
                                    mode='widthFix'
                                />
                        }
                    </View>
                </View>

                <AtDivider content='评论' />
                {
                    newsComments.length > 0 ? newsComments.map((item, index) => {
                        const {
                            username, content: commentContent, time: commentTime,
                        } = item
                        return (
                            <View key={index} style='margin-bottom: 10rpx;'>
                                <AtCard
                                    title={username}
                                    note={commentTime}
                                >
                                    {commentContent}
                                </AtCard>
                            </View>
                        )
                    }) : '暂无'
                }


                <AtDivider content='添加评论' />
                <View className='comment-modal' id='comments-id'>
                    <AtTextarea
                        value={this.state.comments}
                        onChange={this.handleCommentsChange}
                        maxLength={200}
                        placeholder='请输入评论'
                        height={300}
                    />
                    <View style={{ marginTop: '10rpx', paddingBottom: '10rpx' }} onClick={this.addComments}>
                        <AtButton type='primary'>添加评论</AtButton>
                    </View>
                </View>

                <View className='comment-add'>
                    <AtIcon value='arrow-up' size='60' color='#618FE7' onClick={this.toggleTop}></AtIcon>
                    <AtIcon value='add-circle' size='60' color='#618FE7' onClick={this.toggleComments}></AtIcon>
                </View>
            </View>
        );
    }
}