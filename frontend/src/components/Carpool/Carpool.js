

// 상위 컴포넌트: CarpoolContainer

import React, { Component } from "react";
import styled from 'styled-components';

import { BaseCalendar } from "../Base_Components";
import { MenuBox, DateInfoBox } from "./SubComponents";
import { colors } from "../../styles/variables";
import { CARPOOL } from "../../constants/categories";

/* Styled Components */

/* 전체 배경 영역 div 태그 */
const BackGroundDiv = styled.div`
    width: 100%;
    min-width: 1280px;
    min-height: ${props => `${props.windowHeight}px`};
    padding-left: 15rem;
    background-color: ${colors.gray_bg};

    display: flex;

`;

/* 전체 모든 Box들의 영역을 나타내는 div 태그 */
const ContentArea = styled.div`
    width: 90%;
    min-width: 1030px;
    margin: 1.5rem auto;

    display: flex;
    flex-flow: column nowrap;

    @media (max-width: 1500px) {
        margin: 1rem auto;
    }
`;

/* 하단 CalendarBox + InfoBox 영역 */
const CalendarInfoArea = styled.div`
    margin-top: 1.5rem;
    flex: 1;
    
    display: flex;
    flex-flow: row nowrap;

    @media (max-width: 1500px) {
        margin-top: 0.75rem;
    }
`;

/*  */
const CalendarBox = styled.div`
    flex: 1;
    margin-right: 1.5rem;

    background-color: ${colors.white};

    @media (max-width: 1500px) {
        margin-right: 0.75rem;
    }
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
                <ContentArea >
                    <MenuBox />

                    <CalendarInfoArea>
                        <CalendarBox >
                            {/* <BaseCalendar 
                                category={CARPOOL}
                            /> */}
                        </CalendarBox>
                        
                        <DateInfoBox />
                    </CalendarInfoArea>

                </ContentArea>
            </BackGroundDiv>
        )
    }
}


export default Carpool;