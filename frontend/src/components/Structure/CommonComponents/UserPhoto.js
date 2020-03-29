

import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { colors } from "../../../styles/variables";

/* Styled Components */

const CircleArea = styled.div`

    height: ${props => `${props.size}px`};
    width: ${props => `${props.size}px`};

    border-radius: 50%;

    background-color: ${colors.photo_defaultgray}; 
    ${props => props.imgURL && css`
        background-image: url(${props.imgURL});
    `};

    cursor: pointer;
`;



/* React Component */
const UserPhoto = ({size, imgURL}) => {


    return (
        <CircleArea size={size} imgURL={imgURL} />
    )
}

UserPhoto.propTypes = {
    size: PropTypes.number,
    imgURL: PropTypes.string,
}

UserPhoto.defaultProps = {
    size: 40,
    imgURL: ''
}

export default UserPhoto