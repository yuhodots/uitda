

import React, { Component } from 'react';
import styled from 'styled-components';

import {colors} from '../../../../styles/variables'

import CategoryBox from './CategoryBox'
import PictureBox from './PictureBox'

/* Styled Components */
const SideArea = styled.div`

    margin-right: 2rem;

    height: 40rem;
    
    flex: 1;

    display: flex;
    flex-flow: column nowrap;
`;


class ManageSidebar extends Component {



    render () {
        return (
            <SideArea>
                <PictureBox />
                <CategoryBox />
            </SideArea>
        )
    }
}

export default ManageSidebar;