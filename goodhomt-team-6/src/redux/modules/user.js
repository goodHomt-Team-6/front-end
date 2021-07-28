import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import api from "../../shared/Request";
import axios from "axios";

// initialState
const initialState = {
  mylist: [],
};

// actions
const GET_MYEXERCISE = "GET_MYEXERCISE";

// action creators
const getMyExercise = createAction(GET_MYEXERCISE, (mylist) => ({ mylist }));

// 내가 등록한 운동 루틴 가져오기
const getMyExerciseAPI = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get("/exercises")
      .then((response) => {
        dispatch(getMyExercise(response.data));
      })
      .catch((error) => {
        console.log("나의 운동 루틴 가져오기 실패", error);
      });
  };
};

// reducer
export default handleActions(
  {
    [GET_MYEXERCISE]: (state, action) => produce(state, (draft) => {
      draft.mylist = action.payload.mylist;
    })
  }, initialState
);

// actionsCreator export 
const actionCreators = {
  getMyExerciseAPI,
};

export { actionCreators };