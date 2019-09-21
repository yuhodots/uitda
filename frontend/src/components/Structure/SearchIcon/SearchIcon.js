// 

// 상위 컴포넌트: MarketContainer, NetworkContainer

import React from "react";

import './SearchIcon.css';

const SearchIcon = ({isHeaderOn, headerOn}) => {
    return (
        <div 
            className={
                isHeaderOn ?
                "SearchIcon hidden" :
                "SearchIcon"
            }

            onClick={headerOn}>
            검색
        </div>
    )
}

export default SearchIcon;