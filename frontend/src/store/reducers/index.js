import { combineReducers } from "redux";

import auth from "./auth";
import board from "./board";
import structure from "./structure";
import topic from './topic';

const reducers = combineReducers({
    auth, board, structure, topic 
})

export default reducers;