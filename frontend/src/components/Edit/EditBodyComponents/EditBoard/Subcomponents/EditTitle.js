

import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { TITLE } from "../../../../../constants/edit_Input_Data_Keys";
import { UitdaTextArea } from "../../../../Structure/CommonComponents";


/* Styled Components */
const TitleInputArea = styled.div`
    margin-bottom: ${props => props.isMarket ? '1rem' : '3rem' };
`;

    const TitleInputCSS = css`
        font-size: 2rem;
    `;


/* React Component */
const EditTitle = ({isMarket, title, storeBoardData}) => {
    return (
        <TitleInputArea isMarket={isMarket} >
            <UitdaTextArea 
                customCSS={TitleInputCSS}
                size='100%'
                defaultText={title}
                placeHolder="제목을 입력 하세요."
                isUnderLine={false}
                data_key={TITLE}
                storeDataFunc={storeBoardData}
            />
        </TitleInputArea>
    )
}


EditTitle.propTypes = {
    isMarket: PropTypes.bool.isRequired,
    title: PropTypes.string,
    storeBoardData: PropTypes.func.isRequired
}

EditTitle.defaultProps = {
    title: ''
}

export default EditTitle;