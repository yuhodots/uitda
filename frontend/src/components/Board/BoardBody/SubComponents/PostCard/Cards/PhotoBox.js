// 상위 컴포넌트: PhotoCard

import React, { Component, createRef } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { BoardBasicImage as BasicImg } from '../../../../../../styles/images';

/* Styled-Components */
/* PhotoBox 전체 영역 div 태그 */
const PhotoWrapper = styled.div`
    width: 100%;
    height: 0;
    padding-top: 70%;
    position: relative;
    overflow: hidden;
`;

    /* PhotoBox 클릭 시 해당 페이지로 넘겨주는 Link Wrapper */
    const PhotoLink = styled(Link)`
        width: 100%;
        padding-top: 70%;
        position: absolute;
        top: 0;
        overflow: hidden;

        /* 사진이 없는 경우, Basic Image를 띄움 */
        background-image: ${props => 
            props.hasPhoto ? 'none' : `url(${BasicImg})`};
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
    `;

        /* 사진을 담는 박스 padding이 아닌 실제 크기를 갖도록 함. */
        const PhotoContainer = styled.div`
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        `;

            /* 사진 이미지 Item */
            const PhotoItem = styled.div`
                height: ${props => props.imgHeight}px;
                width: 100%;

                background-image: ${props => `url(${props.imgURL})`};
                background-repeat: no-repeat;
                background-position: center center;
                background-size: cover;
            `;

    /* 이미지에 음영 효과를 주기 위한 마스크 */
    const BlackMask = styled.div`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.25);
        opacity: 1;
        transition: opacity 0.25s;

        /* Basic 이미지인 경우에만 hover 효과를 줌 */
        ${props => !props.hasHoverEffect && css`
            :hover {
                opacity: 0.5;
            }
        `}
    `;

    /* 사진 앞, 뒤 이동 버튼 Container */
    const ButtonContainer = styled.div`
        position: absolute;
        top: ${props => props.posTop};
        width: 100%;
    `;

        /* 버튼 공통 스타일 */
        const PhotoButton = styled.div`
            position: absolute;
            height: 2.5rem;
            width: 2.5rem;
            border-radius: 50%;

            background-color: white;

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

        /* 이전 사진 버튼 */
        const PrevButton = styled(PhotoButton)`
            left: 1rem;
            :hover {
                left: .875rem;
            }
        `;

        /* 다음 사진 버튼 */
        const NextButton = styled(PhotoButton)`
            right: 1rem;
            :hover {
                right: .875rem;
            }
        `;


/////////////////////////////


class PhotoBox extends Component {

    state = {}

    photoBoxRef = createRef();  // 박스 전체 ref
    carouselRef = createRef();  // ant design carousel (사진 넘기기 박스) ref

    componentDidMount() {
        window.addEventListener('resize', this._handleResize);                          // 브라우저 창(window)의 크기가 변화되는 이벤트를 받음.
        this.photoBoxRef.current.addEventListener('mouseover', this._handleMouseEnter);
        this.photoBoxRef.current.addEventListener('mouseleave', this._handleMouseLeave);
        this._handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize);
        this.photoBoxRef.current.removeEventListener('mouseenter', this._handleMouseEnter);
        this.photoBoxRef.current.removeEventListener('mouseleave', this._handleMouseLeave);
    }

    /* PhotoBox width 사이즈 업데이트 */
    _handleResize = (e) => {
        this.setState({
            ...this.state,
            containerWidth: this.photoBoxRef.current.offsetWidth,
        })
    }

    /* PhotoBox에 마우스를 올리면 isHover true */
    _handleMouseEnter = (e) => {
        this.setState({
            ...this.state,
            isHover: true,
        })
    }

    /* PhotoBox에서 마우스가 떠나면 isHover false */
    _handleMouseLeave = (e) => {
        this.setState({
            ...this.state,
            isHover: false,
        })
    }

    /* filelist를 가지고, PhotoItem을 render하는 메서드 */
    _renderPhoto = (filelist, imgHeight) => {
        return filelist.map( file => {
            const { id, location } = file;
            return <PhotoItem imgURL={location} imgHeight={imgHeight} key={id} />
        } )
    }

    render() {

        const { filelist, boardName, postId } = this.props;
        const { containerWidth, isHover } = this.state;

        const hasPhoto = filelist.length !== 0;             // 사진이 있는 글 인지
        const imgHeight = containerWidth * 0.7;             // 이미지 세로 크기 (가로 길이 * 0.7)
        const buttonPosTop = (imgHeight / 2) - 18;          // absolute postion인 Button Container를 세로 가운데에 위치하기 위함
        const postURL = `/board/${boardName}/${postId}`;    // 게시글 url

        return (
            <PhotoWrapper ref={this.photoBoxRef} >
                <PhotoLink hasPhoto={hasPhoto} to={postURL}>
                    {
                        hasPhoto &&
                        
                        <PhotoContainer>
                            <Carousel ref={this.carouselRef} >
                            {
                                this._renderPhoto(filelist, imgHeight)
                            }
                            </Carousel>
                        </PhotoContainer>

                    }
                    <BlackMask hasHoverEffect={filelist.length > 1} />
                </PhotoLink>

                {
                    /* 사진 넘기기 버튼 */
                    filelist.length > 1 && isHover &&
                    <ButtonContainer posTop={`${buttonPosTop}px`} >
                        <PrevButton onClick={ () => this.carouselRef.current.prev() } > <LeftOutlined /> </PrevButton>
                        <NextButton onClick={ () => this.carouselRef.current.next() } > <RightOutlined /> </NextButton>
                    </ButtonContainer> 
                }
            </PhotoWrapper>
        )
    }
}

PhotoBox.propTypes = {
    filelist: PropTypes.array.isRequired,
    boardName: PropTypes.string.isRequired,
    postId: PropTypes.number.isRequired,
}

export default PhotoBox;