

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { UserPhoto } from "../../../../Structure/CommonComponents";
import { BorderBoxStyle } from "../../../../../styles/CommonCSS";
import { colors } from '../../../../../styles/variables'

/* Styled Components */
const BoxArea = styled.div`
    margin-bottom: 2rem;
    padding: 1rem;

    width: 100%;
    height: 16rem;

    ${BorderBoxStyle}

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
`;

    /* 사진이 들어가는 동그란 영역 */
    const UserPhotoBox = styled.div`
        margin-bottom: 1rem;
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        border: 1px solid ${colors.gray_line};

        overflow: hidden;
    `;

    /* User Email */
    const Email = styled.div`
        font-size: 0.875rem;
        color: ${colors.font_gray};
        cursor: default;
    `;

    /* User Name이 들어가는 공간 */
    const UserName = styled.div`
        margin-top: 0.5rem;
        font-size: 1.125rem;
        cursor: default;
    `;


const PictureBox = ({curUser}) => {

    return (
        <BoxArea>
            <UserPhotoBox>
                <UserPhoto size={128} imgURL={curUser.pic_location} />
            </UserPhotoBox>
            <Email>{curUser.email}</Email>
            <UserName>{curUser.username}</UserName>
        </BoxArea>
    )
}

PictureBox.propTypes = {
    curUser: PropTypes.object.isRequired,   // 유저 정보
}

export default PictureBox;