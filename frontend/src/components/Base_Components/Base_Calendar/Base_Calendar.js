

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { MANAGE } from "../../../constants/categories";
import { 
    TOTAL, CLOSED, ACTIVE, OWNER, GUEST, OWNER_CLOSED, GUEST_CLOSED 
} from '../../../constants/calendar_consts'
import { colors } from "../../../styles/variables";

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import './Calendar.css';


class Calendar extends Component {

    state = {}
    calendarRef = React.createRef()

    componentDidMount () {
        const { category, initCalenderEvents } = this.props

        initCalenderEvents(category);
        this._today();

        /* dayEl Head 부분에 hover event listener 등록 */
        const TableRows = this.calendarRef.current.calendar.el.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.childNodes;
        TableRows.forEach(row => {
            const dayHeads = row.lastChild.lastChild.firstChild.lastChild.childNodes;
            const dayElBgs = row.firstChild.lastChild.lastChild.lastChild.childNodes;

            for (let i = 0; i < 7; i++) {
                let dayElbg = dayElBgs[i]
                dayHeads[i].addEventListener('mouseover', (e) => this._handleHoverDayHead(e, dayElbg) )
                dayHeads[i].addEventListener('mouseleave', (e) => this._handleMouseLeaveDayHead(e, dayElbg) )
            }
        })
    }

    componentWillUnmount () {
        const TableRows = this.calendarRef.current.calendar.el.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.childNodes;
        TableRows.forEach(row => {
            const dayHeads = row.lastChild.lastChild.firstChild.lastChild.childNodes;
            const dayElBgs = row.firstChild.lastChild.lastChild.lastChild.childNodes;

            for (let i = 0; i < 7; i++) {
                let dayElbg = dayElBgs[i]
                dayHeads[i].removeEventListener('mouseover', (e) => this._handleHoverDayHead(e, dayElbg) )
                dayHeads[i].removeEventListener('mouseleave', (e) => this._handleMouseLeaveDayHead(e, dayElbg) )
            }
        })
    }

    /* dayEl의 Head 부분 hover 할 때, 스타일 변경하는 함수 */
    _handleHoverDayHead = (e, dayEl) => {
        dayEl.style.opacity = 0.1;
    }
    _handleMouseLeaveDayHead = (e, dayEl) => {
        if ( dayEl !== this.state.prevElem ) { dayEl.style.opacity = 0 }
    }

    /* dateClick 시 실행되는 함수 (날짜 부분을 클릭할 때 실행)
       클릭된 날짜의 색을 바꾸고, 선택된 날짜를 app state에 저장 */
    _selectDate = (info) => {
        const { date, dayEl } = info;
        const { category, selectDate } = this.props;

        this._changeDayElStyle(dayEl);
        selectDate(category, date);
    }

