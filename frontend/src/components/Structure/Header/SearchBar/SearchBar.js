import React, { Component } from "react";

import './SearchBar.css';

class SearchBar extends Component {

    state = {
        keyword: ''
    }
    
    _handleClick = () => {
        console.log(this.state.keyword)
    }

    _handleInput = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }

    render() {
        return (
            <div className="Search-Bar">
                <input type='text' onChange={this._handleInput} className="Search-TextArea" />
                <div onClick={this._handleClick} className="SearchBotton">검색</div>
            </div>
        )
    }
}

export default SearchBar;