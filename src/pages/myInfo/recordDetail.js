import Taro , { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtList, AtListItem, AtCard, AtDivider } from 'taro-ui'
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
        const { myInfo: { signRecordInfo: { sign: {
            name,
            title,
            location,
            starttime,
            endtime,
            qrcode,
        }, list } } } = this.props
        return (
            <View className='teacher_container'>
                <AtCard
                    title={!!title ? title.toString() : ''}
                    note={!!name ? name.toString() : ''}
                    extra={!!location ? location : ''}
                >
                    <View>开始时间：{starttime}</View>
                    <View>截止时间：{endtime}</View>
                    <Image className='sign_qrcode' src={qrcode}></Image>
                </AtCard>
                <AtDivider content={`签到人员(${list.length}个)`} fontColor='#2d8cf0' lineColor='#2d8cf0' />
                <AtList>
                    {
                        list.length > 0 ?
                            list.map((item, index) => {
                                const { sid, username, name, time } = item
                                return (
                                    <View key={index} className='teacher_container_detail'>
                                        <AtListItem
                                            title={name.toString()}
                                            note={`签到时间：${time}`}
                                            extraText={username.toString()}
                                        />
                                    </View>
                                )
                            })
                            :
                            <Text>暂无</Text>
                    }
                </AtList>
            </View>
        );
    }
}