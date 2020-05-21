

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ko'

import { MoreButtonPopover, CommentInput } from "./";
import { UserPhoto } from "../../../Structure/CommonComponents";
import { colors } from "../../../../styles/variables";
import { useHover } from '../../../../useHooks'
import { addLineToString } from "../../../RefactoringFuncs";


/* Styled Components */
/* Comment의 영역 스타일
   PhotoTextBox + BottomBox */
const CommentItemArea = styled.div`
    margin-bottom: 1rem;
    width: 100%;

    display: flex;
    flex-flow: column nowrap;
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

            const UserName = styled.span`
                font-weight: bold;
                margin-right: 0.5rem;
            `;

            /* 답글의 경우 생성시각 정보를 우측에 표기 */
            const CreatedForSub = styled.div`
                margin-bottom: 0rem;
                margin-right: 1rem;

                align-self: flex-end;
                font-size: 0.75rem;
                white-space: nowrap;
            `;

    /* 하단의 추가 정보를 담은 text box */
    const BottomBox = css`
        margin: 0;
        margin-top: 0.5rem;
        margin-left: 3.75rem;
    
        font-size: 0.75rem;
        color: ${colors.gray_fontColor};

        cursor: default;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    `;

        const UpdateBottomBox = styled.div`
            ${BottomBox}
        `;

            /* '취소' 부분 스타일 태그 */
            const CancleText = styled.span`
                color: ${colors.blue};
                
                cursor: pointer;
                :hover {
                    text-decoration: underline;
                }
            `;

        const RootBottomBox = styled.div`
            ${BottomBox}
        `;

            /* 답글 보기 / 닫기 버튼 */
            const ReplySeeButton = styled.span`
                cursor: pointer;
                :hover {
                    text-decoration: underline;
                }
            `;


/* Custom Functions */
const dateStrToDisplayTimeStr = (dateStr) => {
    return moment(dateStr).fromNow()
}


/* React Component */
const CommentItem = (props) => {

    const [ moreButtonVisible, setMoreButtonVisible ] = useState(false);
    const [ isUpdateMode, setUpdateMode ] = useState(false);

    const { 
        boardSocket,
        isRootComment,
        isMine, isReplySee,
    
        comment_id, user,
        description, created,
        subCommentList,

        changeReplySee,
    } = props;

    /* useHover: CommentItem Area에 마우스를 올리면 More Button visible을 true로 설정 */
    const handleHover = () => { if (isMine) { setMoreButtonVisible(true) } }
    const handleMouseLeave = () => { if (isMine) { setMoreButtonVisible(false) } }
    const commentItemRef = useHover(handleHover, handleMouseLeave);

    const { username, pic_location } = user;

    const displayTime = dateStrToDisplayTimeStr(created);
    const NumOfSubComment = subCommentList.length;

    return (
        <CommentItemArea ref={commentItemRef} isRootComment={isRootComment} >
            {
                isUpdateMode ?

                <CommentInput 
                    isUpdateMode={true}             

                    curUser={user}
                    comment_id={comment_id}
                    defaultValue={description}
                    boardSocket={boardSocket}

                    cancleUpdate={() => setUpdateMode(false)}
                /> :

                <PhotoTextBox>
                    <UserPhoto imgURL={pic_location} size={40} />
                    <TextBox>
                        <TextContainer> <UserName> {username} </UserName> {addLineToString(description)} </TextContainer>

                        {
                            !isRootComment &&
                            <CreatedForSub>
                                {displayTime}
                            </CreatedForSub>
                        }

                        <MoreButtonPopover 
                            boardSocket={boardSocket}
                            comment_id={comment_id}
                            user={user}
                            subCommentList={subCommentList}
                            moreButtonVisible={moreButtonVisible}

                            setUpdateMode={setUpdateMode}
                        /> 
                    </TextBox>
                </PhotoTextBox>
            }
            
            {
                /* Bottom Box: 수정 취소 / 생성 시각, 답글 더보기 */
                isUpdateMode ?
                <UpdateBottomBox>
                    <CancleText onClick={() => setUpdateMode(false)} >취소</CancleText>
                    <span>하려면 Esc 키를 누르세요.</span>
                </UpdateBottomBox> :

                isRootComment &&    // Root Comment 인 경우에만
                <RootBottomBox>
                    {displayTime}&nbsp;&nbsp;&middot;&nbsp;&nbsp;
                    <ReplySeeButton onClick={() => changeReplySee(isReplySee)} >
                    {
                        /* 답글 보기 상태: '답글 닫기'
                            답글 보기 아닌 상태: 
                                답글이 있는 경우: 'n개의 답글 보기'
                                답글이 없는 경우: '답글 달기         */ 

                        isReplySee ? '답글 닫기' :
                        NumOfSubComment ? `${NumOfSubComment}개의 답글 보기` : '답글 달기'
                    }
                    </ReplySeeButton>
                </RootBottomBox>
            }
        </CommentItemArea>
    )
}


CommentItem.propTypes = {
    boardSocket: PropTypes.object.isRequired,   // Board Socket
    isRootComment: PropTypes.bool.isRequired,   // Root 댓글인지 답글인지
    isMine: PropTypes.bool.isRequired,          // 내 댓글인지 (로그인한 유저의 댓글인지)
    isReplySee: PropTypes.bool,                 // 답글 보기 상태인지

    comment_id: PropTypes.number.isRequired,    // 댓글 ID
    user: PropTypes.object.isRequired,          // 작성자 정보
    description: PropTypes.string.isRequired,   // 댓글 데이터
    created: PropTypes.string.isRequired,       // 작성일 정보
    subCommentList: PropTypes.array,            // 답글들의 데이터 array

    changeReplySee: PropTypes.func,             // 답글 보기 상태 변경 메서드
}

CommentItem.defaultProps = {
    isReplySee: false,
    subCommentList: [],
    changeReplySee: () => {},
}

export default CommentItem;