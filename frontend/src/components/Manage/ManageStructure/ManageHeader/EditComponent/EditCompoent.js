// 상위 컴포넌트: ManageHeader


import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Select, Tooltip, Icon, Divider } from 'antd'
import { 
    MdFormatAlignJustify,
    MdFormatAlignLeft,
    MdFormatAlignCenter,
    MdFormatAlignRight,
} from 'react-icons/md'
import { Redirect } from 'react-router-dom';

import { colors } from '../../../../../styles/variables'; 
import { MARKET, NETWORKING } from '../../../../../constants/board_name'
import { TEXT_ALIGN } from '../../../../../constants/edit_funcs'

/* Select Component의 Option Component */
const { Option } = Select;

/* Styled Compoents */
/* 로고 다음부터의 오른쪽 부분 */
const HeaderBox = styled.div`
    height: 4rem;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`; 

/* 카테고리 선택 태그 (ant-design) */
const CategorySelectBox = styled(Select)`
    width: 8rem;
`;

/* 글 작성에 관련된 기능을 담은 박스 */
const EditFuncBox = styled.div`
    margin: 0 2rem;
    height: 100%;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;

    const FontSizeSelect = styled(Select)`
        margin: 0 0.5rem !important;
    `;

    /* Icon 공통 속성 (ant-design) */
    const IconStyle = css`
        margin: 0 0.5rem;
        font-size: 1rem;

        cursor: pointer;
        transition-property: color, background-color;
        transition-duration: 0.3s;

        color: ${colors.icon_darkgray};
        background-color: ${colors.white};

        /* 클릭 시, 글자색 배경색 변경 */
        ${props => props.isSelected && css`
            color: ${colors.white};
            background-color: ${colors.icon_darkgray};
        `}
    `;

    /* Ant Design Icon */
    const EditIcon = styled(Icon)`
        ${IconStyle}
    `;

    /* Ant Design에 없는 아이콘들 */
    const AlignJustifyIcon = styled(MdFormatAlignJustify)`${IconStyle}`;
    const AlignLeftIcon = styled(MdFormatAlignLeft)`${IconStyle}`;
    const AlignCenterIcon = styled(MdFormatAlignCenter)`${IconStyle}`;
    const AlignRightIcon = styled(MdFormatAlignRight)`${IconStyle}`;

    /* 글 생성 / 수정 버튼 */
    const EndButton = styled.div`
        height: 2rem;
        padding: 0.5625rem 1rem;
        margin: 0 1rem;

        border: 1px solid ${colors.gray_line};
        border-radius: 1rem;

        line-height: 0.875rem;
        font-size: 0.875rem;

        cursor: pointer;
    `

/* react component */
class EditComponent extends Component {

    state = {}

    componentDidMount () {
        const { defaultBoard } = this.props;

        this.setState({
            ...this.state,
            board: defaultBoard,
        })
    }

    /* Select Box Handling 함수 */
    _handleSelect = (value) => {
        this.setState({
            board: value
        })
    }

    /* 글 생성 / 수정 버튼 액션 */
    _handleEndClick = () => {
        const{ board } = this.state;
        
        const { 
            id,

            title,
            files,
            description,

            EditPostRequest
        } = this.props;

        id ?    // id가 있으면 수정 액션, 없으면 생성 액션
        EditPostRequest(board, title, description, files, id) :
        EditPostRequest(board, title, description, files)
    }

    render () {

        const { 
            isNew,

            defaultBoard,
            editSuccess,

            spanStyle,
            textAlign,

            editClickB,
            editClickI,
            editClickS,
            editClickU,
            selectTextAlign,
        } = this.props;

        const { 
            board,
        } = this.state;

        const redirerctURL = `/manage/posts/${board}`

        const TooltipProps = {
            mouseEnterDelay: 0,
            mouseLeaveDelay: 0
        }

        // console.log(spanStyle);
        // console.log(`title: ${title}, files: ${files}, description: ${description}`);

        return (
            editSuccess ? 
            <Redirect to={redirerctURL} /> :    // 작성 완료 시, Redirect함
            <HeaderBox>
                {
                    /* 카테고리 선택 박스 */
                    isNew ?

                    /* 새 글의 경우, 활성화 */
                    <CategorySelectBox 
                        defaultValue={defaultBoard} 
                        onChange={this._handleSelect}
                    >
                        <Option value={MARKET} >다판다</Option>
                        <Option value={NETWORKING} >잉력시장</Option>
                    </CategorySelectBox> :

                    /* 글 수정의 경우, 비활성화 */
                    <CategorySelectBox 
                        defaultValue={defaultBoard} 
                        disabled
                    >
                        <Option value={MARKET} >다판다</Option>
                        <Option value={NETWORKING} >잉력시장</Option>
                    </CategorySelectBox>
                }

                <EditFuncBox>
                    {/* font-size */}
                    <Tooltip title='글자 크기' {...TooltipProps} >
                        <FontSizeSelect
                            defaultValue={10} 
                        >
                            <Option value={8} >8 pt</Option>
                            <Option value={9} >9 pt</Option>
                            <Option value={10} >10 pt</Option>
                            <Option value={12} >12 pt</Option>
                            <Option value={14} >14 pt</Option>
                            <Option value={18} >18 pt</Option>
                            <Option value={24} >24 pt</Option>
                        </FontSizeSelect>
                    </Tooltip>
                    
                    {/* 글꼴 ? */}

                    <Divider type='vertical' />

                    <Tooltip title='굵게' {...TooltipProps} >
                        <EditIcon type="bold" isSelected={spanStyle.bSelect} onClick={editClickB} />
                    </Tooltip>
                    <Tooltip title='기울이기' {...TooltipProps} >
                        <EditIcon type="italic" isSelected={spanStyle.iSelect} onClick={editClickI} />
                    </Tooltip>
                    <Tooltip title='밑줄' {...TooltipProps} >
                        <EditIcon type="underline" isSelected={spanStyle.uSelect} onClick={editClickU} />
                    </Tooltip>
                    <Tooltip title='취소선' {...TooltipProps} >
                        <EditIcon type="strikethrough" isSelected={spanStyle.sSelect} onClick={editClickS} />
                    </Tooltip>

                    <Tooltip title='글자색' {...TooltipProps} >
                        <EditIcon type="font-colors" />
                    </Tooltip>
                    
                    <Divider type="vertical" />
                    
                    {/* p 태그 속성 (text-align) */}
                    <Tooltip title='양쪽 정렬' {...TooltipProps} >
                        <AlignJustifyIcon 
                            isSelected={textAlign === TEXT_ALIGN.justify} 
                            onClick={() => selectTextAlign(TEXT_ALIGN.justify)}    
                        />
                    </Tooltip>
                    <Tooltip title='왼쪽 정렬' {...TooltipProps} >
                        <AlignLeftIcon 
                            isSelected={textAlign === TEXT_ALIGN.left} 
                            onClick={() => selectTextAlign(TEXT_ALIGN.left)}
                        />
                    </Tooltip>
                    <Tooltip title='가운데 정렬' {...TooltipProps} >
                        <AlignCenterIcon 
                            isSelected={textAlign === TEXT_ALIGN.center} 
                            onClick={() => selectTextAlign(TEXT_ALIGN.center)}
                        />
                    </Tooltip>
                    <Tooltip title='오른쪽 정렬' {...TooltipProps} >
                        <AlignRightIcon 
                            isSelected={textAlign === TEXT_ALIGN.right} 
                            onClick={() => selectTextAlign(TEXT_ALIGN.right)}
                        />
                    </Tooltip>
                </EditFuncBox>

                {/* 글 수정 / 생성 버튼 */}
                <EndButton onClick={this._handleEndClick} >
                    { isNew ? '글 생성' : '글 수정' }
                </EndButton>
            </HeaderBox>
        )
    }
}

EditComponent.propTypes = {
    defaultBoard: PropTypes.string,                 // Default Category 값

    isNew: PropTypes.bool,                          // Create / Update 여부
    id: PropTypes.number,                           // Update의 경우 해당 글의 id
    editSuccess: PropTypes.bool.isRequired,         // 작성 완료를 알리는 데이터

    /* 글 내용에 대한 데이터 */
    title: PropTypes.string.isRequired,             // Title Data
    files: PropTypes.array.isRequired,              // Files Data
    description: PropTypes.string.isRequired,       // Description Data

    spanStyle: PropTypes.object.isRequired,         // BIUS 스타일 선택 정보
    textAlign: PropTypes.string.isRequired,         // p태그 text align 속성 값

    EditPostRequest: PropTypes.func.isRequired,     // Post Create / Update function

    editClickB: PropTypes.func.isRequired,
    editClickI: PropTypes.func.isRequired,
    editClickU: PropTypes.func.isRequired,
    editClickS: PropTypes.func.isRequired,
    selectTextAlign: PropTypes.func.isRequired,     // text align 속성값 선택 함수
}

EditComponent.defaultProps = {
    defaultBoard: MARKET,
    isNew: true,
    id: 0,
}

export default EditComponent;