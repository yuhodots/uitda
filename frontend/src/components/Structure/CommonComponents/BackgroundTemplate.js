/* 회색 바탕과 window 크기에 맞는 min-height, min-width 스타일을 갖는 배경 컴포넌트
   Manage, Edit, Board, Detail, Carpool, Chatting 페이지에서 사용되고,
   ContentComponent를 받아서 렌더하고, min-height, min-width는 custom 값을 받을 수 있다. */

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { colors } from "../../../styles/variables";


/* Styled Components */
const BackgroundArea = styled.div`

    min-height: ${props => props.heightValue}px;
    min-width: ${props => props.widthValue}px;

    background-color: ${colors.gray_bg};
`;



/* React Component */
class BackgroundTemplate extends Component {

    state = {}

    componentDidMount() {
        window.addEventListener('resize', this._updateWindowSize);
        this._updateWindowSize()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._updateWindowSize);
    }

    _updateWindowSize = () => {
        this.setState({
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
        })
    }

    render() {

        const { windowHeight, windowWidth } = this.state;
        const { customHeight, customWidth } = this.props;

        const heightValue = customHeight ? customHeight : windowHeight;
        const widthValue = customWidth ? customWidth : windowWidth;

        return (
            <BackgroundArea heightValue={heightValue} widthValue={widthValue} >

            </BackgroundArea>
        )
    }
}


BackgroundTemplate.propTypes = {
    ContentComponent: PropTypes.node.isRequired,    // Background 내부에 들어가는 컨텐츠 컴포넌트

    customHeight: PropTypes.number,                 // window Height가 아닌 커스텀 값의 높이인 경우
    customWidth: PropTypes.number,                  // window Width가 아닌 커스텀 값의 길이인 경우
}

BackgroundTemplate.defaultProps = {
    customHeight: 0,
    customWidth: 0,
}

export default BackgroundTemplate;