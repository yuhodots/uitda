

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
                    />
                )
            })
        }
            <CommentInput 
                isUpdateMode={false}
                boardSocket={boardSocket} curUser={curUser}
                board={board} post_id={[post_id]}
                parent_comment={comment_id}
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
}

export default SubCommentListBox;