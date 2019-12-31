// 사용되는 파일: ManagePost.js, 

/* Manage 관련 styled component template 파일 */

import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors } from '../variables';

/* 흰색 바탕에 회색 테두리의 Box 템플릿
   사용되는 파일: ManagePost.js  */
export const BoxTemplate = styled.div`
    background-color: ${colors.white};
    border: 1px solid ${colors.gray_line};
`;

/* Link 태그를 상속하기 위해 만든 탬플릿 */
export const LinkBoxTemplate = styled(Link)`
    background-color: ${colors.white};
    border: 1px solid ${colors.gray_line};

    text-decoration: none;
`;

/* Body의 배경 템플릿
   배경색, 최소 높이길이 설정 */
export const BGTemplate = styled.div`
    background-color: ${colors.gray_bg};
    min-height: 40rem;
`;