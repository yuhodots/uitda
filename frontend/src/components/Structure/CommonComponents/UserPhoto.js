

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { UserBasicImage } from "../../../styles/images";


/* Styled Components */
const CircleArea = styled.div`
    height: ${props => props.size ? `${props.size}px` : '100%'};
    width: ${props => props.size ? `${props.size}px` : '100%'};

    border-radius: 50%;
    overflow: hidden;
`;

    const StyledImg = styled.img`
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: center;
    `;


/* React Component */
const UserPhoto = ({size, imgURL}) => {

    imgURL = imgURL ? imgURL : UserBasicImage;

    return (
        <CircleArea size={size}>
            <StyledImg src={imgURL} />
        </CircleArea>
    )
}

UserPhoto.propTypes = {
    size: PropTypes.number,
    imgURL: PropTypes.string,
}

UserPhoto.defaultProps = {
    size: 0,
    imgURL: ''
}

export default UserPhoto