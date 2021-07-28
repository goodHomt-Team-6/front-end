import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import api from "../../shared/Request";
import axios from "axios";

// initial state
const initialState = {
  exercise: [
    { exercise: "요가", cal: 140, category_id: "상체" },
    { exercise: "스쿼트", cal: 140, category_id: "하체" },
    { exercise: "런지", cal: 140, category_id: "하체" },
    { exercise: "레그레이즈", cal: 140, category_id: "하체" },
    { exercise: "스트레칭", cal: 140, category_id: "상체" },
    { exercise: "플랭크", cal: 140, category_id: "상체" },
    { exercise: "풀업", cal: 140, category_id: "상체" },
    { exercise: "계단오르기", cal: 140, category_id: "하체" },
  ]
};

// actions
const GET_EXERCISE = "GET_EXERCISE";
const ADD_EXERCISE = "ADD_EXERCISE";

// action creators
const getExercise = createAction(GET_EXERCISE, (exercise) => ({ exercise }));
const addExercise = createAction(ADD_EXERCISE, (exercise) => ({ exercise }));

// 운동 전체 가져오기
const getExerciseAPI = () => {
  return function (dispatch, getState, { history }) {
    api
      .get("/exercises")
      .then((response) => {
        dispatch(getExercise(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.log("운동 가져오기 실패", error);
      });
  };
};

// 운동 카테고리별 가져오기
const getExerciseTypeAPI = (category_id) => {
  return function (dispatch, getState, { history }) {
    api
      .get("/exercises/${category_id}")
      .then((response) => {
        dispatch(getExercise(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.log("운동 카테고리별 가져오기 실패", error);
      });
  };
};

// 운동루틴 등록하기
const addExerciseAPI = () => {
  return function (dispatch, getState, { history }) {
    api
      .post("/routines")
      .then((response) => {
        dispatch(addExercise(response.data));
        console.log("루틴 등록 성공");
      });
  };
};

// reducer
export default handleActions(
  {
    [GET_EXERCISE]: (state, action) => produce(state, (draft) => {
      draft.exercise = action.payload.exercise;
    }),
    [ADD_EXERCISE]: (state, action) => produce(state, (draft) => {
      draft.exercise.push(action.payload.exercise);
    })
  }, initialState
);

// actionsCreator export 
const actionCreators = {
  getExerciseAPI,
  getExerciseTypeAPI,
  addExerciseAPI,
};

export { actionCreators };