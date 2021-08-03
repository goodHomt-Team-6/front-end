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
  exercise: [],
  categoryNames: [],
  categoryItems: [],
  selectedItems: [],
  selectButtonHandle: false,
  openModal: false,
  routineName: null,
  myExercise: [
    // {
    //   exerciseName: '벤치 프레스',
    //   set: [
    //     {
    //       type: 'exercise',
    //       count: 0,
    //       weight: 0,
    //       setCount: 1,
    //     },
    //     {
    //       type: 'break',
    //       minutes: 0,
    //       seconds: 0,
    //     },
    //   ],
    // },
  ],
  categoryTitle: [{ title: '전체' }, { title: '상체' }, { title: '하체' }],
};

// actions
const SET_POST = 'exercise/SET_POST';
const ADD_SET = 'exercise/ADD_SET';
const ADD_BREAK = 'exercise/ADD_BREAK';
const OPEN_ROW = 'exercise/OPEN_ROW';
const GET_EXERCISE = 'exercise/GET_EXERCISE';
const ADD_EXERCISE = 'exercise/ADD_EXERCISE';
const ADD_EXERCISE_TYPE = 'exercise/ADD_EXERCISE_TYPE';
const REMOVE_EXERCISE_TYPE = 'exercise/REMOVE_EXERCISE_TYPE';
const GET_EXERCISE_TYPE = 'exercise/GET_EXERCISE_TYPE';
const REMOVE_EXERCISE_LIST = 'exercise/REMOVE_EXERCISE_LIST';

const ADD_EXERCISE_ITEM = 'exercise/ADD_EXERCISE_ITEM';
const REMOVE_EXERCISE_ITEM = 'exercise/REMOVE_EXERCISE_ITEM';

const OPEN_EDITOR = 'exercise/OPEN_EDITOR';
const UPDATE_SET = 'exercise/UPDATE_SET';
const UPDATE_TIME = 'exercise/UPDATE_TIME';
const DELETE_SET = 'exercise/DELETE_SET';

const SELECT_BUTTON_HANDLE = 'exercise/SELECT_BUTTON_HANDLE';
const REARRANGE_MY_EXERCISE = 'exercise/REARRANGE_MY_EXERCISE';
const OPEN_MODAL = 'exercise/OPEN_MODAL';
const SET_ROUTINE_NAME = 'exercise/SET_ROUTINE_NAME';
const INITIALIZE_SELECTED_ITEMS = 'exercise/INITIALIZE_SELECTED_ITEMS';

// action creators
const setPost = createAction(SET_POST, (post) => ({ post }));
const addSet = createAction(ADD_SET, (listIdx) => ({ listIdx }));
const addBreak = createAction(ADD_BREAK, (listIdx) => ({ listIdx }));
const openRow = createAction(OPEN_ROW, (idx) => ({ idx }));
const getExercise = createAction(GET_EXERCISE, (exercise) => ({ exercise }));
const getExerciseType = createAction(GET_EXERCISE_TYPE, (categoryItems) => ({
  categoryItems,
}));
const addExercise = createAction(ADD_EXERCISE, (exercise) => ({ exercise }));
const removeExerciseList = createAction(
  REMOVE_EXERCISE_LIST,
  (categoryItems) => ({ categoryItems }),
);
const addExerciseItem = createAction(ADD_EXERCISE_ITEM, (selectedItems) => ({
  selectedItems,
}));
const removeExerciseItem = createAction(
  REMOVE_EXERCISE_ITEM,
  (selectedItems) => ({ selectedItems }),
);
const selectButtonHandle = createAction(
  SELECT_BUTTON_HANDLE,
  (handleClick) => ({
    handleClick,
  }),
);
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
const updateTime = createAction(UPDATE_TIME, (time, idxes) => ({
  time,
  idxes,
}));
const deleteSet = createAction(DELETE_SET, (idxes) => ({
  idxes,
}));
const reArrangeMyExercise = createAction(REARRANGE_MY_EXERCISE, (lists) => ({
  lists,
}));
const openModal = createAction(OPEN_MODAL, (value) => ({
  value,
}));
const setRoutineName = createAction(SET_ROUTINE_NAME, (routineName) => ({
  routineName,
}));
const initializeSectedItems = createAction(
  INITIALIZE_SELECTED_ITEMS,
  () => ({}),
);

// 운동 전체 가져오기
const getExerciseAPI = () => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/exercises`)
      .then((response) => {
        dispatch(getExercise(response.data.result));
      })
      .catch((error) => {
        console.log('운동 가져오기 실패', error);
      });
  };
};

// 운동 카테고리별 가져오기
const getExerciseTypeAPI = (id) => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/exercises/${id}`)
      .then((response) => {
        const subExercise = response.data.result;
        const newnewArr = [];
        const newArr = subExercise.forEach((element) => {
          newnewArr.push(element.exerciseList);
        });
        dispatch(getExerciseType(response.data.result[0]));
      })
      .catch((error) => {
        console.log('운동 카테고리별 가져오기 실패', error);
      });
  };
};

