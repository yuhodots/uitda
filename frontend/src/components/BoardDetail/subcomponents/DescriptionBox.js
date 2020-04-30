// 상위 컴포넌트: components/BoardDetail.js

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


/* Styled Components */

const DescriptionArea = styled.div`
    padding: 2rem 1rem;
    margin-bottom: 2rem;

    font-size: 1.125rem;
`;


/* Custom Functions */
const _transString = (originStr) => {
    return originStr.split('\n').map( line => <span>{line}<br/></span>)
}

/* React Component */
const DescriptionBox = ({isPhoto, description}) => {

    return (
        <DescriptionArea isPhoto={isPhoto} >
            { _transString(description) }
        </DescriptionArea>
    )
}

DescriptionBox.propTypes = {
    description: PropTypes.string,              // description 내용
    isPhoto: PropTypes.bool.isRequired,         // 사진 글인지
}

export default DescriptionBox;