// '/market' url이 들어올 때, 처리하는 page 파일

import React from 'react';
import { Route } from 'react-router-dom';

import MarketContainer from "../containers/MarketContainer";
import MarketDetailContainer from '../containers/MarketDetailContainer';

const Market = () => {
    return (
        <div>
            <Route exact path='/market' component={MarketContainer}/>
            <Route path='/market/:id' component={MarketDetailContainer} />
        </div>
        
    )
}

export default Market;