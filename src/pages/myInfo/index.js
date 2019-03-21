import Taro , { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui'
import Util from '../../util/util'
import "./myInfo.sass"


const teacherSign = [
    {
        id: 1,
        title: '第一次签到',
        location: '宿舍',
        starttime: '2018-12-13 12:23:23',
        endtime: '2018-12-13 12:23:23',
    },
    {
        id: 2,
        title: '第一次签到',
        location: '宿舍',
        starttime: '2018-12-13 12:23:23',
        endtime: '2018-12-13 12:23:23',
    },
]
export default class MyInfo extends Component {

    config = {
        navigationBarTitleText: '签到信息'
    }
    state={
        current: 0,
    }
    handleClick = (value) => {
        this.setState({
            current: value
        })
    }
    handleDetail = e => {
        const sid = Util.getEventData(e, 'sid')
    }
    componentDidMount () {
    }
    render() {
        const tabList = [{ title: '我参与的' }, { title: '我发起的' }]
        return (
            <View className='container'>
                <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick}>
                    <AtTabsPane current={this.state.current} index={0}>
                        <View className='teacher_container'>
                            {
                                teacherSign.map((item, index) => {
                                    const { id, title, location, starttime, endtime } = item
                                    return (
                                        <View key={index} data-sid={id} onClick={this.handleDetail}>
                                            <Text>{title}</Text>
                                            <Text>{location}</Text>
                                            <Text>{starttime}</Text>
                                            <Text>{endtime}</Text>
                                        </View>
                                    )
                                })
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