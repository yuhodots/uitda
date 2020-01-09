// 상위 컴포넌트: ManageHeader


import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Select } from 'antd'
import 'antd/es/select/style/css'

import { colors } from '../../../../../styles/variables'; 
import { MARKET, NETWORKING } from '../../../../../constants/board_name'
import { Redirect } from 'react-router-dom';

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
`

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
            editSuccess
        } = this.props;

        const { board } = this.state;

        const redirerctURL = `/manage/posts/${board}`

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

    EditPostRequest: PropTypes.func.isRequired,     // Post Create / Update function
}

EditComponent.defaultProps = {
    defaultBoard: MARKET,
    isNew: true,
    id: 0,
}

export default EditComponent;