// 상단 바 (Header) 컴포넌트
// 로고, 게시판 title, 검색 바(다판다, 잉력시장), 유저 상태(log), 알람표시, 카테고리(잉력시장)

// 상위 컴포넌트: HeaderContainer

import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import SearchBar from "./SearchBar";
import './Header.css'
import logo from './logo-white.png';

class Header extends Component {

    render() {

        return (
            <div className={
                this.props.isHeaderOn ?
                "Header" :
                "Header hidden"
            }>
                <div className="LogoContainer">
                    <Link to="/"><img src={logo} className="logo-Image" alt="Home" /></Link>
                </div>

                <div className="EmptyContainer"></div>
                
                <div className="SearchBarContainer">
                    {
                        this.props.isSearchBarOn ?
                        <SearchBar/> :
                        ''
                    }
                </div>

                <div className="EmptyContainer"></div>

                {
                    this.props.isLoggedIn ? 
                    <a onClick={this.props.handleLogout} href='/' className='LogItem'>Logout</a> : 
                    <Link to='/auth/login' className='LogItem'>Login</Link>
                }
                {
                    this.props.isCategoryOn ?
                    <div></div> :
                    ""
                }
            </div>
        )
    }
}

Header.propTypes = {
    // Properties
    isHeaderOn: PropTypes.bool.isRequired,      // Header가 나타나는 지,
    isSearchBarOn: PropTypes.bool.isRequired,   // 검색바를 나타낼지,
    isCategoryOn: PropTypes.bool.isRequired,    // 카테고리 창을 나타낼지,
    isLoggedIn: PropTypes.bool.isRequired,      // 로그인 되어있는지,
    user: PropTypes.object,                     // 유저 객체

    // Methods
    handleLogout: PropTypes.func.isRequired // 로그아웃 메서드
}

Header.defaultProps = {
    user: {}
}

export default Header;