

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { MoreButtonPopover } from "./";
import { UserPhoto } from "../../../Structure/CommonComponents";
import { colors } from "../../../../styles/variables";
import { useHover } from '../../../../useHooks'


/* Styled Components */
/* Comment의 영역 스타일
   PhotoTextBox + BottomBox */
const CommentItemArea = styled.div`
    width: 100%;

    display: flex;
    flex-flow: column nowrap;

    /* 답글 Area 스타일 */
    ${props => !props.isRootComment && css`
        margin-left: 3rem;
    `}
`;

    /* 작성자 사진, 텍스트 데이터를 담는 div */
    const PhotoTextBox = styled.div`
        width: 100%;

        display: flex;
        flex-flow: row nowrap;
        align-items: flex-start;
    `;

        /* UserPhoto 우측의 가로 나머지 전체를 차지하는 Box
           TextContainer + MoreButton */
        const TextBox = styled.div`
            margin-left: 0.5rem;
            flex: 1;

            display: flex;
            flex-flow: row nowrap;
            align-items: center;
        `;

            /* 댓글 텍스트를 담은 흰색 둥근 모서리 div 태그 */
            const TextContainer = styled.div`
                margin-right: 1rem;
                padding: 0.5rem 1rem;

                border-radius: 1rem;
                background-color: ${colors.white};

                line-height: 1.5rem;
                font-size: 0.875rem;
            `;

    const BottomBox = styled.div`
    
    `;


/* React Component */
const CommentItem = (props) => {

    const [ moreButtonVisible, setMoreButtonVisible ] = useState(false);
    const [ isUpdateMode, setUpdateMode ] = useState(false);

    const { 
        isRootComment,
        isMine,
    
        comment_id, user,
        description,
        subCommentList,

        deleteComment,
    } = props;

    /*  */
    const handleHover = () => { if (isMine) { setMoreButtonVisible(true) } }
    const handleMouseLeave = () => { if (isMine) { setMoreButtonVisible(false) } }
    const commentItemRef = useHover(handleHover, handleMouseLeave);

    const { pic_location } = user;

    return (
        <CommentItemArea  isRootComment={isRootComment} >
            <PhotoTextBox ref={commentItemRef}>
                <UserPhoto imgURL={pic_location} size={40} />
                <TextBox>
                    <TextContainer> {description} </TextContainer>
                    {
                        // moreButtonVisible &&
                        <MoreButtonPopover 
                            comment_id={comment_id}
                            subCommentList={subCommentList}

                            isVisible={moreButtonVisible}

                            deleteComment={deleteComment}
                            setUpdateMode={setUpdateMode}
                        />
                    }
                </TextBox>
            </PhotoTextBox>
        
            <BottomBox>

            </BottomBox>
        </CommentItemArea>
    )
}


CommentItem.propTypes = {
    isRootComment: PropTypes.bool.isRequired,   // Root 댓글인지 답글인지
    isMine: PropTypes.bool.isRequired,          // 내 댓글인지 (로그인한 유저의 댓글인지)
    isReplySee: PropTypes.bool,                 // 답글 보기 상태인지

    comment_id: PropTypes.number.isRequired,    // 댓글 ID
    user: PropTypes.object.isRequired,          // 작성자 정보
    description: PropTypes.string.isRequired,   // 댓글 데이터
    created: PropTypes.string.isRequired,       // 작성일 정보
    subCommentList: PropTypes.array,            // 답글들의 데이터 array

    updateComment: PropTypes.func.isRequired,   // 댓글 수정 메서드
    deleteComment: PropTypes.func.isRequired,   // 댓글 삭제 메서드
    changeReplySee: PropTypes.func,             // 답글 보기 상태 변경 메서드
}

CommentItem.defaultProps = {
    isReplySee: false,
    changeReplySee: () => {},
}

export default CommentItem;