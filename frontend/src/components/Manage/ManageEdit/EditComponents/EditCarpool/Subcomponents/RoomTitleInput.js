

import React, { Component } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';

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
`

class RoomTitleInput extends Component {


    render () {
        return (
            <TitleTextArea 
                // defaultValue={title}
                placeholder="제목을 입력 하세요."
                autoSize={true}
                // onChange={(e) => storeTitleData(e.target.value)}
            />
        )
    }
}

export default RoomTitleInput;