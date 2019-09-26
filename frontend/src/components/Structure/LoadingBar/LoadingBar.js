
// 상위 컴포넌트: BoardContainer.js

import React from "react";
import PropTypes from 'prop-types';

import './LoadingBar.css';

const LoadingBar = ({isLoading}) => {
    return (
        <div className='LoadingBar'>
            <div className={ isLoading ? 'bar' : 'bar not-loading' }></div>
        </div>
    )
}

LoadingBar.propTypes = {
    isLoading: PropTypes.bool.isRequired    // 페이지 로딩 중 여부
}

export default LoadingBar;