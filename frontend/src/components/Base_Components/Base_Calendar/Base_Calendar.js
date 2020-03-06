

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { MANAGE } from "../../../constants/categories";

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import './Calendar.css';


class Calendar extends Component {

    state = {}
    calendarRef = React.createRef()

    componentDidMount () {
        const { initCalenderEvents } = this.props

        initCalenderEvents();
        this._today();
    }

    /* dateClick 시 실행되는 함수 (날짜 부분을 클릭할 때 실행)
       클릭된 날짜의 색을 바꾸고, 선택된 날짜를 app state에 저장 */
    _selectDate = (info) => {
        const { date, dayEl } = info;
        const { selectDate } = this.props;

        this._changeDayElStyle(dayEl);
        selectDate(date);
    }

    /* 처음 Mount 되었을 때와 today 버튼을 클릭할 때 실행되는 함수
       Calendar Api의 today함수와 (오늘 날짜가 있는 페이지로 이동)
       오늘 날짜 Date 객체를 받아서 오늘 날짜에 해당 되는 칸의 스타일을 변경하고,
       오늘 날짜를 app state에 저장하는 함수 */
    _today = () => {
        const { selectDate } = this.props;
        const calendarApi = this.calendarRef.current.getApi();
        
        calendarApi.today();
        const todayDate = calendarApi.getNow()
        
        const todayEl = this._findDayElWithDate(todayDate);
        this._changeDayElStyle(todayEl);
        selectDate(todayDate);
    }

    /* 이전에 선택된 elem를 가리키는 state.prevElem의 style을 없애고
       dayEl로 받은 새로운 html DOM 객체의 스타일을 추가한 뒤, 해당 elem을
       state의 prevElem값으로 설정하는 함수 */
    _changeDayElStyle = (dayEl) => {
        const { prevElem } = this.state;
        if ( prevElem ) { prevElem.style.opacity = 0; }
        dayEl.style.opacity = 0.1;
        this.setState({
            ...this.state,
            prevElem: dayEl
        })
    }

    /* Date 객체를 받아서 Calendar의 해당 날짜 정보를 갖는 html DOM 객체를 리턴하는 함수 */
    _findDayElWithDate = (date) => {
        let dayEls = []

        /* Calendar DOM에서 날짜들의 DOM을 가져와서 dayEls array에 저장 */
        const TableRows = this.calendarRef.current.calendar.el.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.childNodes;
        TableRows.forEach(tr => {
            dayEls = [...dayEls, ...tr.firstChild.lastChild.lastChild.lastChild.childNodes]
        });

        /* dayEls의 DOM 오브젝트 중, date 값이 입력받은 dateStr과 일치하는 DOM를 리턴 */
        const dateStr = this._dateToStr(date);
        const result = dayEls.find( dayEl => dayEl.dataset.date === dateStr )
        return result;
    }

    /* Date => yyyy-mm-dd */
    _dateToStr = (date) => {
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1 ;
        let dd = date.getDate();

        if ( mm < 10 ) { mm = `0${mm}` }
        if ( dd < 10 ) { dd = `0${dd}` }

        return `${yyyy}-${mm}-${dd}`;
    }

    render () {

        const { 
            category,
            eventsObj
        } = this.props;

        let props = ( category === MANAGE ?
        /* Manage Calendar Properties */
        {
            plugins: [ dayGridPlugin, interactionPlugin ],      // Fullcalendar 플러그인 리스트
            
            header: {                                           // 달력의 헤더 설정
                left: 'custom_today',
                center: 'prev, title, next',
                right: ''
            },
        } :
        /* Carpool Calendar Properties */
        {
            plugins: [ dayGridPlugin, interactionPlugin ],      // Fullcalendar 플러그인 리스트
            
            header: {                                           // 달력의 헤더 설정
                left: 'custom_today',
                center: 'prev, title, next',
                right: ''
            },
        });

        /* 공통 Calendar Props 추가 */
        props = {
            ...props,

            customButtons: {
                custom_today: {
                    text: 'today',
                    click: this._today
                }
            },

            // events: curEvents,                                  // 현재 캘린더의 상태에 대한 render할 이벤트 데이터

            locale: 'ko',                                       // 언어: 한국어

            height: 'parent',                                   // 달력의 사이즈 조정 (parent 높이로 설정)
            fixedWeekCount: false,                              // 달력이 해당 월의 week 수 만큼 render됨 (6주 fix X)

            dateClick: this._selectDate                         // 달력의 날짜 부분 클릭 시 실행되는 함수
        }

        console.log(eventsObj)

        return (
            // isLoaded ? <FullCalendar {...props} ref={this.calendarRef} /> : ''
            <FullCalendar {...props} ref={this.calendarRef} />
        )
    }
}


Calendar.propTypes = {
    category: PropTypes.string.isRequired,              // [Manage / Carpool] 어느 카테고리에 렌더링될 것인지

    eventsObj: PropTypes.array.isRequired,              // 전체 카풀 이벤트 데이터

    initCalenderEvents: PropTypes.func.isRequired,      // 캘린더 첫 렌더 시 들어올 events 받는 액션
    selectedDate: PropTypes.object,                     // 캘린더에서 선택된 날짜 데이터
    selectDate: PropTypes.func.isRequired,              // 캘린더에서 날짜를 선택하는 메서드
}

export default Calendar;
