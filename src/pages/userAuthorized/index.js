import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import globalData from '../../util/global.js'
import AuthorizedButton from '../../component/AuthorizedButton/index.js'

export default class UserAtuthorized extends Component {
    config = {
        navigationBarTitleText: ''
    }
    constructor() {
        super(...arguments)
        this.state = {
            authorizeButton: false,
        }
    }
    componentDidMount () {
        const { userInfo } = globalData
        if (Object.keys(userInfo).length > 0) {
            this.setState({
                authorizeButton: false,
            })
        } else {
            this.setState({
                authorizeButton: true,
            })
        }
    }
    closeAuthorizeButton = () => {
        this.setState({
            authorizeButton: false,
        })
    }
    render() {
        const { authorizeButton } = this.state
        return (
            <View>
                {
                    authorizeButton ?
                        <AuthorizedButton
                            closeAuthorizeButton={this.closeAuthorizeButton}
                            value={1}
                        /> : null
                }
            </View>
        );
    }
}