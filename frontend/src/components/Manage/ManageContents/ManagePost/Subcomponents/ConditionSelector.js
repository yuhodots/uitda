

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Select } from 'antd'

import { MARKET } from '../../../../../constants/board_name'
import { PostManageButtonStyle } from '../../../../../styles/templates/manage';

const { Option } = Select;

/* Styled Components */
const SelectButton = styled(Select)`
    ${PostManageButtonStyle}
    width: 6.5rem;
`;

/* Constants */
const marketConditions = ['판매 중', '거래 중', '판매 완료'];
const networkingConditions = ['진행 중', '완료']

/* React Component */
const ConditionSelector = ({board, originCondition}) => {

    const conditions = board === MARKET ?
    marketConditions : networkingConditions;

    return (
        <SelectButton defaultValue={originCondition} >
            { conditions.map( condition => {
                return <Option value={condition} >{condition}</Option>                
            }) }
        </SelectButton>
    )
}

ConditionSelector.propTypes = {
    board: PropTypes.string.isRequired,
    originCondition: PropTypes.string.isRequired,
}

export default ConditionSelector