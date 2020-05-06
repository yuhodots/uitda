// 상위 컴포넌트: components/BoardDetail.js

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Divider } from "antd";

import { CommentBranch, CommentInput } from './Comment_Materials'
import { colors } from "../../../styles/variables";

/* Styled Components */

/* CommentBox 영역 div */
const CommentArea = styled.div`
    position: relative;
    margin-bottom: 1rem;
    padding: 1.5rem 1rem;
    width: 100%;
    min-height: 10rem;

    border-radius: 8px;
    background-color: ${colors.gray_bg};

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
`;

    /* 댓글 갯수의 정보 + 작성자에게 메시지 보내기 링크 태그 */
    const CommentHeader = styled.div`
        width: 100%;
        margin-bottom: 1.5rem;
        height: 2rem;

        line-height: 2rem;
        font-size: 1.5rem;
    `;

    /* CommentInput 아래의 마감 선*/
    const InputDivider = styled(Divider)`
        height: 2px;
    `;

/////////////////////////////////////////

/* React Components */

class CommentBox extends Component {

    // 더보기 상태 (isMoreSee) 추가

    componentDidMount() {
    }

    // map을 이용해 Comment Array 데이터를 render하는 함수
    _renderComments = (commentList) => {

        const { 
            curUser,
            board,
            post_id,
            boardSocket,
        } = this.props;

        return commentList.map( (comment) => {
            const {
                id, user, created,
                description,
                subCommentList
            } = comment;

            return (
                <CommentBranch
                    curUser={curUser}
                    board={board} post_id={post_id}
                    boardSocket={boardSocket}

                    comment_id={id} key={id}
                    user={user} created={created}
                    description={description}
                    subCommentList={subCommentList}
                />
            )
        })
    }

    render() {

        const { 
            boardSocket,
            curUser,

            board,
            post_id,
            commentList,
        } = this.props;
        const numOfComments = commentList.length;

        return (
            <CommentArea>
                
                {/* 댓글 개수 + 작성자에게 메시지 보내기 */}
                <CommentHeader>
                    {numOfComments} 개의 댓글
                </CommentHeader>

                {/* 댓글 작성 란 */}
                <CommentInput 
                    isSubComment={false} 
                    
                    boardSocket={boardSocket}
                    curUser={curUser}

                    board={board}
                    post_id={post_id}
                />

                {/* 댓글 입력란 밑의 영역 및 흰색 선 */}
                {/* <BottomOfInputDiv /> */}
                <InputDivider />
                
                {/* 댓글 render */}
                {
                    numOfComments ?
                    this._renderComments(commentList) :
                    '아직 댓글이 없습니다.'
                }

                {/* //////////////////////////// */}
            </CommentArea>
        )
    }
}


CommentBox.propTypes = {
    boardSocket: PropTypes.object.isRequired,       // Board Socket
    curUser: PropTypes.object.isRequired,           // 로그인한 유저 정보

    board: PropTypes.string.isRequired,             // 게시판 정보
    post_id: PropTypes.number.isRequired,           // 포스팅 id          
    commentList: PropTypes.array.isRequired,        // 댓글 데이터를 가지고 있는 array
}

// CommentBox.defaultProps = {
//     commentList: []
// }

export default CommentBox;