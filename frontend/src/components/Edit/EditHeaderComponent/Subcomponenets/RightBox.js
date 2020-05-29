

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, message } from "antd";

import { colors, Screen_Size } from "../../../../styles/variables";

/* Styled Components */

const Container = styled.div`
    padding: 0 2rem;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;

    const DateBox = styled.div`
        font-weight: bold;
        margin-right: 1rem;

        @media (max-width: ${Screen_Size.pad_portrait}) {
            display: none;
        }
    `;

    /* 글 생성 / 수정 버튼 */
    const EndButton = styled(Button)`
        height: 2rem;
        padding: 0.5625rem 1rem;
        margin: 0 1rem;

        background-color: ${colors.blue};

        line-height: 0.875rem;
        font-size: 0.875rem;
    `;


class RightBox extends Component {

    /* 글 생성 / 수정 버튼 액션 */
    _handleEndClick = () => {
        
        const { 
            id, editCategory, isCarpool,

            editBoardData,
            selectedDate, roomInfoData,

            EditPostRequest,
            postCarpoolEvent,
        } = this.props;

        /* 카풀 일정 등록 */
        if ( isCarpool ) {
            const carpoolData = { ...roomInfoData, start_date: selectedDate }

            const { departure, destination } = carpoolData;

            /* 출발지, 도착지 정보가 없으면 경고 메시지 띄우기 */
            if ( !departure || !destination ) {
                const neededData = !departure ? !destination ? '출발지와 도착지' : '출발지' : '도착지';
                message.error(`${neededData}를 입력해주세요.`);
                return;
            }
            
            postCarpoolEvent(carpoolData);
        }

        /* Board 게시글 작성 */
        else {
            const {
                title, files, price, description, deletedFileIDs
            } = editBoardData;

            /* 제목이 없는 경우 경고 메시지를 띄움 */
            if ( !title ) { message.error('제목을 입력해주세요.'); return; }
            /* 사진 업로드 개수 초과 시 */
            if ( files.length > 6 ) { message.error('사진은 최대 6개까지 업로드할 수 있습니다.'); return; }

            /* 업로드로 넘겨주는 file 데이터는 이미 업로드 되어 있지 않은 사진들
               (url 프로퍼티를 갖지 않는 파일들) 만으로 구성한다. */
            const uploadFiles = files.filter( file => !file.url )

            id ?    // id가 있으면 수정 액션, 없으면 생성 액션
            EditPostRequest(editCategory, title, price, description, uploadFiles, id, deletedFileIDs) :
            EditPostRequest(editCategory, title, price, description, uploadFiles)
        }
    }


    /* Date => 'yyyy년 mm월 dd일 O요일' */
    _DateToString = (date) => {

        const dd = date.getDate();
        const mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();
        let day = date.getDay();

        switch (day) {
            case 0: day = '일'; break;
            case 1: day = '월'; break;
            case 2: day = '화'; break;
            case 3: day = '수'; break;
            case 4: day = '목'; break;
            case 5: day = '금'; break;
            case 6: day = '토'; break;
            default: break;
        }

        return `${yyyy}년 ${mm}월 ${dd}일 (${day})`;
    }

    render () {

        const {
            isCarpool,
            isNew,

            selectedDate,
        } = this.props;

        const dateString = this._DateToString(selectedDate);

        return (
            <Container>
                { isCarpool ?
                    <DateBox> {dateString} 선택됨 </DateBox> :
                    ''
                }
    
                {/* 글 수정 / 생성 버튼 */}
                <EndButton type='primary' shape='round' onClick={this._handleEndClick} >
                    { isCarpool ?
                        '등록하기' :
                        isNew ? '글 생성' : '글 수정' }
                </EndButton>
            </Container>
        )
    }   
}

RightBox.propTypes = {
    isCarpool: PropTypes.bool.isRequired,           // 카테고리가 카풀인지 여부
    isNew: PropTypes.bool,                          // Create / Update 여부
    id: PropTypes.number,                           // Update의 경우 해당 글의 id
    editCategory: PropTypes.string.isRequired,      // 선택된 카테고리 데이터

    /* 글 내용에 대한 데이터 */
    editBoardData: PropTypes.object.isRequired,     // Edit Board Data

    /* Carpool 탭 데이터 */
    selectedDate: PropTypes.object,                 // Carpool 탭에서 선택된 날짜 데이터
    roomInfoData: PropTypes.object,                 // Carpool 방 정보

    /* Methods */
    EditPostRequest: PropTypes.func.isRequired,     // Post Create / Update function
    postCarpoolEvent: PropTypes.func.isRequired,    // Carpool Event 등록하는 Post Action
}


export default RightBox;