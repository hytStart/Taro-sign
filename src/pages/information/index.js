import Taro , { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtSearchBar, AtList, AtListItem, AtNoticebar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import {
    dispatchGetInformation,
    dispatchGetInformationDetail,
} from '@actions/information.js'
import util from '@util/util.js'


@connect(state => state.information, {
    dispatchGetInformation,
    dispatchGetInformationDetail,
})
export default class Information extends Component {

    config = {
        navigationBarTitleText: '资料库'
    }
    state={
        keyWord: '',
    }
    componentDidMount () {
        const payload ={
            params: {
                resourceType: 'all',
                resourceValue: '',
            },
            successCb: () => {}
        }
        this.props.dispatchGetInformation(payload)
    }
    onKeywordChange = keyWord => {
        this.setState({
            keyWord,
        })
    }
    onActionClick = () => {
        const { keyWord } = this.state
        const payload ={
            params: {
                resourceType: !!keyWord ? 'keyword' : 'all',
                resourceValue: keyWord,
            },
            successCb: () => {}
        }
        this.props.dispatchGetInformation(payload)
    }
    // handleInformationDetail = rid => {
    //     const payload ={
    //         params: {
    //             resourceType: 'rid',
    //             resourceValue: rid,
    //         },
    //         successCb: () => {
    //             Taro.navigateTo({url: '/pages/information/informationDetail'})
    //         }
    //     }
    //     this.props.dispatchGetInformationDetail(payload)
    // }
    handleInformationDetail = url => {
        Taro.showLoading()
        const params = {
            url,
            fileType: "doc",
            success(res) {
                // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                if (res.statusCode === 200) {
                    const wxPath = res.tempFilePath
                    Taro.openDocument({
                        filePath: wxPath,
                        fileType: "doc",
                        success: function (ress) {
                            Taro.hideLoading()
                            console.log(ress)
                        },
                        fail: function (resf) {
                            util.showToast('打开文档失败')
                        },
                        complete: function (resc) {
                            console.log(resc);
                        }
                    })
                }
            },
            fail: function (resa) {
                Taro.hideLoading()
                util.showToast('文件下载失败')
            },
        }
        Taro.downloadFile(params).then()
    }
    render() {
        const { keyWord } = this.state
        const { allInformation } = this.props
        return (
            <View>
                <AtSearchBar
                    actionName='搜一下'
                    value={keyWord}
                    onChange={this.onKeywordChange}
                    onActionClick={this.onActionClick}
                />
                <AtNoticebar icon='volume-plus' marquee>
                    温馨提示：点击相应资料，即可下载模板。如需编辑，请转发至电脑。
                </AtNoticebar>
                <AtList>
                    {
                        allInformation.map((item, index) => {
                            const { title, content, rid, url } = item
                            return (
                                <AtListItem
                                    arrow='down'
                                    note={content ? content.slice(0, 10): ''}
                                    title={title}
                                    extraText={content}
                                    key={index}
                                    data-rid={rid}
                                    onClick={this.handleInformationDetail.bind(this, url)}
                                />
                            )
                        })
                    }
                    
                </AtList>
            </View>
        );
    }
}