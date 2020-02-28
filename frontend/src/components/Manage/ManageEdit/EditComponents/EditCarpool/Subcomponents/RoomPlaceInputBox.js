

import React from 'react';
import styled from 'styled-components';
import { Input } from "antd";

import { colors } from "../../../../../../styles/variables";

/* Styled Components */

const WholeBox = styled.div`
    margin: 1rem 0;
    
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

        const Subtitle = styled.h3`
            font-weight: bold;
            margin-bottom: 1rem;

            /* 노트북 사이즈 */
            @media (max-width: 1500px) {
                font-size: 1rem;
            }
        `;

        const RedStar = styled.span`
            color: ${colors.font_red};
        `;

        const PlaceTextArea = styled(Input.TextArea)`

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

const RoomPlaceInputBox = () => {

    return (
        <WholeBox>
            <DepartureBox>
                <Subtitle>출발지 <RedStar>*</RedStar> </Subtitle>
                <PlaceTextArea 
                    // defaultValue={title}
                    autoSize={true}
                    // onChange={(e) => storeTitleData(e.target.value)}
                />
            </DepartureBox>

            <DestinationBox>
                <Subtitle>도착지 <RedStar>*</RedStar> </Subtitle>
                <PlaceTextArea 
                    // defaultValue={title}
                    autoSize={true}
                    // onChange={(e) => storeTitleData(e.target.value)}
                />
            </DestinationBox>            
        </WholeBox>
    )
}


export default RoomPlaceInputBox;