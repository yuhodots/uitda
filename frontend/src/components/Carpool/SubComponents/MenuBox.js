

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Radio, Checkbox } from "antd";

import { colors } from "../../../styles/variables";


/* Styled Components */
const MenuBoxArea = styled.div`
    padding: 1.5rem;
    width: 100%;
    height: 6rem;

    background-color: ${colors.white};
    
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    @media (max-width: 1500px) {
        height: 4rem;
        padding: 1rem;
    }
`;


class MenuBox extends Component {

    _handleRadio = (e) => {
        const { renderTotalEvents, renderMyEvents } = this.props

        if ( e.target.value === 'total') { renderTotalEvents() }
        else { renderMyEvents() }
    }

    _handleCheckBox = (e) => {
        const { changeClosedEvents } = this.props;
        
        changeClosedEvents(e.target.checked);
    }

    render() {

        return (
            <MenuBoxArea>
                <Radio.Group defaultValue='total' onChange={this._handleRadio} >
                    <Radio value='total' >전체 일정 보기</Radio>
                    <Radio value='my' >내 일정만 보기</Radio>
                </Radio.Group>
                <Checkbox onChange={this._handleCheckBox} >마감 일정 없애기</Checkbox>
            </MenuBoxArea>
        )
    }
}

MenuBox.propTypes = {
    renderTotalEvents: PropTypes.func.isRequired,       // 전체 일정 보기
    renderMyEvents: PropTypes.func.isRequired,          // 내 일정만 보기
    changeClosedEvents: PropTypes.func.isRequired,      // 마감된 일정 보기 / 숨기기
}

export default MenuBox;