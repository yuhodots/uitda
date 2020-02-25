

import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import './Calendar.css';


class Calendar extends Component {

    state = {}

    _selectDate = (info) => {

        console.log(info)

        const { prevElem } = this.state;

        if ( prevElem ) { prevElem.style.opacity = 0; }

        info.dayEl.style.opacity = 0.1;

        this.setState({
            ...this.state,
            prevElem: info.dayEl
        })
    }

    render () {

        const {
        } = this.props;


        return (
            <FullCalendar 
                plugins={[ dayGridPlugin, interactionPlugin ]}      // Fullcalendar 플러그인 리스트
                locale='ko'                                         // 언어: 한국어

                header={{                                           // 달력의 헤더 출력 설정
                    left: 'today',
                    center: 'prev, title, next',
                    right: ''
                }}

                height='parent'                                     // 달력의 사이즈 조정 (parent 높이로 설정)
                fixedWeekCount={false}                              // 달력이 해당 월의 week 수 만큼 render됨 (6주 fix X)

                dateClick={this._selectDate}                        // 달력의 날짜 부분 클릭 시 실행되는 함수
            />
        )
    }
}



export default Calendar;
