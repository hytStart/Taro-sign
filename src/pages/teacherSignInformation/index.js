import Taro , { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

const signData = [
    {
        uid: 1,
        name: 'huangyiting',
        time: '20108-01-02 12:12:23',
    },
    {
        uid: 1,
        name: 'huangyiting',
        time: '20108-01-02 12:12:23',
    }
]

export default class TeacherSignInformation extends Component {

    config = {
        navigationBarTitleText: '签到信息'
    }
    state={
    }
   
    componentDidMount () {
    }
    render() {
        return (
            <View className='container'>
                <View className='head'></View>
                <View className='body'>
                    {
                        signData.map((item, index) => {
                            const { name, time } = item
                            return (
                                <View key={index}>
                                    <Text>{name}</Text>
                                    <Text>{time}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        );
    }
}