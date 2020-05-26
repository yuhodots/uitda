

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BaseHeader from "../../Structure/BaseHeader";
import LinkCategory from "../../Structure/BaseHeader/LinkCategory_MidComp";

class ChattingHeader extends Component {

    /* 헤더 가운데에 들어갈 컴포넌트를 render하는 함수
       다른 게시판으로 이동하는 링크가 담긴 컴포넌트 */
    _renderMiddleComponent = () => {

        const categoryDatas = [
            { url: '/board/market', text: '유니마켓' },
            { url: '/board/networking', text: '네트워킹' },
            { url: '/carpool', text: '택시카풀' },
            { url: '/manage', text: '글 관리' },
        ]
    
        return (
            <LinkCategory categoryDatas={categoryDatas} />
        )
    }

    render() {

        const { curUser, localLogoutRequest, outlookLogoutRequest } = this.props

        return(
            <BaseHeader 
                curUser={curUser}
                isBGWhite={true} 
                MiddleComponent={this._renderMiddleComponent} 
            
                localLogoutRequest={localLogoutRequest}
                outlookLogoutRequest={outlookLogoutRequest}
            />
        )
    }
}

ChattingHeader.propTypes = {
    curUser: PropTypes.object.isRequired,               // 유저 정보
    localLogoutRequest: PropTypes.func.isRequired,      // 로그아웃 액션
    outlookLogoutRequest: PropTypes.func.isRequired,    // 아웃룩 로그아웃 메서드
}

export default ChattingHeader