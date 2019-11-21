// 상위 컴포넌트: components/BoardDetail/subcomponents/CommentBox.js

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';

import SendIcon from './resources/SendIcon_Blue.png';
import { CommentItemPhoto } from "./CommentItem";
import { colors } from "../../../styles/variables";

/* Styled Components */

/* CommentInput의 세부 컴포넌트들을 모두 담는 div 태그
   (CommentItemPhoto + CommentInputTextArea)
   isSubComment(bool값)을 props로 받아서 Sub의 경우 왼쪽에 3rem 범위를 준다. 
   isDisplay(bool값) 또한 받아서 false인 경우 display none 시킨다. */
const CommentInputArea = styled.div`
    margin: 0;

    margin-left: ${props => {
        return props.isSubComment ? '3rem' : 0
    }};

    display: ${props => {
        return props.isDisplay ? 'flex' : 'none'
    }};
    flex-flow: row nowrap;
`;

/* TextArea와 Send 버튼을 포함한 div 태그. (흰색 바탕의 디자인을 가진 div)
   사진 영역을 제외한 남은 가로길이를 차지하는 flex item인 동시에
   TextArea + SendButton 인 flex box이다. */
const CommentInputTextArea = styled.div`
    margin-left: 0.5rem;

    border-radius: 1rem;
    background-color: ${colors.white};
    padding: 0.5rem 1rem 0.25rem 1rem;

    flex: 1;
    display: flex;
    flex-flow: row nowrap;
`;

/* CommentInput이 TextArea이기 때문에 이를 감싸는 flex item */
const TextAreaDiv = styled.div`
    flex: 1;
`;

/* 텍스트를 입력할 수 있는 태그
   'react-textarea-autosize'라이브러리를 이용해서 
   줄 바꿈 시 자동으로 높이가 조정되는 textarea 태그이다. */
const TextArea = styled(TextareaAutosize)`
    width: 100%;
    padding: 0;

    /* textarea 스타일과 관련된 속성 */
    resize: none;
    border: none;
    outline: 0;

    line-height: 1.5rem;
    font-size: 0.875rem;
`;

/* 작성한 댓글의 데이터를 전송하는 버튼 */
const SendButton = styled.button`
    margin-left: 0.5rem;
    height: 1.5rem;
    width: 1rem;

    /* button 스타일과 관련된 속성 */
    padding: 0;
    outline: none;
    border: none;
    cursor: pointer;
    
    background-image: ${props => `url(${props.ImgURL})`};
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
`;


/* React Component */

class CommentInput extends Component {

    // state에 text 내용 저장하기

    /* 버튼을 누르면 POST 요청을 통해 DB 서버에 전송하고,
       Post Detail 페이지에 대한 GET 요청을 다시 한다. or 리다이렉션 */
    _handleClick() {

    }

    render() {
        
        const { 
            isSubComment,
            isReplySee 
        } = this.props;

        return (
            <CommentInputArea 
                isSubComment={isSubComment} 
                isDisplay={isReplySee}
            >
                <CommentItemPhoto />
                <CommentInputTextArea>
                    <TextAreaDiv>
                        <TextArea />
                    </TextAreaDiv>
                    <SendButton 
                        ImgURL={SendIcon} 
                        onClick={this._handleClick}
                    />                   
                </CommentInputTextArea>
            </CommentInputArea>
        )
    }
}


CommentInput.propTypes = {
    isSubComment: PropTypes.bool.isRequired,    // SubComment인지. 답글이라면 margin-left 값이 추가된다.
    isReplySee: PropTypes.bool,                 // SubComment의 경우 답글 보기의 여부에 따라 CommentInput가 display none이 결정된다.
}

CommentInput.defaultProps = {
    isReplySee: true                            // SubComment가 아닌 경우 isReplySee가 없고 항상 display되기 때문에 true값을 준다.
}


export default CommentInput;