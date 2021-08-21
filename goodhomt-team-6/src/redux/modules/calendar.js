import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import api from '../../shared/Request';
import logger from '../../shared/Logger';
import moment from 'moment';

// initial state
const initialState = {
  routines: [],
  today: moment(),
  isCalendarChallengeData: false,
};

// actions
const SET_MONTH = 'calendar/SET_MONTH';
const SET_IS_CALENDAR_CHALLENGE_DATA =
  'challenge/SET_IS_CALENDAR_CHALLENGE_DATA';

// action creators
const setMonth = createAction(SET_MONTH, (value) => ({
  value,
}));
const setIsCalendarChallengeData = createAction(
  SET_IS_CALENDAR_CHALLENGE_DATA,
  (value) => ({
    value,
  }),
);

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
    [SET_IS_CALENDAR_CHALLENGE_DATA]: (state, action) =>
      produce(state, (draft) => {
        draft.isCalendarChallengeData = action.payload.value;
      }),
  },
  initialState,
);

const actionCreators = {
  setMonth,
  setIsCalendarChallengeData,
};
export { actionCreators };