    /* 처음 Mount 되었을 때와 today 버튼을 클릭할 때 실행되는 함수
       Calendar Api의 today함수와 (오늘 날짜가 있는 페이지로 이동)
       오늘 날짜 Date 객체를 받아서 오늘 날짜를 app state에 저장하고,
       오늘 날짜에 해당 되는 칸의 스타일을 변경하는 함수 */
    _today = () => {
        const { category, selectDate } = this.props;
        const calendarApi = this.calendarRef.current.getApi();
        
        calendarApi.today();
        
        let todayDate = new Date();
        todayDate.setUTCHours(0);      todayDate.setMinutes(0);
        todayDate.setSeconds(0);    todayDate.setMilliseconds(0);
        selectDate(category, todayDate);

        const todayEl = this._findDayElWithDate(todayDate);
        this._changeDayElStyle(todayEl);
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

    /* 백엔드에서 받은 이벤트 객체를 calendar render view 데이터로 변형하는 함수 */
    _dataObjToviewObjList = (obj) => {
        /* C,A,O,G로 구분된 객체를 하나의 array로 변환 */
        const eventList = [...obj.C, ...obj.A, ...obj.O, ...obj.G];
        const { totalOrMyOption } = this.props;

        /* 데이터 객체 -> calendar view 객체 */
        const events = eventList.map( event => {
            const { id, start, destination, label } = event;
            
            /* label에 해당하는 색을 갖도록 변환 */
            let color;
            switch (label) {
                case CLOSED: color = colors.closed_gray; break;
                case ACTIVE: color = colors.active_blue; break;
                case OWNER: color = colors.owner_yellow; break;
                case GUEST: color = colors.guest_green; break;
                case OWNER_CLOSED: 
                    color = totalOrMyOption === TOTAL ? 
                            colors.owner_yellow : colors.closed_gray; break; 
                case GUEST_CLOSED: 
                    color = totalOrMyOption === TOTAL ? 
                            colors.guest_green : colors.closed_gray; break;
                default:  color = colors.active_blue; break;
            }

            return {
                id, color, start,
                title: `${destination} 방향`,
            }
        })

        return(events);
    }

    _handleClickEvent = (info) => {
        const { storeClickedEventData, openModalWindow } = this.props
        
        storeClickedEventData(info.event.id);
        openModalWindow();
    }


    render () {

        const { 
            category,
            eventsObj,
        } = this.props;

        const events = this._dataObjToviewObjList(eventsObj);

        let props = ( category === MANAGE ?
        /* Manage Calendar Properties */
        {
            header: {                                           // 달력의 헤더 설정
                left: 'custom_today',
                center: 'prev, title, next',
                right: ''
            },
        } :
        /* Carpool Calendar Properties */
        {
            header: {                                           // 달력의 헤더 설정
                left: 'custom_today',
                center: 'prev, title, next',
                right: ''
            },
        });

        /* 공통 Calendar Props 추가 */
        props = {
            ...props,
            plugins: [dayGridPlugin, interactionPlugin],        // Fullcalendar 플러그인 리스트

            events,                                             // 현재 캘린더의 상태에 대한 render할 이벤트 데이터
            timeZone: 'UTC',                                    // DB에 저장된 UTC 기준 시간으로 달력에 나타나도록 함

            customButtons: {                                    // custom 버튼 목록 
                custom_today: {                                 // today 버튼 클릭 시, 달력 페이지 이동뿐만 아니라, 오늘자 dayEl이 선택되는 버튼
                    text: 'today',
                    click: this._today
                }
            },

            locale: 'ko',                                       // 언어: 한국어
            height: 'parent',                                   // 달력의 사이즈 조정 (parent 높이로 설정)
            fixedWeekCount: false,                              // 달력이 해당 월의 week 수 만큼 render됨 (6주 fix X)

            defaultTimedEventDuration: '00:00',                 // 카풀 이벤트의 duration을 없앰으로써 한 이벤트가 한 칸만 차지하도록 함
            eventLimit: 4,                                      // 달력 한 칸에 나타나는 이벤트 최대 개수

            dateClick: this._selectDate,                        // 달력의 날짜 부분 클릭 시 실행되는 함수
            eventClick: this._handleClickEvent,                 // 이벤트 클릭을 처리하는 함수
        }

        return (
            <FullCalendar {...props} ref={this.calendarRef} />
        )
    }
}


Calendar.propTypes = {
    category: PropTypes.string.isRequired,              // [Manage / Carpool] 어느 카테고리에 렌더링될 것인지

    totalOrMyOption: PropTypes.string.isRequired,       // 전체 일정 or 내 일정
    eventsObj: PropTypes.object.isRequired,             // 전체 카풀 이벤트 데이터

    initCalenderEvents: PropTypes.func.isRequired,      // 캘린더 첫 렌더 시 들어올 events 받는 액션
    selectedDate: PropTypes.object,                     // 캘린더에서 선택된 날짜 데이터
    selectDate: PropTypes.func.isRequired,              // 캘린더에서 날짜를 선택하는 메서드
    storeClickedEventData: PropTypes.func.isRequired,   // 이벤트를 클릭하는 이벤트를 핸들하는 액션
    openModalWindow: PropTypes.func,                    // Modal 창을 띄우는 메서드
}

export default Calendar;
