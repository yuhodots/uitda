


import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// import { colors } from '../../../../styles/variables'
import { BGTemplate } from '../../../../styles/templates/manage'

import {
    SideBox, ContentBox
} from '../'


/* Styled Components */

/* Body Area를 정의하는 div 태그
   backgrond color를 가지고, 전체를 덮는 크기를 정함 */
const BodyArea = styled(BGTemplate)`
    margin: 0;
    padding: 2.5rem;
    padding-top: 6.5rem;

    /* 최소 높이가 50rem보다 큰 경우, 화면 크기에 맞춤 */
    min-height: ${props => {
        return props.windowHeight > 50 * 16 ?
        `${props.windowHeight}px` :
        '50rem';
    }};
    min-width: 1230px; /* 내용물을 다 담을 수 있도록 (1150px + 5rem) */
`;

/* Body에 들어가는 요소 (SideBox, ContentBox)를 담는 전체 Box
   가로 길이를 고정 시키고, margin을 auto로 설정해 고정된 크기의 요소를
   가운데 정렬 시켰음. (데스크탑 버전과 mobile 반응형은 나중에 고려)
   
   Side Box와 Content Box를 담는 flex box임*/
const WholeBox = styled.div`
    width: 1150px;
    margin: 0 auto;

    display: flex;
    flex-flow: row nowrap;
`


/* React Component */
class ManageBody extends Component {



    render () {

        const {
            user,
            kind,
            windowHeight,

            /* posts */
            postList,
            deletePost,
        } = this.props

        return (
            <BodyArea windowHeight={windowHeight} >
                <WholeBox>
                    <SideBox
                        user={user}
                        kind={kind}
                    />
                    <ContentBox 
                        kind={kind}
                        postList={postList}
                        deletePost={deletePost}
                    />
                </WholeBox>
            </BodyArea>
        )
    }
}

ManageBody.propTypes = {
    kind: PropTypes.string.isRequired,          // 메니지 카테고리 정보
    windowHeight: PropTypes.number.isRequired,  // 화면 최소 세로 길이 정보

    postList: PropTypes.array,                  // Posts 데이터 리스트
    deletePost: PropTypes.func,                 // Post를 지우는 함수
}

export default ManageBody;