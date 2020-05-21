

import React from 'react';


export const addLineToString = (originStr) => {
    return originStr.split('\n').map( line => <span> {line} <br/> </span> )
}