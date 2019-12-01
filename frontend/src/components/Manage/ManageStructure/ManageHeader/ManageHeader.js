

import React, { Component } from 'react';
import styled from 'styled-components';

import {colors} from '../../../../styles/variables'

/* Styled div */
const HeaderArea = styled.div`
    height: 4rem;
    background-color: ${colors.white};

    padding-left: 2rem;
    line-height: 4rem;
`; 


class ManageHeader extends Component {

    render () {
        return (
            <HeaderArea>
                Hi, Header
            </HeaderArea>
        )
    }
}

export default ManageHeader;