

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { colors } from "../../../styles/variables";

/* Styled Components */

const CircleArea = styled.div`

    height: ${props => `${props.size}px`};
    width: ${props => `${props.size}px`};

    border-radius: 50%;

    background-color: ${colors.gray_bg}; 
`;



/* React Component */
const UserPhoto = ({size, imgURL}) => {


    return (
        <CircleArea size={size} imgURL={imgURL} >

        </CircleArea>
    )
}

UserPhoto.propTypes = {
    size: PropTypes.number.isRequired,
    imgURL: PropTypes.string,
}

UserPhoto.defaultProps = {
    imgURL: ''
}

export default UserPhoto