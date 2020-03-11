// 상위 컴포넌트: compoents/Structure/Header

import React, { Component } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';

import { colors } from "../../../../styles/variables";

/* Styled Components */

/* 검색바 (input + button) */
const SearchBarBox = styled.div`
    width: 70%;
    max-width: 36rem;
    height: 2rem;
    
    background-color: ${colors.white};
    border-radius: 1rem;
    overflow: hidden;
    
    display: flex;
    flex-flow: row nowrap;
`;

/* Text 입력 창 */
const SearchInput = styled.input`
    flex: 1;
    padding: .6em 1em;
    
    border: none;
    font-size: .875rem;

    :focus {
        outline: none;
        color: ${colors.blue};
        text-shadow: 0px 0px 0px ${colors.black};  
        -webkit-text-fill-color: transparent;
    }
`

/* Search Button */
const SearchButton = styled.button`
    flex: 0 4rem;
    
    color: ${colors.blue};
    background-color: ${colors.gray_bg};

    border: 0;
    outline: 0;
    cursor: pointer;
    /* border-left: 2px solid #f4f4f4;  */
`;


/* React Component */

class SearchBar extends Component {

    state = {
        keyword: ''
    }
    
    /* 검색 버튼 클릭 시, get board 요청을 보냄 */
    _handleClick = () => {
        const {
            board,
            getBoardRequest
        } = this.props;

        getBoardRequest(board, 0, this.state.keyword);
    }

    /* 검색창에 입력 시, state에 검색 값을 저장 */
    _handleInput = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }

    /* 검색창에서 enter키 누르면 _handleClick이 실행되게 함 */
    _handleEnter = (e) => {
        if (e.keyCode === 13) {
            this._handleClick();
        }
    }

    render() {
        return (
            <SearchBarBox>
                <SearchInput 
                    type='text' 
                    placeholder='검색어를 입력하세요.'
                    onChange={this._handleInput} 
                    onKeyDown={this._handleEnter}
                />
                <SearchButton onClick={this._handleClick} ><SearchOutlined /></SearchButton>
            </SearchBarBox>
        );
    }
}

SearchBar.propTypes = {
    board: PropTypes.string.isRequired,             // 무슨 board인지

    getBoardRequest: PropTypes.func.isRequired,     // board get 요청 액션 메서드
}

export default SearchBar;