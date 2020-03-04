import { combineReducers } from "redux";

import auth from "./auth";
import board from "./board";
import topic from './topic';
import manage from './manage';

const reducers = combineReducers({
    auth, board, topic, manage
})

export default reducers;