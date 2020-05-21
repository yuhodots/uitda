// 상위 컴포넌트: ManageHeader


import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { Select, Tooltip, Divider } from 'antd';
import {  } from "@ant-design/icons";
// import { 
//     MdFormatAlignJustify,
//     MdFormatAlignLeft,
//     MdFormatAlignCenter,
//     MdFormatAlignRight,
// } from 'react-icons/md'
import { Redirect } from 'react-router-dom';

import { CategorySelectBox, RightBox } from './Subcomponenets';
// import { colors } from '../../../styles/variables'; 
// import { TEXT_ALIGN } from '../../../constants/edit_funcs'
import { CARPOOL } from '../../../constants/categories'

// const { Option } = Select;

/* Styled Compoents */
/* 로고 다음부터의 오른쪽 부분 */
const HeaderBox = styled.div`
    height: 4rem;
    flex: 1;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
`; 

const LeftBox = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`

    /* 글 작성에 관련된 기능을 담은 박스 */
    // const EditFuncBox = styled.div`
    //     margin: 0 2rem;
    //     height: 100%;

    //     display: flex;
    //     flex-flow: row nowrap;
    //     align-items: center;
    // `;

        // const FontSizeSelect = styled(Select)`
        //     margin: 0 0.5rem !important;
        // `;

        /* Icon 공통 속성 (ant-design) */
        // const IconStyle = css`
        //     margin: 0 0.5rem;
        //     font-size: 1rem;

        //     cursor: pointer;
        //     transition-property: color, background-color;
        //     transition-duration: 0.3s;

        //     color: ${colors.icon_darkgray};
        //     background-color: ${colors.white};

        //     /* 클릭 시, 글자색 배경색 변경 */
        //     ${props => props.isSelected && css`
        //         color: ${colors.white};
        //         background-color: ${colors.icon_darkgray};
        //     `}
        // `;

        /* Ant Design Icon */
        // const EditIcon = styled(Icon)`
        //     ${IconStyle}
        // `;

        /* Ant Design에 없는 아이콘들 */
        // const AlignJustifyIcon = styled(MdFormatAlignJustify)`${IconStyle}`;
        // const AlignLeftIcon = styled(MdFormatAlignLeft)`${IconStyle}`;
        // const AlignCenterIcon = styled(MdFormatAlignCenter)`${IconStyle}`;
        // const AlignRightIcon = styled(MdFormatAlignRight)`${IconStyle}`;



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
        const { selectEditCategory } = this.props;

        selectEditCategory(value);
    }

    
    render () {

        const { 
            isNew,
            id,

            editCategory,
            editSuccess,

            editBoardData,

            // spanStyle,
            // textAlign,

            selectedDate,
            roomInfoData,

            /* Methods */
            selectEditCategory,

            EditPostRequest,

            // editClickB,
            // editClickI,
            // editClickS,
            // editClickU,
            // selectTextAlign,

            postCarpoolEvent,
        } = this.props;

        const isCarpool = editCategory === CARPOOL;

        const redirerctURL = isCarpool ?
        '/carpool' :
        `/manage/posts/${editCategory}`;

        // const TooltipProps = {
        //     mouseEnterDelay: 0,
        //     mouseLeaveDelay: 0
        // }

        // console.log(spanStyle);
        // console.log(`title: ${title}, files: ${files}, description: ${description}`);
        // console.log(deletedFileIDs)
        // console.log(id);
        // console.log(files);

        return (
            editSuccess ? 
            <Redirect to={redirerctURL} /> :    // 작성 완료 시, Redirect함
            <HeaderBox>
                
                <LeftBox>
                    <CategorySelectBox 
                        isNew={isNew}
                        editCategory={editCategory}
                        selectEditCategory={selectEditCategory}
                    />

                    {
                        /* Carpool 카테고리에서는 EditFuncBox 없음
                        EditFuncBox는 Subcomponents로 리펙토링 하기 */
                        // editCategory === CARPOOL ?
                        // '' :
                        // <EditFuncBox>
                        //     {/* font-size */}
                        //     <Tooltip title='글자 크기' {...TooltipProps} >
                        //         <FontSizeSelect
                        //             defaultValue={10} 
                        //         >
                        //             <Option value={8} >8 pt</Option>
                        //             <Option value={9} >9 pt</Option>
                        //             <Option value={10} >10 pt</Option>
                        //             <Option value={12} >12 pt</Option>
                        //             <Option value={14} >14 pt</Option>
                        //             <Option value={18} >18 pt</Option>
                        //             <Option value={24} >24 pt</Option>
                        //         </FontSizeSelect>
                        //     </Tooltip>
                            
                        //     {/* 글꼴 ? */}

                        //     <Divider type='vertical' />

                        //     {/* <Tooltip title='굵게' {...TooltipProps} >
                        //         <EditIcon type="bold" isSelected={spanStyle.bSelect} onClick={editClickB} />
                        //     </Tooltip>
                        //     <Tooltip title='기울이기' {...TooltipProps} >
                        //         <EditIcon type="italic" isSelected={spanStyle.iSelect} onClick={editClickI} />
                        //     </Tooltip>
                        //     <Tooltip title='밑줄' {...TooltipProps} >
                        //         <EditIcon type="underline" isSelected={spanStyle.uSelect} onClick={editClickU} />
                        //     </Tooltip>
                        //     <Tooltip title='취소선' {...TooltipProps} >
                        //         <EditIcon type="strikethrough" isSelected={spanStyle.sSelect} onClick={editClickS} />
                        //     </Tooltip>

                        //     <Tooltip title='글자색' {...TooltipProps} >
                        //         <EditIcon type="font-colors" />
                        //     </Tooltip> */}
                            
                        //     <Divider type="vertical" />
                            
                        //     {/* p 태그 속성 (text-align) */}
                        //     <Tooltip title='양쪽 정렬' {...TooltipProps} >
                        //         <AlignJustifyIcon 
                        //             isSelected={textAlign === TEXT_ALIGN.justify} 
                        //             onClick={() => selectTextAlign(TEXT_ALIGN.justify)}    
                        //         />
                        //     </Tooltip>
                        //     <Tooltip title='왼쪽 정렬' {...TooltipProps} >
                        //         <AlignLeftIcon 
                        //             isSelected={textAlign === TEXT_ALIGN.left} 
                        //             onClick={() => selectTextAlign(TEXT_ALIGN.left)}
                        //         />
                        //     </Tooltip>
                        //     <Tooltip title='가운데 정렬' {...TooltipProps} >
                        //         <AlignCenterIcon 
                        //             isSelected={textAlign === TEXT_ALIGN.center} 
                        //             onClick={() => selectTextAlign(TEXT_ALIGN.center)}
                        //         />
                        //     </Tooltip>
                        //     <Tooltip title='오른쪽 정렬' {...TooltipProps} >
                        //         <AlignRightIcon 
                        //             isSelected={textAlign === TEXT_ALIGN.right} 
                        //             onClick={() => selectTextAlign(TEXT_ALIGN.right)}
                        //         />
                        //     </Tooltip>
                        // </EditFuncBox>
                    }
                </LeftBox>

                <RightBox 
                    isCarpool={isCarpool} 
                    isNew={isNew}
                    id={id}
                    editCategory={editCategory}

                    editBoardData={editBoardData}

                    selectedDate={selectedDate}
                    roomInfoData={roomInfoData}

                    EditPostRequest={EditPostRequest}
                    postCarpoolEvent={postCarpoolEvent}
                />
                
            </HeaderBox>
        )
    }
}

