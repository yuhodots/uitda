

import React, { Component } from 'react';
import styled from 'styled-components';

import { colors } from "../../../styles/variables";


/* Styled Components */
const MenuBoxArea = styled.div`
    padding: 1.5rem;
    width: 100%;
    height: 6rem;

    background-color: ${colors.white};
    
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    @media (max-width: 1500px) {
        height: 4rem;
        padding: 1rem;
    }
`;


class MenuBox extends Component {

    render() {

        return (
            <MenuBoxArea>
                <div>전체 일정 보기</div>
                <div>내 일정만 보기</div>
                <div>마감 일정 없애기</div>
            </MenuBoxArea>
        )
    }
}


export default MenuBox;