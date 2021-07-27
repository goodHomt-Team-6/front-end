import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment";
import api from "../../shared/Request";
import axios from "axios";

// initial state
const initialState = {};

// actions
const SET_POST = "room/SET_POST";

// action creators
const setPost = createAction(SET_POST, (post) => ({ post }));

// middleware actions

// reducer
export default handleActions({

}, initialState
);

// actionsCreator export 
const actionCreators = {

};

export { actionCreators };