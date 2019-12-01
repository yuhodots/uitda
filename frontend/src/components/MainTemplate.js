// 상위 컴포넌트: App.js

/* Home, Board, Carpool 페이지의 템플릿 */

import React from 'react';
import styled from 'styled-components';
import { Route } from "react-router-dom"

import { 
    Home,
    Board,
    Carpool,
} from "../pages";

import SideBarContainer from "../containers/SideBarContainer";
import HeaderContainer from '../containers/HeaderContainer';


/* Styled Component */

const ContentArea = styled.div`
    margin-left: 15rem;
    position: relative;
`


/* React Component */

const MainTemplate = ({kind}) => {

    let content;

    switch(kind) {
        case 'Home':
            content = Home;
            break;

        case 'Board':
            content = Board;
            break;
        
        case 'Carpool':
            content = Carpool;
            break;

        default:
            content= Home;
    }

    return (
        <div>
            <HeaderContainer />
            <ContentArea>
                <SideBarContainer />
                <Route component={content} />
            </ContentArea>
        </div>
    )
}

export default MainTemplate;