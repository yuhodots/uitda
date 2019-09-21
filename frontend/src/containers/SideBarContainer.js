// SideBar와 관련된 액션을 담은 컨테이너 컴포넌트

// 상위 컴포넌트: App

import React, { Component } from "react";
import { connect } from 'react-redux';

// 컴포넌트
import SideBar from "../components/Structure/SideBar";

// 액션


class SideBarContainer extends Component {    
    
    render() {
        return (
            <SideBar topic={this.props.topic}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        topic: state.topic.topic
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);