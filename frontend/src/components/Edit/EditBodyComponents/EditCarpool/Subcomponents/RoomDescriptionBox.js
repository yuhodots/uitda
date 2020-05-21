

import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { DESCRIPTION } from "../../../../../constants/edit_Input_Data_Keys";
import { colors } from "../../../../../styles/variables";
import { UitdaTextArea } from "../../../../Structure/CommonComponents";


/* Styled Components */
const WholeBox = styled.div`
    padding: 1.125rem 1.25rem;
    flex: 1 0;
    border-radius: 1rem;

    overflow-y: auto;

    background-color: ${colors.gray_bg};

    @media (max-width: 1500px) {
        padding: 0.8rem 1rem;
    }
`;

    const TextAreaBox = styled.div`
        height: 100%;
        width: 100%;
    
        overflow-y: auto;
    `;

        const textAreaCustomCSS = css`
            word-spacing: 0.125rem;
        `;


/* React Component */
const RoomDescriptionBox = ({storeCarpoolData}) => {

    return (
        <WholeBox>
            <TextAreaBox>
                <UitdaTextArea
                    size='100%'
                    placeHolder="추가 정보를 입력하세요."
                    isUnderLine={false}
                    isFullHeight={true}
                    customCSS={textAreaCustomCSS}
                    data_key={DESCRIPTION}
                    storeDataFunc={storeCarpoolData}
                />
            </TextAreaBox>
        </WholeBox>
    )
}

RoomDescriptionBox.propTypes = {
    storeCarpoolData: PropTypes.func.isRequired,    // Carpool 탭의 Room Info Data를 저장하는 메서드
}

export default RoomDescriptionBox