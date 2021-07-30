import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import moment from 'moment';
import api from '../../shared/Request';
import axios from 'axios';
import logger from '../../shared/Logger';

// initial state
const initialState = {
  openedRow: null,
  editor: false,
  exercise: [
    // { exercise: '요가', cal: 140, categoryId: '1', categoryName: '상체' },
    // { exercise: '스쿼트', cal: 140, categoryId: '1', categoryName: '상체' },
    // { exercise: '런지', cal: 140, categoryId: '1', categoryName: '상체' },
    // { exercise: '레그레이즈', cal: 140, categoryId: '2', categoryName: '하체' },
    // { exercise: '스트레칭', cal: 140, categoryId: '2', categoryName: '하체' },
    // { exercise: '플랭크', cal: 140, categoryId: '2', categoryName: '하체' },
    // { exercise: '풀업', cal: 140, categoryId: '2', categoryName: '하체' },
    // { exercise: '계단오르기', cal: 140, categoryId: '2', categoryName: '하체' },
  ],
  myExercise: [
    // {
    //   exerciseName: '벤치 프레스',
    //   set: [{
    //     type: 'exercise',
    //     count: 0,
    //     weight: 0,
    //   }]
    // }
  ],
  categoryTitle: [{ title: "전체" }, { title: "상체" }, { title: "하체" }]
};

// actions
const SET_POST = 'exercise/SET_POST';
const ADD_SET = 'exercise/ADD_SET';
const OPEN_ROW = 'exercise/OPEN_ROW';
const GET_EXERCISE = 'exercise/GET_EXERCISE';
const ADD_EXERCISE = 'exercise/ADD_EXERCISE';
const ADD_EXERCISE_TYPE = 'exercise/ADD_EXERCISE_TYPE';
const REMOVE_EXERCISE_TYPE = 'exercise/REMOVE_EXERCISE_TYPE';
const GET_EXERCISE_TYPE = 'exercise/GET_EXERCISE_TYPE';
const OPEN_EDITOR = 'exercise/OPEN_EDITOR';
const UPDATE_SET = 'exercise/UPDATE_SET';

// action creators
const setPost = createAction(SET_POST, (post) => ({ post }));
const addSet = createAction(ADD_SET, (listIdx) => ({ listIdx }));
const openRow = createAction(OPEN_ROW, (idx) => ({ idx }));
const getExercise = createAction(GET_EXERCISE, (exercise) => ({ exercise }));
const addExercise = createAction(ADD_EXERCISE, (exercise) => ({ exercise }));
const addExerciseType = createAction(ADD_EXERCISE_TYPE, (exercise) => ({
  exercise,
}));
const removeExerciseType = createAction(REMOVE_EXERCISE_TYPE, (exercise) => ({
  exercise,
}));
const openEditor = createAction(OPEN_EDITOR, (open) => ({
  open,
}));
const updateSet = createAction(UPDATE_SET, (set, idxes) => ({
  set,
  idxes,
}));

// 운동 전체 가져오기
const getExerciseAPI = () => {
  return function (dispatch, getState, { history }) {
    api
      .get('/exercises')
      .then((response) => {
        dispatch(getExercise(response.data));
      })
      .catch((error) => {
        console.log('운동 가져오기 실패', error);
      });
  };
};

// 운동 카테고리별 가져오기
const getExerciseTypeAPI = (category_id) => {
  return function (dispatch, getState, { history }) {
    api
      .get('/exercises/${category_id}')
      .then((response) => {
        dispatch(getExercise(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.log('운동 카테고리별 가져오기 실패', error);
      });
  };
};

// 운동루틴 등록하기
const addExerciseAPI = () => {
  return function (dispatch, getState, { history }) {
    api.post('/routines').then((response) => {
      dispatch(addExercise(response.data));
      console.log('루틴 등록 성공');
    });
  };
};

// reducer
export default handleActions(
  {
    [GET_EXERCISE]: (state, action) =>
      produce(state, (draft) => {
        draft.exercise = action.payload.exercise;
        console.log(draft.exercise);
      }),
    [ADD_EXERCISE]: (state, action) =>
      produce(state, (draft) => {
        draft.exercise.push(action.payload.exercise);
      }),
    [ADD_EXERCISE_TYPE]: (state, action) =>
      produce(state, (draft) => {
        draft.myExercise.push(action.payload.exercise);
      }),
    [REMOVE_EXERCISE_TYPE]: (state, action) =>
      produce(state, (draft) => {
        let index = draft.myExercise.findIndex(
          (e) => e.exerciseName === action.payload.exercise,
        );
        draft.myExercise.splice(index, 1);
      }),
    [ADD_SET]: (state, action) =>
      produce(state, (draft) => {
        const list = draft.myExercise[action.payload.listIdx];
        list.set.push({
          type: 'exercise',
          weight: 0,
          count: 0,
        });
      }),
    [OPEN_ROW]: (state, action) =>
      produce(state, (draft) => {
        draft.openedRow = action.payload.idx;
      }),
    [OPEN_EDITOR]: (state, action) =>
      produce(state, (draft) => {
        draft.editor = action.payload.open;
      }),
    [UPDATE_SET]: (state, action) =>
      produce(state, (draft) => {
        const list = draft.myExercise[action.payload.idxes.listIdx];
        list.set[action.payload.idxes.setIdx].weight =
          action.payload.set.weight;
        list.set[action.payload.idxes.setIdx].count = action.payload.set.count;
      }),
  },
  initialState,
);

// actionsCreator export
const actionCreators = {
  getExerciseAPI,
  getExerciseTypeAPI,
  addExerciseAPI,
  addSet,
  openRow,
  addExerciseType,
  removeExerciseType,
  openEditor,
  updateSet,
};

export { actionCreators };
