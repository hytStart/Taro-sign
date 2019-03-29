import Taro , { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtSearchBar, AtList, AtListItem } from 'taro-ui'
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
    handleInformationDetail = rid => {
        const payload ={
            params: {
                resourceType: 'rid',
                resourceValue: rid,
            },
            successCb: () => {
                Taro.navigateTo({url: '/pages/information/informationDetail'})
            }
        }
        this.props.dispatchGetInformationDetail(payload)
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
                <AtList>
                    {
                        allInformation.map((item, index) => {
                            const { title, content, rid } = item
                            return (
                                <AtListItem
                                    arrow='right'
                                    note={content ? content.slice(0, 10): ''}
                                    title={title}
                                    extraText={content}
                                    key={index}
                                    data-rid={rid}
                                    onClick={this.handleInformationDetail.bind(this, rid)}
                                />
                            )
                        })
                    }
                    
                </AtList>
            </View>
        );
    }
}