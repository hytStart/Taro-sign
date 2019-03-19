import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import { AtSearchBar } from 'taro-ui'

 class SearchBar extends Component {

   config = {
       navigationBarTitleText: ''
    }
    constructor () {
        super(...arguments)
        this.state = {
            value: ''
        }
    }
    onChange = (value) => {
        this.setState({
            value: value
        })
    }
    onActionClick = () => {
        console.log(1111)
    }

    state={}

    componentWillMount () {}
    componentDidMount () {} 
    componentWillReceiveProps (nextProps, nextContext) {} 
    componentWillUnmount () {} 
    componentDidShow () {} 
    componentDidHide () {} 
    componentDidCatchError () {} 
    componentDidNotFound () {} 
    render() {
        return (
            <AtSearchBar
              value={this.state.value}
              onChange={this.onChange}
              onActionClick={this.onActionClick}
            />
        );
    }
}

export default SearchBar
