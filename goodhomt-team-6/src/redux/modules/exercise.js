import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import moment from 'moment';
import api from '../../shared/Request';
import axios from 'axios';
import logger from '../../shared/Logger';

// initial state
const initialState = {
  openedRow: null,
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

// action creators
const setPost = createAction(SET_POST, (post) => ({ post }));
const addSetData = createAction(ADD_SET, (idx, set) => ({ idx, set }));
const openRow = createAction(OPEN_ROW, (idx) => ({ idx }));

// middleware actions

// reducer
export default handleActions(
  {
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
  },
  initialState,
);

// actionsCreator export
const actionCreators = { addSetData, openRow };

export { actionCreators };
