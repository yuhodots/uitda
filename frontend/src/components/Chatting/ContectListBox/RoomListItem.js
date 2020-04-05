

import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { colors } from "../../../styles/variables";
import { UserPhoto } from "../../Structure/CommonComponents";


/* Styled Components */
/* 전체 박스 size */
const WholeArea = styled.div`
    width: 100%;
    height: 4.5rem;
`;

    /* Item을 담는 Wrapper의 공통 속성 */
    const ItemWrapperStyle = css`
        width: 100%;
        height: 100%;
        padding: 0.5rem 1rem;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    `;

    /* 선택되지 않은 방은 Link 태그 */
    const LinkWrapper = styled(Link)`
        ${ItemWrapperStyle}
        color: ${colors.font_default};

        :hover {
            color: ${colors.font_default};
            background-color: ${colors.gray_bg};
        }
    `;

    /* 선택된 방은 배경색을 갖는 div태그 */
    const SelectedWrapper = styled.div`
    
    `;


        const TextBox = styled.div`
            margin-left: 1rem;
            flex: 1;
            height: 100%;

            display: flex;
            flex-flow: column nowrap;
            align-items: flex-start;
            justify-content: center;
        `;

            const OpntUserName = styled.div`
            
            `;

            const AdditionText = styled.div`
            
            `;



/* React Component */
class RoomListItem extends Component {



    render() {

        const { opntUser, updated, unread } = this.props;

        const { id, username, pic_location } = opntUser;

        const roomURL = `/chatting/t/${id}`;

        return (
            <WholeArea>
                <LinkWrapper to={roomURL} >
                    <UserPhoto imgURL={pic_location} size='48' />
                    <TextBox>
                        <OpntUserName>{username}</OpntUserName>
                        <AdditionText>{updated}</AdditionText>
                    </TextBox>
                </LinkWrapper>
            </WholeArea>
        )
    }
}

RoomListItem.propTypes = {
    opntUser: PropTypes.object.isRequired,          // 상대 유저 데이터
    updated: PropTypes.string.isRequired,           // 가장 최근 업데이트 된 시각
    unread: PropTypes.number.isRequired,            // 안 읽은 개수
}


export default RoomListItem