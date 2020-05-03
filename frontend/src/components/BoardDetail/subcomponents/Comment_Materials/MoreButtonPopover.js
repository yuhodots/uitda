

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Tooltip } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import { UitdaPopover } from "../../../Structure/CommonComponents";


/* Styled Components */
const MoreButton = styled(MoreOutlined)`
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: ${ props => {
        return props.isVisible ? 'visible' : 'hidden'
    }};
    /* visibility: visible; */
`;


/* Custom Functions */
const renderPopoverContent = (popoverMethods) => {
    
    const { deleteComment, setUpdateMode } = popoverMethods;
    
    return [
        {
            text: '수정하기',
            clickMethod: () => setUpdateMode(true),
        }
    ]
}

/* React Component */
const MoreButtonPopover = ({comment_id, subCommentList, isVisible, deleteComment, setUpdateMode}) => {

    const popoverMethods = { deleteComment, setUpdateMode }

    const contentList = renderPopoverContent(popoverMethods)

    return (
        <Tooltip title='수정 또는 삭제' 
        // mouseEnterDelay={0} mouseLeaveDelay={0}
        >
            <UitdaPopover 
                PopButton={() => <MoreButton rotate={90} isVisible={isVisible} />}  
                contentList={contentList}
                placement='bottom'
            />
        </Tooltip>
    )
}

MoreButtonPopover.propTypes = {
    comment_id: PropTypes.number.isRequired,    // 댓글 ID
    subCommentList: PropTypes.array,            // 답글들의 데이터 array
    
    deleteComment: PropTypes.func.isRequired,   // 댓글 삭제 메서드
    setUpdateMode: PropTypes.func.isRequired,   // 수정 모드로 변경하는 메서드
}

MoreButtonPopover.defaultProps = {
    subCommentList: [],
    isVisible: true,
}


export default MoreButtonPopover;