import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import api from '../../shared/Request';
import logger from '../../shared/Logger';
import _ from 'lodash';

// initial state
const initialState = {
  openedRow: null,
  editor: false,
  exercise: [],
  categoryItems: [],
  selectedItems: [],
  selectedPrevItem: {},
  is_selected: false,
  openModal: false,
  selectPeriod: null,
  currentSetIdx: 0,
  currentExerciseIdx: 0,
  routine: [
    {
      routineTime: 0,
      rating: null,
      is_bookmarked: false,
      is_completed: false,
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
    },
  ],
  categoryTitle: [
    {
      id: 1,
      categoryName: '상체',
    },
    {
      id: 2,
      categoryName: '하체',
    },
    {
      id: 3,
      categoryName: '기타',
    },
  ],
  myTodayRoutine: null,
};

// actions
const ADD_SET = 'exercise/ADD_SET';
const ADD_BREAK = 'exercise/ADD_BREAK';
const OPEN_ROW = 'exercise/OPEN_ROW';

const GET_EXERCISE = 'exercise/GET_EXERCISE';
const ADD_EXERCISE = 'exercise/ADD_EXERCISE';
const ADD_EXERCISE_TYPE = 'exercise/ADD_EXERCISE_TYPE';
const REMOVE_EXERCISE_TYPE = 'exercise/REMOVE_EXERCISE_TYPE';
const GET_EXERCISE_TYPE = 'exercise/GET_EXERCISE_TYPE';

const ADD_SELECTED_ITEM = 'exercise/ADD_SELECTED_ITEM';
const REMOVE_SELECTED_ITEM = 'exercise/REMOVE_SELECTED_ITEM';

const OPEN_EDITOR = 'exercise/OPEN_EDITOR';
const UPDATE_SET = 'exercise/UPDATE_SET';
const UPDATE_TIME = 'exercise/UPDATE_TIME';
const DELETE_SET = 'exercise/DELETE_SET';

const REARRANGE_MY_EXERCISE = 'exercise/REARRANGE_MY_EXERCISE';
const OPEN_MODAL = 'exercise/OPEN_MODAL';
const SET_ROUTINE_NAME = 'exercise/SET_ROUTINE_NAME';
const INITIALIZE_SELECTED_ITEMS = 'exercise/INITIALIZE_SELECTED_ITEMS';

const GET_MY_ROUTINE = 'exercise/GET_MY_ROUTINE';
const GET_MY_TODAY_ROUTINE = 'exercise/GET_MY_TODAY_ROUTINE';
const DELETE_MY_TODAY_ROUTINE = 'exercise/DELETE_MY_TODAY_ROUTINE';
const SELECT_PERIOD = 'exercise/SELECT_PERIOD';
const IS_SELECTED = 'exercise/IS_SELECTED';
const ADD_SELECTED_PREV_ITEM = 'exercise/ADD_SELECTED_PREV_ITEM';
const REMOVE_SELECTED_PREV_ITEM = 'exercise/REMOVE_SELECTED_PREV_ITEM';
const GET_SELECTED_PREV_ITEM = 'exercise/GET_SELECTED_PREV_ITEM';
const INITIALIZE_ROUTINE = 'exercise/INITIALIZE_ROUTINE';

const COUNT_CURRENT_SET_IDX = 'exercise/COUNT_CURRENT_SET_IDX';
const COUNT_CURRENT_EXERCISE_IDX = 'exercise/COUNT_CURRENT_EXERCISE_IDX';

