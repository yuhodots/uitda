

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input } from "antd";

import Subtitle from './RoomSubtitle';
import { DEPARTURE, DESTINATION } from "../../../../../constants/edit_Input_Data_Keys";

/* Styled Components */

const WholeBox = styled.div`
    margin: 0;
    
    display: flex;
    flex-flow: row nowrap;
`;

    const SubtitleAndInputBox = styled.div`
        flex: 1;

        display: flex;
        flex-flow: column nowrap;
    `;

    const DepartureBox = styled(SubtitleAndInputBox)`
        margin-right: 1rem;
    `;

    const DestinationBox = styled(SubtitleAndInputBox)`
        margin-left: 1rem;
    `;

        const PlaceTextArea = styled(Input.TextArea)`
            margin-top: 1rem;
            padding: 0.25rem;

            /* TextArea 속성 */
            resize: none;
            border-top: none;
            border-left: none;
            border-right: none;
            border-radius: 0;
            outline: 0;

            /* Ant-Design 속성 무효화를 위해 */
            :focus {
                box-shadow: none;
            }

            /* 노트북 사이즈 */
            @media (max-width: 1500px) {
                font-size: 0.875rem;
            }
        `;

/* React Component */

const RoomPlaceInputBox = ({storeCarpoolData}) => {

    return (
        <WholeBox>
            <DepartureBox>
                <Subtitle content='출발지' redStar={true} />
                <PlaceTextArea 
                    autoSize={true}
                    onChange={(e) => storeCarpoolData(DEPARTURE, e.target.value)}
                />
            </DepartureBox>

            <DestinationBox>
                <Subtitle content='도착지' redStar={true} />
                <PlaceTextArea 
                    autoSize={true}
                    onChange={(e) => storeCarpoolData(DESTINATION, e.target.value)}
                />
            </DestinationBox>            
        </WholeBox>
    )
}

RoomPlaceInputBox.propTypes = {
    storeCarpoolData: PropTypes.func.isRequired,        // Carpool 탭의 Room Info Data를 저장하는 메서드
}

export default RoomPlaceInputBox;