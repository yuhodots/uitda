// 상위 컴포넌트: components/BoardDetail/subcomponents/CommentBox.js

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, Tooltip, Popover, Modal } from 'antd';

import CommentInput from "./CommentInput";
import { colors } from "../../../styles/variables";


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
const PhotoTextItem = styled.div`
   width: 100%;
   margin: 0;
   margin-bottom: 0.5rem;

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
    const TextZone = styled.div`
        margin-left: 0.5rem;
        flex: 1;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    `;

    /* 댓글 텍스트를 담은 흰색 둥근 모서리 div 태그 */
    const CommentItemText = styled.div`
        margin-right: 1rem;
        border-radius: 1rem;
        background-color: ${colors.white};
        padding: 0.5rem 1rem;

        line-height: 1.5rem;
        font-size: 0.875rem;

        display: inline-block;
    `;

    /* 삭제 및 수정하기 버튼 기능을 열 수 있는 아이콘 */
    const MoreIcon = styled(Icon)`
        display: flex;
        align-items: center;
        justify-content: center;
    `

        /* Popover Content의 Text Style */
        const PopoverContentText = styled.p`
            margin: 0.25rem 0;
            word-spacing: 0.5rem;
            
            cursor: pointer;
        `;


/* 댓글달기, 시간정보를 담은 영역 */
const AdditionalFuncDiv = styled.div`
    margin: 0;
    margin-left: 3.75rem;
   
    height: 1rem;
    line-height: 1.33em;
    font-size: 0.75rem;
    color: ${colors.gray_fontColor};
`;

    /* 답글보기 버튼 */
    const ReplySeeButton = styled.button`
        margin-left: 2em;

        border: none;
        outline: 0;
        text-decoration: none;
        background-color: ${colors.gray_bg};
        cursor: pointer;
    `;


/* 답글의 하나의 덩어리 (Photo + Text + 작성시간)
   댓글과는 다르게 작성자 사진, 댓글 텍스트(작성자 이름 포함), 시간 정보를 한 라인으로 나타낸다 */
const SubCommentLeaf = styled.div`
    margin-left: 3rem;
    margin-bottom: 0.5rem;

    display: ${props => {
        return props.isDisplay ? 'flex' : 'none'
    }};
    flex-flow: row nowrap;
`;

/* SubComment의 경우 TextZone에 시간정보를 담은 애도 있기 때문에
   CommentItemText + CreatedDivForSub 를 가진 flex box로 만들어야 한다. */
const TextZoneForSub = styled(TextZone)`
    display: flex;
    flex-flow: row nowrap;
`;

/* Sub Leaf의 생성시간을 담는 Div 영역 */
const CreatedDivForSub = styled.div`
    position: relative;
    height: 100%;
    line-height: 1.33em;
    font-size: 0.75rem;
    color: ${colors.gray_fontColor};
    margin-left: 0.5rem;
    white-space: nowrap;            /* 줄바꿈을 없애는 속성 !! */

    flex: 1 auto;
`;

/* position: absolute 태그를 대신에 크기를 차지하되, 보이지는 않는 div 태그 */
const HiddenDiv = styled.div`
    visibility: hidden;             /* 공간은 차지하되 보이지는 않게 함 !! */
`;

/* created를 나타내는 영역이 전체 위치를 기준으로 아래에 위치하도록 하는 div 태그 */
const DivForPosition = styled.div`
    position: absolute;
    bottom: 0.5em;
