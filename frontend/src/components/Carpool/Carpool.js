

// 상위 컴포넌트: CarpoolContainer

import React, { Component } from "react";
import styled from 'styled-components';

import { colors } from "../../styles/variables";

/* Styled Components */

const BackGroundDiv = styled.div`
    width: 100%;
    min-height: ${props => `${props.windowHeight}px`};
    padding-left: 15rem;
    background-color: ${colors.gray_bg};
`;


/* React Component */
class Carpool extends Component {

    state = {}

    componentDidMount() {
        this.setState({
            windowHeight: window.innerHeight     // 현재 창의 높이 크기
        })

        /* 브라우저 창의 크기가 변하는 이벤트를 감지한다. */
        window.addEventListener('resize', this._handleResize) 
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize)
    }

    _handleResize = (e) => {
        this.setState({
            ...this.state,
            windowHeight: window.innerHeight
        })
    }


    render() {

        const { windowHeight } = this.state;

        return (
            <BackGroundDiv windowHeight={windowHeight} >

            </BackGroundDiv>
        )
    }
}


export default Carpool;