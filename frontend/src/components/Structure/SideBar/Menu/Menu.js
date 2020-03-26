

// 상위 컴포넌트: SideBar

import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MenuItem from "./MenuItem";


/* Styled Components */
const MenuBox = styled.div`
    padding: 0;
    margin: 0;

    display: flex;
    flex-flow: column nowrap;
`;


/* React Component */
const Menu = ({selectedTopic, topicData}) => {
    
    return (
        <MenuBox >
            {topicData.map((data, i) => {
                const { titleText, url, category } = data;
                
                return(
                    <MenuItem
                        titleText={titleText}
                        url={url}
                        category={category}
                        isSelected={category === selectedTopic}
                        key={i}
                    />
                )
            })}
        </MenuBox>
    )
}

Menu.propTypes = {
    selectedTopic: PropTypes.string,        // 하이라이트를 줄 topic의 키 값
    topicData: PropTypes.array.isRequired   // 메뉴 아이템의 데이터 리스트
}

Menu.defaultProps = {
    selectedTopic: "HOME"
}

export default Menu;