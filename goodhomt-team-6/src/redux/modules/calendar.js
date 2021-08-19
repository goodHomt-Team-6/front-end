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
      }),
  },
  initialState,
);

const actionCreators = {
  setMonth,
};
export { actionCreators };
