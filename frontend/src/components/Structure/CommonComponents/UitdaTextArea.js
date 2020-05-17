

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input } from "antd";

import { useFocus } from "../../../useHooks";


/* Styled Components */

const StyledTextArea = styled(Input.TextArea)`
    min-height: ${props => props.isFullHeight ? '100% !important' : ''};
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
    background-color: inherit;

    /* Ant-Design 속성 무효화를 위해 */
    :focus {
        box-shadow: none;
    }

    font-size: 1rem;

    /* 노트북 사이즈 */
    @media (max-width: 1500px) {
        font-size: 0.875rem;
    }

    ${props => props.customCSS};
`;


/* React Component */
const UitdaTextArea = forwardRef( (props, ref) => {

    const {
        data_key, storeDataFunc, 
        size, 
        defaultText, 
        placeHolder, 
        isUnderLine, letFocus, isFullHeight,
        customCSS,
    } = props;

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
            customCSS={customCSS}
            size={size}
            defaultValue={defaultText}
            placeholder={placeHolder}
            isUnderLine={isUnderLine}
            isFullHeight={isFullHeight}
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
    customCSS: PropTypes.string,                    // custom CSS style
    defaultText: PropTypes.string,                  // default Vaule
    placeHolder: PropTypes.string,                  // place holder
    isUnderLine: PropTypes.bool,                    // Under Line 스타일 여부
    isFullHeight: PropTypes.bool,                   // Text Area가 부모의 height 사이즈를 갖는지 여부
    letFocus: PropTypes.bool,                       // 첫 render시 focus 시킬지 여부
    data_key: PropTypes.string,                     // 인풋 데이터 키

    storeDataFunc: PropTypes.func.isRequired,       // 인풋 데이터 저장 함수
}

UitdaTextArea.defaultProps = {
    customCSS: '',
    size: 160,
    defaultText: '',
    placeHolder: '',
    letFocus: false,
    isFullHeight: false,
    isUnderLine: true,
    data_key: '',
}

export default UitdaTextArea;