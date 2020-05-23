

import React from 'react';
import moment from "moment";


export const addLineToString = (originStr) => {
    return originStr.split('\n').map( line => <span> {line} <br/> </span> )
}

/* dateStr => YYYY년 MM월 DD일 HH시 mm분 */
export const formatDateStrToFullDateTime = dateStr => moment(dateStr).format('YYYY년 MM월 DD일 HH시 mm분')