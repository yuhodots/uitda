// 상위 컴포넌트: components/BoardDetail.js

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import CommentItem from './CommentItem';
import CommentInput from './CommentInput';
import { colors } from "../../../styles/variables";

/* Styled Components */

/* CommentBox 영역 div */
const CommentArea = styled.div`
    padding: 1.5rem 1rem;
    background-color: ${colors.gray_bg};
    border-radius: 8px;
    width: 100%;
    min-height: 10rem;
    position: relative;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
`;

/* 댓글 갯수의 정보 + 작성자에게 메시지 보내기 링크 태그 */
const CommentHeader = styled.div`
    width: 100%;
    margin-bottom: 1.5rem;

    height: 2rem;
    line-height: 2rem;
    font-size: 1.5rem;
`;

/* CommentInput 아래에 margin과 흰색 마감 선을 넣을 것임 */
const BottomOfInputDiv = styled.div`
    width: 100%;
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid ${colors.white};
`;

/////////////////////////////////////////

/* React Components */

class CommentBox extends Component {

    // 더보기 상태 (isMoreSee) 추가

    componentDidMount() {
    }

    // map을 이용해 array 데이터를 render하는 함수
    _renderComments = (commentList) => {
        return commentList.map((comment, idx) => {
            const {
                username,
                content,
                created,
                subCommentList
            } = comment;

            return (
                <CommentItem
                    username={username}
                    content={content}
                    created={created}
                    subCommentList={subCommentList}
                    key={idx}
                />
            )
        })
    }

    render() {

        const { commentList } = this.props;
        const numOfComments = commentList.length;

        return (
            <CommentArea>
                
                {/* 댓글 개수 + 작성자에게 메시지 보내기 */}
                <CommentHeader>
                    {numOfComments} 개의 댓글
                </CommentHeader>

                {/* 댓글 작성 란 */}
                <CommentInput 
                    isSubComment={false}
                />

                {/* 댓글 입력란 밑의 영역 및 흰색 선 */}
                <BottomOfInputDiv />
                
                {/* 댓글 render */}
                {
                    numOfComments ?
                    this._renderComments(commentList) :
                    '아직 댓글이 없습니다.'
                }

                {/* //////////////////////////// */}
            </CommentArea>
        )
    }
}


CommentBox.propTypes = {
    commentList: PropTypes.array,       // 댓글 데이터를 가지고 있는 array
}

CommentBox.defaultProps = {
    commentList: []
}

export default CommentBox;