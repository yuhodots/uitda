

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { SendOutlined } from "@ant-design/icons";

import { colors } from "../../../../styles/variables";
import { UitdaTextArea } from "../../../Structure/CommonComponents";


/* Styled Components */
const InputBox = styled.div`
    padding: 0.25rem 0.75rem;
    width: 100%;
    min-height: 2.5rem;

    border: 1px solid ${colors.gray_line};
    border-radius: 1.25rem;

    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
`;

    const TextAreaBox = styled.div`
        flex: 1 0;
    `;

    const SendButtonBox = styled.div`
        flex: 0 0;
        padding-bottom: 4px;
    `;

        const SendButton = styled(SendOutlined)`

            cursor: pointer;
        `;


/* React Component */
class ChatInputBox extends Component {


    render () {

        const { chatInputData, storeChatInputData } = this.props;

        // console.log(chatInputData);

        return (
            <InputBox>
                <TextAreaBox>
                    <UitdaTextArea 
                        size='100%' 
                        isUnderLine={false} 
                        placeHolder='메시지 입력...'

                        data_key='text'
                        storeDataFunc={storeChatInputData}
                    />
                </TextAreaBox>

                <SendButtonBox>
                    <SendButton />
                </SendButtonBox>
            </InputBox>
        )
    }
}

ChatInputBox.propTypes = {
    chatInputData: PropTypes.object.isRequired,         // 채팅창에 입력된 데이터

    storeChatInputData: PropTypes.func.isRequired,      // 채팅창에 입력한 데이터를 저장하는 메서드
}

export default ChatInputBox;