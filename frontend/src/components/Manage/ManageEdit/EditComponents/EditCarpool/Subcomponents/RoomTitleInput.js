

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import { TITLE } from "../../../../../../constants/edit_RoomInfo_DataKeys";

/* Styled Components */

const TitleTextArea = styled(Input.TextArea)`
    margin-bottom: 1rem;

    font-size: 2rem;

    /* TextArea 속성 */
    resize: none;
    border: none;
    outline: 0;

    /* Ant-Design 속성 무효화를 위해 */
    :focus {
        border: none;
        box-shadow: none;
    }

    /* 노트북 사이즈 디자인 */
    @media (max-width: 1500px) {
        margin-bottom: 0;
        font-size: 1.5rem;
    }
`;


/* React Component */

const RoomTitleInput = ({storeCarpoolData}) => {

    return (
        <TitleTextArea 
            placeholder="제목을 입력 하세요."
            autoSize={true}
            onChange={(e) => storeCarpoolData(TITLE, e.target.value)}
        />
    )
}

RoomTitleInput.propTypes = {
    storeCarpoolData: PropTypes.func.isRequired,        // Carpool 탭의 Room Info Data를 저장하는 메서드
}

export default RoomTitleInput;