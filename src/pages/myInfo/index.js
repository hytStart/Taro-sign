/*
 * @Description: In User Settings Edit
 * @Author: hyt
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-21 21:23:27
 * @LastEditTime: 2019-03-26 18:34:04
 * 由于小程序的限制，无法遍历 this.props.children, AtTabsPane 需要用户自行传入 current 和 index 参数。
 */
import Taro , { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtTabs, AtTabsPane, AtCard } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { dispatchGetAllSign } from '@actions/myInfo.js'
import Util from '../../util/util'
import "./myInfo.sass"


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
            type = !!isteacher ? 'teacher' : 'student'
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
    componentDidMount () {
        const { userAuthorized: { username, isteacher } } = this.props
        const payload = {
            params: {
                signType: !!isteacher ? 'teacher' : 'student',
                signValue: username,
            },
            successCb: (data) => {
                this.setState({
                    pageList: data,
                })
            }
        }
        this.props.dispatchGetAllSign(payload)
    }

    render() {
        const { pageList, current } = this.state
        return (
            <View className='container'>
                <AtTabs current={current} tabList={this.tabList} onClick={this.handleClick}>
                    {
                        [...new Array(this.tabList.length)].map((ele, indexs) => (
                            <AtTabsPane current={current} key={+indexs} index={indexs}>
                                <View className='teacher_container'>
                                    {
                                        pageList.length > 0 ?
                                            pageList.map((item, index) => {
                                                const { sid, username, title, location, starttime, endtime } = item
                                                return (
                                                    <View key={index} data-sid={sid} onClick={this.handleDetail} className='teacher_container_item'>
                                                        <AtCard
                                                            title={title}
                                                            note={username.toString()}
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