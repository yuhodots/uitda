

// 상위 컴포넌트: SideBar

import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Menu.css';

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
            <Link to={url} className='CategoryText'>{title}</Link>
        </li>
    )
}


export default Menu;