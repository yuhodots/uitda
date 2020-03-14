

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input } from "antd";


/* Styled Components */

const StyledTextArea = styled(Input.TextArea)`

    width: ${props => props.size}px;

    padding: 0.25rem;

    /* TextArea 속성 */
    resize: none;
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    outline: 0;

    /* Ant-Design 속성 무효화를 위해 */
    :focus {
        box-shadow: none;
    }

    /* 노트북 사이즈 */
    @media (max-width: 1500px) {
        font-size: 0.875rem;
    }
`;


/* React Component */
const UnderLineTextArea = ({size, defaultText, data_key, storeDataFunc}) => {


    return(
        <StyledTextArea 
            size={size}
            defaultValue={defaultText}
            autoSize={true}
            onChange={(e) => storeDataFunc(data_key, e.target.value)}
        />
    )

}

UnderLineTextArea.propTypes = {
    size: PropTypes.number,                         // 가로 길이
    data_key: PropTypes.string.isRequired,          // 인풋 데이터 키
    defaultText: PropTypes.string,                  // default Vaule

    storeDataFunc: PropTypes.func.isRequired,       // 인풋 데이터 저장 함수
}

UnderLineTextArea.defaultProps = {
    size: 160,
}

export default UnderLineTextArea