// action creators
const addSet = createAction(ADD_SET, (listIdx) => ({ listIdx }));
const addBreak = createAction(ADD_BREAK, (listIdx) => ({ listIdx }));
const openRow = createAction(OPEN_ROW, (idx) => ({ idx }));
const getExercise = createAction(GET_EXERCISE, (exercise) => ({ exercise }));
const getExerciseType = createAction(GET_EXERCISE_TYPE, (categoryItems) => ({
  categoryItems,
}));
const addExercise = createAction(ADD_EXERCISE, (exercise) => ({ exercise }));
const addSelectedItem = createAction(ADD_SELECTED_ITEM, (selectedItems) => ({
  selectedItems,
}));
const removeSelectedItem = createAction(
  REMOVE_SELECTED_ITEM,
  (selectedItems) => ({ selectedItems }),
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
const is_selected = createAction(IS_SELECTED, (is_selected) => ({
  is_selected,
}));
const getMyRoutine = createAction(GET_MY_ROUTINE, (routine) => ({ routine }));
const getMyTodayRoutine = createAction(
  GET_MY_TODAY_ROUTINE,
  (myTodayRoutine) => ({ myTodayRoutine }),
);
const deleteMyTodayRoutine = createAction(
  DELETE_MY_TODAY_ROUTINE,
  (routineId) => ({ routineId }),
);
const selectPeriod = createAction(SELECT_PERIOD, (selectPeriod) => ({
  selectPeriod,
}));
const addSelectedPrevItem = createAction(
  ADD_SELECTED_PREV_ITEM,
  (selectedPrevItem) => ({ selectedPrevItem }),
);
const removeSelectedPrevItem = createAction(
  REMOVE_SELECTED_PREV_ITEM,
  (selectedPrevItem) => ({ selectedPrevItem }),
);
const getSelectedPrevItem = createAction(
  GET_SELECTED_PREV_ITEM,
  (selectedPrevItem) => ({ selectedPrevItem }),
);
const initializeRoutine = createAction(INITIALIZE_ROUTINE, () => ({}));
const countCurrentSetIdx = createAction(COUNT_CURRENT_SET_IDX, (count) => ({
  count,
}));
const countCurrentExerciseIdx = createAction(
  COUNT_CURRENT_EXERCISE_IDX,
  (count) => ({
    count,
  }),
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
        logger('운동 가져오기 실패', error);
      });
  };
};

// 운동 카테고리별 가져오기
const getExerciseTypeAPI = (id) => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/exercises/${id}`)
      .then((response) => {
        dispatch(getExerciseType(response.data.result[0]));
      })
      .catch((error) => {
        logger('운동 카테고리별 가져오기 실패', error);
      });
  };
};

// 운동루틴 등록하기
const addRoutineAPI = (routine) => {
  return function (dispatch, getState, { history }) {
    api
      .post('/routines', routine)
      .then((response) => {
        // 리덕스를 초기화 해주기 위해 함수를 재활용함. 네이밍과 헷갈리지 말것.
        dispatch(reArrangeMyExercise([]));
        dispatch(initializeSectedItems());
        history.replace('/');
      })
      .catch((error) => {
        logger('운동 루틴 등록하기 실패', error);
      });
  };
};

// 순서 변경한 운동루틴 등록하기
const addEditedRoutineAPI = (routine) => {
  return function (dispatch, getState, { history }) {
    api
      .post('/routines', routine)
      .then((response) => {
        history.replace('/');
      })
      .catch((error) => {
        logger('운동 루틴 등록하기 실패', error);
      });
  };
};

// 나의 오늘 루틴 가져오기
const getMyTodayRoutineAPI = (todayDate) => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/routines?date=${todayDate}`)
      .then((response) => {
        dispatch(getMyTodayRoutine(response.data.result));
        logger('나의 오늘 루틴 가져오기 성공');
      })
      .catch((error) => {
        logger('나의 오늘 루틴 가져오기 실패', error);
      });
  };
};

// 나의 오늘 루틴 삭제하기
const deleteMyTodayRoutineAPI = (routineId) => {
  return function (dispatch, getState, { history }) {
    api
      .delete(`/routines/${routineId}`)
      .then((response) => {
        logger('나의 오늘 루틴 삭제 성공');
        dispatch(deleteMyTodayRoutine(routineId));
      })
      .catch((error) => {
        logger('나의 오늘 루틴 삭제 실패', error);
      });
  };
};

// 나의 전체기간 루틴 가져오기 (이전목록불러오기)
const getAllRoutineAPI = () => {
  return function (dispatch, getState, { history }) {
    api
      .get('/routines')
      .then((response) => {
        dispatch(getMyRoutine(response.data.result));
        logger('나의 전체 기간 루틴 가져오기 성공', response.data.result);
      })
      .catch((error) => {
        logger('나의 전체 기간 루틴 가져오기 실패', error);
      });
  };
};

// 나의 하루 전 루틴 가져오기 (이전목록불러오기)
const getDayAgoRoutineAPI = () => {
  return function (dispatch, getState, { history }) {
    api
      .get('/routines?sorting=day')
      .then((response) => {
        dispatch(getMyRoutine(response.data.result));
        logger('나의 하루 전 루틴 가져오기 성공', response.data);
      })
      .catch((error) => {
        logger('나의 하루 전 루틴 가져오기 실패', error);
      });
  };
};

// 나의 일주일 전 루틴 가져오기 (이전목록불러오기)
const getWeekAgoRoutineAPI = () => {
  return function (dispatch, getState, { history }) {
    api
      .get('/routines?sorting=week')
      .then((response) => {
        dispatch(getMyRoutine(response.data.result));
        logger('나의 일주일 전 루틴 가져오기 성공', response.data);
      })
      .catch((error) => {
        logger('나의 일주일 전 루틴 가져오기 실패', error);
      });
  };
};

// 나의 한달 전 루틴 가져오기 (이전목록불러오기)
const getMonthAgoRoutineAPI = () => {
  return function (dispatch, getState, { history }) {
    api
      .get('/routines?sorting=month')
      .then((response) => {
        dispatch(getMyRoutine(response.data.result));
        logger('나의 한달 전 루틴 가져오기 성공', response.data);
      })
      .catch((error) => {
        logger('나의 한달 전 루틴 가져오기 실패', error);
      });
  };
};

// 북마크된 루틴목록 가져오기 (이전목록불러오기)
const getBookmarkRoutineAPI = () => {
  return function (dispatch, getState, { history }) {
    api
      .get('/routines?sorting=bookmark')
      .then((response) => {
        dispatch(getMyRoutine(response.data.result));
        logger('북마크된 루틴 목록 가져오기 성공');
      })
      .catch((error) => {
        logger('북마크된 루틴 목록 가져오기 실패', error);
      });
  };
};

