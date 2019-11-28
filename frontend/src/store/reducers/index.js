import { combineReducers } from "redux";

import auth from "./auth";
import board from "./board";
import structure from "./structure";
import topic from './topic';
import manage from './manage';

const reducers = combineReducers({
    auth, board, structure, topic, manage
})

export default reducers;