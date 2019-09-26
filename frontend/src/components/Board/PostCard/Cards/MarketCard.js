import React from "react";
import { Link } from 'react-router-dom';

import ContentBox from "./ContentBox";

const MarketCard = ({id, title, user, created, description, filelist}) => {
    return (
        <div className="Basic">
            <PhotoBox filelist={filelist}/>
            <ContentBox
                id = {id}
                title = {title}
                username = {user.username}
                created = {created}
                description = {description}
            />
        </div>
    )
}

const PhotoBox = ({filelist}) => {
    return (
        <Link to='/' className="photo-wrapper">
            {
                filelist[0] ?
                <img src={filelist[0].location} className='Photo' alt="" /> :
                ''
            }
            
            <div className='white-mask'></div>
        </Link>
    )
}

export default MarketCard;