// 루틴 상세 가져오기
const getRoutineDetailAPI = (id) => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/routines/${id}`)
      .then((response) => {
        dispatch(getMyRoutine(response.data.result));
      })
      .catch((error) => {
        logger('루틴 상세 가져오기 실패', error);
      });
  };
};

// 루틴 상세설정 - 북마크, 루틴이름 변경
const reArrangeRoutineDetailAPI = (reArrangeDetial) => {
  return function (dispatch, getState, { history }) {
    api
      .patch('/routines/bookmark', reArrangeDetial)
      .then((response) => {
        logger('북마크 설정, 루틴 이름 변경 성공');
        dispatch(getRoutineDetailAPI(response.data.routineId));
      })
      .catch((error) => {
        logger('북마크 설정, 루틴 이름 변경 실패', error);
      });
  };
};

// 운동 완료 결과 모달 - 기록하기 버튼
const recordResultAPI = (result) => {
  return function (dispatch, getState, { history }) {
    api
      .patch('/routines/result', result)
      .then((response) => {
        history.replace('/');
      })
      .catch((error) => {
        logger('운동 완료 결과 모달 - 기록하기 버튼 실패', error);
      });
  };
};

// reducer
export default handleActions(
  {
    [GET_EXERCISE]: (state, action) =>
      produce(state, (draft) => {
        if (state.selectedItems.length === 0) {
          draft.exercise = action.payload.exercise;
        } else if (state.exercise) {
          // 선택한 항목이 있을 경우 운동 항목 걸러서 가져오기
          let currentExerciseItems = action.payload.exercise;
          let currentSelectedItems = state.selectedItems;
          let leftOverExerciseItems = _.differenceBy(
            currentExerciseItems,
            currentSelectedItems,
            'id',
          );
          draft.exercise = leftOverExerciseItems;
        }
      }),
    [ADD_EXERCISE]: (state, action) =>
      produce(state, (draft) => {
        if (draft.exercise) {
          draft.exercise.push(action.payload.exercise);
        }
      }),
    [GET_EXERCISE_TYPE]: (state, action) =>
      produce(state, (draft) => {
        if (state.selectedItems.length === 0) {
          draft.categoryItems = action.payload.categoryItems.exerciseList;
        } else if (state.categoryItems) {
          // 선택한 항목이 있을 경우 운동 항목 걸러서 가져오기
          let currentCategoryItems = action.payload.categoryItems.exerciseList;
          let currentSelectedItems = state.selectedItems;
          let leftOverCategoryItems = _.differenceBy(
            currentCategoryItems,
            currentSelectedItems,
            'id',
          );
          draft.categoryItems = leftOverCategoryItems;
        }
      }),
    // 내가 선택한 종목에 추가
    [ADD_EXERCISE_TYPE]: (state, action) =>
      produce(state, (draft) => {
        draft.routine[0].myExercise.push(action.payload.exercise);
      }),
    // 내가 선택한 종목에서 제거
    [REMOVE_EXERCISE_TYPE]: (state, action) =>
      produce(state, (draft) => {
        let index = draft.routine[0].myExercise.findIndex(
          (e) => e.exerciseName === action.payload.exercise.exerciseName,
        );
        draft.routine[0].myExercise.splice(index, 1);
      }),
    // 화면 상단에 추가
    [ADD_SELECTED_ITEM]: (state, action) =>
      produce(state, (draft) => {
        draft.selectedItems.push(action.payload.selectedItems);
      }),
    // 화면 상단에서 삭제
    [REMOVE_SELECTED_ITEM]: (state, action) =>
      produce(state, (draft) => {
        let index = draft.selectedItems.findIndex(
          (item) =>
            item.exerciseName === action.payload.selectedItems.exerciseName,
        );
        draft.selectedItems.splice(index, 1);
      }),
    [ADD_SET]: (state, action) =>
      produce(state, (draft) => {
        const list = draft.routine[0].myExercise[action.payload.listIdx];
        const setCount = list.set.reduce(
          (cnt, elem) => cnt + ('exercise' === elem.type),
          1,
        );
        logger(state);
        list.set.push({
          type: 'exercise',
          weight: list.set[0].weight,
          count: list.set[0].count,
          setCount: setCount,
        });
      }),
    [ADD_BREAK]: (state, action) =>
      produce(state, (draft) => {
        const list = draft.routine[0].myExercise[action.payload.listIdx];
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
        const list = draft.routine[0].myExercise[action.payload.idxes.listIdx];
        list.set[action.payload.idxes.setIdx].weight =
          action.payload.set.weight;
        list.set[action.payload.idxes.setIdx].count = action.payload.set.count;
      }),
    [UPDATE_TIME]: (state, action) =>
      produce(state, (draft) => {
        const list = draft.routine[0].myExercise[action.payload.idxes.listIdx];
        list.set[action.payload.idxes.setIdx] = {
          ...list.set[action.payload.idxes.setIdx],
          ...action.payload.time,
        };
      }),
    [DELETE_SET]: (state, action) =>
      produce(state, (draft) => {
        draft.routine[0].myExercise[action.payload.idxes.listIdx].set =
          draft.routine[0].myExercise[action.payload.idxes.listIdx].set.filter(
            (elem, idx) => {
              return idx != action.payload.idxes.setIdx;
            },
          );
        let count = 1;
        draft.routine[0].myExercise[action.payload.idxes.listIdx].set.map(
          (set, idx) => {
            if (set.type === 'exercise') {
              set.setCount = count;
              count += 1;
            }
          },
        );
      }),
    [REARRANGE_MY_EXERCISE]: (state, action) =>
      produce(state, (draft) => {
        if (state.routine[0]) {
          draft.routine[0].myExercise = action.payload.lists;
        }
        draft.selectedPrevItem.myExercise = action.payload.lists;
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
    // 루틴 가져오기
    [GET_MY_ROUTINE]: (state, action) =>
      produce(state, (draft) => {
        draft.routine = action.payload.routine;
      }),
    // 오늘 저장한 루틴 가져오기
    [GET_MY_TODAY_ROUTINE]: (state, action) =>
      produce(state, (draft) => {
        draft.myTodayRoutine = action.payload.myTodayRoutine;
      }),
    // 오늘 저장한 루틴 삭제하기
    [DELETE_MY_TODAY_ROUTINE]: (state, action) =>
      produce(state, (draft) => {
        // 걸러서 삭제하는 것으로 변경
        if (state.myTodayRoutine.length === 1) {
          draft.myTodayRoutine = [];
        } else {
          const deletedMyTodayRoutine = state.myTodayRoutine.filter(
            (item) => item.id !== action.payload.routineId,
          );
          draft.myTodayRoutine = deletedMyTodayRoutine;
        }
      }),
    // 기간 선택하기
    [SELECT_PERIOD]: (state, action) =>
      produce(state, (draft) => {
        draft.selectPeriod = action.payload.selectPeriod;
      }),
    [IS_SELECTED]: (state, action) =>
      produce(state, (draft) => {
        draft.is_selected = action.payload.is_selected;
      }),
    [ADD_SELECTED_PREV_ITEM]: (state, action) =>
      produce(state, (draft) => {
        draft.selectedPrevItem = action.payload.selectedPrevItem;
      }),
    [REMOVE_SELECTED_PREV_ITEM]: (state, action) =>
      produce(state, (draft) => {
        draft.selectedPrevItem.pop(action.payload.selectedPrevItem);
      }),
    [GET_SELECTED_PREV_ITEM]: (state, action) =>
      produce(state, (draft) => {
        draft.selectedPrevItem = action.payload.selectedPrevItem;
      }),
    [INITIALIZE_ROUTINE]: (state, action) =>
      produce(state, (draft) => {
        draft.routine = initialState.routine;
      }),
    [COUNT_CURRENT_SET_IDX]: (state, action) =>
      produce(state, (draft) => {
        draft.currentSetIdx = action.payload.count;
      }),
    [COUNT_CURRENT_EXERCISE_IDX]: (state, action) =>
      produce(state, (draft) => {
        draft.currentExerciseIdx = action.payload.count;
      }),
  },
  initialState,
);

// actionsCreator export
const actionCreators = {
  getExerciseAPI,
  getExerciseTypeAPI,
  addRoutineAPI,
  getMyTodayRoutineAPI,
  deleteMyTodayRoutineAPI,
  getAllRoutineAPI,
  getDayAgoRoutineAPI,
  getWeekAgoRoutineAPI,
  getMonthAgoRoutineAPI,
  getRoutineDetailAPI,
  reArrangeRoutineDetailAPI,
  getBookmarkRoutineAPI,
  recordResultAPI,
  addEditedRoutineAPI,
  addSet,
  addBreak,
  openRow,
  addExerciseType,
  removeExerciseType,
  addSelectedItem,
  removeSelectedItem,
  openEditor,
  updateSet,
  deleteSet,
  updateTime,
  reArrangeMyExercise,
  openModal,
  setRoutineName,
  selectPeriod,
  getMyRoutine,
  getMyTodayRoutine,
  is_selected,
  addSelectedPrevItem,
  removeSelectedPrevItem,
  getSelectedPrevItem,
  initializeRoutine,
  initializeSectedItems,
  countCurrentSetIdx,
  countCurrentExerciseIdx,
};

export { actionCreators };
