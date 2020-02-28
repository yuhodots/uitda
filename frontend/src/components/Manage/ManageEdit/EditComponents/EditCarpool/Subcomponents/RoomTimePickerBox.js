

import React from 'react';
import styled from 'styled-components';
import { TimePicker } from "antd";
import moment from "moment";

import Subtitle from "./RoomSubtitle";

/* Styled Components */
const WholeBox = styled.div`
    margin: 1rem 0;
    
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;


/* React Component */
const RoomTimePickerBox = () => {

    return (
        <WholeBox>
            <Subtitle content='출발 시각' redStar={true} />

            <TimePicker 
                use12Hours 
                defaultOpenValue={moment('00:00', 'h:mm a')}
                format='h:mm a'
                minuteStep={5}
            />
        </WholeBox>
    )
}


export default RoomTimePickerBox;