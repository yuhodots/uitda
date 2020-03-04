// 상단 바 (Header) 컴포넌트
// 로고, 게시판 title, 검색 바(다판다, 잉력시장), 유저 상태(log), 알람표시, 카테고리(잉력시장)

// 상위 컴포넌트: HeaderContainer

import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { colors } from "../../../styles/variables";
import Logo from "../../Structure/CommonComponents/Logo";
import SearchBar from "./SearchBar";
import './Header.css'

/* Styled Components */

/* Header 전체 박스 */
const HeaderBox = styled.div`
    height: 4rem;
    width: 100%;
    padding: 0;
    
    position: fixed;
    top: 0;
    z-index: 2021;

    background-color: ${colors.blue};

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
`

/* 검색창 컴포넌트를 담은 컨테이너 */
const SearchBarContainer = styled.div`
    flex: 1;
    height: 4rem;
    
    display: flex;
    justify-content: center;
    align-items: center;
`;

/* */
const UserInfoContainer = styled.div`
    flex: 0 8rem;
`;


/* React Component */

class BoardHeader extends Component {

    render() {

        const {
            isHeaderOn,
            isLoggedIn,
            board,

            handleLogout,
            getBoardRequest
        } = this.props;

        return (
            <HeaderBox isHeaderOn={isHeaderOn} >
                
                <LogoContainer>
                    <Logo isWhite={true} />
                </LogoContainer>

                <SearchBarContainer>
                    <SearchBar 
                        getBoardRequest={getBoardRequest} 
                        board={board}
                    /> 
                </SearchBarContainer>

                <UserInfoContainer>
                {
                    isLoggedIn ? 
                    <a onClick={handleLogout} href='/' className='LogItem'>Logout</a> : 
                    <Link to='/auth/login' className='LogItem'>Login</Link>
                }
                </UserInfoContainer>

            </HeaderBox>
        )
    }
}

BoardHeader.propTypes = {
    // Properties
    isHeaderOn: PropTypes.bool.isRequired,      // Header가 나타나는 지,
    isLoggedIn: PropTypes.bool.isRequired,      // 로그인 되어있는지,
    user: PropTypes.object,                     // 유저 객체
    board: PropTypes.string.isRequired,         // 무슨 topic 인지 

    // Methods
    handleLogout: PropTypes.func.isRequired,    // 로그아웃 메서드
    getBoardRequest: PropTypes.func.isRequired, // board에서 검색 시, get 요청을 하는 매서드 
}

BoardHeader.defaultProps = {
    user: {},
}

export default BoardHeader;