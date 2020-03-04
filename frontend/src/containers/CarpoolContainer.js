

// 상위 컴포넌트: pages/Carpool

import React, { Component } from "react";
import { connect } from 'react-redux';

import SideBar from "../components/Structure/SideBar";
import Carpool from "../components/Carpool";
import { topicSelect } from "../store/actions/topic";
import { CARPOOL } from "../constants/categories";

class CarpoolContainer extends Component {    

    componentDidMount() {
        const { topicSelect } = this.props;

        topicSelect(CARPOOL);
    }

    render() {
        return (
            <div>
                <SideBar topic={CARPOOL} />

                <Carpool />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        topicSelect : (topic) => {dispatch(topicSelect(topic))},    // App의 topic state를 CARPOOL로 설정
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarpoolContainer);