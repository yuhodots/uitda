// 상위 컴포넌트: components/BoardDetail/subcomponents/CommentBox.js

import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { SendOutlined } from "@ant-design/icons";

import { UserPhoto, UitdaTextArea } from "../../../Structure/CommonComponents";
import { colors } from "../../../../styles/variables";


/* Styled Components */

/* CommentInput의 세부 컴포넌트들을 모두 담는 div 태그
   (CommentItemPhoto + CommentInputTextArea)
   isDisplay(bool값) 또한 받아서 false인 경우 display none 시킨다. */
const CommentInputArea = styled.div`
    margin: 0;

    display: flex;
    flex-flow: row nowrap;
`;

/* TextArea와 Send 버튼을 포함한 div 태그. (흰색 바탕의 디자인을 가진 div)
   사진 영역을 제외한 남은 가로길이를 차지하는 flex item인 동시에
   TextArea + SendButton 인 flex box이다. */
const CommentInputTextArea = styled.div`
    margin-left: 0.5rem;

    border-radius: 1rem;
    background-color: ${colors.white};
    padding: 0.25rem 0.75rem ;

    flex: 1;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
`;

    /* CommentInput이 TextArea이기 때문에 이를 감싸는 flex item */
    const TextAreaDiv = styled.div`
        flex: 1;
    `;

    /* 작성한 댓글의 데이터를 전송하는 버튼 */
    const SendButton = styled(SendOutlined)`
        margin-left: 0.5rem;
        height: 1.5rem;
        width: 1rem;

        cursor: pointer;
    `;


/* React Component */

class CommentInput extends Component {

    // state에 text 내용 저장하기
    state = { content: '' }

    textAreaRef = createRef()

    _storeTextToState = (type, value) => {
        this.setState({
            content: value
        })
    }

    /* 버튼을 누르면 POST 요청을 통해 DB 서버에 전송하고,
       Post Detail 페이지에 대한 GET 요청을 다시 한다. or 리다이렉션 */
    _handleSend = () => {
        const {
            boardSocket,
            isUpdateMode,

            curUser,
            board,
            post_id,
            
            comment_id,
            parent_comment,     // subComment의 경우에만 존재

            cancleUpdate,
        } = this.props;

        const { content } = this.state;

        const { email } = curUser;

        /* 내용이 없으면 경고창 띄우고 종료 */
        if(!content) { message.warning('댓글 내용을 입력하세요'); return; }

        /* Update Comment Action */
        if (isUpdateMode) {
            const data = { email, comment_id, description: content }
            boardSocket.emit('comment update', data);
            cancleUpdate();
        }

        /* Create Comment Action */
        else {
            let data = {
                email, description: content, 
                type_board: board, board_id: post_id, 
            };
            data = parent_comment ? 
            { ...data, is_re_comment: true, parent_comment: parent_comment} :
            { ...data, is_re_comment: false }

            boardSocket.emit('comment create', data);
            this.textAreaRef.current.clearTextArea();
        }
    }

    /* 키 입력 이벤트 핸들러 (Enter, Esc)
       KeyDown은 한글 + Enter 시, 두 번 이벤트를 처리한다 ㅡㅡ */
    _handleKeyPress = (e) => {
        switch(e.key) {
            case 'Enter':
                if(e.shiftKey) { break; }
                e.preventDefault(); this._handleSend(); break;

            default: return;        
        }
    }

    /* KeyPress는 Esc를 인식하지 못한다 ㅡㅡ */
    _handleKeyDown = (e) => {

        const { 
            isUpdateMode,
            cancleUpdate
        } = this.props;

        switch(e.key) {
            case 'Escape':
                if ( !isUpdateMode ) { return }
                cancleUpdate(); break;

            default: return;
        }
    }

    render() {

        const { 
            curUser,
            isUpdateMode,

            defaultValue
        } = this.props;

        const { pic_location } = curUser;

        return (
            <CommentInputArea >
                <UserPhoto imgURL={pic_location} size={40} />
                <CommentInputTextArea>
                    <TextAreaDiv
                        onKeyPress={this._handleKeyPress}
                        onKeyDown={this._handleKeyDown}
                    >
                        <UitdaTextArea 
                            ref={this.textAreaRef}
                            size='100%' 
                            isUnderLine={false} 
                            placeHolder='댓글을 입력하세요.'
                            defaultText={defaultValue}
                            letFocus={isUpdateMode}

                            storeDataFunc={this._storeTextToState}
                        />
                    </TextAreaDiv>
                    <SendButton onClick={this._handleSend} />                   
                </CommentInputTextArea>
            </CommentInputArea>
        )
    }
}


CommentInput.propTypes = {
    isUpdateMode: PropTypes.bool,                   // 댓글 수정 Input 컴포넌트인지
    boardSocket: PropTypes.object.isRequired,       // Board Socket
    curUser: PropTypes.object,                      // 로그인한 유저 정보
    board: PropTypes.string,                        // 게시판 정보
    post_id: PropTypes.number,                      // 포스팅 id
    
    parent_comment: PropTypes.number,               // 답글의 경우, 부모 댓글의 id
    comment_id: PropTypes.number,                   // 댓글 수정의 경우, 해당 댓글의 id
    defaultValue: PropTypes.string,                 // 댓글 수정의 경우, 해당 댓글의 이전 값

    cancleUpdate: PropTypes.func,                   // 수정 상태를 취소하는 메서드
}

CommentInput.defaultProps = {
    isUpdateMode: false,
    curUser: 0,
    board: '',
    post_id: 0,
    parent_comment: 0,
    comment_id: 0,
    defaultValue: '',

    cancleUpdate: () => {},
}


export default CommentInput;