

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { colors } from '../../../../styles/variables'
import { 
    BoxTemplate,
    LinkBoxTemplate
 } from '../../../../styles/templates/manage'

/* Styled Components */
/* 전체 포스팅 관리 박스 영역 */
const WholeBox = styled.div`
    width: 100%;
    padding: 0 1rem;

    position: relative;

    display: flex;
    flex-flow: column nowrap;
`;

/* //////////////////////////////// */
/* 제목, 글 개수, 글쓰기 항목 담는 div 태그 */
const HeaderBox = styled.div`
    margin-bottom: 2rem;
    
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
`;

/* 관리 페이지 제목 (~~ 글 관리) */
const Title = styled.div`
    font-size: 1.75rem;
`;

/* 글 개수 정보 */
const SubInfo = styled.div`
    margin-left: 2rem;
    font-size: 1.125rem;
`;

/* 글 쓰기 버튼 */
const CreateButton = styled(LinkBoxTemplate)`
    padding: 0.375rem 1rem;

    color: ${colors.font_gray};
    font-size: 0.875rem;

    cursor: pointer;

    position: absolute;
    right: 1rem;
`
///////////////////////////

/*///////////////////////////////////// */
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

//////////////
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

        const EditButton = styled(LinkBoxTemplate)`
            padding: 0.5rem 1rem;
            height: 2rem;
            margin: 0 0.5rem;

            color: ${colors.font_darkgray};
        `;

        const DeleteButton = styled(BoxTemplate)`
            padding: 0.5rem 1rem;
            height: 2rem;
            margin: 0 0.5rem;

            color: ${colors.font_red};

            cursor: pointer;
        `;

        const SelectButton = styled(BoxTemplate)`
            padding: 0.5rem 1rem;
            height: 2rem;
            margin: 0 0.5rem;

            color: ${colors.font_darkgray};

            cursor: pointer;
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
        return props.isHighLight ? colors.font_darkgray : colors.font_lightgray
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

    /* Post Item을 render하는 함수 */
    _renderPostItems = (postList, board) => {
        return postList.map((post, idx) => {
            // console.log(post);

            /* posting 게시글 URL */
            const postURL = `/board/${board}/${post.id}`;

            /* 해당 포스팅 edit 페이지 URL */
            const editURL = `/manage/edit/${board}/${post.id}`;

            return (
                <PostItem isLast={(idx + 1) === postList.length}>
                    <PostID>{post.postId}</PostID>
                    <TextBox>
                        <PostTitle> <TitleLink to={postURL} >{post.title}</TitleLink> </PostTitle>
                        <PostSubInfo> {post.created} </PostSubInfo>
                    </TextBox>
                    <ButtonBox>
                        <EditButton to={editURL} >수정</EditButton>
                        <DeleteButton>삭제</DeleteButton>
                        <SelectButton> {post.condition} </SelectButton>
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
                        isHighLight={order === curOrder} 
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
            postList
        } = this.props;

        const {
            curOrder
        } = this.state;

        /* 전체 작성한 글의 개수 */
        let postsNum = postList.length;
        // let postsNum = 0;    // post가 없는 경우 테스트용
        
        /* 게시판 순서의 최댓값 */
        let maxOrder = Math.ceil(postsNum / MAX_ITEM);

        /* 게시판 제목 */
        let title = (board === 'market') ? '다판다' : '잉력시장';

        /* 게시판 페이지에 해당되는 리스트만 뽑은 리스트 */
        let parsedList = postList.slice((curOrder - 1) * MAX_ITEM, curOrder * MAX_ITEM);

        /* parse list에 글 번호 주기 */
        parsedList.forEach((post, i) => {
            post.postId = postsNum - ((curOrder - 1) * MAX_ITEM) - i
        })

        return (
            <WholeBox>
                <HeaderBox>
                    <Title>{title} 글 관리</Title>
                    <SubInfo>{postsNum} 개</SubInfo>
                    <CreateButton to='/manage/edit/newpost' >글쓰기</CreateButton>
                </HeaderBox>
                <BodyBox>
                    {
                        /* post가 있으면 PostBox, 없으면 NoPostBox */
                        postsNum ?
                        <PostsBox>
                            {
                                this._renderPostItems(parsedList, board)
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
    postList: PropTypes.array,              // 게시글 리스트
    board: PropTypes.string.isRequired,     // 어떤 게시판인지 정보
}

ManagePost.defaultProps = {
    postList: []
}


export default ManagePost