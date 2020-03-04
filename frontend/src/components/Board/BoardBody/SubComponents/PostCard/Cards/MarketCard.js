// 상위 컴포넌트: PostCard.js

import React from "react";
import PropTypes from 'prop-types';

import PhotoBox from './CardCompoents/PhotoBox';
import ContentBox from "./CardCompoents/ContentBox";


const MarketCard = ({id, title, user, created, description, boardName, filelist}) => {
    return (
        <div className="Basic">
            <PhotoBox 
                filelist={filelist}
                boardName={boardName}
                postId={id}
            />
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

MarketCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    boardName: PropTypes.string.isRequired,
    filelist: PropTypes.array.isRequired
}

export default MarketCard;