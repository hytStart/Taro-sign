/*
 * @Description: In User Settings Edit
 * @Author: hyt
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-21 21:23:27
 * @LastEditTime: 2019-04-04 15:22:54
 * 由于小程序的限制，无法遍历 this.props.children, AtTabsPane 需要用户自行传入 current 和 index 参数。
 */
import Taro , { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtTabs, AtTabsPane, AtCard } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { dispatchGetAllSign } from '@actions/myInfo.js'
import Util from '../../util/util'
import "./myInfo.sass"
import globalData from '@util/global.js'


@connect(state => state, {
    dispatchGetAllSign,
})
export default class MyInfo extends Component {

    config = {
        navigationBarTitleText: '签到信息'
    }
    constructor(props) {
        super(props)
        this.tabList = +props.userAuthorized.isteacher ?
            [{ title: '我发起的' }, { title: '全部签到' }] : [{ title: '我参与的' }, { title: '全部签到' }]
        this.state = {
            current: 0,
            pageList: [], //不管是哪个tab，都用pageList这个map
        }
    }
    handleClick = current => {
        this.setState({
            current,
        })
        const { userAuthorized: { username, isteacher } } = this.props
        let type = ''
        let value = ''
        if (+current === 1) {
            // 获取全部签到列表,不区分老师，学生
            type = 'all'
        } else {
            // 区分老师（发起的签到），学生（参加的签到）
            type = +isteacher ? 'teacher' : 'student'
            value = username
        }
        const payload = {
            params: {
                signType: type,
                signValue: value,
            },
            successCb: (data) => {
                this.setState({
                    pageList: data,
                })
            }
        }
        this.props.dispatchGetAllSign(payload)
    }
    handleDetail = e => {
        const sid = Util.getEventData(e, 'sid')
        const goParams = {
            url: `/pages/myInfo/recordDetail?sid=${sid}`,
        }
        Taro.navigateTo(goParams).then()
    }
    componentDidShow () {
        const { userAuthorized: { username, isteacher } } = this.props
        const { current } = this.state
        // fix当tab在1时，切换到别的页面，再回到myinfo。显示的是1，实际请求0
        let payload = {}
        if (+current === 0) {
            payload = {
                params: {
                    signType: +isteacher ? 'teacher' : 'student',
                    signValue: username,
                },
                successCb: (data) => {
                    this.setState({
                        pageList: data,
                    })
                }
            }
        } else {
            payload = {
                params: {
                    signType: 'all',
                    signValue: '',
                },
                successCb: (data) => {
                    this.setState({
                        pageList: data,
                    })
                }
            }
        }
        this.props.dispatchGetAllSign(payload)
    }

    render() {
        const { pageList, current } = this.state
        const { userInfo } = globalData
        return (
            <View className='container'>
                {/* <View class='userinfo'>
                    <Image class='userinfo-avatar' src={userInfo.avatarUrl} background-size='over'></Image>
                    <Text class='userinfo-nickname'>{userInfo.nickName}</Text>
                </View> */}
                <AtTabs current={current} tabList={this.tabList} onClick={this.handleClick}>
                    {
                        [...new Array(this.tabList.length)].map((ele, indexs) => (
                            <AtTabsPane current={current} key={+indexs} index={indexs}>
                                <View className='teacher_container'>
                                    {
                                        pageList.length > 0 ?
                                            pageList.map((item, index) => {
                                                const { sid, username, title, location, starttime, endtime, name } = item
                                                return (
                                                    <View key={index} data-sid={sid} onClick={this.handleDetail} className='teacher_container_item'>
                                                        <AtCard
                                                            title={title}
                                                            note={!!name && name.toString()}
                                                            extra={location}
                                                        >
                                                            <View>开始时间：{starttime}</View>
                                                            <View>截止时间：{endtime}</View>
                                                        </AtCard>
                                                    </View>
                                                )
                                            }) : <Text>暂无</Text>
                                    }
                                </View>
                            </AtTabsPane>
                        ))
                    }
                </AtTabs>
            </View>
        );
    }
}