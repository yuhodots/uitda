

import React from 'react';
import styled from 'styled-components';

import { colors } from "../../../../../../styles/variables";

/* Styled Components */
const StyledH3 = styled.h3`
    margin: 0;
    margin-right: 1rem;
    
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

export default RoomSubtitle;