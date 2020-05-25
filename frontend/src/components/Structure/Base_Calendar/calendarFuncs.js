

import { 
    TOTAL, CLOSED, ACTIVE, OWNER, GUEST, OWNER_CLOSED, GUEST_CLOSED 
} from '../../../constants/calendar_consts'
import { colors } from "../../../styles/variables";


/* 백엔드에서 받은 이벤트 객체를 calendar render view 데이터로 변형하는 함수 */
export const dataObjToViewObjList = (eventsObj, totalOrMyOption) => {
    /* C,A,O,G로 구분된 객체를 하나의 array로 변환 */
    const eventList = [...eventsObj.C, ...eventsObj.A, ...eventsObj.O, ...eventsObj.G];

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


/* Date => yyyy-mm-dd */
export const dateToStr = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1 ;
    let dd = date.getDate();

    if ( mm < 10 ) { mm = `0${mm}` }
    if ( dd < 10 ) { dd = `0${dd}` }

    return `${yyyy}-${mm}-${dd}`;
}