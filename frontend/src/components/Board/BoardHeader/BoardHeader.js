// 상단 바 (Header) 컴포넌트
// 로고, 게시판 title, 검색 바(다판다, 잉력시장), 유저 상태(log), 알람표시, 카테고리(잉력시장)

// 상위 컴포넌트: HeaderContainer

import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BaseHeader from "../../Structure/BaseHeader";
import SearchBar from "./SearchBar";

/* Styled Components */
/* 검색창 컴포넌트를 담은 컨테이너 */
const SearchBarContainer = styled.div`
    flex: 1;
    height: 4rem;
    
    display: flex;
    justify-content: center;
    align-items: center;
`;


/* React Component */
const BoardHeader = (props) => {

    const {
        isHeaderOn,
        board,
        curUser,

        localLogoutRequest,
        outlookLogoutRequest,
        getBoardRequest
    } = props;

    const renderSearchBarComponent = () => {
        return (
            <SearchBarContainer>
                <SearchBar 
                    getBoardRequest={getBoardRequest} 
                    board={board}
                /> 
            </SearchBarContainer>
        )
    }

    return (
        <BaseHeader
            isHeaderOn={isHeaderOn}
            curUser={curUser}
            isBGWhite={false}
            doesNeedUserBadge={true}
            MiddleComponent={renderSearchBarComponent}

            localLogoutRequest={localLogoutRequest}
            outlookLogoutRequest={outlookLogoutRequest}
        />
    )
}

BoardHeader.propTypes = {
    // Properties
    isHeaderOn: PropTypes.bool.isRequired,              // Header가 나타나는 지,
    curUser: PropTypes.object.isRequired,               // 유저 객체
    board: PropTypes.string.isRequired,                 // 무슨 topic 인지 

    // Methods
    localLogoutRequest: PropTypes.func.isRequired,      // 로그아웃 메서드
    outlookLogoutRequest: PropTypes.func.isRequired,    // 아웃룩 로그아웃 메서드
    getBoardRequest: PropTypes.func.isRequired,         // board에서 검색 시, get 요청을 하는 매서드 
}

export default BoardHeader;