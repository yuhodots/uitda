/* 카풀 Room 모달의 헤더 더보기에 해당하는 Popover content의 data list를 만들어주는 함수 */

import React from 'react';
import { 
    DeleteOutlined, EditOutlined, FieldTimeOutlined, CloseCircleOutlined, PushpinOutlined, MessageOutlined
} from "@ant-design/icons";

import { OWNER, OWNER_CLOSED, GUEST, GUEST_CLOSED } from "../../../../constants/calendar_consts";


const renderCarpoolModalPopoverContent = ( curUser, selectedEvent, clickMethods ) => {

    const { id, label, guestlist } = selectedEvent;
    const { 
        deleteEvent, changeModeToUpdate,
        closeOrCancleEvent,
        joinEvent, cancleJoinEvent
    } = clickMethods;

    /* 방장, 방장 마감의 공통 기능 (수정, 삭제) */
    let ownerContentList = [
        {
            icon: <EditOutlined />,
            text: '수정하기',
            clickMethod: () => { changeModeToUpdate(); }
        },
        {
            icon: <DeleteOutlined />,
            text: '삭제하기',
            clickMethod: () => {
                deleteEvent(id);
                
                /* 현재는 시간 조금 이후에 새로고침이지만,
                   socket으로 구현이 되면, modal 닫기만 하면 된다. */
                setTimeout(() => {
                    window.location.reload();
                }, 300);
            }
        }
    ];

    /* 방장이 아닌 방의 공통 기능 (메시지 보내기) */
    let guestContentList = [
        {
            icon: <MessageOutlined />,
            text: '메시지 보내기',
            type: 'link',
            // url: `/chatting/t/${user.id}`
            url: `/chatting/index`
        }
    ]


    switch (label) {

        case OWNER:
            return [
                ...ownerContentList,
                {
                    icon: <FieldTimeOutlined />,
                    text: '마감하기',
                    clickMethod: () => { closeOrCancleEvent(id, 2) /* 마감 */ }   
                }
            ]

        case OWNER_CLOSED:
            return [
                ...ownerContentList,
                {
                    icon: <CloseCircleOutlined  />,
                    text: '마감 취소하기',
                    clickMethod: () => { closeOrCancleEvent(id, 1)   /* 모집 중 */  }   
                }
            ]

        case GUEST:
        case GUEST_CLOSED:
            return [
                {
                    icon: <CloseCircleOutlined  />,
                    text: '내 일정에서 제외하기',
                    clickMethod: () => { cancleJoinEvent(id) }
                },
                ...guestContentList
            ]

        default:
            return [
                {
                    icon: <PushpinOutlined />,
                    text: '내 일정에 추가하기',
                    clickMethod: () => { joinEvent(id) }
                },
                ...guestContentList
            ] 
    }
}


export default renderCarpoolModalPopoverContent;