import React, { Component } from 'react';
import styled from 'styled-components';

import { colors } from '../../../../../styles/variables'

/* Styled Components */
const BoxArea = styled.div`

    margin-bottom: 2rem;
    padding: 1rem;

    width: 100%;
    height: 16rem;

    background-color: ${colors.white};
    border: 1px solid ${colors.gray_line};

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
`;

/* 사진이 들어가는 동그란 영역 */
const PhotoCircle = styled.div`
    height: 8rem;
    width: 8rem;
    border-radius: 50%;
    margin-bottom: 1rem;

    background-color: ${colors.gray_bg};
`

/* User Name이 들어가는 공간 */
const UserName = styled.div`
    margin-top: 0.5rem;
    font-size: 1.125rem;
`

const Email = styled.div`
    /* margin-top: 0.5rem; */
    font-size: 0.875rem;
    color: ${colors.font_gray};
`



class PictureBox extends Component {



    render () {

        const {
            user
        } = this.props

        return (
            <BoxArea>
                <PhotoCircle/>
                <Email>{user.email}</Email>
                <UserName>박수근</UserName>
            </BoxArea>
        )
    }
}

export default PictureBox;