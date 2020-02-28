

import React from 'react';
import styled from 'styled-components';
import { Input } from "antd";

import { colors } from "../../../../../../styles/variables";

/* Styled Components */
const WholeBox = styled.div`
    padding: 0.5rem;
    flex: 1;
    border-radius: 1rem;

    background-color: ${colors.gray_bg};
`;

    const DescriptionTextArea = styled(Input.TextArea)`

        font-size: 1rem;
        background-color: inherit;

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
        /* @media (max-width: 1500px) {
            
        } */
    `;


/* React Component */
const RoomDescriptionBox = () => {

    return (
        <WholeBox>
            <DescriptionTextArea 
                // defaultValue={title}
                placeholder="추가 정보를 입력하세요."
                autoSize={true}
                // onChange={(e) => storeTitleData(e.target.value)}
            />
        </WholeBox>
    )
}

export default RoomDescriptionBox