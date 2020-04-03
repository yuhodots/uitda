/* Manage, Edit Board, Chatting에서 사용되는 헤더의 공통 속성을 담은 헤더 컴포넌트
   Size 및 기본 css 스타일, 로고, 아이콘 등의 공통 영역에 대한 코드가 작성되어 있으며,
   가운데의 기능을 담은 컴포넌트는 각각의 컴포넌트 디렉토리에서 제작한 뒤 MiddleComponent로 받는다.  */

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import UserBadgeBox from "./UserBadgeBox";
import { Logo } from '../CommonComponents';
import { colors } from '../../../styles/variables'


/* Styled Compoents */
/* 헤더의 영역 및 기본 스타일 */
const HeaderBox = styled.div`
    height: 4rem;
    background-color: ${ props => props.isBGWhite ? 
    colors.white : colors.blue };

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    box-shadow: 0 0 5px rgba(0,0,0,.05);
    /* border-bottom: 1px solid ${colors.gray_line}; */

    display: flex;
    flex-flow: row nowrap;
`; 

    /* */
    const ContentBox = styled.div`
        flex: 1;
        height: 100%;

        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    `;


/* react component */
class BaseHeader extends Component {

    render () {

        const { 
            curUser,
            isBGWhite,
            MiddleComponent,
            doesNeedUserBadge,

            logoutRequest,
        } = this.props;

        return (
            <HeaderBox isBGWhite={isBGWhite} >
                <Logo isWhite={!isBGWhite} />

                <ContentBox>
                    <MiddleComponent />
                    {
                        doesNeedUserBadge ?
                        <UserBadgeBox curUser={curUser} logoutRequest={logoutRequest} /> :
                        ''
                    }
                </ContentBox>
            </HeaderBox>
        )
    }
}

BaseHeader.propTypes = {
    curUser: PropTypes.object,                          // 로그인된 유저 데이터

    isBGWhite: PropTypes.bool,                          // 배경색이 흰색인지
    MiddleComponent: PropTypes.func.isRequired,         // Header의 가운데에 위치할 컴포넌트
    doesNeedUserBadge: PropTypes.bool,                  // 유저 뱃지 박스가 필요한 지 여부

    logoutRequest: PropTypes.func.isRequired,           // 로그아웃 액션
}

BaseHeader.defaultProps = {
    isBGWhite: true,
    doesNeedUserBadge: true,
    curUser: {},
}

export default BaseHeader;