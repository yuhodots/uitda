// 상위 컴포넌트: pages/manage.js


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

/* Components */
import { ManageBody, ManageHeader, ManageFooter } from '../components/Manage'

/* Actions */
import {
    getMyProfileRequest,
    uploadProfileImage,
    deleteUploadedProfileImage,
    initProfileImage,
    getMyPostRequest,               // Posts GET request 함수
    deletePostRequest,              // Post Delete Post request 함수  
    updatePostConditionRequest,
    postProfileUpdateRequest,
    postProfileCreateRequest,
    postProfileDeleteRequest,
    initFeedbackPage,
    storeFeedbackData,
    postFeedBackRequest,
    /* 임시 */
    tempFunc,
} from '../store/actions/manage'
import { getStatusRequest, localLogoutRequest, outlookLogoutRequest } from '../store/actions/auth'

/* Constants */
import {
    MANAGE_PROFILE,
    MANAGE_POSTS_MARKET,
    MANAGE_POSTS_NETWORKING,
    MANAGE_COMMENTS,
    MANAGE_LIKEPOSTS,
    MANAGE_CONTACT,
} from '../constants/manage_category'
import {
    MARKET,
    NETWORKING,
} from '../constants/categories'


class ManageContainer extends Component {

    state = {}

    componentDidMount() {
        const {
            kind,
            getStatusRequest,
            getMyProfile,
            getMyPostRequest,
            initFeedbackPage,

            /* 임시 */
            tempFunc,
        } = this.props

        let board;

        getStatusRequest();

        switch(kind) {

            /* 계정 관리 */
            case MANAGE_PROFILE:
                getMyProfile();
                break;

            /* 게시글 관리 */
            case MANAGE_POSTS_MARKET:
                board = MARKET;
                // eslint-disable-next-line
            case MANAGE_POSTS_NETWORKING:
                board = board ? MARKET : NETWORKING;

                getMyPostRequest(board);
                break;

            /* 내 카풀 일정 */
            case MANAGE_CONTACT:
                initFeedbackPage();
                break;

            /* 댓글단 게시글 보기 */
            case MANAGE_COMMENTS:
                // eslint-disable-next-line

            /* 좋아요 표시한 게시글 */
            case MANAGE_LIKEPOSTS:
                // eslint-disable-next-line


            /* kind가 post인 경우 */
            default:
                tempFunc()
                break;
        }

        /* window size 변경 시, 변경된 사이즈를 state에 저장함 */
        window.addEventListener('resize', this._updateWindowSize)
        this._updateWindowSize()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._updateWindowSize)
    }

    /* window 사이즈를 update */
    _updateWindowSize = () => {
        this.setState({
            ...this.state,
            windowHeight: window.innerHeight
        })
    }


    render() {

        const {
            isGetStatusDone,
            curUser,
            kind,

            isGetManageItemsDone,
            isManageItemsLoading,

            uploadedProfileImage,
            isDeleteProfileImage,

            postList,

            postFeedbackDone,
            feedbackData,

            localLogoutRequest,
            outlookLogoutRequest,
            deletePostRequest,
            updatePostConditionRequest,
            uploadProfileImage,
            deleteUploadedProfileImage,
            initProfileImage,
            postProfileUpdateRequest,
            postProfileCreateRequest,
            postProfileDeleteRequest,
            storeFeedbackData,
            postFeedBack,
        } = this.props;
    
        const { windowHeight } = this.state;

        const isLoaded = isGetStatusDone && isGetManageItemsDone;

        return(
            <div>
            {
                isLoaded ?
                
                    curUser ? 
                    <div style={{ minWidth:'1230px', position: 'relative' }} >
                        <ManageHeader
                            curUser={curUser}
                            localLogoutRequest={localLogoutRequest}
                            outlookLogoutRequest={outlookLogoutRequest}
                        />
                        <ManageBody 
                            curUser={curUser}
                            kind={kind}
                            windowHeight={windowHeight}
                            isLoading={isManageItemsLoading}
                            uploadedProfileImage={uploadedProfileImage}
                            isDeleteProfileImage={isDeleteProfileImage}
                            postList={postList}
                            postFeedbackDone={postFeedbackDone}
                            feedbackData={feedbackData}

                            deletePost={deletePostRequest}
                            updatePostCondition={updatePostConditionRequest}
                            uploadProfileImage={uploadProfileImage}
                            deleteUploadedProfileImage={deleteUploadedProfileImage}
                            initProfileImage={initProfileImage}
                            postProfileUpdateRequest={postProfileUpdateRequest}
                            postProfileCreateRequest={postProfileCreateRequest}
                            postProfileDeleteRequest={postProfileDeleteRequest}
                            storeFeedbackData={storeFeedbackData}
                            postFeedBack={postFeedBack}
                        /> 
                        <ManageFooter />
                    </div> :
                    <Redirect to='/' />:

                '로딩 중'
            }
            </div> 
        )
    }

}

