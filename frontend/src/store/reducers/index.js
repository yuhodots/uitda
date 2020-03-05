import { combineReducers } from "redux";

import auth from "./auth";
import board from "./board";
import topic from './topic';
import manage from './manage';
import carpool from './carpool'

const reducers = combineReducers({
    auth, board, topic, manage, carpool
})

export default reducers;