EditComponent.propTypes = {
    editCategory: PropTypes.string.isRequired,      // Default Category 값

    isNew: PropTypes.bool,                          // Create / Update 여부
    id: PropTypes.number,                           // Update의 경우 해당 글의 id
    editSuccess: PropTypes.bool.isRequired,         // 작성 완료를 알리는 데이터

    /* 글 내용에 대한 데이터 */
    editBoardData: PropTypes.object.isRequired,     // Edit Board Data

    spanStyle: PropTypes.object.isRequired,         // BIUS 스타일 선택 정보
    textAlign: PropTypes.string.isRequired,         // p태그 text align 속성 값

    /* Carpool 탭 데이터 */
    selectedDate: PropTypes.object,                 // Carpool 탭에서 선택된 날짜 데이터
    roomInfoData: PropTypes.object,                 // Carpool 방 정보

    /* Methods */
    selectEditCategory: PropTypes.func.isRequired,  // 카테고리 선택 메서드
    EditPostRequest: PropTypes.func.isRequired,     // Post Create / Update function

    editClickB: PropTypes.func.isRequired,
    editClickI: PropTypes.func.isRequired,
    editClickU: PropTypes.func.isRequired,
    editClickS: PropTypes.func.isRequired,
    selectTextAlign: PropTypes.func.isRequired,     // text align 속성값 선택 함수

    postCarpoolEvent: PropTypes.func.isRequired,    // Carpool Event 등록하는 Post Action
}

EditComponent.defaultProps = {
    isNew: true,
    id: 0,
}

export default EditComponent;