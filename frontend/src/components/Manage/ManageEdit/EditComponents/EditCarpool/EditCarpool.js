

import React, { Component } from 'react';
import styled from 'styled-components';
import { Calendar } from "antd";

import { colors } from '../../../../../styles/variables'


/* Styled Components */

const WholeArea = styled.div`

    padding: 2rem;

    display: flex;
    flex-flow: row nowrap;
`

const CalendarBox = styled.div`

    margin: 0 2rem;
    flex: 2;

    background-color: ${colors.white};
`

const RoomInfoBox = styled.div`

    margin: 0 2rem;
    flex: 1;

    background-color: ${colors.white};
`


/* React Component */

class EditCarpool extends Component {


    render () {

        return (
            <WholeArea>
                <CalendarBox>
                    <Calendar />
                </CalendarBox>
                <RoomInfoBox></RoomInfoBox>
            </WholeArea>
        )
    }
}

export default EditCarpool;