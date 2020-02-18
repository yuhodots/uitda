// 사용되는 파일: ManagePost.js, 

/* Manage 관련 styled component template 파일 */

import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { colors } from '../variables';

/* 흰색 바탕에 회색 테두리의 Box 템플릿
   사용되는 파일: ManagePost.js  */
export const BoxTemplate = styled.div`
    background-color: ${colors.white};
    border: 1px solid ${colors.gray_line};
`;

/* Link 태그를 상속하기 위해 만든 탬플릿
   사용되는 파일: ManagePost.js */
export const LinkBoxTemplate = styled(Link)`
    background-color: ${colors.white};
    border: 1px solid ${colors.gray_line};

    text-decoration: none;
`;

/* Body의 배경 템플릿
   배경색, 최소 높이길이 설정
   사용되는 파일: EditBody.js */
export const BGTemplate = styled.div`
    background-color: ${colors.gray_bg};
    min-height: 50rem;
`;

/* 흰색 바탕에 그림자 효과를 가진 div 태그
   Manage에서는 Edit의 글 작성 영역을 나타내는 태그로 사용 됨.
   사용되는 파일: EditBody.js */
export const PaperTemplate = styled.div`
    background-color: ${colors.white};
    box-shadow: 0 0 10px rgba(0,0,0,.1);
`;

/* Post 관리 페이지의 Post 개별 컴포넌트에서
   수정, 삭제, 상태 변경을 담당하는 버튼의 공통 스타일 */
export const PostManageButtonStyle = css`
    margin: 0 0.5rem;
    font-size: 0.875rem;
    color: ${props => props.isDelete ? colors.font_red : colors.font_darkgray};
`