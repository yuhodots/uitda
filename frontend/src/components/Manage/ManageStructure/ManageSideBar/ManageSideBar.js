

import React, { Component } from 'react';
import styled from 'styled-components';

import CategoryBox from './CategoryBox'
import PictureBox from './PictureBox'

/* Styled Components */
const SideArea = styled.div`

    margin-right: 2rem;

    height: 40rem;
    /* width: 14rem; */
    flex: 1;

    display: flex;
    flex-flow: column nowrap;
`;


class ManageSidebar extends Component {



    render () {

        const {
            user
        } = this.props

        return (
            <SideArea>
                <PictureBox 
                    user={user}
                />
                <CategoryBox />
            </SideArea>
        )
    }
}

export default ManageSidebar;