

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Divider } from "antd";

import { PhotoEditBox, UsageHistoryBox } from './Subcomponents'
import { ContentHeader } from "../CommonComponents";
import { ContentBoxStyle, BoxSubtitleStyle } from '../CommonComponents/CommonCSS'
import { BorderBoxStyle } from '../../../../../styles/CommonCSS';


/* Styled Components */
const WholeBox = styled.div`
    ${ContentBoxStyle}
    height: 100%;
`;

    const ProfileBox = styled.div`
        ${BorderBoxStyle}
        height: 100%;
        width: 100%;
        padding: 2rem;

        display: flex;
        flex-flow: row nowrap;
    `;

    const VerticlaDivider = styled(Divider)`
        margin: 0 2rem;
        height: 100%;
    `;

    export const ProfileBoxSubTitle = styled.div`
        ${BoxSubtitleStyle}
    `;


/* React Component */
const ManageProfile = (props) => {

    const {
        curUser,
        uploadedProfileImage,
        isDeleteProfileImage,

        uploadProfileImage,
        deleteUploadedProfileImage,
        initProfileImage,
        postProfileCreateRequest,
        postProfileUpdateRequest,
        postProfileDeleteRequest,
    } = props;

    const title = '회원 정보 관리'

    return (
        <WholeBox>
            <ContentHeader title={title} />
            <ProfileBox>
                <PhotoEditBox 
                    curUser={curUser} 
                    uploadedProfileImage={uploadedProfileImage}
                    isDeleteProfileImage={isDeleteProfileImage}

                    uploadProfileImage={uploadProfileImage}
                    deleteUploadedProfileImage={deleteUploadedProfileImage}
                    initProfileImage={initProfileImage}
                    postProfileCreateRequest={postProfileCreateRequest}
                    postProfileUpdateRequest={postProfileUpdateRequest}
                    postProfileDeleteRequest={postProfileDeleteRequest}
                />
                <VerticlaDivider type='vertical' />
                <UsageHistoryBox />
            </ProfileBox>
        </WholeBox>
    )
}

ManageProfile.propTypes = {
    curUser: PropTypes.object.isRequired,                   // 현재 로그인된 유저 정보
    uploadedProfileImage: PropTypes.oneOfType([             // 업로드한 프로필 사진
        PropTypes.string,
        PropTypes.object
    ]),
    isDeleteProfileImage: PropTypes.bool.isRequired,        // 프로필 사진을 delete 했는 지 여부

    uploadProfileImage: PropTypes.func.isRequired,          // 사진 업로드 액션
    deleteUploadedProfileImage: PropTypes.func.isRequired,  // 업로드 된 사진을 지우는 액션
    initProfileImage: PropTypes.func.isRequired,            // 프로필 사진 초기화 액션
    postProfileUpdateRequest: PropTypes.func.isRequired,    // 프로필 사진 업데이트 POST 요청 메서드
    postProfileCreateRequest: PropTypes.func.isRequired,    // 프로필 사진 생성 POST 요청 메서드
    postProfileDeleteRequest: PropTypes.func.isRequired,    // 프로필 사진 삭제 POST 요청 메서드
}

export default ManageProfile;