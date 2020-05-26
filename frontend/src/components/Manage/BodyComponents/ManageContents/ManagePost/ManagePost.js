

import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'antd'

import { ContentHeader } from "../CommonComponents";
import { ContentBoxStyle } from '../CommonComponents/CommonCSS'
import ConditionSelector from './Subcomponents/ConditionSelector'
import { colors } from '../../../../../styles/variables'
import { 
    PostManageButtonStyle,
    BoxTemplate,
 } from '../../../../../styles/templates/manage'
 import { formatDateStrToFullDateTime } from "../../../../RefactoringFuncs";


/* Styled Components */
/* 전체 포스팅 관리 박스 영역 */
const WholeBox = styled.div`
    ${ContentBoxStyle}
`;

    /* NoPostBox / PostBox 처리를 위한 div 태그 */
    const BodyBox = styled.div`
        width: 100%;
    `;

        /* 포스트 아이템이 없는 경우 render되는 박스 */
        const NoPostBox = styled(BoxTemplate)`
            padding: 2rem;

            color: ${colors.font_lightgray};
            text-align: center;
        `;

        /* 포스트 아이템이 있는 경우 render되는 박스
        PostItems + BoardOrderBox */
        const PostsBox = styled.div`
            display: flex;
            flex-flow: column nowrap;
        `;

/* PostItem */
const PostItem = styled(BoxTemplate)`
    padding: 1rem 2rem;
    border-bottom: ${props => {
        if(!props.isLast) {return 'none'}
    }};

    position: relative;

    display: flex;
    flex-flow: row nowrap;
`;

    /* Post의 ID */
    const PostID = styled.div`
        height: 3rem;
        width: 2rem;

        line-height: 3rem;
        font-size: 1.25rem;
    `;

    /* Title + subInfo (작성시간 + 덧글 수) */
    const TextBox = styled.div`
        margin-left: 1rem;
        height: 3rem;

        flex: 1;
        
        display: flex;
        flex-flow: column nowrap;
    `

        /* Post Title 영역 div 태그 */
        const PostTitle = styled.div`
            height: 1.625rem;

            line-height: 1.625rem;
        `;

        /* Title 텍스트 Link 태그 */
        const TitleLink = styled(Link)`
            text-decoration: none;
            color: ${colors.font_darkgray};
        `;

        /* 작성시간 + 덧글 수 정보 */
        const PostSubInfo = styled.div`
            margin-top: 0.25rem;
            height: 1.125rem;

            line-height: 1.125rem;
            font-size: 0.875rem;
            color: ${colors.font_lightgray};
        `;

    /* 수정하기, 삭제하기, 상태 변경 버튼 */
    const ButtonBox = styled.div`
        position: absolute;
        right: 2rem;

        height: 3rem;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    `

        const PostManageButton = styled(Button)`
            ${PostManageButtonStyle}

            :hover {
                color: ${colors.font_darkgray};

                ${props => props.isDelete && css`
                    color: ${colors.font_red};
                    border-color: ${colors.font_red};
                `}
            }
        `;

///////////////////////

/* 게시판 번호를 담은 박스 */
const BoardOrderBox = styled.div`
    margin-top: 1rem;
    width: 100%;
    
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;  
`;

/* 게시판 번호 테그 */
const BoardOrder = styled.p`
    margin: 0 0.5rem;

    /* font 속성 */
    color: ${props => {
        return props.isSelected ? colors.font_darkgray : colors.font_lightgray
    }};

    cursor: pointer;
`;

//////////////////////////////////////

/* React Component */
class ManagePost extends Component{

    state = {
        curOrder: 1     // 현재 게시판 번호
    }

    /* 게시판 번호 클릭 시의 헨들러 함수 */
    _onClickOrder = (order) => {
        /* 인자로 받는 order 값으로 state의 curOrder를 세팅 */
        this.setState({
            ...this.state,
            curOrder: order
        })
    }

    _handleDelete = (board, id) => {
        const { deletePost } = this.props;
        
        deletePost(board, id)
        window.location.reload();
    }

