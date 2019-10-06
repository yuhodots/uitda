import React from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import userPhoto from "./User_Basic_img.JPG";


////// Styled-Components ///////

const ContentBoxDiv = styled.div`
    padding: 1.5rem;
    padding-top: .75rem;
`;

const ContentHead = styled.div`
    position: relative;
    padding-bottom: 2.75rem;
    border-bottom: 1px solid #e9ecef;
`;

const InfoBox = styled.div`
    height: 2.5rem;
    width: 100%;
    font-size: .875rem;
    margin-bottom: 1.5rem;
    color: gray;
    position: relative;
`;

const UserPhoto = styled.div`
    height: 4rem;
    width: 4rem;
    position: relative;
    top: -1.5rem;
    display: inline-block;
    background-color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 4rem;
    border: #888888 solid 1px;
`;

const Informations = styled.div`
    display: inline-block;
    height: 100%;
    width: calc(100% - 4rem);
    position: absolute;
    top: 0;
`

const UserNameDiv = styled.div`
    position: relative;
    left: .75rem;
    font-size: 1rem;
    font-weight: bold;
    height: 1.25rem;
    line-height: 1.25rem;
`;

const CreatedDiv = styled.div`
    position: relative;
    left: .75rem;
    height: 1.25rem;
    line-height: 1.25rem;
`

const StatusDiv = styled.div`
    position: absolute;
    top: .75rem;
    right: 0;
`

const Title = styled.h3`
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.75rem;
    margin-bottom: 1rem;
`

const Price = styled.h4`
    margin: 0;
    font-size: 1.125rem;
    line-height: 1.25rem;
    font-weight: bold;
    position: absolute;
    right: 0;
`;

const DescriptionBox = styled.div`
    margin-top: 1.5rem;
    line-height: 1.5rem;
    height: 4.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow-y: hidden;
    text-overflow: ellipsis;
`

///////////////////////////////


const ContentBox = ({id, title, username, created, description}) => {

    // return (
    //     <div className='ContentBox'>
    //         <div className='ContentHead'>
    //             <div className="InfoBox">
    //                 <div className='user-photo'><img src={userPhoto} className="Photo" alt="" /></div>
    //                 <div className='Infomations'>
    //                     <div className='username'>{username}</div>
    //                     <div className='created'>{created}</div>
    //                     <div className='sell-status'>판매상태</div>
    //                 </div>
    //             </div>

    //             <h3>
    //                 <Link to="/" className="PostTitle">{title}</Link>
    //             </h3>

    //             <h4>
    //                 10,000 원
    //             </h4>

    //         </div>
    //         <div className="description">
    //             {description}
    //         </div>
    //     </div>
    // )

    return (
        <ContentBoxDiv>
            <ContentHead>
                <InfoBox>
                    <UserPhoto><img src={userPhoto} className="UserPhoto" alt="" /></UserPhoto>
                    <Informations>
                        <UserNameDiv>{username}</UserNameDiv>
                        <CreatedDiv>{created}</CreatedDiv>
                        <StatusDiv>판매상태</StatusDiv>
                    </Informations>
                </InfoBox>
                <Title>
                    <Link to="/" className="PostTitle">{title}</Link>
                </Title>
                <Price>1,000원</Price>
            </ContentHead>
            <DescriptionBox>
                {description}
            </DescriptionBox>
        </ContentBoxDiv>
    )
}

export default ContentBox;