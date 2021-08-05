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
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import MyPastRoutines from '../pages/MyPastRoutines';
import logger from './Logger';

const cookie = new Cookies();

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (cookie.get('homt6_is_login')) {
      dispatch(userAction.getUpdatedAccessTokenAPI());
    }
  });

  return (
    <>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/mypastroutines" exact component={MyPastRoutines} />
          <Route path="/login" exact component={Login} />
          <Route path="/exercise" exact component={ExerciseListUp} />
          <Route path="/exercise/form" exact component={FormExercise} />
          {/* 카카오 로그인 후 랜딩되는 redirect uri */}
          <Route path="/oauth/callback/kakao" exact component={KakaoLanding} />
        </Switch>
      </ConnectedRouter>
    </>
  );
};

export default App;
