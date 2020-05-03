// 상위 컴포넌트: components/BoardDetail/subcomponents/CommentBox.js

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { CommentInput, MoreButtonPopover } from './';
import { 
    PhotoTextItem,
    CommentItemPhoto,
    CommentItemText,
    TextZone, 
} from './CommentItem_Backup'
import { UserPhoto } from "../../../Structure/CommonComponents";
import { colors } from "../../../../styles/variables";


/* Styled Components */

/* 답글의 하나의 덩어리 (Photo + Text + 작성시간)
   댓글과는 다르게 작성자 사진, 댓글 텍스트(작성자 이름 포함), 시간 정보를 한 라인으로 나타낸다 */
const SubCommentLeaf = styled.div`
    margin-left: 3rem;
    margin-bottom: 0.5rem;

    display: ${props => {
        return props.isDisplay ? 'block' : 'none'
    }};
    /* flex-flow: row nowrap; */
`;

    /* Sub Leaf의 생성시간을 담는 Div 영역 */
    const CreatedDivForSub = styled.div`
        position: relative;
        height: 100%;
        line-height: 1.33em;
        font-size: 0.75rem;
        color: ${colors.gray_fontColor};
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

    /* 수정하기 클릭 시 나타나는 컴포넌트 (Input 태그 + 취소 탭) */
    const UpdateComponent = styled.div`
        display: flex;
        flex-flow: column nowrap;
    `;

    /* 취소하기 문구를 담은 div 태그 */
    const CancleTab = styled.div`
        margin-top: 0.25rem;
        margin-left: 3rem;

        font-size: 0.75rem;
        color: ${colors.font_gray};
    `;

    /* '취소' 부분 스타일 태그 */
    const CancleText = styled.span`
        color: ${colors.blue};
        
        cursor: pointer;
        :hover {
            text-decoration: underline;
        }
    `;

//////////////////////////////////////

/* React Component */

class SubCommentItem extends Component {

    state = {
        isUDVisible: false,         // 수정 삭제 버튼 visible
        isUpdateMode: false,        // 수정 모드 여부
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
            curUser,            // 현재 접속자 정보
            updateComment,      // 댓글 수정 액션 (Comment Input 태그에 넘겨줌)

            subComment_id,
            deleteComment,

            isReplySee,

            user,
            description,
            created,
        } = this.props;

        const { 
            isUDVisible,
            isUpdateMode,
        } = this.state;

        const { pic_location } = user;

        return (
            <SubCommentLeaf 
                isDisplay={isReplySee} 
                onMouseEnter={this._handleMouseEnter}
                onMouseLeave={this._handleMouseLeave}
            >
                {
                    isUpdateMode ?

                    <UpdateComponent>
                        <CommentInput 
                            curUser={curUser}
                            isUpdateMode={true} 
                            updateComment={updateComment}
                            comment_id={subComment_id}
                            defaultValue={description}
                            cancleUpdate={this._handleUpdateCancle}
                        />
                        <CancleTab>
                            <CancleText onClick={this._handleUpdateCancle} >취소</CancleText>
                            <span>하려면 Esc 키를 누르세요.</span>
                        </CancleTab>
                    </UpdateComponent> :
                    
                    <PhotoTextItem>
                        {/* <CommentItemPhoto /> */}
                        <UserPhoto imgURL={pic_location} size={40} />
                        <TextZone>
                            <CommentItemText>
                                <b>{user.username}</b>&nbsp;
                                {description.split('\n').map(line => {
                                    return (<span>{line}<br/></span>)
                                })}
                            </CommentItemText>
                            {
                                isUDVisible ?
                                <MoreButtonPopover 
                                    comment_id={subComment_id}
                                    deleteComment={deleteComment}

                                    setUpdateMode={this._setUpdateMode}
                                /> :
                                <CreatedDivForSub>
                                    <HiddenDiv>{created}</HiddenDiv> 
                                    <DivForPosition>{created}</DivForPosition>
                                </CreatedDivForSub>
                            }
                        </TextZone>
                    </PhotoTextItem>
                }
                
            </SubCommentLeaf>
        )
    }
}


/* propTypes, defaultProps */
SubCommentItem.propTypes = {
    curUser: PropTypes.object.isRequired,           // 현재 로그인한 유저 정보
    boardSocket: PropTypes.object.isRequired,       // Board Socket
    subComment_id: PropTypes.number.isRequired,     // 답글의 comment id
    deleteComment: PropTypes.func.isRequired,       // UD에 전해 줄 delete action

    isReplySee: PropTypes.bool.isRequired,          // 답글 보기 true / false

    user: PropTypes.object.isRequired,              // 답글 작성자 정보
    description: PropTypes.string.isRequired,       // 답글 내용
    created: PropTypes.string.isRequired,           // 답글 작성 시각
}

SubCommentItem.defaultProps = {
}


export default SubCommentItem;