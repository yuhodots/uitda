

import React, { Component } from 'react';

import BaseHeader from "../../Structure/BaseHeader";
import LinkCategory from "../../Structure/BaseHeader/LinkCategory_MidComp";

class ChattingHeader extends Component {

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