// '/network' url이 들어올 때, 처리하는 page 파일

import React from 'react';
import { Route } from 'react-router-dom';

import NetworkContainer from "../containers/NetworkContainer";
import NetworkDetailContainer from '../containers/NetworkDetailContainer';

const Network = () => {
    return (
        <div>
            <Route exact path='/Network' component={NetworkContainer}/>
            <Route path='/Network/:id' component={NetworkDetailContainer} />
        </div>
        
    )
}

export default Network;