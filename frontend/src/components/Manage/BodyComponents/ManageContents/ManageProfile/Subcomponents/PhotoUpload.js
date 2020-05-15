

import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Upload } from "antd";
import { PlusOutlined } from '@ant-design/icons';

import { useHover } from "../../../../../../useHooks";
import { colors } from "../../../../../../styles/variables";
import './PhotoUpload.css';


const { Dragger } = Upload;

/* Styled Components */
const WholeBox = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    overflow: hidden;
`;

    const DropArea = styled(Dragger)`
        border: none !important;

        display: flex;
        align-items: center;
        justify-content: center;
    `;

        const PreviewImage = styled.div`
            width: 100%;
            height: 100%;

            background-image: ${props => `url(${props.imgURL})`};
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
        `;

        const AddPhoto = styled.div`
            margin-top: 1rem;

            display: flex;
            flex-flow: column nowrap;
            align-items: center;
        `;

            const AddText = styled.div`
                margin-top: 1rem;
                color: ${colors.font_lightgray};
            `;

    const FuncWrapper = styled.div`
        position: absolute;
        bottom: 0;
        
        height: 30%;
        width: 100%;

        visibility: ${props => props.isPhotoHover ? 'visible' : 'hidden'};

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    `;

        const FuncBox = styled.div`
            position: relative;
            flex: 1;
            height: 100%;

            background-color: ${colors.black_mask};

            cursor: pointer;

            display: flex;
            align-items: center;
            justify-content: center;
        `;

            const DeleteText = styled.div`
                position: relative;
                bottom: 0.5rem;
                left: 1rem;

                color: ${colors.white};
            `;

            const UpdateText = styled.div`
                position: relative;
                bottom: 0.5rem;
                right: 1rem;

                color: ${colors.white};
            `;

        const FuncBoxDivider = styled.div`
            width: 2px;
            height: 100%;
        `;


/* Custom Functions */
const getBase64 = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

/* React Component */
const PhotoUpload = (props) => {

    const [ isPhotoHover, setHover ] = useState(false);

    const {
        userPhoto,
        uploadedProfileImage,
        isDeleteProfileImage,

        uploadProfileImage,
        deleteUploadedProfileImage,
    } = props;

    let profilePhoto = userPhoto;
    if (uploadedProfileImage) { profilePhoto = uploadedProfileImage.preview }

    const onHover = () => setHover(true);
    const onLeave = () => setHover(false);
    const photoUploadRef = useHover(onHover, onLeave);

    const uploadProps = {
        /* 바로 업로드 되지 않도록 하고, app state에 저장하는 기능 */
        beforeUpload: async file => {
            /* preview image 생성 */
            file.preview = await getBase64(file);

            /* Object 객체인 fileobj를 만들지 않으면, 
               File 객체를 return하여 미리보기 이미지를 제대로 생성하지 못하는 오류가 생김 */
            const fileobj = {
                ...file,
                originFileObj: file,
            }

            uploadProfileImage(fileobj);
            return false;
        },

        showUploadList: false,
    };

    const isPhotoDisplay = uploadedProfileImage || (userPhoto && !isDeleteProfileImage);

    return (
        <WholeBox ref={photoUploadRef} >
            <DropArea {...uploadProps} className='profile-photo-dragger' >
            {
                isPhotoDisplay ?
                <PreviewImage imgURL={profilePhoto} /> :
                <AddPhoto>
                    <PlusOutlined />
                    <AddText> 사진을 등록하세요 </AddText>
                </AddPhoto>
            }
            </DropArea>

            {
                isPhotoDisplay &&
                <FuncWrapper isPhotoHover={isPhotoHover} >
                    <FuncBox onClick={deleteUploadedProfileImage} > <DeleteText> 지우기 </DeleteText> </FuncBox>
                    <FuncBoxDivider />
                    <FuncBox> <Upload {...uploadProps}> <UpdateText> 바꾸기 </UpdateText> </Upload> </FuncBox>
                </FuncWrapper>
            }
        </WholeBox>
    )
}

PhotoUpload.propTypes = {
    userPhoto: PropTypes.string,                            // 기존의 프로필 사진
    uploadedProfileImage: PropTypes.oneOfType([             // 업로드한 프로필 사진
        PropTypes.string,
        PropTypes.object
    ]),
    isDeleteProfileImage: PropTypes.bool.isRequired,        // 프로필 사진을 delete 했는 지 여부

    uploadProfileImage: PropTypes.func.isRequired,          // 사진 업로드 액션
    deleteUploadedProfileImage: PropTypes.func.isRequired,  // 업로드 된 사진을 지우는 액션
}

PhotoUpload.propTypes = {
    userPhoto: ''
}

export default PhotoUpload;