

import React from 'react';
import styled from 'styled-components';

import { ProfileBoxSubTitle } from "../ManageProfile";


/* Styled Components */
const WholeBox = styled.div`
    flex: 1;
    height: 100%;
`;

/* React Component */
const PhotoEditBox = () => {

    return (
        <WholeBox>
            <ProfileBoxSubTitle>유잇다 이용내역</ProfileBoxSubTitle>
        </WholeBox>
    )
}

export default PhotoEditBox;