

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { MoreOutlined } from "@ant-design/icons";

import { colors } from "../../../../styles/variables";
import { UitdaPopover } from "../../../Structure/CommonComponents";
import renderPopoverContent from "./renderPopoverContent";


/* 작성자, 작성일, Status 정보를 담은 row box */
const WholeBox = styled.div`
    flex: 1;

    cursor: default;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
`;

    /* 작성자, 작성일의 정보를 담은 div */
    const UsernameCreatedBox = styled.div`
        color: ${colors.gray_fontColor};
        
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
    `;
        
        const UserNameText = styled.div`
            font-size: 1.125rem;
            font-weight: bold;
        `;

        const CreatedText = styled.div`
            font-size: 0.875rem;
        `;

    /* 우측의 상태정보, 더보기 버튼을 담은 div 태그 */
    const RightBox = styled.div`
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    `;

        /* 상태 정보 박스 Status Circle + Text */
        const StatusBox = styled.div`
            margin-right: 1rem;
            
            white-space: nowrap;

            display: flex;
            flex-flow: row nowrap;
            align-items: center;
        `;

            const StatusCircle = styled.div`
                height: 0.5rem;
                width: 0.5rem;
                margin-right: 0.75rem;

                border-radius: 50%;
                background-color: ${props => props.labelColor};
            `;

        const MoreIconBox = styled.div`
            cursor: pointer;
        `;


/* Custom Functions */
const _getLabelColor = (condition) => {
    switch (condition) {
        case '판매 중': case '진행 중': return colors.active_blue;
        case '거래 중': return colors.owner_yellow;
        case '판매 완료': case '완료': return colors.closed_gray;
        default: return;
    }
}

const InfoTextBox = ({board, postId, isOwner, username, created, condition, headerMethods, history}) => {

    const labelColor = _getLabelColor(condition);
    const contentList = renderPopoverContent(isOwner, {board, postId}, headerMethods, history);

    return (
        <WholeBox>
            <UsernameCreatedBox>
                <UserNameText>{username}</UserNameText>
                <CreatedText>{created}</CreatedText>
            </UsernameCreatedBox>

            <RightBox>
                <StatusBox> <StatusCircle labelColor={labelColor} /> {condition}</StatusBox>
                <MoreIconBox> <UitdaPopover PopButton={() => <MoreOutlined />} contentList={contentList} /> </MoreIconBox>
            </RightBox>
        </WholeBox>
    )
}

InfoTextBox.propTypes = {
    board: PropTypes.string.isRequired,         // 게시판 정보
    postId: PropTypes.number.isRequired,        // 게시글 id
    isOwner: PropTypes.bool.isRequired,         // 해당 게시글이 내 글인지
    username: PropTypes.string.isRequired,      // 작성자 이름 정보
    created: PropTypes.string.isRequired,       // 글 작성 시각 정보
    condition: PropTypes.string.isRequired,     // 게시글 상태 정보

    headerMethods: PropTypes.object.isRequired,  // 게시글 페이지의 header 부분에서 사용하는 method 모음 객체
}

export default withRouter(InfoTextBox);