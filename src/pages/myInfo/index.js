import Taro , { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { dispatchGetAllSign } from '@actions/myInfo.js'
import Util from '../../util/util'
import globalData from '@util/global.js'
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
        this.state = {
            // current: props.userAuthorized.isteacher == 0 ? 1 : 0,
            current: props.userAuthorized.isteacher,
        }
    }
    handleClick = (value) => {
        this.setState({
            current: value
        })
    }
    handleDetail = e => {
        const sid = Util.getEventData(e, 'sid')
        const goParams = {
            url: `/pages/myInfo/recordDetail?sid=${sid}`,
        }
        Taro.navigateTo(goParams).then()
    }
    componentDidMount () {
        const { userAuthorized: { username } } = this.props
        const payload = {
            params: {
                username,
            },
            successCb: () => {}
        }
        this.props.dispatchGetAllSign(payload)
    }
    render() {
        const { myInfo: { teacherSignInfo } } = this.props
        const tabList = [{ title: '我发起的' }, { title: '我参与的' }]
        return (
            <View className='container'>
                <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick}>
                    <AtTabsPane current={this.state.current} index={0}>
                        <View className='teacher_container'>
                            {
                                teacherSignInfo.length > 0 ?
                                    teacherSignInfo.map((item, index) => {
                                        const { sid, username, title, location, starttime, endtime } = item
                                        return (
                                            <View key={index} data-sid={sid} onClick={this.handleDetail} className='teacher_container_item'>
                                                <Text className='item_title'>{title}</Text>
                                                {/* <Text className='item_username'>{username}</Text> */}
                                                <Text className='item_location'>{location}</Text>
                                                <View className='clearfix' />
                                                <Text className='item_starttime'>开始时间：{starttime}</Text>
                                                <Text className='item_endtime'>截止时间：{endtime}</Text>
                                            </View>
                                        )
                                    }) : <Text>暂无</Text>
                            }
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={1}>
                        <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
                    </AtTabsPane>
                </AtTabs>
            </View>
        );
    }
}