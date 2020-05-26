

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Select } from "antd";

import { MARKET, NETWORKING, CARPOOL } from '../../../../constants/categories'

const { Option } = Select;


/* Styled Components */

/* 카테고리 선택 태그 (ant-design) */
const StyledSelect = styled(Select)`
    width: 8rem;
`;

/* React Component */

class CategorySelectBox extends Component {

    _handleSelect = (value) => {
        const { selectEditCategory } = this.props;

        selectEditCategory(value);
    }

    render () {

        const {
            isNew,
            editCategory,
        } = this.props

        const props = {
            defaultValue: editCategory,
            onChange: this._handleSelect,
            disabled: isNew ? false : true,
        }

        return (
            <StyledSelect {...props} >
                <Option value={MARKET} >유니마켓</Option>
                <Option value={NETWORKING} >네트워킹</Option>
                <Option value={CARPOOL} >택시카풀</Option>
            </StyledSelect>
        )
    }
}

CategorySelectBox.propTypes = {
    isNew: PropTypes.bool.isRequired,               // create / update 여부
    editCategory: PropTypes.string.isRequired,      // 카테고리 정보

    selectEditCategory: PropTypes.func.isRequired,  // 카테고리 선택 메서드
}

export default CategorySelectBox;