import React from "react";
import { Link } from 'react-router-dom';

import userPhoto from "./user-basic.png";

const ContentBox = ({id, title, username, created, description}) => {

    return (
        <div className='ContentBox'>
            <div className='ContentHead'>
                <div className="InfoBox">
                    <div className='user-photo'><img src={userPhoto} className="Photo" alt="" /></div>
                    <div className='Infomations'>
                        <div className='username'>{username}</div>
                        <div className='created'>{created}</div>
                        <div className='sell-status'>판매상태</div>
                    </div>
                </div>

                <h3>
                    <Link to="/" className="PostTitle">{title}</Link>
                </h3>

                <h4>
                    10,000 원
                </h4>

            </div>
            <div className="description">
                {description}
            </div>
        </div>
    )
}

export default ContentBox;