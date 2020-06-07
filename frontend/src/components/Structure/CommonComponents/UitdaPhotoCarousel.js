

import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { colors } from '../../../styles/variables';

/* Styled-Components */

const WholeArea = styled.div`
    position: relative;
    
    padding: 1rem;
    height: ${props => `${props.clientHeight * 0.7}px` };
    min-height: 450px;
    min-width: 500px;

    .ant-carousel {
        height: 100%;
    }

    .slick-slider {
        height: 100%;
    }
`;

    const StyledCarousel = styled(Carousel)`
        div {
            height: 100%;
        }
    `;

        const PreviewImage = styled.div`
            height: 100%;
            width: 100%;

            background-image: ${props => `url(${props.imgSrc})` };
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
        `;

    const ButtonContainer = styled.div`
        position: absolute;
        top: 0;
        bottom: 0;

        margin: 0 -1rem;
        padding: 1rem;
        width: 100%;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
    `;

        /* 버튼 공통 스타일 */
        const PhotoButton = styled.div`
            position: relative;
            height: 2.5rem;
            width: 2.5rem;
            border-radius: 50%;

            background-color: white;
            border: 1px solid ${colors.font_default};

            font-weight: bold;

            display: flex;
            align-items: center;
            justify-content: center;

            :hover {
                top: -0.125rem;
                height: 2.75rem;
                width: 2.75rem;
                box-shadow: 0 0 10px rgba(0,0,0,.3);
            }
            cursor: pointer;
        `;


/* React Component */
const UitdaPhotoCarousel = ({filelist, clientHeight}) => {

    const carouselRef = useRef();

    return (
        <WholeArea clientHeight={clientHeight}  >
            <StyledCarousel style={{height: '100%'}} ref={carouselRef} >
            {
                filelist.map( (file, idx) => {
                    return (
                        <PreviewImage key={idx} imgSrc={file} />
                    ) 
                } )
            }
            </StyledCarousel>

            {
                filelist.length > 1 &&
                <ButtonContainer clientHeight={clientHeight} >
                    <PhotoButton onClick={() => carouselRef.current.prev()} > <LeftOutlined /> </PhotoButton>
                    <PhotoButton onClick={() => carouselRef.current.next()} > <RightOutlined /> </PhotoButton>
                </ButtonContainer>
            }
        </WholeArea>
    )
}

UitdaPhotoCarousel.propTypes = {
    filelist: PropTypes.array.isRequired,
    clientHeight: PropTypes.number,             // Modal Component 인 경우
}

UitdaPhotoCarousel.defaultProps = {
    clientHeight: 0,
}

export default UitdaPhotoCarousel;