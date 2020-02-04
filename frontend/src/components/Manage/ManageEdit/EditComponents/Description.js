

import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import PropTypes from 'prop-types';

import { colors } from '../../../../styles/variables'

/* Styled Components */
const DescriptionBox = styled.div`
    border-top: 0.75px solid ${colors.gray_line};
`

const DescriptionTextArea = styled(Input.TextArea)`
    padding-top: 3rem;
    min-height: 10rem !important;
    width: 100%;

    font-size: 1rem;

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
const Description = ({description, storeDescriptionData}) => {
    return (
        <DescriptionBox>
            <DescriptionTextArea
                defaultValue={description}
                placeholder="설명을 입력 하세요."
                autoSize={true}
                onChange={(e) => storeDescriptionData(e.target.value)}
            />
        </DescriptionBox>
    )
}

Description.propTypes = {
    description: PropTypes.string,
    storeDescriptionData: PropTypes.func.isRequired,   // Description 데이터를 App State로 저장하는 함수
}

Description.defaultProps = {
    description: ''
}

export default Description;