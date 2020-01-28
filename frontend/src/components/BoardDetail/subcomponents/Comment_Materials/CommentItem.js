// 상위 컴포넌트: components/BoardDetail/subcomponents/CommentBox.js

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { 
    SubCommentItem,
    CommentInput,
    CommentUD
} from './';
import { colors } from "../../../../styles/variables";


/* Styled Components */

/* Root Leaf + Sub Leaf 
   루트가 되는 댓글과 답글을 포함하는 div */
const CommentStem = styled.div`
    margin-bottom: ${props => {
        return props.isReplySee ? '2rem' : '1rem'
    }};
`;

/* 댓글의 하나의 덩어리 (PhotoTextItem + AdditionalFucDiv)
   작성자 사진, 댓글 텍스트(작성자 이름 포함), 대댓글 달기 아이콘, 시간 정보를 포함한다. */
const CommentLeaf = styled.div`
   margin: 0;
   margin-bottom: 0.5rem;
`;

/* 작성자 사진, 텍스트 데이터를 담는 div */
export const PhotoTextItem = styled.div`
   width: 100%;
   margin: 0;
   /* margin-bottom: 0.5rem; */

   display: flex;
   flex-direction: row;
   flex-wrap: nowrap;
`;

    /* 댓글 작성자 사진 */
    export const CommentItemPhoto = styled.div`
        height: 2.5rem;
        width: 2.5rem;
        border-radius: 50%;
        background-color: ${colors.white};

        flex-basis: 2.5rem;
    `;

    /* 댓글이 2줄이 넘어갈 때, 텍스트 영역의 가로 길이를 알려주기 위함 */
    export const TextZone = styled.div`
        margin-left: 0.5rem;
        flex: 1;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    `;

    /* 댓글 텍스트를 담은 흰색 둥근 모서리 div 태그 */
    export const CommentItemText = styled.div`
        margin-right: 1rem;
        border-radius: 1rem;
        background-color: ${colors.white};
        padding: 0.5rem 1rem;

        line-height: 1.5rem;
        font-size: 0.875rem;

        display: inline-block;
    `;

/* 댓글달기, 시간정보를 담은 영역 */
const AdditionalFuncDiv = styled.div`
    margin: 0;
    margin-top: 0.5rem;
    margin-left: 3.75rem;
   
    height: 1rem;
    line-height: 1.33em;
    font-size: 0.75rem;
    color: ${colors.gray_fontColor};

    display: flex;
    flex-flow: row nowrap;
`;

    /* 답글보기 버튼 */
    const TextButton = styled.button`
        margin-left: 2em;

        border: none;
        outline: 0;
        text-decoration: none;
        background-color: ${colors.gray_bg};
        cursor: pointer;
    `;

    const UpdateInfo = styled.div`
    `;


//////////////////////////////////////

/* React Component */

class CommentItem extends Component {

    state = {
        isReplySee: false,              // 답글 보기 True / False
        isUDVisible: false,             // 수정 삭제 버튼 visible
        isUpdateMode: false,            // 수정 모드 인지
    }

    /* subCommentList를 map함수를 통해 render하는 함수 */
    _renderSubComment = (subCommentList) => {
        const { 
            curUser,
            deleteComment,
            updateComment
        } = this.props;

        // console.log(subCommentList)

        return subCommentList.map((subComment, idx) => {
            const {
                id,
                user,
                description,
                created,
            } = subComment;

            const {isReplySee} = this.state;

            return (
                <SubCommentItem 
                    curUser={curUser}
                    deleteComment={deleteComment}
                    updateComment={updateComment}
                    subComment_id={id}

                    isReplySee={isReplySee} 
                    user={user}
                    description={description}
                    created={created}
                    key={idx}
                />
            )
        })
    }

    /* 답글 달기 또는 보기를 누르는 이벤트를 처리하는 함수 */
    _handleReplySee = () => {
        // let changedValue = this.state.isReplySee ? false : true;
        let changedValue = this.state.isReplySee ? false : true;

        this.setState({
            ...this.state,
            isReplySee: changedValue
        })
    }

    /* 댓글 영역에 마우스를 올릴 때,
       해당 댓글을 쓴 작성자의 경우 update, delete 아이콘이 뜨도록 하기 */
    _handleMouseEnter = () => {
        /* user는 작성자, curUser은 현재 접속자 */
        const {
            user, curUser
        } = this.props;

        if (user.username === curUser.username) {
            this.setState({
                ...this.state,
                isUDVisible: true
            })
        }
    }

    /* 댓글 영역에서 마우스가 벗어나면 visible: false */
    _handleMouseLeave = () => {
        this.setState({
            ...this.state,
            isUDVisible: false
        })
    }
    ///////////////////

