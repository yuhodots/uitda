

import React, { Component } from 'react';
import styled from 'styled-components';
import { Spin } from "antd";

import { colors } from '../../styles/variables';

/* Styled Components */

const BackgroundDiv = styled.div`
    width: 100%;
    min-height: ${ props => `${props.minHeight}px` };
    background-color: ${colors.gray_bg};

    display: flex;
    justify-content: center;
    align-items: center;
`;

/////////////////////////

class ExceptionalPage extends Component {

    state = {}

    componentDidMount() {
        this.setState({
            clientHeight: document.documentElement.clientHeight     // 현재 창의 높이 크기
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
            clientHeight: document.documentElement.clientHeight
        })
    }


    render() {

        const { clientHeight } = this.state;

        return (
            <BackgroundDiv minHeight={clientHeight} >
                <Spin 
                    tip="loading..."
                    size="large"
                />
            </BackgroundDiv>
        )
    }
}

export default ExceptionalPage;


