/* Manage, Edit Board, Chatting에서 사용되는 헤더의 공통 속성을 담은 헤더 컴포넌트
   Size 및 기본 css 스타일, 로고, 아이콘 등의 공통 영역에 대한 코드가 작성되어 있으며,
   가운데의 기능을 담은 컴포넌트는 각각의 컴포넌트 디렉토리에서 제작한 뒤 MiddleComponent로 받는다.  */

import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import UserBadgeBox from "./UserBadgeBox";
import { Logo } from '../CommonComponents';
import { colors, Screen_Size } from '../../../styles/variables'


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

    opacity: 1;
    visibility: visible;

    transition: visibility 0.5s, 
                opacity 0.5s;

    ${props => !props.isHeaderOn && css`
        opacity: 0;
        visibility: hidden;
    `}
`; 

    /* 로고 담는 영역 박스 */
    const LogoContainer = styled.div`
        flex: 0 15rem;

        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: ${Screen_Size.pad_portrait}) {
            flex-basis: 12rem;
        }
    `

    /* 로고 영역 제외한 오른쪽 전체를 차지하는 영역 div 태그 
       MiddleComponent + UserBadgeBox */
    const ContentBox = styled.div`
        flex: 1;
        height: 100%;

        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    `;


/* react component */
const BaseHeader = (props) => {
    
    const { 
        curUser,
        isHeaderOn,
        isBGWhite,
        MiddleComponent,
        doesNeedUserBadge,

        localLogoutRequest,
        outlookLogoutRequest,
    } = props;

    return (
        <HeaderBox isBGWhite={isBGWhite} isHeaderOn={isHeaderOn} >
            <LogoContainer> <Logo isWhite={!isBGWhite} /> </LogoContainer>

            <ContentBox>
                <MiddleComponent />
                {
                    doesNeedUserBadge ?
                    <UserBadgeBox 
                        curUser={curUser} 
                        localLogoutRequest={localLogoutRequest} 
                        outlookLogoutRequest={outlookLogoutRequest}    
                    /> :
                    ''
                }
            </ContentBox>
        </HeaderBox>
    )
}

BaseHeader.propTypes = {
    curUser: PropTypes.object,                          // 로그인된 유저 데이터

    isHeaderOn: PropTypes.bool,                         // Header On 여부 (Board 헤더를 위한 boolean 값)
    isBGWhite: PropTypes.bool,                          // 배경색이 흰색인지
    MiddleComponent: PropTypes.func.isRequired,         // Header의 가운데에 위치할 컴포넌트
    doesNeedUserBadge: PropTypes.bool,                  // 유저 뱃지 박스가 필요한 지 여부

    localLogoutRequest: PropTypes.func.isRequired,           // 로그아웃 액션
    outlookLogoutRequest: PropTypes.func.isRequired,    // 아웃룩 로그아웃 메서드
}

BaseHeader.defaultProps = {
    isHeaderOn: true,
    isBGWhite: true,
    doesNeedUserBadge: true,
    curUser: {},
}

export default BaseHeader;