/* 상위 컴포넘트: CommentItem.js */

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, Popover, Tooltip, Modal } from 'antd'

const { confirm } = Modal;

/* Styled Components */
/* 삭제 및 수정하기 버튼 기능을 열 수 있는 아이콘 */
const MoreIcon = styled(Icon)`
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: ${ props => {
        return props.isVisible ? 'visible' : 'hidden'
    }};
`

/* Popover Content의 Text Style */
const PopoverContentText = styled.p`
    margin: 0.25rem 0;
    word-spacing: 0.5rem;
    
    cursor: pointer;
`;


/* React Component */
class MoreButton extends Component {

    state = { 
        popoverVisible: false
    }

    /* 댓글 삭제 메시지를 띄우는 창 (Modal confirm) */
    _showDeleteConfirm = (content) => {
        this.setState({
            ...this.state,
            popoverVisible: false
        })
        
        confirm({
            title: '삭제',
            content,
            okText: '네',
            okType: 'danger',
            cancelText: '아니요',
            onOk: () => {this._handleDelete()},
            onCancel() {},
            maskClosable: true,
        });
    }

    /* Popover의 visible값을 바꾸는 함수 */
    _handlePopVisibleChange = (visible) => {
        this.setState({
            ...this.state,
            popoverVisible: visible
        })
    }

    /* 댓글 삭제 액션 함수 */
    _handleDelete = () => {

        const { 
            comment_id, 
            deleteComment, 
            subCommentList,
        } = this.props;

        /* 답글이 있는 경우, 답글들 모두 삭제함 */
        if ( subCommentList[0] ) {
            subCommentList.forEach( subComment => {
                deleteComment(subComment.id)
            })
        }

        /* 댓글 삭제 액션 */
        deleteComment(comment_id);        

        /* 현재는 새로고침으로 하기
           나중에 socket.io를 이용해서 자동으로 업데이트 되도록 하기 */
        window.location.reload();
    }

    
    render () {

        const {
            subCommentList,
            isVisible
        } = this.props;

        const {
            popoverVisible
        } = this.state;

        const deleteMessage = subCommentList[0] ?
        '이 댓글을 삭제하면 모든 답글도 삭제됩니다.' :
        '이 댓글을 삭제하시겠습니까?' ;

        /* Popover Content */
        const PopoverContent = (
            <div>
                <PopoverContentText><Icon type='edit' /> 수정하기</PopoverContentText>                
                <PopoverContentText 
                    onClick={() => this._showDeleteConfirm(deleteMessage)} 
                >
                    <Icon type='delete' /> 삭제하기
                </PopoverContentText>
            </div>
        )

        return (
            <Tooltip title='수정 또는 삭제' mouseEnterDelay={0} mouseLeaveDelay={0}>
                <Popover
                    trigger="click"
                    content={PopoverContent}
                    placement='bottom'
                    visible={popoverVisible}
                    onVisibleChange={this._handlePopVisibleChange}
                >                                    
                    <MoreIcon 
                        type="more" 
                        rotate='90' 
                        isVisible={isVisible} 
                    />
                </Popover>
            </Tooltip>
        )
    }
}

MoreButton.propTypes = {
    comment_id: PropTypes.number.isRequired,    // 댓글 ID
    subCommentList: PropTypes.array,            // 답글들의 데이터 array
    deleteComment: PropTypes.func.isRequired,   // 댓글 삭제 메서드
    isVisible: PropTypes.bool.isRequired,       // 보이기 안 보이기
}

MoreButton.defaultProps = {
    subCommentList: []
}


export default MoreButton;