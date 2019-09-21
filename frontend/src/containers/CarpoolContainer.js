

// 상위 컴포넌트: pages/Carpool

import React, { Component } from "react";
import { connect } from 'react-redux';


import Carpool from "../components/Carpool";

import { 
    headerOn,
    searchBarOff,
    categoryOff
} from "../store/actions/structure";

import { topicCarpool } from "../store/actions/topic";


class CarpoolContainer extends Component {    

    componentDidMount() {
        this.props.headerOn();
        this.props.searchBarOff();
        this.props.categoryOff();
        this.props.topicCarpool();
    }

    render() {
        return (
            <div>
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
        headerOn : () => {dispatch(headerOn())},
        searchBarOff : () => {dispatch(searchBarOff())},
        categoryOff : () => {dispatch(categoryOff())},

        topicCarpool : () => {dispatch(topicCarpool())},    // App의 topic state를 CARPOOL로 설정
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarpoolContainer);