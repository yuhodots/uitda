

import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Divider, Button } from 'antd';

import { colors } from "../../../../../styles/variables";
import { FeedbackSubmitImg } from "../../../../../styles/images";
import { ContentBoxStyle, BoxSubtitleStyle } from "../CommonComponents/CommonCSS";
import { ContentHeader } from "../CommonComponents";
import { BorderBoxStyle } from '../../../../../styles/CommonCSS';
import { UitdaTextArea } from "../../../../Structure/CommonComponents";
import { TITLE, DESCRIPTION } from "../../../../../constants/edit_Input_Data_Keys";


/* Styled Components */
const WholeBox = styled.div`
    ${ContentBoxStyle}
    height: 100%;
`;

    const EditFeedbackBox = styled.div`
        ${BorderBoxStyle}
        height: 100%;
        width: 100%;
        padding: 2rem;

        display: flex;
        flex-flow: column nowrap;
    `;

        const BoxInfoHeader = styled.div`
            ${BoxSubtitleStyle}
            flex: 0 0;
            margin-bottom: 2rem;

            color: ${colors.font_lightgray};
        `

        const TitleInputStyle = css`
            font-size: 1.25rem;
        `;

        const DescriptionInputContainer = styled.div`
            flex: 1 0;
        `;

            const DescriptionInputStyle = css`
                padding: 1rem;
                font-size: 1rem;
            `;

        const PostButton = styled(Button)`
            margin-top: 1rem;
            align-self: flex-end;
        `

    const AfterSubmitBox = styled(EditFeedbackBox)`
        padding: 3rem;
    `;

        const AfterSubmitTitle = styled.div`
            margin-bottom: 1.25rem;
            font-size: 2rem;
        `;

            const HighLightText= styled.span`
                color: ${colors.blue};
            `;

        const AfterSubmitDescription = styled.div`
            font-size: 1.25rem;
            font-weight: lighter;
        `;

        const AfterSubmitImg = styled.img`
            margin-top: 3rem;
            width: 15rem;
            align-self: center;
        `;


/* React Component */
const SendFeedback = (props) => {

    const {
        postFeedbackDone,
        feedbackData,
        postFeedBack,
        storeFeedbackData,
    } = props;

    const title = '피드백 보내기'

    return (
        <WholeBox>
            <ContentHeader title={title} />
            {
                postFeedbackDone ?
                // true ?
                
                /* 제출 완료 */
                <AfterSubmitBox>
                    <AfterSubmitTitle> 
                        <HighLightText>피드백 제출</HighLightText>이 <HighLightText>완료</HighLightText>되었습니다
                    </AfterSubmitTitle>
                    
                    <AfterSubmitDescription>소중한 의견 반영하여 더나은 유잇다를 만들어 가겠습니다 !</AfterSubmitDescription>
                    
                    <AfterSubmitImg src={FeedbackSubmitImg} alt='' />
                </AfterSubmitBox> :
                
                /* 피드백 작성 */
                <EditFeedbackBox>
                    <BoxInfoHeader>유잇다 서비스 이용에 대한 피드백을 보내주세요.</BoxInfoHeader>
                    
                    <UitdaTextArea 
                        size='100%'
                        customCSS={TitleInputStyle}
                        placeHolder='제목을 입력하세요.'
                        isUnderLine={false}
                        data_key={TITLE}
                        storeDataFunc={storeFeedbackData}
                    />

                    <Divider />

                    <DescriptionInputContainer>
                        <UitdaTextArea 
                            size='100%'
                            customCSS={DescriptionInputStyle}
                            placeHolder='내용을 입력하세요.'
                            isFullBorder={true}
                            isFullHeight={true}
                            data_key={DESCRIPTION}
                            storeDataFunc={storeFeedbackData}
                        />
                    </DescriptionInputContainer>

                    <PostButton shape='round' onClick={() => { postFeedBack(feedbackData) }} > 보내기 </PostButton>
                </EditFeedbackBox>
            }
        </WholeBox>
    )
}

SendFeedback.propTypes = {
    postFeedbackDone: PropTypes.bool.isRequired,            // 피드백 데이터 POST 요청 완료 여부
    feedbackData: PropTypes.object.isRequired,              // 피드백 데이터
    storeFeedbackData: PropTypes.func.isRequired,           // 피드백 데이터 저장 메서드
    postFeedBack: PropTypes.func.isRequired,                // 피드백 데이터 POST 요청 메서드
}

export default SendFeedback;