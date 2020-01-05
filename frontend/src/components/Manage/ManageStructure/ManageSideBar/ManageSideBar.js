

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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


class ManageSideBox extends Component {



    render () {

        const {
            user,
            kind,    
        } = this.props

        return (
            <SideArea>
                <PictureBox 
                    user={user}
                />
                <CategoryBox 
                    kind={kind}
                />
            </SideArea>
        )
    }
}

ManageSideBox.propTypes = {
    // user: PropTypes.object.isRequired,      // 유저 정보
    kind: PropTypes.string.isRequired,      // 매니지 카테고리 정보
}

export default ManageSideBox;