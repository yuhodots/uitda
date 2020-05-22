

import React from 'react';
import PropTypes from 'prop-types';

import BaseHeader from "../Structure/BaseHeader";
import LinkCategory from "../Structure/BaseHeader/LinkCategory_MidComp";


/* Custom Functions */
/* 헤더의 가운데 컴포넌트를 render하는 함수 */
const _renderComponent = () => {
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

/* react component */
const ManageHeader = ({curUser, localLogoutRequest, outlookLogoutRequest}) => {

    return (
        <BaseHeader 
            curUser={curUser}
            isBGWhite={true}
            MiddleComponent = {_renderComponent}
        
            localLogoutRequest={localLogoutRequest}
            outlookLogoutRequest={outlookLogoutRequest}
        />
    )
}

ManageHeader.propTypes = {
    curUser: PropTypes.object.isRequired,               // 유저 정보
    localLogoutRequest: PropTypes.func.isRequired,      // 로그아웃 매서드
    outlookLogoutRequest: PropTypes.func.isRequired,    // 아웃룩 로그아웃 메서드
}

ManageHeader.defaultProps = {}

export default ManageHeader;