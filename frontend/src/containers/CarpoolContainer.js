

// 상위 컴포넌트: pages/Carpool

import React, { Component } from "react";
import { connect } from 'react-redux';

import { carpoolSelectDate } from "../store/actions/carpool";
import SideBar from "../components/Structure/SideBar";
import CarpoolBoard from "../components/Carpool";
import { topicSelect } from "../store/actions/topic";
import { CARPOOL } from "../constants/categories";

class CarpoolContainer extends Component {    

    state = {}

    componentDidMount() {
        const { topicSelect } = this.props;

        topicSelect(CARPOOL);

        this.setState({
            isLoaded: true,
        })
    }

    render() {
        const { 
            selectedDate, 
        
            selectDate
        } = this.props;

        const { isLoaded } = this.state

        return (
            isLoaded ?
            
            <div>
                <SideBar topic={CARPOOL} />

                <CarpoolBoard 
                    selectedDate={selectedDate}

                    selectDate={selectDate}
                /> 
            </div> :
            
            ''
        )
                    
        
    }
}

const mapStateToProps = (state) => {
    return {
        selectedDate: state.carpool.selectedDate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        topicSelect: (topic) => {dispatch(topicSelect(topic))},         // App의 topic state를 CARPOOL로 설정
    
        selectDate: (date) => {dispatch(carpoolSelectDate(date))},      // Carpool 캘린더의 date를 선택하는 액션 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarpoolContainer);