

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { colors } from "../../../../../styles/variables";

/* Styled Components */
const StyledH3 = styled.h3`
    margin: 0;
    margin-right: 1rem;
    width: 5.5em;
    
    font-weight: bold;
    
    /* 노트북 사이즈 */
    @media (max-width: 1500px) {
        font-size: 1rem;
    }
`;

const RedStar = styled.span`
    color: ${colors.font_red};
`;


/* React Component */

const RoomSubtitle = ({content, redStar}) => {
    return (
        <StyledH3>
            {content} 
            { redStar ? <RedStar> * </RedStar> : '' }
        </StyledH3>
    )
}

RoomSubtitle.propTypes = {
    content: PropTypes.string.isRequired,       // subtitle 내용
    redStar: PropTypes.bool,                    // Red Star 유무 여부
}

RoomSubtitle.defaultProps = {
    redStar: false,
}

export default RoomSubtitle;