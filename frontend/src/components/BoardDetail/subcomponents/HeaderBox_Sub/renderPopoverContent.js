
import React from 'react';
import { Modal } from "antd";
import { DeleteOutlined, EditOutlined, MessageOutlined, PushpinOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;


const renderPopoverContent = (isOwner, postData, headerMethods, history) => {
    
    const { board, postId } = postData;
    const { deletePost } = headerMethods;
    
    const clickMethod = () => console.log('hi');
    
    /* 삭제하기 버튼의 클릭 Method
       confirm 창을 띄우고, Ok 선택 시 게시글을 지우고 board로 redirect함 */
    const deleteMethod = () => {
        confirm({
            title: '정말 삭제하시겠습니까?',
            icon: <ExclamationCircleOutlined />,
            maskClosable: true,
            onOk: () => {
                deletePost(board, postId);
                history.push(`/board/${board}`);
            },
            onCancel: () => {},
          });
    }

    return isOwner ?
    [
        {
            icon: <EditOutlined />,
            text: '수정하기',
            type: 'link',
            url: `/manage/edit/${board}/${postId}`
        },
        {
            icon: <DeleteOutlined />,
            text: '삭제하기',
            theme: 'danger',
            clickMethod: deleteMethod
        }
    ] :

    /* 내 글이 아닌 경우 */
    [
        {
            icon: <PushpinOutlined />,
            text: '관심글 추가',
            clickMethod
        },
        {
            icon: <MessageOutlined />,
            text: '메시지 보내기',
            clickMethod
        },
    ]
}

export default renderPopoverContent;