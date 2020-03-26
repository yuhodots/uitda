// 상위 컴포넌트: ManageHeader


import React from 'react';

import LinkCategory from "../../../../Structure/BaseHeader/LinkCategory_MidComp";

/* react component */
const DefaultComponent = () => {

    const categoryDatas = [
        { url: '/board/market', text: '다판다' },
        { url: '/board/networking', text: '잉력시장' },
        { url: '/carpool', text: '카풀' },
        { url: '/chatting/index', text: '채팅방'},
    ]

    return (
        <LinkCategory categoryDatas={categoryDatas} />
    )
}

export default DefaultComponent;