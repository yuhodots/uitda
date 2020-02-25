//

// 상위 컴포넌트: SideBarContainer.js


import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from "../../../styles/variables";
import topicData from "./topics.json";
import Logo from "../CommonComponents/Logo";
import Menu from "./Menu";

import './SideBar.css';

/* Styled Components */

const LogoContainer = styled.div`
    flex: 0 4rem;

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    border-bottom: 2px solid ${colors.gray_bg};
`;


/* React Component */
class SideBar extends Component {

    render() {
        return (
            <div className='SideBar'>

                <LogoContainer>
                    <Logo isWhite={false} />
                </LogoContainer>

                <div className="UpperItemContainer">
                    <Menu 
                        selectedTopic={this.props.topic} 
                        topicData={topicData.upper}    
                    />
                </div>

                <div className='BottomItemContainer'>
                    <Menu
                        selectedTopic={this.props.topic} 
                        topicData={topicData.below}
                    />
                </div>
                
            </div>
        )
    }
}

SideBar.propTypes = {
    topic: PropTypes.string.isRequired      // 하이라이트를 줄 topic의 인덱스
}


export default SideBar;