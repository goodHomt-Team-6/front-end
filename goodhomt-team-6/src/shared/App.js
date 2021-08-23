import React, { useEffect } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from '../redux/configureStore';
import MainPage from '../pages/MainPage';
import FormExercise from '../pages/FormExercise';
import ExerciseListUp from '../pages/ExerciseListUp';
import Login from '../pages/Login';
import KakaoLanding from '../pages/KakaoLanding';
import { actionCreators as userAction } from '../redux/modules/user';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import MyPastRoutines from '../pages/MyPastRoutines';
import RoutineDetail from '../pages/RoutineDetail';
import EditRoutine from '../pages/EditRoutine';
import logger from './Logger';
import WorkOut from '../pages/WorkOut';
import Feed from '../pages/Feed';
import ChallengeDetail from '../pages/ChallengeDetail';
import FeedDetail from '../pages/FeedDetail';
import TodayRoutineDetail from '../pages/TodayRoutineDetail';
import AddMyFeed from '../pages/AddMyFeed';
import SelectMyFeed from '../pages/SelectMyFeed';
import FeedRoutineDetail from '../pages/FeedRoutineDetail';
import Calendar from '../pages/Calendar';
import Challenge from '../pages/Challenge';
import ErrorBoundary from './ErrorBoundary';

const cookie = new Cookies();

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (cookie.get('homt6_is_login') && cookie.get('homt6_access_token')) {
      dispatch(userAction.checkLogin(cookie.get('homt6_access_token')));
    }
  }, []);

  return (
    <ErrorBoundary>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/mypastroutines" exact component={MyPastRoutines} />
          <Route path="/login" exact component={Login} />
          <Route path="/exercise" exact component={ExerciseListUp} />
          <Route path="/routinedetail" exact component={RoutineDetail} />
          <Route path="/editroutine" exact component={EditRoutine} />
          <Route path="/exercise/form" exact component={FormExercise} />
          {/* 카카오 로그인 후 랜딩되는 redirect uri */}
          <Route path="/oauth/callback/kakao" exact component={KakaoLanding} />
          <Route path="/workout" exact component={WorkOut} />
          <Route path="/feed" exact component={Feed} />
          <Route path="/challenge" exact component={Challenge} />
          <Route path="/challenge/:id" exact component={ChallengeDetail} />
          <Route path="/feed/:id" exact component={FeedDetail} />
          <Route
            path="/todayroutinedetail"
            exact
            component={TodayRoutineDetail}
          />
          <Route path="/addmyfeed" exact component={AddMyFeed} />
          <Route path="/selectmyfeed" exact component={SelectMyFeed} />
          <Route
            path="/feedroutinedetail"
            exact
            component={FeedRoutineDetail}
          />
          <Route path="/calendar" exact component={Calendar} />
        </Switch>
      </ConnectedRouter>
    </ErrorBoundary>
  );
};

export default App;
