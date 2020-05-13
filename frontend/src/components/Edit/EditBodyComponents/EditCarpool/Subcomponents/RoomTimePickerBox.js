

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Subtitle from "./RoomSubtitle";
import { UitdaTimePicker } from "../../../../Structure/CommonComponents";
import { START_TIME } from "../../../../../constants/edit_RoomInfo_DataKeys";

/* Styled Components */
const WholeBox = styled.div`
    margin: 1.25rem 0;
    
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;


/* React Component */
const RoomTimePickerBox = ({storeCarpoolData}) => {

    return (
        <WholeBox>
            <Subtitle content='출발 시각' redStar={true} />

            <UitdaTimePicker 
                storeDataFunc={storeCarpoolData}
                data_key={START_TIME}
            />
        </WholeBox>
    )
}

RoomTimePickerBox.propTypes = {
    storeCarpoolData: PropTypes.func.isRequired,        // Carpool 탭의 Room Info Data를 저장하는 메서드
}

export default RoomTimePickerBox;