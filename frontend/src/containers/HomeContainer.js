// 홈 화면에 대한 액션이 담긴 컨테이너

// 상위 컴포넌트: pages/Home

import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; // Home 페이지 구현 이전에 market을 default로 하기 위함
 
 import { topicSelect } from "../store/actions/topic";

class HomeContainer extends Component {    

    componentDidMount() {
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
        topicSelect : (topic) => {                          // App의 topic state를 HOME으로 설정
            dispatch(topicSelect(topic))
        },          
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);