// 운동루틴 등록하기
const addRoutineAPI = (routine) => {
  return function (dispatch, getState, { history }) {
    api.post('/routines', routine).then((response) => {
      // 리덕스를 초기화 해주기 위해 함수를 재활용함. 네이밍과 헷갈리지 말것.
      dispatch(reArrangeMyExercise([]));
      dispatch(initializeSectedItems());
      history.replace('/');
    });
  };
};

// reducer
export default handleActions(
  {
    [GET_EXERCISE]: (state, action) =>
      produce(state, (draft) => {
        draft.exercise = action.payload.exercise;
        draft.categoryNames = action.payload.exercise;
      }),
    [ADD_EXERCISE]: (state, action) =>
      produce(state, (draft) => {
        draft.exercise.push(action.payload.exercise);
      }),
    [ADD_EXERCISE_TYPE]: (state, action) =>
      produce(state, (draft) => {
        draft.myExercise.push(action.payload.exercise);
      }),
    [GET_EXERCISE_TYPE]: (state, action) =>
      produce(state, (draft) => {
        draft.categoryItems = action.payload.categoryItems;
        // 여기서 위에 있으면 걸러주기 (filter이용) 상체 클릭했을때 위에 있는 요소면 빼고 가져온다.
        // draft.categoryItems = action.payload.categoryItems.exerciseList.filter(item => !draft.selectedItems.includes(item));
        // console.log(draft.categoryItems);
      }),
    [REMOVE_EXERCISE_TYPE]: (state, action) =>
      produce(state, (draft) => {
        let index = draft.myExercise.findIndex(
          (e) => e.exerciseName === action.payload.exercise,
        );
        draft.myExercise.splice(index, 1);
      }),
    // 하위 항목 클릭시 화면에서 제거
    [REMOVE_EXERCISE_LIST]: (state, action) =>
      produce(state, (draft) => {
        let index = draft.categoryItems.exerciseList.findIndex(
          (item) => item.id === action.payload.categoryItems.id,
        );
        draft.categoryItems.exerciseList.splice(index, 1);
      }),
    // 하위 항목 클릭시 화면 상단에 추가
    [ADD_EXERCISE_ITEM]: (state, action) =>
      produce(state, (draft) => {
        draft.selectedItems.push(action.payload.selectedItems);
      }),
    // 화면 상단에서 삭제
    [REMOVE_EXERCISE_ITEM]: (state, action) =>
      produce(state, (draft) => {
        let index = draft.selectedItems.findIndex(
          (item) => item.id === action.payload.selectedItems.id,
        );
        let testArr = draft.selectedItems.splice(index, 1);
        draft.selectedItems;
      }),
    // 버튼 활성화, 비활성화
    [SELECT_BUTTON_HANDLE]: (state, action) =>
      produce(state, (draft) => {
        draft.selectButtonHandle = action.payload.selectButtonHandle;
      }),
    [ADD_SET]: (state, action) =>
      produce(state, (draft) => {
        const list = draft.myExercise[action.payload.listIdx];
        const setCount = list.set.reduce(
          (cnt, elem) => cnt + ('exercise' === elem.type),
          1,
        );
        list.set.push({
          type: 'exercise',
          weight: 0,
          count: 0,
          setCount: setCount,
        });
      }),
    [ADD_BREAK]: (state, action) =>
      produce(state, (draft) => {
        const list = draft.myExercise[action.payload.listIdx];
        list.set.push({
          type: 'break',
          minutes: 0,
          seconds: 0,
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
    [UPDATE_TIME]: (state, action) =>
      produce(state, (draft) => {
        const list = draft.myExercise[action.payload.idxes.listIdx];
        list.set[action.payload.idxes.setIdx] = {
          ...list.set[action.payload.idxes.setIdx],
          ...action.payload.time,
        };
      }),
    [DELETE_SET]: (state, action) =>
      produce(state, (draft) => {
        draft.myExercise[action.payload.idxes.listIdx].set = draft.myExercise[
          action.payload.idxes.listIdx
        ].set.filter((elem, idx) => {
          return idx != action.payload.idxes.setIdx;
        });
        let count = 1;
        draft.myExercise[action.payload.idxes.listIdx].set.map((set, idx) => {
          if (set.type === 'exercise') {
            set.setCount = count;
            count += 1;
          }
        });
      }),
    [REARRANGE_MY_EXERCISE]: (state, action) =>
      produce(state, (draft) => {
        draft.myExercise = action.payload.lists;
      }),
    [OPEN_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.openModal = action.payload.value;
      }),
    [SET_ROUTINE_NAME]: (state, action) =>
      produce(state, (draft) => {
        draft.routineName = action.payload.routineName;
      }),
    [INITIALIZE_SELECTED_ITEMS]: (state, action) =>
      produce(state, (draft) => {
        draft.selectedItems = [];
      }),
  },
  initialState,
);

// actionsCreator export
const actionCreators = {
  getExerciseAPI,
  getExerciseTypeAPI,
  addRoutineAPI,
  addSet,
  addBreak,
  openRow,
  addExerciseType,
  removeExerciseType,
  removeExerciseList,
  addExerciseItem,
  removeExerciseItem,
  openEditor,
  updateSet,
  deleteSet,
  updateTime,
  selectButtonHandle,
  reArrangeMyExercise,
  openModal,
  setRoutineName,
};

export { actionCreators };
