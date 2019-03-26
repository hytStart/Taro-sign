import Taro , { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux'

@connect(state => state, {
})
export default class NewsDetail extends Component {

    config = {
        navigationBarTitleText: '新闻'
    }
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount () {
    }
    render() {
        const {
            news: {
                newsDetail: {
                    category,
                    content,
                    newsimg,
                    time,
                    title,
                }
            }
        } = this.props
        return (
            <View className='at-article'>
                <View className='at-article__h1'>
                    {title}
                </View>
                <View className='at-article__info'>
                    {time}
                </View>
                <View className='at-article__content'>
                    <View className='at-article__section'>
                        <View className='at-article__h3'>{category}</View>
                        {!!content && content.split('\r\n').map((item, index) => (
                            <View className='at-article__p' key={index}>
                                {item}
                            </View>
                        ))}
                        <Image 
                            className='at-article__img' 
                            src={newsimg}
                            mode='widthFix'
                        />
                    </View>
                </View>
            </View>
        );
    }
}