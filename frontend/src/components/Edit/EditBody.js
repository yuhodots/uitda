

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { EditBoard, EditCarpool } from './EditBodyComponents'
import { BGTemplate } from '../../styles/templates/manage'
import { CARPOOL } from '../../constants/categories'

/* Styled Components */
/* 배경 스타일 div 태그 */
const BackGround = styled(BGTemplate)`
    padding-top: 4rem;
    min-height: ${props => {
        return `${props.minHeight}px`
    }};
`;

/* React Component */
class EditBody extends Component {

    state = {}

    componentDidMount() {
        window.addEventListener('resize', this._updateWindowSize);
        this._updateWindowSize()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._updateWindowSize);
    }

    _updateWindowSize = () => {
        this.setState({
            ...this.state,
            windowHeight: window.innerHeight
        })
    }

    render() {

        const { 
            windowHeight,
        } = this.state;

        const {
            editCategory,

            editBoardData,
            selectedDate,
            eventsObj,

            storeBoardData,
            addFileData,
            deleteFileData,
            initCalenderEvents,
            selectDate,
            storeCarpoolData
        } = this.props;

        return (
            <BackGround minHeight={windowHeight} >
            {
                editCategory === CARPOOL ?

                <EditCarpool windowHeight={windowHeight} 
                    initCalenderEvents={initCalenderEvents}
                    selectedDate={selectedDate} selectDate={selectDate}
                    eventsObj={eventsObj}
                    storeCarpoolData={storeCarpoolData}
                /> :
                
                <EditBoard minHeight={windowHeight}
                    editCategory={editCategory}
                    editBoardData={editBoardData} 
                    addFileData={addFileData} deleteFileData={deleteFileData}
                    storeBoardData={storeBoardData}
                />
            }
            </BackGround>
        )
    }
}

EditBody.propTypes = {
    editCategory: PropTypes.string.isRequired,          // Edit Category
    
    editBoardData: PropTypes.object.isRequired,         // Edit Board Data

    selectedDate: PropTypes.object,                     // Carpool 탭에서 선택된 날짜 데이터
    eventsObj: PropTypes.object.isRequired,             // 카풀 탭의 캘린더에 띄울 일정 데이터 객체

    /* Methods */
    storeBoardData: PropTypes.func.isRequired,          // Edit Board 데이터를 App State로 저장하는 함수
    addFileData: PropTypes.func.isRequired,             // Files 데이터를 App State로 저장하는 함수
    deleteFileData: PropTypes.func.isRequired,          // App State에 있는 파일 데이터 중 해당 파일을 지우는 함수

    initCalenderEvents: PropTypes.func.isRequired,      // 캘린더 첫 화면에서 띄울 events를 받는 액션
    selectDate: PropTypes.func.isRequired,              // Carpool 탭에서 날짜를 선택하는 메서드
    storeCarpoolData: PropTypes.func.isRequired,        // Carpool 탭의 Room Info Data를 저장하는 메서드
}

EditBody.defaultProps = {
    selectedDate: {},
}

export default EditBody;