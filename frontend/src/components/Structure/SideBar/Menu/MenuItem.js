

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { 
    MarketIcon,
    NetworkingIcon,
    CarpoolIcon,
    ManageIcon,
    ChattingIcon,
} from "../../../../styles/images/Menu_Icon_Image";
import { 
    MARKET, NETWORKING, CARPOOL, MANAGE, CHATTING
} from "../../../../constants/categories";
import { colors, Screen_Size } from "../../../../styles/variables";


/* Styled Components */
/* Item을 감싸는 전체 Link Box.
   hover시 배경색을 회색으로 변경하고,
   선택된 카테고리는 오른쪽 border를 파란색으로 한다. */
const MenuItemLinkBox = styled(Link)`
    margin: 0;
    padding-left: 3.7rem;
    height: 3rem;
    width: 100%;

    border-right: ${props => props.isSelected ?
                    '4px solid #1E90FF' : 'none'};

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    :hover {
        background-color: #F4F4F4;
    }

    @media (max-width: ${Screen_Size.pad_portrait}) {
        padding-left: 2.25rem;
    }
`;

    /* Menu의 Icon 이미지를 담는 div 태그 */
    const MenuIconImg = styled.div`
        margin-right: 0.75rem;
        height: 1.5rem;
        width: 1.5rem;

        background-image: ${props => `url(${props.imgURL})`};
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
    `;

    /* Menu의 텍스트 스타일 */
    const MenuText = styled.div`
        color: ${colors.black};
        font-size: 1.15rem;
    `;


/* Custom Functions */
/* category 값을 받아 img를 반환하는 함수 */
const categoryToImg = (category) => {
    switch (category) {
        case MARKET:
            return MarketIcon;
        case NETWORKING:
            return NetworkingIcon;
        case CARPOOL:
            return CarpoolIcon;
        case MANAGE:
            return ManageIcon;
        case CHATTING:
            return ChattingIcon;
        default: return;
    }
}

/* React Component */
const MenuItem = ({titleText, url, category, isSelected}) => {
    
    const imgURL = categoryToImg(category);
    
    return (
        <MenuItemLinkBox to={url} isSelected={isSelected} >
            <MenuIconImg imgURL={imgURL} />
            <MenuText> {titleText} </MenuText>
        </MenuItemLinkBox>
    )
}

MenuItem.propTypes = {
    titleText: PropTypes.string.isRequired,     // 페이지에 나타나는 title text 값
    url: PropTypes.string.isRequired,           // 클릭 시 이동되는 url
    category: PropTypes.string.isRequired,      // react app에서 사용하는 category constant 값
    isSelected: PropTypes.bool,                 // 선택된 메뉴 정보
}

MenuItem.defaultProps = {
    isSelected: false
}

export default MenuItem;