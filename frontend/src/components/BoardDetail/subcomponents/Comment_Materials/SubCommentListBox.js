

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { CommentItem, CommentInput } from "./";

/* Styled Components */
const WholeBox = styled.div`
    margin-left: 3rem;
    margin-bottom: 1rem;

    display: flex;
    flex-flow: column nowrap;
`;

/* React Component */
const SubCommentListBox = (props) => {

    const {
        boardSocket, curUser,
        board, post_id,

        comment_id, subCommentList,

        createComment,
        updateComment,
        deleteComment,
    } = props

    return (
        <WholeBox>
        {
            subCommentList.map((subComment) => {

                const {
                    id, user,
                    description,
                    created,
                } = subComment;

                const isMine = curUser.id === user.id;

                return (
                    <CommentItem 
                        key={id}
                        boardSocket={boardSocket}
                        isRootComment={false} isMine={isMine}

                        comment_id={id} user={user}
                        description={description}
                        created={created}

                        updateComment={updateComment}
                        deleteComment={deleteComment}
                    />
                )
            })
        }
            <CommentInput 
                isUpdateMode={false}
                boardSocket={boardSocket} curUser={curUser}
                board={board} post_id={[post_id]}
                parent_comment={comment_id}

                createComment={createComment}
            />
        </WholeBox>
    )
}

SubCommentListBox.propTypes = {
    curUser: PropTypes.object.isRequired,           // 로그인한 유저 정보
    boardSocket: PropTypes.object.isRequired,       // Board Socket
    board: PropTypes.string.isRequired,             // 게시판 정보
    post_id: PropTypes.number.isRequired,           // 포스팅 id 
    comment_id: PropTypes.number.isRequired,        // 댓글 ID
    subCommentList: PropTypes.array.isRequired,     // 답글들의 데이터 array

    createComment: PropTypes.func.isRequired,       // 댓글 생성 메서드
    deleteComment: PropTypes.func.isRequired,       // 댓글 삭제 메서드
    updateComment: PropTypes.func.isRequired,       // 댓글 수정 메서드
}

export default SubCommentListBox;