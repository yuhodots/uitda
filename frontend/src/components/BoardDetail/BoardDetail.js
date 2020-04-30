// 상위 컴포넌트: BoardDetailContainer

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { 
    HeaderBox,
    PhotoBox,
    DescriptionBox,
    CommentBox,
} from "./subcomponents";

import { colors } from "../../styles/variables";


/* Styled Components */

/* 배경색을 깔기 위해 만든 div 테그 */
const BackgroundDiv = styled.div`
    width: 100%;
    padding-left: 15rem;
    background-color: ${colors.gray_bg};
`;

/*  내용물들을 담을 컨테이너 div 태그
    최소 높이를 현재 창의 높이로 설정하여, content들이 적어도 화면 전체 높이를 차지 할 수 있도록 함.
    너비는 전체 가로의 70%만을 차지하는 반응 크기를 사용  */
const ContainerDiv = styled.div`
    width: 70%;
    min-height: ${props => props.minHeight};
    min-width: 50rem;
    max-width: 60rem;
    margin: 0 auto;
    padding: 3rem 2rem;

    background-color: ${colors.white};

    /* 그림자 효과 */
    box-shadow: 0 0 12px rgba(80,80,80,.1);
    border-left: 2px solid ${colors.gray_bg};
    border-right: 2px solid ${colors.gray_bg};

    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
`;

    const PostingBox = styled.div`
        display: flex;
        flex-flow: column nowrap;
    `;


/* React Component */

class BoardDetail extends Component {

    state = {}

    componentDidMount() {
        /* 브라우저 창의 크기가 변하는 이벤트를 감지한다. */
        window.addEventListener('resize', this._handleResize) 
        
        this._handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize)
    }

    _handleResize = (e) => {
        this.setState({
            ...this.state,
            clientHeight: document.documentElement.clientHeight
        })
    }

    render() {
        
        const { clientHeight } = this.state;

        const {
            curUser,            // 접속한 유저 정보

            post,               // 포스팅 데이터
            board,              // 게시판 정보 
            commentList,        // comment data

            deletePost,         // 게시글을 삭제하는 메서드
            createComment,      // 댓글 생성 메서드
            updateComment,      // 댓글 수정 메서드
            deleteComment,      // 댓글 삭제 메서드
        } = this.props;

        const {
            id,                 // 게시글 id

            /* PhotoBox에 전해줄 속성 */
            filelist,           // 사진 파일들을 담은 리스트 (array)

            /* TextBox에 전해줄 속성 */
            title,              // 제목 (string)
            user,               // 유저 정보 객체 (object)
            created,            // 생성시간 (string)
            condition,          // 판매상태 
            description,        // 상세 

            price,              // Market Post만이 가지고 있는 가격 정보
        } = post;

        const isPhoto = filelist.length > 0;        // filelist에 원소가 하나라도 있으면 true
        // const isOwner = curUser.id === user.id;     // 해당 게시글이 내 글인지
        const isOwner = curUser.email === user.email;     // 해당 게시글이 내 글인지 (나중에 백엔드에서 id 넘겨주면 변경)

        const headerMethods = { deletePost };

        return (
            <BackgroundDiv>
                <ContainerDiv minHeight={`${clientHeight}px`} >
                    <PostingBox>
                        <HeaderBox
                            postId={id}
                            isPhoto={isPhoto}
                            isOwner={isOwner}
                            board={board}
                            title={title}
                            user={user}
                            created={created}
                            condition={condition}
                            price={price}
                            headerMethods={headerMethods}
                        />
                        { isPhoto ? <PhotoBox filelist={filelist} /> : '' }
                        <DescriptionBox description={description} isPhoto={isPhoto} />
                    </PostingBox>
                    <CommentBox 
                        curUser={curUser}
                        board={board}
                        post_id={id}
                        commentList={commentList} 
                        createComment={createComment}
                        updateComment={updateComment}
                        deleteComment={deleteComment}
                    />
                </ContainerDiv>
            </BackgroundDiv>
        )
    }
}

BoardDetail.propTypes = {
    curUser: PropTypes.oneOfType([                 // 유저 정보
        PropTypes.number,
        PropTypes.object
    ]).isRequired,

    board: PropTypes.string.isRequired,         // 게시판 정보
    post: PropTypes.object.isRequired,          // 포스팅 데이터
    commentList: PropTypes.array,               // 댓글 데이터

    deletePost: PropTypes.func.isRequired,      // 게시글을 삭제하는 메서드
    createComment: PropTypes.func.isRequired,   // 댓글 생성 메서드
    updateComment: PropTypes.func.isRequired,   // 댓글 수정 메서드
    deleteComment: PropTypes.func.isRequired,   // 댓글 삭제 메서드
}

BoardDetail.defaultProps = {
    commentList: [],
}

export default BoardDetail;
