

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Upload } from "antd";

import { UserPhoto } from "../../../../Structure/CommonComponents";
import { colors } from '../../../../../styles/variables'
import { BoxTemplate } from '../../../../../styles/templates/manage'

/* Styled Components */
const BoxArea = styled(BoxTemplate)`
    margin-bottom: 2rem;
    padding: 1rem;

    width: 100%;
    height: 16rem;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
`;

    /* 사진이 들어가는 동그란 영역 */
    const PhotoUploadBox = styled.div`
        margin-bottom: 1rem;
        width: 8rem;
        height: 8rem;
        border-radius: 50%;

        overflow: hidden;
    `;

    /* User Name이 들어가는 공간 */
    const UserName = styled.div`
        margin-top: 0.5rem;
        font-size: 1.125rem;
    `;

    const Email = styled.div`
        /* margin-top: 0.5rem; */
        font-size: 0.875rem;
        color: ${colors.font_gray};
    `;



class PictureBox extends Component {



    render () {

        const {
            curUser
        } = this.props

        const uploadProps = {
            name: 'userfile',
            action: '/api/users/update',
        }

        return (
            <BoxArea>
                <PhotoUploadBox>
                    <Upload {...uploadProps} >
                        <UserPhoto size={128} imgURL={curUser.pic_location} />
                    </Upload>
                </PhotoUploadBox>
                <Email>{curUser.email}</Email>
                <UserName>{curUser.username}</UserName>
            </BoxArea>
        )
    }
}

PictureBox.propTypes = {
    curUser: PropTypes.object.isRequired,   // 유저 정보
}

export default PictureBox;