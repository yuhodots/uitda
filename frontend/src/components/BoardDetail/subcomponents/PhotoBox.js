// 상위 컴포넌트: components/BoardDetail/BoradDetail.js

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { colors } from "../../../styles/variables";


/* Styled Components */

/* 사진 Box 전체 영역 div 
   padding을 통해 가로길이에 비례한 세로길이 설정 및
   position: relative; 로, 자식의 position의 기준이 됨 */
const BoxArea = styled.div`
    margin-top: 2rem;
    width: 100%;
    padding-top: 60%;
    border-bottom: 1px solid ${colors.light_gray_line};

    position: relative;
`;

/* position: absolute; 와 width, height, top 설정을 통해,
   실제 내용물을 담을 수 있는 컨테이너 역할을 수행하는 div 태그 이다.
   PhotoAndButtonDiv + SmallPhotoList 인 flex-box */
const BoxContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;

    display: flex;
    flex-flow: column nowrap;
`;

/* PhotoContainer + 앞 뒤 버튼 인 flex-box 
   flex: 1; 을 통해, 세로 길이가 아래의 리스트 영역을 제외한 크기로 설정 */
const PhotoAndButtonDiv = styled.div`
    width: 100%;
    flex: 1;

    position: relative;
`;

/* 사진을 담는 영역.
   size를 contain으로 설정하여, 원본 사이즈 비율을 유지하되 영역을 벗어나지 않게 함 */
const PhotoContainer = styled.div`
    height: 100%;

    /* transition: background-image 0.3s; */

    background-image: ${props => {
        return `url(${props.imgURL})`;
    }};
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
`;

/* prev, next 버튼을 담는 flex box
   absolute position을 이용해, 사진 영역을 덮음 */
const ButtonDiv = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;

    display: flex;
    flex-flow: row nowrap;
`;

/* prev, next 버튼 */
const Button = styled.div`
    flex: 1;
    cursor: pointer;
`;

/* 사진 리스트 영역에 대한 div 태그
   9개까지 담을 수 있는 크기.
   [ 9개 이상의 사진일 때, 넘어가는 기능 추가해야 함 ] */
const SmallPhotoList = styled.div`
    width: 32rem;
    height: 5rem;
    padding-top: 1rem;
    margin: 0 auto;

    /* box-shadow: 0 0 3px rgba(0,0,0,.4); */

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
`;

/* 조그마한 사진 */
const SmallPhoto = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 0.5rem;
    border-radius: 0.5rem;

    cursor: pointer;
    transition: all 0.3s;
    
    background-image: ${props => {
        return `url(${props.imgURL})`
    }};
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;

    
    border: ${props => {
        return props.isActivate ? 'solid 1px black' : 'none'
    }};
    opacity: ${props => {
        return props.isActivate ? '1' : '0.5'
    }};
    box-shadow: ${props => {
        return props.isActivate ? '0 0 3px rgba(0,0,0,.4);' : ''
    }};
`;

/* React Component */

class PhotoBox extends Component {

    state = {
        photoOrder: 0   // 리스트에서 현재 사진의 인덱스 값
    }

    /* prev 버튼 핸들러 함수
       photoOrder 값을 1 줄인다. (나머지 연산자 이용) */
    _handlePrevBtn = () => {
        let numOfPhotos = this.props.filelist.length;

        this.setState({
            ...this.state,
            photoOrder: (this.state.photoOrder + numOfPhotos - 1) % numOfPhotos 
        })
    }

    /* next 버튼 핸들러 함수
       photoOrder 값을 1 증가시킨다. (나머지 연산자 이용) */
    _handleNextBtn = () => {
        let numOfPhotos = this.props.filelist.length;

        this.setState({
            ...this.state,
            photoOrder: (this.state.photoOrder + 1) % numOfPhotos 
        })
    }

    /* photoList의 photo 버튼 헨들러 함수.
       사진을 클릭하면 해당 사진이 큰 화면에 출력되도록 함. */
    _handlePhotoBtn = (e, idx) => {
        this.setState({
            ...this.state,
            photoOrder: idx 
        })
    }

    _renderSmallPhoto = (filelist) => {
        return filelist.map((photo, idx) => {
            let isActivate = idx === this.state.photoOrder;
            return (
                <SmallPhoto
                    imgURL={photo.location}
                    onClick={(e) => this._handlePhotoBtn(e, idx)}
                    isActivate={isActivate}
                    key={idx}
                />
            )
        })
    }

    render() {
        const { filelist } = this.props;
        const { photoOrder } = this.state;

        return (
            /* 사진이 있는 글인지, 아닌지 */
            filelist[0] ?

            <BoxArea>
                <BoxContainer>
                    <PhotoAndButtonDiv>
                        <PhotoContainer 
                            imgURL={filelist[photoOrder].location} 
                        />
                        <ButtonDiv>
                            <Button onClick={this._handlePrevBtn} />
                            <Button onClick={this._handleNextBtn} />
                        </ButtonDiv>
                    </PhotoAndButtonDiv>
                    <SmallPhotoList>
                        {this._renderSmallPhoto(filelist)}
                    </SmallPhotoList>
                </BoxContainer>
            </BoxArea> :

            <div />
        )
    }
}

PhotoBox.propTypes = {
    filelist: PropTypes.array.isRequired    // 사진 데이터를 담은 array
}

export default PhotoBox