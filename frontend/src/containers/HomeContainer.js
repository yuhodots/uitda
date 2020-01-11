// 홈 화면에 대한 액션이 담긴 컨테이너

// 상위 컴포넌트: pages/Home

import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; // Home 페이지 구현 이전에 market을 default로 하기 위함

import { 
    headerOn,
    searchBarOff,
    categoryOff
 } from "../store/actions/structure";
 
 import { topicSelect } from "../store/actions/topic";

class HomeContainer extends Component {    

    componentDidMount() {
        this.props.headerOn();
        this.props.searchBarOff();
        this.props.categoryOff();

        
        this.props.topicSelect('home');
    }

    render() {
        return (
            <Redirect to='/board/market' />
        )
    }
}

const mapStateToProps = (state) => {
    return { }
}

const mapDispatchToProps = (dispatch) => {
    return {
        headerOn : () => {dispatch(headerOn())},            // Header가 나타나게 하는 메서드
        searchBarOff : () => {dispatch(searchBarOff())},    // Header에 검색바가 안 나오게 하는 메서드
        categoryOff : () => {dispatch(categoryOff())},      // Header에 카테고리 창이 안 나오게 하는 메서드

        topicSelect : (topic) => {                          // App의 topic state를 HOME으로 설정
            dispatch(topicSelect(topic))
        },          
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);