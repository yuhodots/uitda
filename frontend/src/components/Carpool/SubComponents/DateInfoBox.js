

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Divider, Modal } from "antd";

import { colors } from "../../../styles/variables";
import EventListItem from "./DateInfo_Sub/EventListItem";
import { ACTIVE, GUEST, OWNER, CLOSED } from '../../../constants/calendar_consts';
import { UitdaPhotoCarousel } from "../../Structure/CommonComponents";
import { cpi1, cpi2, cpi3, cpi4, cpi5, cpi6, cpi7 } from "../../../styles/images/carpool_Info_Images";


/* Styled Components */

/* 전체 영역 div 태그 (하얀색 바탕색을 주는 컴포넌트) */
const WholeBoxArea = styled.div`
    padding: 1.25rem;
    width: 18rem;

    background-color: ${colors.white};
    
    overflow: hidden;

    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: stretch;

    @media (max-width: 1500px) {
        width: 15rem;
    }
`;

    /* InfoBox를 아래 끝에 두기 위해 묶어놓은 div 태그 */
    const UpperBox = styled.div`
        flex: 1;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    `;

        /* 날짜 정보 제목이 들어가는 박스 */
        const DateTitleBox = styled.div`
            margin-bottom: 0.5rem;
            display: flex;
            justify-content: center;

            font-size: 1.25rem;
            font-weight: bold;
        `;

        /* DateTitle 밑에 들어가는 구분선 */
        const StyledDivier = styled(Divider)`
            margin-top: 0;
            width: 10rem;
            min-width: 8rem;
        `;

        /* 카풀 일정 목록을 담은 박스 */
        const EventsListBox = styled.div`
            flex: 1;
            flex-basis: 0;
            margin-bottom: 2rem;
            width: 100%;
            overflow-y: auto;

            display: flex;
            flex-flow: column nowrap;
            align-items: flex-start;
        `;

            /* 해당 일에 카풀방이 없는 경우 띄우는 태그 */
            const NoEventBox = styled.div`
                /* margin-top: 1rem; */
                width: 100%;

                display: flex;
                flex-flow: column nowrap;
                align-items: center;
            `;

    /* 안내 정보를 담은 div 태그 */
    const InfomationBox = styled.div`
        position: relative;
        width: 12rem;
        padding: 0.75rem;
        padding-top: 1.25rem;
        margin: 0 auto;
        
        border: 1px solid ${colors.gray_line};

        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    `;

        /* Infomation Box Title */
        const InfoTitle = styled.div`
            position: absolute;
            top: -1rem;
            padding: 0 0.25rem;

            font-size: 1.25rem;
            font-weight: bold;

            background-color: ${colors.white};
        `;

        const InfoList = styled.div`
            display: flex;
            flex-flow: column nowrap;
        `;

        const UsingInfo = styled.div`
            cursor: pointer;

            display: flex;
            flex-flow: row nowrap;
            align-items: center;
        `;

            const InfoIcon = styled(InfoCircleOutlined)`
                margin-right: 0.5rem;
            `;


/* React Component */
class DateInfoBox extends Component {

    state = {
        modalVisible: false
    }

    /* Date => yyyy-mm-dd */
    _dateToStr = (date) => {
        const mm = date.getMonth() + 1 ;
        const dd = date.getDate();

        return `${mm}월 ${dd}일 일정`;
    }

    /* 이벤트 리스트를 render하는 함수 */
    _renderEventList = ( eventDataList ) => {

        const { totalOrMyOption, storeClickedEventData, openModalWindow } = this.props

        return eventDataList.map( event => {
            const { id, label } = event

            return (
                <EventListItem
                    key={id}
                    label={label} event={event}
                    totalOrMyOption={totalOrMyOption}
                    storeClickedEventData={storeClickedEventData}
                    openModalWindow={openModalWindow}
                />
            )
        } )
    }

    /* Carpool Info 모달 띄우는 함수 */
    _OpenInfoModal = () => {
        this.setState({
            ...this.state,
            modalVisible: true
        })
    }

    _cancleInfoModal = (e) => {
        console.log(e)
        this.setState({
            ...this.state,
            modalVisible: false
        })
    }

    render() {

        const { modalVisible } = this.state;
        const { clientHeight, selectedDate, eventsOnSelectedDate } = this.props;

        const dateStr = this._dateToStr(selectedDate)

        const infoImageList = [ cpi1, cpi2, cpi3, cpi4, cpi5, cpi6, cpi7 ];

        return (
            <WholeBoxArea>
                <UpperBox>
                    <DateTitleBox>{dateStr}</DateTitleBox>
                    <StyledDivier />
                    <EventsListBox>
                        {
                            eventsOnSelectedDate.length === 0 ?
                            <NoEventBox>해당일은 일정이 없습니다.</NoEventBox> :
                            this._renderEventList(eventsOnSelectedDate)
                        }
                    </EventsListBox>
                </UpperBox>

                <InfomationBox>
                    <InfoTitle>Infomation</InfoTitle>
                    <InfoList>
                        <EventListItem label={ACTIVE} infoText='모집중인 일정' />
                        <EventListItem label={GUEST} infoText='참가 신청한 일정' />
                        <EventListItem label={OWNER} infoText='내가 만든 일정' />
                        <EventListItem label={CLOSED} infoText='마감된 일정' />
                        <UsingInfo onClick={this._OpenInfoModal}>
                            <InfoIcon />
                            카풀 이용 안내
                        </UsingInfo>
                        <Modal
                            width="70%" 
                            visible={modalVisible}
                            onCancel={this._cancleInfoModal}
                            footer={null}
                            maskClosable={true}
                        >
                            <UitdaPhotoCarousel filelist={infoImageList} clientHeight={clientHeight} />
                        </Modal>
                    </InfoList>
                </InfomationBox>
            </WholeBoxArea>
        );
    }
}

DateInfoBox.propTypes = {
    clientHeight: PropTypes.number.isRequired,          // 브라우저 화면 세로 높이
    totalOrMyOption: PropTypes.string.isRequired,       // 전체 일정 or 내 일정

    selectedDate: PropTypes.object.isRequired,          // 선택된 날짜
    eventsOnSelectedDate: PropTypes.array.isRequired,   // 선택된 날짜에 해당하는 일정 목록

    storeClickedEventData: PropTypes.func.isRequired,   // 이벤트를 클릭하는 이벤트를 핸들하는 액션
    openModalWindow: PropTypes.func,                    // Modal 창을 띄우는 메서드
}

export default DateInfoBox;