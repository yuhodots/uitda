//

// 상위 컴포넌트: SideBarContainer.js


import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors, Screen_Size } from "../../../styles/variables";
import topicData from "./topics.json";
import Logo from "../CommonComponents/Logo";
import Menu from "./Menu";

/* Styled Components */

/* 사이드바 전체 영역 스타일 박스 */
const SidebarBox = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 15rem;
    z-index: 100;

    background-color: ${colors.white};
    border-right: 2px solid ${colors.gray_bg};

    display: flex;
    flex-flow: column nowrap;

    @media (max-width: ${Screen_Size.pad_portrait}) {
        width: 12rem;
    }
`;

    /* Logo를 담는 영역 */
    const LogoContainer = styled.div`
        flex: 0 4rem;

        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;

        border-bottom: 2px solid ${colors.gray_bg};
    `;

    /* 위 카테고리 박스 (다판다, 잉력시장, 카풀) */
    const TopCategoryBox = styled.div`
        margin-top: 2.5rem;
    `;

    /* 아래 카테고리 박스 (Manage, Chatting) */
    const BottomCategoryBox = styled.div`
        position: absolute;
        bottom: 2rem;
        width: 100%;
        padding-top: 2rem;
        border-top: 2px solid ${colors.gray_bg};
    `;


/* React Component */
class SideBar extends Component {

    render() {
        return (
            <SidebarBox >
                <LogoContainer>
                    <Logo isWhite={false} />
                </LogoContainer>

                <TopCategoryBox>
                    <Menu 
                        selectedTopic={this.props.topic} 
                        topicData={topicData.upper}    
                    />
                </TopCategoryBox>

                <BottomCategoryBox>
                    <Menu
                        selectedTopic={this.props.topic} 
                        topicData={topicData.below}
                    />
                </BottomCategoryBox>
            </SidebarBox>
        )
    }
}

SideBar.propTypes = {
    topic: PropTypes.string.isRequired      // 하이라이트를 줄 topic의 인덱스
}


export default SideBar;