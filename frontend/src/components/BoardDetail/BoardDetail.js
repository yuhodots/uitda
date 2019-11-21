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
    background-color: ${colors.gray_bg};
`;

/*  내용물들을 담을 컨테이너 div 태그
    최소 높이를 현재 창의 높이로 설정하여, content들이 적어도 화면 전체 높이를 차지 할 수 있도록 함.
    너비는 전체 가로의 70%만을 차지하는 반응 크기를 사용  */
const ContainerDiv = styled.div`
    width: 70%;
    min-width: 40rem;
    min-height: ${props => props.minHeight};
    margin: 0 auto;
    padding: 3rem 2rem;

    background-color: ${colors.white};

    /* 그림자 효과 */
    box-shadow: 0 0 10px rgba(0,0,0,.1);
`;


/* React Component */

class BoardDetail extends Component {

    state = {}

    componentDidMount() {
        this.setState({
            clientHeight: document.documentElement.clientHeight     // 현재 창의 높이 크기
        })

        /* 브라우저 창의 크기가 변하는 이벤트를 감지한다. */
        window.addEventListener('resize', this._handleResize) 
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
        
        let { clientHeight } = this.state;

        const {
            /* PhotoBox에 전해줄 속성 */
            filelist,           // 사진 파일들을 담은 리스트 (array)

            /* TextBox에 전해줄 속성 */
            title,              // 제목 (string)
            user,               // 유저 정보 객체 (object)
            created,            // 생성시간 (string)
            condition,          // 판매상태 
            description,        // 상세 

            price,              // Market Post만이 가지고 있는 가격 정보

            /* CommentBox에 전해줄 속성 */

        } = this.props.post;

        let isPhoto = filelist.length;  // filelist에 원소가 하나라도 있으면 true

        const commentList = [
            {
                username:'정유호',
                content:'안 사요.',
                created:'10시간 전',
                subCommentList:[
                    {username: '박수근', content:'너무해 ㅠㅠ', created:'21분 전'},
                    {username: '박수근', content:'ㅠㅠ', created:'21분 전'},
                    {username: '박수근', content:'ㅠㅠ', created:'20분 전'},
                    {username: '정유호', content:'으...', created:'방금 전'}
                ]
            },
            {
                username:'황희원',
                content:'감귤 사세요 !!!!',
                created:'6시간 전',
                subCommentList:[
                    {username: '정유호', content:'한라봉도 파나요 ??', created:'3시간 전'}
                ]
            },
            {
                username:'박수근',
                content:'기이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이인그으으으으으으으으으으으으으으으으으으으으으으으으으으을',
                created:'22분 전',
                subCommentList:[
                    {username: '박수근', content:'기이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이인답그으으으으으으으으으으으으으으으으으으으으으으으으으으을', created:'20분 전'}
                ]
            },
            {
                username:'박수근',
                content:'으아아아ㅏㅏ',
                created:'3분 전'
            }
        ]

        return (
            <BackgroundDiv>
                <ContainerDiv minHeight={`${clientHeight}px`} >
                    <HeaderBox
                        title={title}
                        user={user}
                        created={created}
                        condition={condition}
                        price={price}
                    />
                    { isPhoto ? <PhotoBox filelist={filelist} /> : '' }
                    <DescriptionBox description={description} />
                    <CommentBox commentList={commentList} />
                </ContainerDiv>
            </BackgroundDiv>
        )
    }
}

BoardDetail.propTypes = {
    post: PropTypes.object.isRequired
}

export default BoardDetail;
