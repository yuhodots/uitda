// 

// 상위 컴포넌트: MarketContainer, NetworkContainer

import React from "react";
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';

import { colors } from '../../../../styles/variables';


/* Styled Components */

/* 아이콘 영역
   isHeaderOn 일 때는 visible: hidden이고,
   반대의 경우 visible한 상탳이다.  */
const CircleArea = styled.div`
    width: 3.5rem;
    height: 3.5rem;
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    border-radius: 50%;
    background-color: ${colors.blue};
    cursor: pointer;

    /* 세로 가로 가운데 정렬 */
    display: flex;
    align-items: center;
    justify-content: center;

    /* props에 따른 visible 및 opacity 값 */
    opacity: 0.85;
    visibility: visible;

    ${props =>
      props.isHeaderOn && 
      css`
        opacity: 0;
        visibility: 'hidden';
      `};

    transition: opacity 0.3s;
`;

const StyledIcon = styled(SearchOutlined)`
    color: ${colors.white};
    font-size: 1.25rem;
    font-weight: bold;
    opacity: 1;
`;


/* React Compoent */
const SearchIcon = ({isHeaderOn, headerOn}) => {
    return (
        <CircleArea
            isHeaderOn={isHeaderOn}
            onClick={headerOn}
        >
            <StyledIcon />
        </CircleArea>
    )
}

SearchIcon.propTypes = {
    isHeaderOn: PropTypes.bool.isRequired,      // 헤더 나타나 있는지 여부
    
    headerOn: PropTypes.func.isRequired,        // 헤더가 나타나도록 하는 메서드
}

export default SearchIcon;