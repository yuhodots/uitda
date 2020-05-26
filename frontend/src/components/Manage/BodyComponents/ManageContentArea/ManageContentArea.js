

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
    ErrorPage,
    ManagePost,
    ManageProfile,
    SendFeedback,
} from '../ManageContents';
import {
    MANAGE_PROFILE,
    MANAGE_POSTS_MARKET,
    MANAGE_POSTS_NETWORKING,
    // MANAGE_COMMENTS,
    // MANAGE_LIKEPOSTS,
    MANAGE_CONTACT,
} from '../../../../constants/manage_category'
import { MARKET, NETWORKING} from '../../../../constants/categories'


/* Styled Components */
/* Content 영역을 나타내는 div 태그 */
const ContentBoxArea = styled.div`
    margin: 0;
    padding: 0;

    flex: 4;
`;


class ManageContentArea extends Component {


    /* Manage 카테고리에 따라 해당 컴포넌트 렌더 */
    _renderContent = (kind) => {

        const {
            curUser,

            /* Profile */
            uploadedProfileImage,
            isDeleteProfileImage,
            uploadProfileImage,
            deleteUploadedProfileImage,
            initProfileImage,
            postProfileUpdateRequest,
            postProfileCreateRequest,
            postProfileDeleteRequest,

            /* Posts */
            postList,
            deletePost,
            updatePostCondition,

            /* Feedback */
            postFeedbackDone,
            feedbackData,
            storeFeedbackData,
            postFeedBack,
        } = this.props;

        let board;          // Market or Networking
        
        switch (kind) {
            case MANAGE_PROFILE:
                return (
                    <ManageProfile 
                        curUser={curUser}
                        uploadedProfileImage={uploadedProfileImage}
                        isDeleteProfileImage={isDeleteProfileImage}
                        uploadProfileImage={uploadProfileImage}
                        deleteUploadedProfileImage={deleteUploadedProfileImage}
                        initProfileImage={initProfileImage}
                        postProfileUpdateRequest={postProfileUpdateRequest}
                        postProfileCreateRequest={postProfileCreateRequest}
                        postProfileDeleteRequest={postProfileDeleteRequest}
                    />
                )

            case MANAGE_POSTS_MARKET: board = MARKET;
            // eslint-disable-next-line 
            case MANAGE_POSTS_NETWORKING:
                board = board ? MARKET : NETWORKING;
                return (
                    <ManagePost 
                        board={board} 
                        postList={postList}
                        deletePost={deletePost}
                        updatePostCondition={updatePostCondition}
                    />
                )

            case MANAGE_CONTACT: 
                return (
                    <SendFeedback 
                        feedbackData={feedbackData}
                        postFeedbackDone={postFeedbackDone}
                        postFeedBack={postFeedBack}
                        storeFeedbackData={storeFeedbackData}
                    />
                )

            default: return <ErrorPage />
        }
    }


    render() {

        const {
            isLoading,
            kind
        } = this.props
    
        return (
            <ContentBoxArea>
            {
                isLoading ?
                <div>loading</div> :
                this._renderContent(kind)
            }
            </ContentBoxArea>
        )
    }
}

ManageContentArea.propTypes = {
    isLoading: PropTypes.bool.isRequired,                   // Manage 컨텐츠의 항목이 loading중인지 여부
    curUser: PropTypes.object.isRequired,                   // 현재 로그인된 유저 정보
    kind: PropTypes.string.isRequired,                      // 메니지 카테고리 정보
    
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

export default ManageContentArea;