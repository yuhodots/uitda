

import React, { Component } from 'react';

import BaseHeader from "../../Structure/BaseHeader";
import LinkCategory from "../../Structure/BaseHeader/LinkCategory_MidComp";

class ChattingHeader extends Component {

    /* 헤더 가운데에 들어갈 컴포넌트를 render하는 함수
       다른 게시판으로 이동하는 링크가 담긴 컴포넌트 */
    _renderMiddleComponent = () => {

        const categoryDatas = [
            { url: '/board/market', text: '다판다' },
            { url: '/board/networking', text: '잉력시장' },
            { url: '/carpool', text: '카풀' },
            { url: '/manage', text: '글 관리' },
        ]
    
        return (
            <LinkCategory categoryDatas={categoryDatas} />
        )
    }

    render() {

        return(
            <BaseHeader isBGWhite={true} MiddleComponent={this._renderMiddleComponent} />
        )
    }
}


export default ChattingHeader