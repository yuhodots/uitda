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

const CategorySelectBox = styled(Select)`
    width: 8rem;
`

const CreateButton = styled.div`
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

    render () {

        const { 
            defaultBoard,

            title,
            files,
            description,
            editSuccess,

            EditPostRequest
        } = this.props;

        const { board } = this.state;

        const redirerctURL = `/manage/posts/${board}`

        // console.log(`title: ${title}, files: ${files}, description: ${description}`);

        return (
            editSuccess ? 
            <Redirect to={redirerctURL} /> :    // 작성 완료 시, Redirect함
            <HeaderBox>
                <CategorySelectBox 
                    defaultValue={defaultBoard} 
                    onChange={this._handleSelect}
                >
                    <Option value={MARKET} >다판다</Option>
                    <Option value={NETWORKING} >잉력시장</Option>
                </CategorySelectBox>

                <CreateButton onClick={() => EditPostRequest(board, title, description, files)} >
                    글 생성
                </CreateButton>
            </HeaderBox>
        )
    }
}

EditComponent.propTypes = {
    defaultBoard: PropTypes.string,                 // Default Category 값

    /* 글 내용에 대한 데이터 */
    title: PropTypes.string.isRequired,             // Title Data
    files: PropTypes.array.isRequired,              // Files Data
    description: PropTypes.string.isRequired,       // Description Data
    editSuccess: PropTypes.bool.isRequired,         // 작성 완료를 알리는 데이터

    EditPostRequest: PropTypes.func.isRequired,     // Post Create / Update function
}

EditComponent.defaultProps = {
    defaultBoard: MARKET,
}

export default EditComponent;