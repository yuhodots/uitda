

import { css } from 'styled-components';

/* Content의 Whole Box 공통 스타일 */
export const ContentBoxStyle = css`
    padding: 0 1rem;
    width: 100%;
    min-height: 100%;

    display: flex;
    flex-flow: column nowrap;
`;

/* 박스 안의 subtitle 스타일 */
export const BoxSubtitleStyle = css`
    margin-bottom: 0.25rem;
    font-size: 1.125rem;
`;