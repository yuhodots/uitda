//

// 상위 컴포넌트: SideBarContainer.js


import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import topicData from "./topics.json";

import Menu from "./Menu";
import logo from "./logo-color.png";

import './SideBar.css';


class SideBar extends Component {

    render() {
        return (
            <aside className='SideBar'>

                <div className="LogoContainer">
                    <Link to='/'><img src={logo} className="logo-Image" alt="Home" /></Link>
                </div>

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
                
            </aside>
        )
    }
}

SideBar.propTypes = {
    topic: PropTypes.string.isRequired      // 하이라이트를 줄 topic의 인덱스
}


export default SideBar;