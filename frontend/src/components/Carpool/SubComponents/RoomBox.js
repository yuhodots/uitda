

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


/* Styled Components */




/* React Component */
class RoomBox extends Component {

    render() {
        
        const { selectedEvent } = this.props

        return (
            <div>
                {selectedEvent.title}
                {selectedEvent.departure}
                {selectedEvent.destination}
            </div>
        )
    }
}

RoomBox.propTypes = {
    selectedEvent: PropTypes.object.isRequired,         // 선택된 일정 데이터
}

export default RoomBox