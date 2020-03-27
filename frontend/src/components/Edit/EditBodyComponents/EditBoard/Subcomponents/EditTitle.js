

import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import PropTypes from 'prop-types';

/* Styled Components */
const TitleTextArea = styled(Input.TextArea)`
    margin-bottom: 3rem;

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
`

/* React Component */
const EditTitle = ({title, storeTitleData}) => {
    return (
        <TitleTextArea
            defaultValue={title}
            placeholder="제목을 입력 하세요."
            autoSize={true}
            onChange={(e) => storeTitleData(e.target.value)}
        />
    )
}


EditTitle.propTypes = {
    title: PropTypes.string,
    storeTitleData: PropTypes.func.isRequired
}

EditTitle.defaultProps = {
    title: ''
}

export default EditTitle;