

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TimePicker } from "antd";
import moment from "moment";

import Subtitle from "./RoomSubtitle";
import { START_TIME } from "../../../../../../constants/edit_RoomInfo_DataKeys";

/* Styled Components */
const WholeBox = styled.div`
    margin: 1rem 0;
    
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;


/* React Component */
const RoomTimePickerBox = ({storeCarpoolData}) => {

    return (
        <WholeBox>
            <Subtitle content='출발 시각' redStar={true} />

            <TimePicker 
                use12Hours 
                defaultOpenValue={moment('00:00', 'h:mm a')}
                format='h:mm a'
                minuteStep={5}
                onChange={(time) => storeCarpoolData(START_TIME, time)}
            />
        </WholeBox>
    )
}

RoomTimePickerBox.propTypes = {
    storeCarpoolData: PropTypes.func.isRequired,        // Carpool 탭의 Room Info Data를 저장하는 메서드
}

export default RoomTimePickerBox;