

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input } from "antd";

import { useFocus } from "../../../useHooks";


/* Styled Components */

const StyledTextArea = styled(Input.TextArea)`

    width: ${props => props.size};

    padding: 0.25rem;

    /* TextArea 속성 */
    resize: none;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: ${props => !props.isUnderLine && 'none'};
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
const UitdaTextArea = forwardRef( ({data_key, storeDataFunc, size, defaultText, placeHolder, isUnderLine, letFocus}, ref) => {

    const [value, setValue] = useState(defaultText);
    const textAreaRef = useFocus( letFocus );

    useImperativeHandle(ref, () => ({
        clearTextArea: () => { setValue('') }
    }))

    if (typeof(size) === 'number') { size = `${size}px` }

    return(
        <StyledTextArea 
            ref={textAreaRef}
            value={value}
            size={size}
            defaultValue={defaultText}
            placeholder={placeHolder}
            isUnderLine={isUnderLine}
            autoSize={true}
            onChange={(e) => {
                setValue(e.target.value);
                storeDataFunc(data_key, e.target.value)
            }}
        />
    )
})

UitdaTextArea.propTypes = {
    size: PropTypes.oneOfType([                     // 가로 길이
        PropTypes.string,
        PropTypes.number,
    ]),                         
    defaultText: PropTypes.string,                  // default Vaule
    placeHolder: PropTypes.string,                  // place holder
    isUnderLine: PropTypes.bool,                    // Under Line 스타일 여부
    letFocus: PropTypes.bool,                       // 첫 render시 focus 시킬지 여부
    data_key: PropTypes.string,                     // 인풋 데이터 키

    storeDataFunc: PropTypes.func.isRequired,       // 인풋 데이터 저장 함수
}

UitdaTextArea.defaultProps = {
    size: 160,
    defaultText: '',
    placeHolder: '',
    letFocus: false,

    data_key: '',
    isUnderLine: true,
}

export default UitdaTextArea;