`;

//////////////////////////////////////

/* React Component */

class CommentItem extends Component {

    // state = { isReplySee } : 답글 보기 True / False
    state = {
        isReplySee: false,              // 답글 보기 True / False
        deleteModalVisible: false,      // 댓글 삭제 Modal의 visible
    }

    /* subCommentList를 map함수를 통해 render하는 함수 */
    // _renderSubComment(subCommentList) {
    _renderSubComment = (subCommentList) => {
        return subCommentList.map((subComment, idx) => {
            const {
                user,
                description,
                created,
            } = subComment;

            const {isReplySee} = this.state;

            return (
                <SubCommentLeaf isDisplay={isReplySee} key={idx} >
                    <CommentItemPhoto />
                    <TextZoneForSub>
                        <CommentItemText><b>{user.username}</b> {description}</CommentItemText>
                        <CreatedDivForSub>
                            <HiddenDiv>{created}</HiddenDiv> 
                            <DivForPosition>{created}</DivForPosition>
                        </CreatedDivForSub>
                    </TextZoneForSub>
                </SubCommentLeaf>
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

    /* 댓글 삭제 액션 */
    _showDeleteModal = () => {
        this.setState({
            ...this.state,
            deleteModalVisible: true
        })
    }

    _handleCancle = () => {
        this.setState({
            ...this.state,
            deleteModalVisible: false
        })
    }

    _handleDelete = () => {

        const { 
            comment_id, 
            deleteComment, 
            subCommentList,
        } = this.props;

        /* 답글이 있는 경우, 답글들 모두 삭제함 */
        if ( subCommentList[0] ) {
            subCommentList.forEach( subComment => {
                deleteComment(subComment.id)
            })
        }

        /* 댓글 삭제 액션 */
        deleteComment(comment_id);        

        /* Model visible false */
        this.setState({
            ...this.state,
            deleteModalVisible: false
        })

        /* 현재는 새로고침으로 하기
           나중에 socket.io를 이용해서 자동으로 업데이트 되도록 하기 */
        window.location.reload();
    }


    render() {

        const {
            comment_id,
            user,
            description,
            created,
            subCommentList,

            board,
            post_id,
            createComment,
        } = this.props;

        const { isReplySee } = this.state;

        let NumOfSubComment = subCommentList.length;

        /* Popover Content */
        const PopoverContent = (
            <div>
                <PopoverContentText><Icon type='edit' /> 수정하기</PopoverContentText>                
                <PopoverContentText onClick={this._showDeleteModal} ><Icon type='delete' /> 삭제하기</PopoverContentText>
                
                {/* 삭제 버튼 클릭 시 뜨는 Modal 화면 */}
                <Modal
                    title="삭제"
                    visible={this.state.deleteModalVisible}
                    onOk={this._handleDelete}
                    onCancel={this._handleCancle}
                >
                    {
                        /* 답글이 있는 지 확인 */
                        subCommentList[0] ?
                        '이 댓글을 삭제하면 모든 답글도 삭제됩니다.' :
                        '이 댓글을 삭제하시겠습니까?'
                    }
                </Modal>
            </div>
        )

        return (
            <CommentStem isReplySee={isReplySee} >
                {/* 기본 댓글 */}
                <CommentLeaf>
                    <PhotoTextItem>
                        <CommentItemPhoto />
                        <TextZone>
                            <CommentItemText><b>{user.username}</b> {description}</CommentItemText>
                            <Tooltip title='수정 또는 삭제' mouseEnterDelay={0} mouseLeaveDelay={0}>
                                <Popover
                                    trigger="click"
                                    content={PopoverContent}
                                    placement='bottom'
                                >                                    
                                    <MoreIcon type="more" rotate='90' />
                                </Popover>
                            </Tooltip>
                        </TextZone>
                    </PhotoTextItem>
                    <AdditionalFuncDiv>
                        <span>{created}</span>
                        <ReplySeeButton onClick={this._handleReplySee} >
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
                        </ReplySeeButton>
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
    comment_id: PropTypes.number.isRequired,    // 댓글 ID
    user: PropTypes.object.isRequired,          // 작성자 정보
    description: PropTypes.string.isRequired,   // 댓글 데이터
    created: PropTypes.string.isRequired,       // 작성일 정보
    subCommentList: PropTypes.array,            // 답글들의 데이터 array
    deleteComment: PropTypes.func.isRequired,   // 댓글 삭제 메서드

    /* CommentInput에 전해줄 속성 */
    board: PropTypes.string.isRequired,         // 게시판 정보
    post_id: PropTypes.number.isRequired,       // 포스팅 id          
    createComment: PropTypes.func.isRequired,   // 댓글 생성 메서드
}

CommentItem.defaultProps = {
    subCommentList: []
}


export default CommentItem;