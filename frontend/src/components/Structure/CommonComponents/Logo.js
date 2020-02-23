
/* 사용되는 컴포넌트: Structure/Header, Structure/Sidebar
                     ManageStructure/ManageHeader */

/* 현재 flex-flow: column; 인 경우에 렌더링이 안되는 오류가 있음.. */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { LogoColor, LogoWhite } from '../../../styles/images';

/* Styled Components */
const HomeLink = styled(Link)`
    height: 4rem;
    width: 4.5rem;
    margin: 0 3rem;

    background-image: ${ props => props.isWhite ? 
                        `url(${LogoWhite})` : `url(${LogoColor})`};
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
`

/* React Component */
const Logo = ({isWhite}) => {

    return (
        <HomeLink to='/' isWhite={isWhite} />
    )
}

Logo.propTypes = {
    isWhite: PropTypes.bool,        // logo의 테마
}

Logo.defaultProps = {
    isWhite: false
}

export default Logo;