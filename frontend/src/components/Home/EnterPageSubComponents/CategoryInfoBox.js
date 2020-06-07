/* 카테고리 설명 모달이 있는 흰색 바탕 박스 */

import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import { PhotoListBox } from "./";
import { UitdaPhotoCarousel } from "../../Structure/CommonComponents";
import { colors, Screen_Size } from "../../../styles/variables";
import { MarketIcon, NetworkingIcon, CarpoolIcon } from "../../../styles/images/Menu_Icon_Image";
import { notice, mp1, mp2, np1, cp1, cp2 } from "../../../styles/images/EnterPage_Images";


/* Styled Components */
const WholeArea = styled.div`
    padding: 3rem 5rem;
    width: 60%;
    min-width: 500px;
    min-height: 100%;

    background-color: ${colors.white};

    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: ${Screen_Size.pad_portrait}) {
        width: 100%;
        padding: 5rem;
    }
`;

    /* 내용을 담는 컨테이너 박스 (max, min width 설정) */
    const ContentContainer = styled.div`
        margin: 0 auto;
        width: 100%;
        max-width: 50rem;
        min-width: 30rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `;

        /* 아이콘 상단에 클릭 안내 이미지를 담는 박스 */
        const ArrowImgBox = styled.div`
            position: relative;
            align-self: flex-start;
        `;

            /* '아이콘을 클릭해 보세요' + 화살표 이미지 */
            const ArrowImg = styled.img`
                position: relative;
                left: 60px;
                top: 15px;
                width: 200px;
            `;

        /* 각각의 카테고리 아이콘과 설명을 담은 Block 컴포넌트 */
        const CategoryBlock = styled.div`
            margin: 2rem 0;

            display: flex;
            flex-flow: row nowrap;
            align-items: center;
        `;

            /* 카테고리 이미지 담는 박스 */
            const BlockImageBox = styled.div`
                margin-right: 4rem;
            `;

                /* 카테고리 이미지 */
                const BlockImage = styled.img`
                    width: 100px;
                    cursor: pointer;
                `;

            /* 카테고리 설명 */
            const BlockDescription = styled.div`
                color: ${colors.font_default};
                line-height: 1.75rem;
            `;


/* React Component */
const CategoryInfoBox = ({clientHeight}) => {

    const [ modalVisible, setModalVisible ] = useState(false);
    const [ infoImageList, setImgList ] = useState([]);

    /* 카테고리 아이콘 클릭 메서드 */
    const marketClick = () => { setModalVisible( true ); setImgList( [mp1, mp2] ) }
    const networkingClick = () => { setModalVisible( true ); setImgList( [np1] ) }
    const carpoolClick = () => { setModalVisible( true ); setImgList( [cp1, cp2] ) }

    /* modal cancle 메서드 */
    const handleCancel = () => { setModalVisible( false) }

    /* 각각의 카테고리 아이콘과 설명을 담은 Block 컴포넌트 */
    const CategoryInfoBlock = ({imgSrc, clickMethod, description}) => {
        return (
            <CategoryBlock>
                <BlockImageBox> <BlockImage src={imgSrc} onClick={clickMethod} alt='' /> </BlockImageBox>
                <BlockDescription> {description} </BlockDescription>
            </CategoryBlock>
        )
    }
  
    return (
        <WholeArea>
            <ContentContainer>
                <ArrowImgBox> <ArrowImg src={notice} alt='' /> </ArrowImgBox>
                
                <CategoryInfoBlock 
                    imgSrc={MarketIcon} clickMethod={marketClick}
                    description='유니마켓은 학생들 간 물품 거래가 이루어지는 공간입니다. 사이즈가 맞지 않는 옷이나 더 이상 필요가 없는
                                전자기기 등 잉여 물품을 판매하거나, 애타게 구하던 신발, 급하게 필요한 전공 서적 등을 구매할 수 있습니다.'
                />

                <CategoryInfoBlock 
                    imgSrc={NetworkingIcon} clickMethod={networkingClick}
                    description='배송비를 절약하고 싶은 분, 다양한 퀘스트를 가지고 있는 분, 유니스트에 숨겨진 고수를 찾는 분이라면 
                                네트워킹 게시판을 이용해 보세요. 보상도 함께 적어주신다면 더 빠른 참여를 유도해내실 수 있습니다.'
                />

                <CategoryInfoBlock 
                    imgSrc={CarpoolIcon} clickMethod={carpoolClick}
                    description='택시카풀 게시판에서는 같은 방향으로 이동하는 학우들과 택시를 동승하여 교통비를 절약할 수 있습니다.
                                캘린더 UI를 통해 일정을 직관적으로 확인하고 간편하게 카풀 인원을 모아서 빠르게 목적지에 도착해 보아요.'
                />
            </ContentContainer>

            <Modal 
                width="70%" 
                style={{minWidth: '500px'}}
                visible={modalVisible} 
                footer={null} 
                onCancel={handleCancel}
            >
                <UitdaPhotoCarousel 
                    filelist={infoImageList}
                    clientHeight={clientHeight}
                />
            </Modal>
        </WholeArea>
    )
}

CategoryInfoBox.propTypes = {
    clientHeight: PropTypes.number.isRequired,
}

export default CategoryInfoBox