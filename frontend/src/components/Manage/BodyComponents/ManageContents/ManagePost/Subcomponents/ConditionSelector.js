

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Select } from 'antd';

import { MARKET } from '../../../../../../constants/categories';
import { MARKET_CONDITIONS, NETWORKING_CONDITIONS } from '../../../../../../constants/manage_post_conditions';
import { PostManageButtonStyle } from '../../../../../../styles/templates/manage';

const { Option } = Select;

/* Styled Components */
const SelectButton = styled(Select)`
    ${PostManageButtonStyle}
    width: 6.5rem;
`;

/* React Component */
class ConditionSelector extends Component {

    _handleChange = (value) => {
        const { 
            board,
            post_id,
            updatePostCondition 
        } = this.props;

        updatePostCondition(board, post_id, value);
    }

    render () {

        const {
            board, originCondition
        } = this.props;

        const conditions = board === MARKET ?
        MARKET_CONDITIONS : NETWORKING_CONDITIONS;

        return (
            <SelectButton 
                defaultValue={originCondition} 
                onChange={this._handleChange}
            >
                { conditions.map( (condition, idx) => {
                    return <Option value={condition} key={idx} >{condition}</Option>                
                }) }
            </SelectButton>
        )
    }
}

ConditionSelector.propTypes = {
    board: PropTypes.string.isRequired,                 // 게시판 정보 (market, networking)
    post_id: PropTypes.number.isRequired,               // 해당 포스팅 id
    originCondition: PropTypes.string.isRequired,       // 상태 변경 이전의 원래 상태 값
    updatePostCondition: PropTypes.func.isRequired,     // 포스팅의 상태 변경 메서드
}

export default ConditionSelector