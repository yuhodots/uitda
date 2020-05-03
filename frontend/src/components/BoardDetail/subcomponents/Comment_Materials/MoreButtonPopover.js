

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Tooltip } from "antd";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { UitdaPopover } from "../../../Structure/CommonComponents";


/* Styled Components */
const MoreButtonContainer = styled.div`
    visibility: ${ props => {
        return props.moreButtonVisible ? 'visible' : 'hidden'
    }};
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const MoreButton = styled(MoreOutlined)`
`;


/* Custom Functions */
const renderPopoverContent = (popoverMethods) => {
    
    const { deleteComment, setUpdateMode } = popoverMethods;
    
    return [
        {
            icon: <EditOutlined />,
            text: '수정하기',
            clickMethod: () => setUpdateMode(true),
        },
        {
            icon: <DeleteOutlined />,
            text: '삭제하기',
            clickMethod: () => {},
            theme: 'danger'
        }
    ]
}

/* React Component */
const MoreButtonPopover = ({comment_id, subCommentList, moreButtonVisible, deleteComment, setUpdateMode }) => {

    const popoverMethods = { deleteComment, setUpdateMode }

    const contentList = renderPopoverContent(popoverMethods)

    return (
        <MoreButtonContainer moreButtonVisible={moreButtonVisible} >
                <UitdaPopover 
                    PopButton={() => {
                        return (
                            <Tooltip title='수정 또는 삭제' mouseEnterDelay={0} mouseLeaveDelay={0} >
                                <MoreButton rotate={90} />
                            </Tooltip>
                        )
                    }}
                    contentList={contentList}
                    placement='bottom'
                />
        </MoreButtonContainer>
    )
}

MoreButtonPopover.propTypes = {
    comment_id: PropTypes.number.isRequired,        // 댓글 ID
    subCommentList: PropTypes.array,                // 답글들의 데이터 array
    moreButtonVisible: PropTypes.bool.isRequired,   // Visiblity 속성값
    
    deleteComment: PropTypes.func.isRequired,       // 댓글 삭제 메서드
    setUpdateMode: PropTypes.func.isRequired,       // 수정 모드로 변경하는 메서드
}

MoreButtonPopover.defaultProps = {
    subCommentList: [],
    isVisible: true,
}


export default MoreButtonPopover;