    /* Post Item을 render하는 함수 */
    _renderPostItems = (postList, board) => {

        const { updatePostCondition } = this.props;

        return postList.map((post, idx) => {
            // console.log(post);

            const { id, postId, title, created, condition } = post;

            /* posting 게시글 URL */
            const postURL = `/board/${board}/${id}`;

            /* 해당 포스팅 edit 페이지 URL */
            const editURL = `/manage/edit/${board}/${id}`;

            const formatCreated = formatDateStrToFullDateTime(created);

            console.log(formatCreated)

            return (
                <PostItem isLast={(idx + 1) === postList.length} key={idx}>
                    <PostID>{postId}</PostID>
                    
                    <TextBox>
                        <PostTitle> <TitleLink to={postURL} >{title}</TitleLink> </PostTitle>
                        <PostSubInfo> {formatCreated} </PostSubInfo>
                    </TextBox>
                    
                    {/* 수정, 삭제, 상태변경 버튼 */}
                    <ButtonBox>
                        <PostManageButton href={editURL} >수정</PostManageButton>
                        <PostManageButton onClick={() => this._handleDelete(board, id)} isDelete={true} >삭제</PostManageButton>
                        <ConditionSelector 
                            board={board} 
                            post_id={id}
                            originCondition={condition} 
                            updatePostCondition={updatePostCondition} 
                        />
                    </ButtonBox>
                </PostItem>
            )
        })
    }

    /* 게시판 번호를 render하는 함수 */
    _renderOrders = (curOrder, maxOrder) => {
        /* 게시판 번호를 담은 리스트 ([1, 2, ... maxOrder]) */
        let orderList = [...Array(maxOrder).keys()].map(x => x + 1);

        return orderList.map((order, idx) => {
            return <BoardOrder
                        isSelected={order === curOrder} 
                        onClick={() => this._onClickOrder(order)}
                        key={idx} 
                    >
                        {order}
                    </BoardOrder>
        })
    }


    render() {

        const MAX_ITEM = 7;     // 화면에 보이는 최대 포스팅 아이템 개수

        const {
            board,
            postList,
            deletePost,
        } = this.props;

        const {
            curOrder,
        } = this.state;

        /* 전체 작성한 글의 개수 */
        let postsNum = postList.length;
        
        /* 게시판 순서의 최댓값 */
        let maxOrder = Math.ceil(postsNum / MAX_ITEM);

        /* 게시판 상단의 텍스트 내용 */
        const title = (board === 'market') ? '유니마켓 글 관리' : '네트워킹 글 관리';
        const subInfo = `${postsNum} 개`;

        /* 게시판 페이지에 해당되는 리스트만 뽑은 리스트 */
        let parsedList = postList.slice((curOrder - 1) * MAX_ITEM, curOrder * MAX_ITEM);

        /* parse list에 글 번호 주기 */
        parsedList.forEach((post, i) => {
            post.postId = postsNum - ((curOrder - 1) * MAX_ITEM) - i
        })

        return (
            <WholeBox>
                <ContentHeader title={title} subInfo={subInfo} hasCreatedButton={true} />
                <BodyBox>
                    {
                        /* post가 있으면 PostBox, 없으면 NoPostBox */
                        postsNum ?
                        <PostsBox>
                            {
                                this._renderPostItems(parsedList, board, deletePost)
                            }
                            {
                                /* maxOrder가 1보다 크면 BoardOrderBox render */
                                maxOrder > 1 ?
                                <BoardOrderBox>
                                    {
                                        this._renderOrders(curOrder, maxOrder)
                                    }
                                </BoardOrderBox> :
                                ''
                            }
                        </PostsBox> :

                        <NoPostBox>
                            아직 작성된 글이 없어요.<br /><br />
                            글 쓰기 버튼을 눌러서 새로운 글을 작성하세요 !
                        </NoPostBox>
                    }
                </BodyBox>
            </WholeBox>
        )
    }

}

ManagePost.propTypes = {
    postList: PropTypes.array,                          // 게시글 리스트
    board: PropTypes.string.isRequired,                 // 어떤 게시판인지 정보

    deletePost: PropTypes.func.isRequired,              // Post 지우는 함수
    updatePostCondition: PropTypes.func.isRequired,     // 포스팅의 상태 변경 메서드
}

ManagePost.defaultProps = {
    postList: []
}


export default ManagePost