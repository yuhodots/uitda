

import React, { Component } from 'react';
import styled from 'styled-components';
import { Input } from 'antd'

/* Styled Components */
const TitleTextArea = styled(Input.TextArea)`
    margin-bottom: 3rem;

    font-size: 2rem;

    /* TextArea 속성 */
    resize: none;
    border: none;
    outline: 0;

    :focus {
        border: none;
        box-shadow: none;
    }
`


/* React Component */
class EditTitle extends Component {

    state={}

    render() {
        return (
            <TitleTextArea
                placeholder="제목을 입력 하세요."
                autoSize={true}
            />
        )
    }
}

export default EditTitle;