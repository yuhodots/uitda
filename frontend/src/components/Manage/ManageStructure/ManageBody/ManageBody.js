


import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { colors } from '../../../../styles/variables'

import {
    SideBox, ContentBox
} from '../'


/* Styled Components */

/* Body Area를 정의하는 div 태그
   backgrond color를 가지고, 전체를 덮는 크기를 정함 */
const BodyArea = styled.div`
    min-height: 40rem;
    background-color: ${colors.gray_bg};
    margin: 0;
    padding: 2.5rem;
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

            /* posts */
            postList

        } = this.props

        console.log(user)

        return (
            <BodyArea>
                <WholeBox>
                    <SideBox
                        user={user}
                        kind={kind}
                    />
                    <ContentBox 
                        kind={kind}
                        postList={postList}
                    />
                </WholeBox>
            </BodyArea>
        )
    }
}

ManageBody.propTypes = {
    kind: PropTypes.string.isRequired,      // 메니지 카테고리 정보
}

export default ManageBody;