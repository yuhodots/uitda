

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input } from "antd";

import { colors } from "../../../../../../styles/variables";
import Subtitle from "./RoomSubtitle";
import HintDatas from "./Subinfo_TitleHint.json";

/* Styled Components */
const WholeBox = styled.div`
    margin: 0;
    margin-bottom: 1rem;
    
    display: flex;
    flex-flow: column nowrap;
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
        font-size: 0.625rem;
        font-weight: lighter;
        color: ${colors.font_lightgray};
    `;


/* Reac Component */
const RoomSubInfoInputBox = ({subtitle}) => {

    /* Hint Data를 json 객체의 순회를 통해 찾아냄 */
    let hint = '';
    for (let id in HintDatas) {
        if (id === subtitle) {
            hint = HintDatas[id];
        }
    }


    return (
        <WholeBox>
            <SubTitleInputBox>
                <Subtitle content={subtitle} />
                <InfoTextArea 
                    // defaultValue={title}
                    autoSize={true}
                    // onChange={(e) => storeTitleData(e.target.value)}
                />
            </SubTitleInputBox>
            <HintBox>{hint}</HintBox>
        </WholeBox>
    )
}

RoomSubInfoInputBox.propTypes = {
    subtitle: PropTypes.string.isRequired,      // subtitle 데이터
}

export default RoomSubInfoInputBox;