

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input } from "antd";

import { colors } from "../../../../../styles/variables";
import Subtitle from "./RoomSubtitle";
import TitleHintDatas from "./Subinfo_TitleHint.json";

/* Styled Components */
const WholeBox = styled.div`
    margin: 0;
    margin-bottom: 2.5rem;
    
    display: flex;
    flex-flow: column nowrap;

    @media (max-width: 1500px) {
        margin-bottom: 1.25rem;
    }
`;

    const SubTitleInputBox = styled.div`
        margin-bottom: 0.5rem;
        
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    `;

        const InfoTextArea = styled(Input.TextArea)`

            flex: 1;

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

    const HintBox = styled.div`
        font-size: 0.6875rem;
        font-weight: lighter;
        color: ${colors.font_lightgray};
    `;


/* Reac Component */
const RoomSubInfoInputBox = ({dataKey, storeCarpoolData}) => {

    /* Hint Data를 json 객체의 순회를 통해 찾아냄 */
    let subtitle = '';
    let hint = '';
    for (let id in TitleHintDatas) {
        if (id === dataKey) {
            subtitle = TitleHintDatas[id].subtitle;
            hint = TitleHintDatas[id].hint;
        }
    }

    return (
        <WholeBox>
            <SubTitleInputBox>
                <Subtitle content={subtitle} />
                <InfoTextArea 
                    autoSize={true}
                    onChange={(e) => storeCarpoolData(dataKey, e.target.value)}
                />
            </SubTitleInputBox>
            <HintBox>{hint}</HintBox>
        </WholeBox>
    )
}

RoomSubInfoInputBox.propTypes = {
    dataKey: PropTypes.string.isRequired,           // subtitle 데이터
    storeCarpoolData: PropTypes.func.isRequired,    // Carpool 탭의 Room Info Data를 저장하는 메서드
}

export default RoomSubInfoInputBox;