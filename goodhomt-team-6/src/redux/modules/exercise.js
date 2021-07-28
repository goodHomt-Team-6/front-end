import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import moment from 'moment';
import api from '../../shared/Request';
import axios from 'axios';
import logger from '../../shared/Logger';

// initial state
const initialState = {
  openedRow: null,
  exercise: [
    { exercise: "요가", cal: 140, category_id: "상체" },
    { exercise: "스쿼트", cal: 140, category_id: "하체" },
    { exercise: "런지", cal: 140, category_id: "하체" },
    { exercise: "레그레이즈", cal: 140, category_id: "하체" },
    { exercise: "스트레칭", cal: 140, category_id: "상체" },
    { exercise: "플랭크", cal: 140, category_id: "상체" },
    { exercise: "풀업", cal: 140, category_id: "상체" },
    { exercise: "계단오르기", cal: 140, category_id: "하체" },
  ],
  myExercise: [
    {
      exerciseName: '벤치 프레스',
      set: [
        {
          type: 'exercise',
          count: 2,
          weight: 20,
        },
        {
          type: 'exercise',
          count: 3,
          weight: 30,
        },
        {
          type: 'break',
          time: 60,
        },
      ],
    },
    {
      exerciseName: '스쿼트',
      set: [
        {
          type: 'exercise',
          count: 3,
          weight: 50,
        },
        {
          type: 'break',
          time: 60,
        },
      ],
    },
  ],
};

// actions
const SET_POST = 'exercise/SET_POST';
const ADD_SET = 'exercise/ADD_SET';
const OPEN_ROW = 'exercise/OPEN_ROW';
const GET_EXERCISE = "exercise/GET_EXERCISE";
const ADD_EXERCISE = "exercise/ADD_EXERCISE";

// action creators
const setPost = createAction(SET_POST, (post) => ({ post }));
const addSetData = createAction(ADD_SET, (idx, set) => ({ idx, set }));
const openRow = createAction(OPEN_ROW, (idx) => ({ idx }));
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
    }),
    [ADD_SET]: (state, action) =>
      produce(state, (draft) => {
        logger(action.payload.idx);
        // draft.exercises[action.payload.idx].push({
        //   set: '1',
        //   weight: '',
        //   count: '',
        // });
      }),
    [OPEN_ROW]: (state, action) =>
      produce(state, (draft) => {
        draft.openedRow = action.payload.idx;
      }),
  }, initialState
);

// actionsCreator export 
const actionCreators = {
  getExerciseAPI,
  getExerciseTypeAPI,
  addExerciseAPI,
  addSetData,
  openRow,
};

export { actionCreators };
