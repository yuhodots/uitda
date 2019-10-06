// 상위 컴포넌트: PosatCard.js

import React from "react";

import PhotoBox from './CardCompoents/PhotoBox';
import ContentBox from "./CardCompoents/ContentBox";


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

export default MarketCard;