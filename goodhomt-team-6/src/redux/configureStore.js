import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { persistStore } from 'redux-persist';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import Exercise from './modules/exercise';
import User from './modules/user';
import Challenge from './modules/challenge';
import Feed from './modules/feed';
import Calendar from './modules/calendar';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  exercise: Exercise,
  user: User,
  feed: Feed,
  challenge: Challenge,
  calendar: Calendar,
  router: connectRouter(history),
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['exercise', 'challenge', 'feed'],
};

const enhancedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
if (env === 'development') {
  const { logger } = require('redux-logger'); // 배포환경에서는 import 안되도록 개발환경에서만 require로 불러옴.
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(enhancedReducer, enhancer);

export default store();
