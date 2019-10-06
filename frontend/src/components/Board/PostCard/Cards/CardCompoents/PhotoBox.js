// 상위 컴포넌트: MarketCard, NetworkCard

import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import basicImg from './Basic_img.jpg';

/* Styled-Components */

const BaseDiv = styled.div`
    width: 100%;
`

const PhotoWrapper = styled.div`
    width: 100%;
    height: 0;
    padding-top: 70%;
    position: relative;
    display: block;
    overflow: hidden;
`;

const PhotoLink = styled.a`
    width: 100%;
    height: 0;
    padding-top: 70%;
    position: absolute;
    top: 0;
    display: block;
    overflow: hidden;

    background-image: ${props => 
        props.hasPhoto ? 'none' : `url(${basicImg})`};
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
`;

const ImgList = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    position: absolute;
    top: 0;
    left: ${props => props.posLeft};

    display: flex;
    flex-flow: row nowrap;
`;

const ImgItem = styled.div`
    height: 100%;
    flex: 1;    

    background-image: ${props => `url(${props.imgURL})`};
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
`;

const BlackMask = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    opacity: 1;
    transition: opacity 0.25s;

    :hover {
        opacity: 0.5;
    }
`;

const ButtonContainer = styled.div`
    position: absolute;
    top: ${props => props.posTop};
    width: 100%;
`;

const PrevButton = styled.button`
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;

    position: absolute;
    left: 1rem;

    background-color: white;

    display: ${props => {
        return !(props.isButtonOn) && 'none' 
    }};

    :hover {
        left: .875rem;
        top: -0.125rem;
        height: 2.75rem;
        width: 2.75rem;
        box-shadow: 0 0 10px rgba(0,0,0,.3);
    }
`;

const NextButton = styled.button`
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;

    position: absolute;
    right: 1rem;

    display: ${props => {
        return !(props.isButtonOn) && 'none' 
    }};

    background-color: white;

    :hover {
        right: .875rem;
        top: -0.125rem;
        height: 2.75rem;
        width: 2.75rem;
        box-shadow: 0 0 10px rgba(0,0,0,.3);
    }
`;

const CircleContainer = styled.div`
`;

const CircleButton = styled.button`
`;

/////////////////////////////


class PhotoBox extends Component {

    state = {}

    componentDidMount() {
        this.setState({
            photoOrder: 0,
            containerWidth: this.container.offsetWidth,
            isHover: false
        })
        window.addEventListener('resize', this._handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize)
    }

    _handleResize = (e) => {
        this.setState({
            ...this.state,
            containerWidth: this.container.offsetWidth,
        })
    }

    _handleHover = (e) => {

    }

    _ClickPrevButton = () => {
        this.setState({
            photoOrder: this.state.photoOrder - 1
        })
    }

    _ClickNextButton = () => {
        this.setState({
            photoOrder: this.state.photoOrder + 1
        })
    }

    _ClickCircleButton = (i) => {
        console.log(i);
        this.setState({
            ...this.state,
            photoOrder: i
        })
    }

    _renderContents() {
        const { filelist } = this.props;
        const { photoOrder, containerWidth, isHover } = this.state;
        let hasPhoto = filelist.length !== 0;

        let listWidth = containerWidth * filelist.length;
        let imgHeight = containerWidth * 0.7;

        let listPosLeft = -(containerWidth * photoOrder);

        let buttonPosTop = (imgHeight / 2) - 18;

        let isPrevButtonOn = hasPhoto && (photoOrder !== 0);
        let isNextButtonOn = hasPhoto && (photoOrder !== (filelist.length - 1));

        return (
            <PhotoWrapper>
                <PhotoLink hasPhoto={hasPhoto} href='/'>
                    {
                        // 사진 리스트
                        hasPhoto &&
                        <ImgList 
                            width={`${listWidth}px`} 
                            height={`${imgHeight}px`} 
                            posLeft={`${listPosLeft}px`} 
                            ref={ref => {this.imgListDOM = ref}}>
                            
                            {filelist.map((file, id) => {
                                return <ImgItem imgURL={file.location} key={id} />
                            })}
                        </ImgList> 
                    }
                    {/* 사진이 있든 없든 공통적으로 BlackMask 가짐 */}
                    <BlackMask/>
                </PhotoLink>
                {
                    // 사진 넘기기 버튼
                    // filelist.length > 1 &&
                    <ButtonContainer isHover={isHover} posTop={`${buttonPosTop}px`} >
                        <PrevButton isButtonOn={isPrevButtonOn} onClick={this._ClickPrevButton} />
                        <NextButton isButtonOn={isNextButtonOn} onClick={this._ClickNextButton} />
                    </ButtonContainer> 
                }
                {
                    // 사진 순서 표시하는 동글뺑이들
                    filelist.length > 1 &&
                    <CircleContainer>
                        {filelist.map((f, i) => {
                            let isHighLight = photoOrder === i;
                            return <CircleButton 
                                isHighLight={isHighLight} 
                                onClick={(i) => {this._ClickCircleButton(i)}}
                                key={i}/>
                        })}
                    </CircleContainer> 
                }
            </PhotoWrapper>
            
        )
    }

    render() {
        const {containerWidth} = this.state;

        return (
            <BaseDiv ref={ref => {this.container = ref}}>
                {containerWidth && this._renderContents()}
            </BaseDiv>
        )
    }
}

PhotoBox.propTypes = {
    filelist: PropTypes.array.isRequired
}

export default PhotoBox;