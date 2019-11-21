// 상위 컴포넌트: compoents/Structure/Header

import React, { Component } from "react";
import PropTypes from 'prop-types';

import './SearchBar.css';

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
            <div className="Search-Bar">
                <input 
                    type='text' 
                    onChange={this._handleInput} 
                    onKeyDown={this._handleEnter}
                    className="Search-TextArea" 
                />
                <div onClick={this._handleClick} className="SearchBotton">검색</div>
            </div>
        )
    }
}

SearchBar.propTypes = {
    board: PropTypes.string.isRequired,             // 무슨 board인지

    getBoardRequest: PropTypes.func.isRequired,     // board get 요청 액션 메서드
}

export default SearchBar;