    /* 수정 모드로 변경하는 메서드 */
    _setUpdateMode = () => {
        this.setState({
            ...this.state,
            isUpdateMode: true
        })
    }

    /* 수정 모드 취소하는 메서드 */
    _handleUpdateCancle = () => {
        this.setState({
            ...this.state,
            isUpdateMode: false
        })
    }


    render() {

        const {
            curUser,

            comment_id,
            user,
            description,
            created,
            subCommentList,
            deleteComment,

            board,
            post_id,
            createComment,
            updateComment,
        } = this.props;

        const { isReplySee, isUDVisible, isUpdateMode } = this.state;

        let NumOfSubComment = subCommentList.length;

        // console.log(typeof(isUDVisible))

        return (
            /* Comment Stem: 댓글 + 답글 리스트 전체를 포함하는 줄기 */
            <CommentStem isReplySee={isReplySee} > 
                {/* Comment Leaf: 댓글 부분 + 하단의 세부 정보 */}
                <CommentLeaf>
                    {
                        /* update 모드의 경우 Input 태그를 render하고
                           일반 모드의 경우 댓글 Photo + Text 컴포넌트를 render함 */
                        isUpdateMode ?
                        
                        <CommentInput
                            curUser={curUser}
                            isUpdateMode={isUpdateMode} 
                            updateComment={updateComment}
                            comment_id={comment_id}
                            defaultValue={description}
                            cancleUpdate={this._handleUpdateCancle}
                        /> :

                        <PhotoTextItem
                            onMouseEnter={this._handleMouseEnter}
                            onMouseLeave={this._handleMouseLeave}
                        >
                            <CommentItemPhoto />
                            <TextZone>
                                <CommentItemText><b>{user.username}</b> {description}</CommentItemText>
                                <CommentUD 
                                    comment_id={comment_id} 
                                    subCommentList={subCommentList} 
                                    deleteComment={deleteComment}
                                    isVisible={isUDVisible}

                                    setUpdateMode={this._setUpdateMode}
                                />
                            </TextZone>
                        </PhotoTextItem>
                    }
                    
                    {/* 작성 시각 + 답글에 대한 정보 + 수정 여부 */}
                    <AdditionalFuncDiv>
                        <span>{created}</span>
                        <TextButton onClick={this._handleReplySee} >
                            {
                                /* 답글 보기 상태: '답글 닫기'
                                   답글 보기 아닌 상태: 
                                       답글이 있는 경우: 'n개의 답글 보기'
                                       답글이 없는 경우: '답글 달기         */ 

                                isReplySee ?
                                '답글 닫기' :
                                NumOfSubComment ?
                                    `${NumOfSubComment}개의 답글 보기` :
                                    '답글 달기'
                            }
                        </TextButton>

                        {/* 수정 모드의 경우 취소버튼,
                            일반 댓글 모드의 겨우 수정 여부 정보 */}
                        <UpdateInfo>
                            {
                                isUpdateMode ?
                                <TextButton onClick={this._handleUpdateCancle}>취소</TextButton> :
                                ''
                            }
                        </UpdateInfo>
                    </AdditionalFuncDiv>
                </CommentLeaf>

                {/* 답글들. map 함수를 이용해서 만들기 */}
                {
                    NumOfSubComment ?
                    this._renderSubComment(subCommentList) :
                    ''
                }

                {/* 답글 입력 창 */}
                <CommentInput
                    isSubComment={true}
                    isReplySee={isReplySee}

                    curUser={curUser}

                    board={board}
                    post_id={post_id}
                    parent_comment={comment_id}
                    createComment={createComment}
                />

            </CommentStem>
        )
    }
}


/* propTypes, defaultProps */

CommentItem.propTypes = {
    curUser: PropTypes.oneOfType([              // 유저 정보
        PropTypes.number,
        PropTypes.object
    ]).isRequired,

    comment_id: PropTypes.number.isRequired,    // 댓글 ID
    user: PropTypes.object.isRequired,          // 작성자 정보
    description: PropTypes.string.isRequired,   // 댓글 데이터
    created: PropTypes.string.isRequired,       // 작성일 정보
    subCommentList: PropTypes.array,            // 답글들의 데이터 array
    deleteComment: PropTypes.func.isRequired,   // 댓글 삭제 메서드
    updateComment: PropTypes.func.isRequired,   // 댓글 수정 메서드

    /* CommentInput에 전해줄 속성 */
    board: PropTypes.string.isRequired,         // 게시판 정보
    post_id: PropTypes.number.isRequired,       // 포스팅 id          
    createComment: PropTypes.func.isRequired,   // 댓글 생성 메서드
}

CommentItem.defaultProps = {
    subCommentList: []
}


export default CommentItem;