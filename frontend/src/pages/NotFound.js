import React from "react";
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <h2>Page Not Found.</h2>
            <p>잘못된 url 접근입니다.</p>
            <br/><br/>
            <Link to='/'>홈으로</Link>
        </div>
    )
}

export default NotFound;