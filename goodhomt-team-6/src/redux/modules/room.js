import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import "moment";
import moment from "moment";
import instance from "../../shared/Request";
import axios from "axios";

// initial state
const initialState = {};

// actions
const SET_POST = "room/SET_POST";

// action creators
const setPost = createAction(SET_POST, (post) => ({ post }));

// middleware actions
const getOnePostServer = (id = null) => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`http://3.34.140.51:8088/api/posts/${id}`)
      .then(function (response) {
        console.log(response, "getOnePostServer");
        dispatch(setPost(response.data));
      })
      .catch(function (err) {
        console.log(err, "getOnePostError");
      });
  };
};

export { getOnePostServer };
