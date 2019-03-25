import Taro , { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import Util from '@util/util'
import {
    dispatchGetSignDetail,
} from '@actions/myInfo.js'
import "./myInfo.sass"

@connect(state => state, {
    dispatchGetSignDetail,
})
export default class recordDetail extends Component {

    config = {
        navigationBarTitleText: '签到信息'
    }
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
        const { sid } = this.$router.params
        const payload = {
            params: {
                sid,
            },
            successCb: () => {}
        }
        this.props.dispatchGetSignDetail(payload)
    }
    render() {
        const { myInfo: { signRecordDetail } } = this.props
        return (
            <View className='teacher_container'>
                {
                    signRecordDetail.length > 0 ?
                        signRecordDetail.map((item, index) => {
                            const { sid, username, name, time } = item
                            return (
                                <View key={index} data-sid={sid} onClick={this.handleDetail} className='teacher_container_detail'>
                                    <Text className='item_title'>{name}</Text>
                                    <Text className='item_location'>{username}</Text>
                                    <View className='clearfix' />
                                    <Text className='item_starttime'>签到时间：{time}</Text>
                                </View>
                            )
                        })
                        :
                        <Text>暂无</Text>
                }
            </View>
        );
    }
}