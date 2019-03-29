import Taro , { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import { AtIcon } from 'taro-ui'
import {
} from '@actions/information.js'


@connect(state => state.information, {
})
export default class InformationDetail extends Component {

    config = {
        navigationBarTitleText: '资料库'
    }
    state={
    }
    componentDidMount () {
    }
    handleDownload = () => {
        const { informationDetal: { url } } = this.props
        const params = {
            url,
            fileType: "doc",
            success(res) {
                // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                if (res.statusCode === 200) {
                    console.log("path   "+res.tempFilePath)
                    Taro.openDocument({
                        filePath: res.tempFilePath,
                        fileType: "doc",
                        success: function (ress) {
                            console.log('打开文档成功')
                        },
                        fail: function (resf) {
                            console.log(resf);
                        },
                        complete: function (resc) {
                            console.log(resc);
                        }
                    })
                }
            },
            fail: function (resa) {
                console.log('文件下载失败');
            },
        }
        Taro.downloadFile(params).then()
    }
    render() {
        const { informationDetal: { title, content } } = this.props
        const iconStyle = {
            position: 'fixed',
            right: '40rpx',
            bottom: '60rpx',
        }
        return (
            <View>
                <View className='at-article'>
                    <View className='at-article__h1'>
                        {title}
                    </View>
                    <View className='at-article__content'>
                        <View className='at-article__section'>
                            {!!content && content.split('\r\n').map((item, index) => (
                                <View className='at-article__p' key={index}>
                                    {item}
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={iconStyle} onClick={this.handleDownload}>
                        <AtIcon value='download' size='50' color='#618FE7'></AtIcon>
                    </View>
                </View>
            </View>
        );
    }
}