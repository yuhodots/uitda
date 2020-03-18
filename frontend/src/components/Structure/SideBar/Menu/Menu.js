

// 상위 컴포넌트: SideBar

import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Menu.css';

import market from './market.png'
import networking from './networking.png'
import carpool from './carpool.png'
import manage from './manage.png'
import chatting from './chatting.png'

const selectImage = (title) => {
    if (title == '유니마켓'){
        return market;
    }
    else if (title == '네트워킹'){
        return networking;
    }
    else if (title == '택시카풀'){
        return carpool;
    }
    else if (title == '글 관리'){
        return manage;
    }
    else if (title == '채팅방'){
        return chatting;
    }
}

const Menu = ({selectedTopic, topicData}) => {
    
    return (
        <ul className="Menu">
            {topicData.map((data, i) => {
                return(
                    <MenuItem
                        title={data.title}
                        url={data.url}
                        isActive={data.key === selectedTopic}
                        key={i}
                    />
                )
            })}
        </ul>
    )
}

Menu.propTypes = {
    selectedTopic: PropTypes.string,        // 하이라이트를 줄 topic의 키 값
    topicData: PropTypes.array.isRequired   // 메뉴 아이템의 데이터 리스트
}

Menu.defaultProps = {
    selectedTopic: "HOME"
}

const MenuItem = ({title, url, isActive}) => {
    return (
        <li className={isActive ? 'CategoryItem Active' : 'CategoryItem'}>
            <Link to={url} className='CategoryText'>
                <img src={selectImage(title)}></img>
                {title}
            </Link>
        </li>
    )
}


export default Menu;