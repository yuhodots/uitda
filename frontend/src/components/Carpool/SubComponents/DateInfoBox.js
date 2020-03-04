

import React, { Component } from 'react';
import styled from 'styled-components';

import { colors } from "../../../styles/variables";


/* Styled Components */
const WholeBoxArea = styled.div`
    padding: 1.25rem;
    width: 18rem;

    background-color: ${colors.white};
    
    display: flex;
    flex-flow: column nowrap;

    @media (max-width: 1500px) {
        width: 15rem;
    }
`;


class DateInfoBox extends Component {

    render() {

        return (
            <WholeBoxArea>
                <div>전체 일정 보기</div>
                <div>내 일정만 보기</div>
                <div>마감 일정 없애기</div>
            </WholeBoxArea>
        )
    }
}


export default DateInfoBox;