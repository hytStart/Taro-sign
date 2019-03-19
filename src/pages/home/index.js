import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';

export default class Home extends Component {

    config = {
        navigationBarTitleText: '首页3'
    }

    state={}

    componentWillMount () {}
    componentDidMount () {
    } 
    componentWillReceiveProps (nextProps,nextContext) {} 
    componentWillUnmount () {} 
    componentDidShow () {} 
    componentDidHide () {} 
    componentDidCatchError () {} 
    componentDidNotFound () {} 
    render() {
        return (
            <View> 
                home
            </View>
        );
    }
}