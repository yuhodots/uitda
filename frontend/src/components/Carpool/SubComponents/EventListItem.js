

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { colors } from "../../../styles/variables";
import { CLOSED, ACTIVE, OWNER, GUEST } from "../../../constants/carpool_event_labels";

/* Styled Componenets */
const ListItem = styled.div`
    /* margin: 0.25rem 0; */
    margin-bottom: 0.5rem;
    
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;

    const StateCircle = styled.div`
        width: 0.65rem;
        height: 0.65rem;
        margin-right: 0.75rem;

        border-radius: 50%;

        background-color: ${props => props.labelColor};
    `;

    const EventInfoText = styled.div`
    `;

    const EventText = styled(EventInfoText)`
        cursor: pointer;
        :hover {
            text-decoration: underline;
        }
    `;

/* Functions */
/* date => HH:MM */
const _DateToString = (date) => {
    let HH = date.getHours();
    let MM = date.getMinutes();
    
    if ( HH < 10 ) { HH = `0${HH}`; }
    if ( MM < 10 ) { MM = `0${MM}`; }
    return `${HH}:${MM}`;
}

/* React Componenet */
const EventListItem = ({label, event, infoText, storeClickedEventData, openModalWindow}) => {

    const { id, start, departure, destination } = event;

    let labelColor;
    switch (label) {
        case CLOSED: labelColor = colors.closed_gray; break;
        case ACTIVE: labelColor = colors.active_blue; break;
        case OWNER: labelColor = colors.owner_yellow; break;
        case GUEST: labelColor = colors.guest_green; break;
        default:  labelColor = colors.active_blue; break;
    }

    const startDate = new Date(start)
    const timeString = _DateToString(startDate);

    const _handleEventClick = (e) => {
        storeClickedEventData(id);
        openModalWindow();
    }

    return (
        <ListItem>
            <StateCircle labelColor={labelColor} />
            <EventInfoText>
                { infoText ? infoText : 
                    <EventText onClick={_handleEventClick} >{timeString} {departure} 출발, {destination} 방향</EventText>
                }
            </EventInfoText>
        </ListItem>
    )
}

EventListItem.propTypes = {
    label: PropTypes.string.isRequired,                 // state label (CLOSED, ACTIVE, OWNER, GUEST)
    event: PropTypes.object,                            // 이벤트 데이터 객체
    infoText: PropTypes.string,                         // infoBox의 경우 info 텍스트 값

    storeClickedEventData: PropTypes.func,              // 이벤트를 클릭하는 이벤트를 핸들하는 액션
    openModalWindow: PropTypes.func,                    // Modal 창을 띄우는 메서드
}

EventListItem.defaultProps = {
    event: {},
    infoText: '',

    storeClickedEventData: undefined,
    openModalWindow: undefined,
}

export default EventListItem;

