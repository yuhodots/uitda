

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import CategoryBox from './CategoryBox'
import PictureBox from './PictureBox'

/* Styled Components */
const SideArea = styled.div`
    margin-right: 2rem;

    flex: 1;

    display: flex;
    flex-flow: column nowrap;
`;

/* React Component */
const ManageSideBox = ({curUser, kind}) => {
    return (
        <SideArea>
            <PictureBox 
                curUser={curUser}
            />
            <CategoryBox 
                kind={kind}
            />
        </SideArea>
    )
}

ManageSideBox.propTypes = {
    curUser: PropTypes.object.isRequired,   // 유저 정보
    kind: PropTypes.string.isRequired,      // 매니지 카테고리 정보
}

export default ManageSideBox;