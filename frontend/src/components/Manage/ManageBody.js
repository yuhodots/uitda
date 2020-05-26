


import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { SideBar, ContentArea } from './BodyComponents'
import { colors } from "../../styles/variables";


/* Styled Components */

/* Body Area를 정의하는 div 태그
   backgrond color를 가지고, 전체를 덮는 크기를 정함 */
const BodyArea = styled.div`
    margin: 0;
    padding: 6.5rem 2.5rem 5rem;

    /* 최소 높이가 50rem보다 큰 경우, 화면 크기에 맞춤 */
    min-height: ${props => {
        return props.windowHeight > 50 * 16 ?
        `${props.windowHeight}px` :
        '50rem';
    }};
    min-width: 1230px; /* 내용물을 다 담을 수 있도록 (1150px + 5rem) */

    background-color: ${colors.gray_bg};
`;

    /* Body에 들어가는 요소 (SideBox, ContentBox)를 담는 전체 Box
       가로 길이를 고정 시키고, margin을 auto로 설정해 고정된 크기의 요소를
       가운데 정렬 시켰음. (데스크탑 버전과 mobile 반응형은 나중에 고려)
    
       Side Box와 Content Box를 담는 flex box */
    const WholeBox = styled.div`
        margin: 0 auto;
        padding-bottom: 5rem;
        width: 1150px;

        display: flex;
        flex-flow: row nowrap;
    `;


/* React Component */
const ManageBody = (props) => {

    const {
        curUser,
        kind,
        windowHeight,
        isLoading,

        uploadedProfileImage,
        isDeleteProfileImage,
        
        postList,
        
        postFeedbackDone,
        feedbackData,

        uploadProfileImage,
        deleteUploadedProfileImage,
        initProfileImage,
        postProfileUpdateRequest,
        postProfileCreateRequest,
        postProfileDeleteRequest,
        deletePost,
        updatePostCondition,
        storeFeedbackData,
        postFeedBack,
    } = props;

    return (
        <BodyArea windowHeight={windowHeight} >
            <WholeBox>
                <SideBar
                    curUser={curUser}
                    kind={kind}
                />
                <ContentArea 
                    isLoading={isLoading}
                    curUser={curUser}
                    kind={kind}
                    uploadedProfileImage={uploadedProfileImage}
                    isDeleteProfileImage={isDeleteProfileImage}
                    postList={postList}
                    postFeedbackDone={postFeedbackDone}
                    feedbackData={feedbackData}

                    uploadProfileImage={uploadProfileImage}
                    deleteUploadedProfileImage={deleteUploadedProfileImage}
                    initProfileImage={initProfileImage}
                    postProfileUpdateRequest={postProfileUpdateRequest}
                    postProfileCreateRequest={postProfileCreateRequest}
                    postProfileDeleteRequest={postProfileDeleteRequest}
                    deletePost={deletePost}
                    updatePostCondition={updatePostCondition}
                    storeFeedbackData={storeFeedbackData}
                    postFeedBack={postFeedBack}
                />
            </WholeBox>
        </BodyArea>
    )
}

ManageBody.propTypes = {
    curUser: PropTypes.object.isRequired,                   // 현재 로그인된 유저 정보
    kind: PropTypes.string.isRequired,                      // 메니지 카테고리 정보
    windowHeight: PropTypes.number.isRequired,              // 화면 최소 세로 길이 정보
    isLoading: PropTypes.bool.isRequired,                   // Manage 컨텐츠의 항목이 loading중인지 여부

    uploadedProfileImage: PropTypes.oneOfType([             // 업로드한 프로필 사진
        PropTypes.string,
        PropTypes.object
    ]),
    isDeleteProfileImage: PropTypes.bool.isRequired,        // 프로필 사진을 delete 했는 지 여부
    postList: PropTypes.array,                              // Posts 데이터 리스트
    postFeedbackDone: PropTypes.bool.isRequired,            // 피드백 데이터 POST 요청 완료 여부
    feedbackData: PropTypes.object.isRequired,              // 피드백 데이터

    uploadProfileImage: PropTypes.func.isRequired,          // 사진 업로드 액션
    deleteUploadedProfileImage: PropTypes.func.isRequired,  // 업로드 된 사진을 지우는 액션
    initProfileImage: PropTypes.func.isRequired,            // 프로필 사진 초기화 액션
    postProfileUpdateRequest: PropTypes.func.isRequired,    // 프로필 사진 업데이트 POST 요청 메서드
    postProfileCreateRequest: PropTypes.func.isRequired,    // 프로필 사진 생성 POST 요청 메서드
    postProfileDeleteRequest: PropTypes.func.isRequired,    // 프로필 사진 삭제 POST 요청 메서드
    deletePost: PropTypes.func.isRequired,                  // Post를 지우는 함수
    updatePostCondition: PropTypes.func.isRequired,         // 포스팅의 상태 변경 메서드
    storeFeedbackData: PropTypes.func.isRequired,           // 피드백 데이터 저장 메서드
    postFeedBack: PropTypes.func.isRequired,                // 피드백 데이터 POST 요청 메서드
}

export default ManageBody;