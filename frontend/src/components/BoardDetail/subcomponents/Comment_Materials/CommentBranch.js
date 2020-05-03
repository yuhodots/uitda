// 상위 컴포넌트: components/BoardDetail/subcomponents/CommentBox.js

import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { CommentItem, SubCommentListBox } from "./";


/* Styled Components */

/* Root Leaf + Sub Leaf 
   루트가 되는 댓글과 답글을 포함하는 div */
const WholeArea = styled.div`
    margin-bottom: 1rem;

    display: flex;
    flex-flow: column nowrap;
`;


//////////////////////////////////////

/* React Component */
const CommentBranch = ( props ) => {
    
    const [isReplySee, setReplySee] = useState(false);

    const { 
        boardSocket,
        curUser, user, comment_id, 
        description, created,
        subCommentList,

        updateComment,
        deleteComment,
    } = props;

    /* 해당 댓글 (Root) 이 로그인한 유저의 것인지 */
    const isMine = curUser.email === user.email;

    /* 답글 보기 상태 변경하는 메서드 */
    const changeReplySee = (isReplySee) => setReplySee(!isReplySee);

    return (
        <WholeArea> 

            {/* Root Comment Item */}
            <CommentItem 
                boardSocket={boardSocket}
                isRootComment={true} isMine={isMine}
                isReplySee={isReplySee}
                comment_id={comment_id} user={user}
                description={description} created={created}
                subCommentList={subCommentList}

                updateComment={updateComment}
                deleteComment={deleteComment}
                changeReplySee={changeReplySee} 
            />

            {
                /* 답글 리스트 박스 (답글들 + 답글 입력창) */
                isReplySee &&
                <SubCommentListBox />
            }
        </WholeArea>
    )
}

/* propTypes, defaultProps */
CommentBranch.propTypes = {
    curUser: PropTypes.object.isRequired,       // 로그인한 유저 정보
    boardSocket: PropTypes.object.isRequired,   // Board Socket
    board: PropTypes.string.isRequired,         // 게시판 정보
    post_id: PropTypes.number.isRequired,       // 포스팅 id          

    comment_id: PropTypes.number.isRequired,    // 댓글 ID
    user: PropTypes.object.isRequired,          // 작성자 정보
    description: PropTypes.string.isRequired,   // 댓글 데이터
    created: PropTypes.string.isRequired,       // 작성일 정보
    subCommentList: PropTypes.array,            // 답글들의 데이터 array

    createComment: PropTypes.func.isRequired,   // 댓글 생성 메서드
    deleteComment: PropTypes.func.isRequired,   // 댓글 삭제 메서드
    updateComment: PropTypes.func.isRequired,   // 댓글 수정 메서드
}

CommentBranch.defaultProps = {
    subCommentList: []
}


export default CommentBranch;