ManageContainer.propTypes = {
    kind: PropTypes.string,
}

const mapStateToProps = (state) => {
    return {
        curUser: state.auth.user,                                   // 유저 정보
        isGetStatusDone: state.auth.isGetStatusDone,                // get status 요청 완료 여부

        isGetManageItemsDone: state.manage.isGetManageItemsDone,    // Manage 페이지의 GET 요청 완료 여부
        isManageItemsLoading: state.manage.isManageItemsLoading,    // Manage 페이지에서 로딩중을 띄우는 지 여부

        uploadedProfileImage: state.manage.uploadedProfileImage,    // 업로드한 프로필 사진
        isDeleteProfileImage: state.manage.isDeleteProfileImage,    // 프로필 사진을 delete 했는 지 여부

        postList: state.manage.postList,                            // Posts GET 요청을 통해 얻은 post list

        feedbackData: state.manage.feedbackData,                    // 피드백 데이터
        postFeedbackDone: state.manage.postFeedbackDone,            // 피드백 데이터 POST 요청 완료 여부
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {dispatch(getStatusRequest())},                         // 접속된 유저 정보를 요청하는 액션
        localLogoutRequest: () => dispatch(localLogoutRequest()),                       // 로그아웃 액션
        outlookLogoutRequest: () => dispatch(outlookLogoutRequest()),                   // 아웃룩 로그아웃 메서드

        getMyProfile: () => dispatch(getMyProfileRequest()),
        uploadProfileImage: (file) => dispatch(uploadProfileImage(file)),               // 사진 업로드 액션
        deleteUploadedProfileImage: () => dispatch(deleteUploadedProfileImage()),       // 업로드 된 사진을 지우는 액션
        initProfileImage: () => dispatch(initProfileImage()),                           // 프로필 사진 초기화 액션
        postProfileUpdateRequest: (file) => dispatch(postProfileUpdateRequest(file)),   // 프로필 사진 업데이트 POST 요청
        postProfileCreateRequest: (file) => dispatch(postProfileCreateRequest(file)),   // 프로필 사진 생성 POST 요청
        postProfileDeleteRequest: () => dispatch(postProfileDeleteRequest()),           // 프로필 사진 삭제 POST 요청

        getMyPostRequest: (board) => {dispatch(getMyPostRequest(board))},               // 내가 작성한 전체 Post 데이터 GET request 함수
        deletePostRequest: (board, id) => {dispatch(deletePostRequest(board, id))},     // Post Delete POST request 함수
        updatePostConditionRequest: (board, id, condition) => {                         // 포스팅의 상태 변경 POST request 메서드
            dispatch(updatePostConditionRequest(board, id, condition))
        },

        initFeedbackPage: () => dispatch(initFeedbackPage()),                           // 피드백 보내기 페이지 초기화
        storeFeedbackData: (data_key, data_value) => {                                  // 피드백 데이터 저장 메서드
            dispatch( storeFeedbackData(data_key, data_value) )
        },
        postFeedBack: (feedbackData) => dispatch(postFeedBackRequest(feedbackData)),    // 피드백 데이터 POST 요청 메서드

        /* 임시 */
        tempFunc: () => dispatch(tempFunc()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageContainer);