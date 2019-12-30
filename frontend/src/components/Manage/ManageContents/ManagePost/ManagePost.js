

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { colors } from '../../../../styles/variables'
import { BoxTemplate } from '../../../../styles/templates/manage'

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
const CreateButton = styled(BoxTemplate)`
    padding: 0.375rem 1rem;

    color: ${colors.font_gray};
    font-size: 0.875rem;

    cursor: pointer;

    position: absolute;
    right: 1rem;
`
///////////////////////////

/*  */
const BodyBox = styled.div`
    width: 100%;

    display: flex;
    flex-flow: column nowrap;
`;

const NoPostItem = styled(BoxTemplate)`
    margin-top: 2rem;
    padding: 2rem;

    color: ${colors.font_lightgray};
    text-align: center;

`;


/* React Component */
class ManagePost extends Component{


    _renderPostItems = () => {

    }

    render() {

        const {
            board,
            postList
        } = this.props;

        // let postsNum = postList.length;
        let postsNum = 0;
        let title = (board==='market') ? '다판다' : '잉력시장';

        return (
            <div>
                <WholeBox>
                    <HeaderBox>
                        <Title>{title} 글 관리</Title>
                        <SubInfo>{postsNum} 개</SubInfo>
                        <CreateButton>글쓰기</CreateButton>
                    </HeaderBox>
                    <BodyBox>
                        {
                            postsNum ?
                            this._renderPostItems(postList) :
                            <NoPostItem>
                                아직 작성된 글이 없어요.<br /><br />
                                글 쓰기 버튼을 눌러서 새로운 글을 작성하세요 !
                            </NoPostItem>
                        }
                    </BodyBox>
                </WholeBox>
                
            </div>
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