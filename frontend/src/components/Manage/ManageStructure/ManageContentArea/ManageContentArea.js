

import React, { Component } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    ErrorPage,
    ManagePost
} from '../../ManageContents';

/* Constants */
import {
    MANAGE_POSTS_MARKET,
    MANAGE_POSTS_NETWORKING,
    MANAGE_COMMENTS,
    MANAGE_LIKEPOSTS,
    MANAGE_MYCARPOOL,
    MANAGE_NOTIFICATIONS,
} from '../../../../constants/manage_category'

import {
    MARKET,
    NETWORKING
} from '../../../../constants/board_name'

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

        let component,      // Content Component
            isPost,         // Post
            board;          // Market or Networking

        const {
            /* Posts */
            postList,
            deletePost,
            updatePostCondition
        } = this.props;

        switch (kind) {
            case MANAGE_POSTS_MARKET:
                board = MARKET;
                // eslint-disable-next-line
            case MANAGE_POSTS_NETWORKING:
                board = board ? MARKET : NETWORKING;
                isPost = true;
                component = ManagePost;
                break;

            case MANAGE_COMMENTS:
                // break;
                // eslint-disable-next-line
            case MANAGE_LIKEPOSTS:
                // break;
                // eslint-disable-next-line
            case MANAGE_MYCARPOOL:
                // break;
                // eslint-disable-next-line
            case MANAGE_NOTIFICATIONS:
                // break;
                // eslint-disable-next-line
            default:
                component = ErrorPage;
                break;
        }

        // console.log(component, isPost, board);

        return isPost ?
        
        /* 게시글 관리 페이지 경우, 어떤 게시판인지를 알려야 함 */
        <Route component={() => {
            return <ManagePost 
                        board={board} 
                        postList={postList}
                        deletePost={deletePost}
                        updatePostCondition={updatePostCondition}
                    />
        }} /> :

        /* 그 외 카테고리는 바로 렌더하면 됨 */
        <Route component={component} />
    }


    render() {

        const {
            kind
        } = this.props
    
        return (
            <ContentBoxArea>
                { this._renderContent(kind) }
            </ContentBoxArea>
        )
    }
}

ManageContentArea.propTypes = {
    kind: PropTypes.string.isRequired,                  // 메니지 카테고리 정보

    postList: PropTypes.array,                          // Posts 데이터 리스트
    deletePost: PropTypes.func.isRequired,              // Post를 지우는 함수
    updatePostCondition: PropTypes.func.isRequired,     // 포스팅의 상태 변경 메서드
}

export default ManageContentArea;