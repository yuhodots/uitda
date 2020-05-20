

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from "antd";

import PhotoUpload from './PhotoUpload'
import { ProfileBoxSubTitle } from "../ManageProfile";
import { colors } from "../../../../../../styles/variables";


/* Styled Components */
const WholeBox = styled.div`
    position: relative;
    flex: 2;
    height: 100%;

    display: flex;
    flex-flow: column nowrap;
`;

    const SubInfoText = styled.div`
        font-size: 0.875rem;
        color: ${colors.font_lightgray};
    `;

    const ProfileContainer = styled.div`
        /* margin: 2rem 0 0; */
        align-self: center;
    
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    `;

        const PhotoContainer = styled.div`
            margin: 2rem 0 1.5rem;
            width: 18rem;
            height: 18rem;
            
            border-radius: 50%;
            border: 1px solid ${colors.gray_line};

            overflow: hidden;
        `;

        const UserEmail = styled.div`
            margin-bottom: 0.5rem;
            
            font-size: 0.875rem;
            color: ${colors.font_lightgray};

            cursor: default;
        `;

        const UserName = styled.div`
            font-size: 1rem;
            color: ${colors.font_darkgray};

            cursor: default;
        `;


    const ButtonContainer = styled.div`
        position: absolute;
        right: 0;
        bottom: 0.5rem;

        display: flex;
        flex-flow: row nowrap;
        align-items: flex-end;
    `;

        const StyledButton = styled(Button)`
            margin-left: 0.5rem;
            padding: 0rem 1rem;

            font-size: 0.75rem;
        `;



/* React Component */
const PhotoEditBox = (props) => {

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

    const { username, email, pic_location } = curUser

    const isPhotoChanged = uploadedProfileImage || isDeleteProfileImage;

    console.log(uploadedProfileImage);

    /* 변경 데이터를 Backend에 POST 요청을 통해 전달하는 함수 */
    const handlePost = () => {
        /* 업로드한 사진이 있고 이미 프로필이 있으면 update 요청,
           업로드한 사진이 있고 프로필 사진도 없으면 create 요청, 
           업로드한 사진이 없으면 delete 요청 */
        if ( uploadedProfileImage ) { 
            if (pic_location) { postProfileUpdateRequest(uploadedProfileImage) }
            else { postProfileCreateRequest(uploadedProfileImage) }
        }
        else { postProfileDeleteRequest(email) }
        window.location.reload();
    }

    return (
        <WholeBox>
            <ProfileBoxSubTitle>프로필 사진 관리</ProfileBoxSubTitle>
            <SubInfoText>클릭 또는 드레그를 통해 사진을 추가 / 변경할 수 있습니다.</SubInfoText>

            <ProfileContainer>
                <PhotoContainer>
                    <PhotoUpload 
                        userPhoto={pic_location} 
                        uploadedProfileImage={uploadedProfileImage}
                        isDeleteProfileImage={isDeleteProfileImage}
    
                        uploadProfileImage={uploadProfileImage}
                        deleteUploadedProfileImage={deleteUploadedProfileImage}/>
                </PhotoContainer>
                <UserEmail> {email} </UserEmail>
                <UserName> {username} </UserName>
            </ProfileContainer>

        {
            isPhotoChanged &&
            <ButtonContainer>
                <StyledButton shape='round' danger onClick={initProfileImage} >취소</StyledButton>
                <StyledButton shape='round' onClick={handlePost} >저장</StyledButton>
            </ButtonContainer>
        }
        </WholeBox>
    )
}

PhotoEditBox.propTypes = {
    curUser: PropTypes.object.isRequired,                   // 현재 로그인된 유저 정보
    uploadedProfileImage: PropTypes.oneOfType([             // 업로드한 프로필 사진
        PropTypes.string,
        PropTypes.object
    ]),
    isDeleteProfileImage: PropTypes.bool.isRequired,        // 프로필 사진을 delete 했는 지 여부

    uploadProfileImage: PropTypes.func.isRequired,          // 사진 업로드 액션
    deleteUploadedProfileImage: PropTypes.func.isRequired,  // 업로드 된 사진을 지우는 액션
    initProfileImage: PropTypes.func.isRequired,            // 프로필 사진 초기화 액션
    postProfileCreateRequest: PropTypes.func.isRequired,    // 프로필 사진 생성 POST 요청 메서드
    postProfileUpdateRequest: PropTypes.func.isRequired,    // 프로필 사진 업데이트 POST 요청 메서드
    postProfileDeleteRequest: PropTypes.func.isRequired,    // 프로필 사진 삭제 POST 요청 메서드
}

export default PhotoEditBox;