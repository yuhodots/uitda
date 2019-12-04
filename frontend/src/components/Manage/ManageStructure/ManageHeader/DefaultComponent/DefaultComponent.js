// 상위 컴포넌트: ManageHeader


import React, { Component } from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { colors } from '../../../../../styles/variables'


/* Styled Compoents */
const ComponentArea = styled.div`
    height: 4rem;
    flex: 1;
    padding-left: 2rem;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    color: ${colors.font_darkgray};
    font-size: 0.9375rem;
`; 

const VirticleLine = styled.div`
    height: 2rem;
    width: 1px;
    background-color: ${colors.gray_line};

    margin-left: 3rem;
`

const BoardLink = styled(Link)`
    margin-left: 3rem;
    
    text-decoration: none;
    color: ${colors.font_darkgray};
`;


/* react component */
class DefaultComponent extends Component {

    render () {
        return (
            <ComponentArea>
                게시판 이동
                <VirticleLine />
                <BoardLink to='/board/market' >다판다</BoardLink>
                <BoardLink to='/board/networking' >잉력시장</BoardLink>
                <BoardLink to='/carpool' >카풀</BoardLink>
            </ComponentArea>
        )
    }
}

DefaultComponent.propTypes = {
}

export default DefaultComponent;