/* Chatting Component 내에서 공통으로 사용되는 Styled Component를 모아놓은 파일 */

import styled from 'styled-components';

import { colors } from "../../styles/variables";


/* ContectListBox와 ChatRoomBox의 Header 스타일 */
export const BoxHeaderArea = styled.div`
    padding: 1rem 2rem;
    width: 100%;
    flex: 0 0 4rem;

    border-bottom: 1px solid ${colors.gray_line};

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;

    /* Box Header Title Style */
    export const BoxHeaderTitle = styled.div`
        font-size: 1.25rem;
        font-weight: bold;
    `;