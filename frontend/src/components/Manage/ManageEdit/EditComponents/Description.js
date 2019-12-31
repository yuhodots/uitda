

import React, { Component } from 'react';
import styled from 'styled-components';
import { Input } from 'antd'

import { colors } from '../../../../styles/variables'

/* Styled Components */
const DescriptionBox = styled.div`
    border-top: 0.75px solid ${colors.gray_line};
`

const DescriptionTextArea = styled(Input.TextArea)`
    padding-top: 3rem;
    min-height: 20rem;

    font-size: 1rem;

    /* TextArea 속성 */
    resize: none;
    border: none;
    outline: 0;
`

class Description extends Component {

    render() {
        return (
            <DescriptionBox>
                <DescriptionTextArea
                    placeholder="설명을 입력 하세요."
                    autoSize={true}
                />
            </DescriptionBox>
        )
    }
}

export default Description;