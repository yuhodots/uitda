

import { css } from 'styled-components';
import { colors } from "./variables";

/* 흰색 바탕에 회색 테두리를 갖는 스타일 */
export const BorderBoxStyle = css`
    background-color: ${colors.white};
    border: 1px solid ${colors.gray_line};
`;