

import React from 'react';
import styled from 'styled-components';

import { ProfileBoxSubTitle } from "../ManageProfile";
import { colors } from "../../../../../../styles/variables";


/* Styled Components */
const WholeBox = styled.div`
    flex: 1;
    height: 100%;
`;

    const TempBox = styled.div`
        height: 100%;

        color: ${colors.font_lightgray};

        display: flex;
        align-items: center;
        justify-content: center;
    `;

/* React Component */
const PhotoEditBox = () => {

    return (
        <WholeBox>
            <ProfileBoxSubTitle>유잇다 이용내역</ProfileBoxSubTitle>
            <TempBox>
                준비중입니다...
            </TempBox>
        </WholeBox>
    )
}

export default PhotoEditBox;