/* Icon과 badge counter 값을 받아서, 해당 아이콘 및 알림 개수를 띄우는 컴포넌트 */

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { colors } from "../../../../styles/variables";


/* Styled Components */
const IconContainer = styled.div`
    position: relative;

    height: ${props => `${props.size}px`};

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
`;

    const Icon = styled.img`
        height: 100%;
        width: 100%;
    `;

    const BadgeCount = styled.div`
        position: absolute;
        top: -.35rem;
        right: -.35rem;
        height: 1rem;
        width: 1rem;

        background-color: ${colors.badge_red};
        border-radius: 50%;

        font-size: 0.5rem;
        color: ${colors.white};

        display: flex;
        justify-content: center;
        align-items: center;
    `;


/* React Component */
const IconBadge = ({size, iconPath, badgeCount, ComponentItem }) => {
    
    return (
        <IconContainer size={size} >
        {
            ComponentItem ?
            <ComponentItem /> :
            <Icon src={iconPath} />
        }
        {
            badgeCount ?
            <BadgeCount>{badgeCount}</BadgeCount> :
            ''
        }
        </IconContainer>
    )
}

IconBadge.propTypes = {
    size: PropTypes.number,                     //
    iconPath: PropTypes.string.isRequired,      //
    badgeCount: PropTypes.number,               //

    ComponentItem: PropTypes.func,              // 아이콘이 아닌 다른 컴포넌트를 render 할 경우 
}

IconBadge.defaultProps = {
    size: 24,
    badgeCount: 0,

    ComponentItem: undefined
}


export default IconBadge;