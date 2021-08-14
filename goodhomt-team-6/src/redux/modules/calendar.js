import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import api from '../../shared/Request';
import logger from '../../shared/Logger';
import moment from 'moment';

// initial state
const initialState = {
  routines: [],
  today: moment(),
};

// actions
const SET_MONTH = 'calendar/SET_MONTH';

// action creators
const setMonth = createAction(SET_MONTH, (value) => ({
  value,
}));

// middleware actions

// reducer using handle actions, immer
export default handleActions(
  {
    [SET_MONTH]: (state, action) =>
      produce(state, (draft) => {
        draft.today = moment(draft.today)
          .clone()
          .add(action.payload.value, 'month');
        // 시간 남으면 cookie 이용해서 새로고침 해도 기존에 보던 월이 수정안되게 해보자
      }),
  },
  initialState,
);

const actionCreators = {
  setMonth,
};
export { actionCreators };
