
// 상위 컴포넌트: BoardContainer.js

import React from "react";
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { colors } from "../../../../styles/variables";

/* Styled Components */
const LoadingBarArea = styled.div`
    height: .2rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2022;
`;

/* 색깔 있는 바 (스타일은 나중에 다시 다듬기) */
const ColorBar = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${colors.blue};
    transition: width 1s;
    /* visibility: visible; */

    ${props => !props.isLoading && css`
        width: 0;
        height: 0;
        /* visibility: hidden; */
    `}
`


/* React Component */
const LoadingBar = ({isLoading}) => {
    return (
        <LoadingBarArea >
            <ColorBar isLoading={isLoading} ></ColorBar>
        </LoadingBarArea>
    )
}

LoadingBar.propTypes = {
    isLoading: PropTypes.bool.isRequired    // 페이지 로딩 중 여부
}

export default LoadingBar;