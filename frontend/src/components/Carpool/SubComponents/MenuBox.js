

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Radio, Button, Checkbox } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';

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
    justify-content: space-between;

    @media (max-width: 1500px) {
        height: 4rem;
        padding: 1rem;
    }
`;

const FuncGroupBox = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;

const ButtonLink = styled(Button)`
    height: 2.5rem;
    padding: 0.5625rem 1rem;
    padding-left: 0.8rem;
    margin: 0;
    margin-right: 1rem;

    background-color: ${colors.blue};

    line-height: 0.875rem;
    font-size: 0.875rem;

    @media (max-width: 1500px) {
        height: 2rem;
        padding: 0.5625rem 0.75rem;
        padding-left: 0.6rem;
    }
`;

    const EditIcon = styled(EditOutlined)`
        color: ${colors.white};
    `;


class MenuBox extends Component {

    state = {}

    _handleRadio = (e) => {
        const { renderTotalEvents, renderMyEvents } = this.props

        this.setState({
            totalOrMy: e.target.value
        })

        if ( e.target.value === 'total') { renderTotalEvents() }
        else { renderMyEvents() }
    }

    _handleCheckBox = (e) => {
        const { changeClosedEvents } = this.props;
        const { totalOrMy } = this.state;

        console.log(totalOrMy)

        changeClosedEvents(e.target.checked);
    }

    render() {

        return (
            <MenuBoxArea>
                <FuncGroupBox>
                    <Radio.Group defaultValue='total' onChange={this._handleRadio} >
                        <Radio value='total' >전체 일정 보기</Radio>
                        <Radio value='my' >내 일정 (만든 일정 + 신청한 일정)</Radio>
                    </Radio.Group>

                    <Checkbox onChange={this._handleCheckBox} >
                        마감된 일정 가리기
                    </Checkbox>
                </FuncGroupBox>

                <Link to='/manage/edit/newpost'>
                    <ButtonLink type='primary' >
                        <EditIcon />
                        카풀 일정 만들기
                    </ButtonLink>
                </Link>
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