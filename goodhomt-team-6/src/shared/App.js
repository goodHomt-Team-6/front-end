import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from '../redux/configureStore';
import MainPage from '../pages/MainPage';
import FormExercise from '../pages/FormExercise';
import ExerciseListUp from '../components/ExerciseListUp';
import Login from '../pages/Login';
import KakaoLanding from '../pages/KakaoLanding';
import { actionCreators as userAction } from '../redux/modules/user';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import MyPastRoutines from '../pages/MyPastRoutines';
import RoutineDetail from '../pages/RoutineDetail';
import logger from './Logger';
import HOC from './HOC';
import { truncate } from 'fs';
import WorkOut from '../pages/WorkOut';

const cookie = new Cookies();

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (cookie.get('homt6_is_login') && cookie.get('homt6_access_token')) {
      dispatch(userAction.checkLogin(cookie.get('homt6_access_token')));
    }
  }, []);

  return (
    <>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={HOC(MainPage, null)} />
          <Route
            path="/mypastroutines"
            exact
            component={HOC(MyPastRoutines, true)}
          />
          <Route path="/login" exact component={HOC(Login, false)} />
          <Route path="/exercise" exact component={HOC(ExerciseListUp, true)} />
          <Route path="/editroutine" exact component={RoutineDetail} />
          <Route
            path="/exercise/form"
            exact
            component={HOC(FormExercise, truncate)}
          />
          {/* 카카오 로그인 후 랜딩되는 redirect uri */}
          <Route
            path="/oauth/callback/kakao"
            exact
            component={HOC(KakaoLanding, false)}
          />
          <Route path="/workout" exact component={HOC(WorkOut, true)} />
        </Switch>
      </ConnectedRouter>
    </>
  );
};

export default App;
