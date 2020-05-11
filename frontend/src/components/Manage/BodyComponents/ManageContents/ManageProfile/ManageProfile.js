

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ContentHeader } from "../CommonComponents";
import { ContentBoxStyle } from '../CommonComponents/CommonCSS'


/* Styled Components */
const WholeBox = styled.div`
    ${ContentBoxStyle}
`;


/* React Component */
const ManageProfile = ({curUser}) => {

    const title = '회원 정보 관리'

    return (
        <WholeBox>
            <ContentHeader title={title} />

        </WholeBox>
    )
}

ManageProfile.propTypes = {
    curUser: PropTypes.object.isRequired,               // 현재 로그인된 유저 정보
}

export default ManageProfile;