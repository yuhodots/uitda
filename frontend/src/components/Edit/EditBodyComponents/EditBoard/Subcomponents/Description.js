

import React from 'react';
import styled, { css } from 'styled-components';
import { Input } from 'antd';
import PropTypes from 'prop-types';

import { colors } from '../../../../../styles/variables'
import { UitdaTextArea } from "../../../../Structure/CommonComponents";
import { DESCRIPTION } from "../../../../../constants/edit_Input_Data_Keys";


/* Styled Components */
const DescriptionBox = styled.div`
    width: 100%;
    border-top: 0.75px solid ${colors.gray_line};
`

    const DescriptionStyle = css`
        padding-top: 3rem;
        min-height: 15rem !important;

        font-size: 1rem;
    `;


/* React Component */
const Description = ({description, storeBoardData}) => {
    return (
        <DescriptionBox>
            <UitdaTextArea 
                size='100%'
                defaultText={description}
                placeHolder="설명을 입력 하세요."
                isUnderLine={false}
                isFullHeight={true}
                data_key={DESCRIPTION}
                storeDataFunc={storeBoardData}
                customCSS={DescriptionStyle}
            />
        </DescriptionBox>
    )
}

Description.propTypes = {
    description: PropTypes.string,
    storeBoardData: PropTypes.func.isRequired,   // Description 데이터를 App State로 저장하는 함수
}

Description.defaultProps = {
    description: ''
}

export default Description;