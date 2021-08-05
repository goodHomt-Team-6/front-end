import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from '../redux/configureStore';
import Main from '../pages/Main';
import FormExercise from '../pages/FormExercise';
import ExerciseListUp from '../components/ExerciseListUp';
import Login from '../pages/Login';
import KakaoLanding from '../pages/KakaoLanding';
import { actionCreators as userAction } from '../redux/modules/user';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

const App = (props) => {
  const dispatch = useDispatch();

  if (cookie.get('homt6_is_login')) {
    useEffect(() => {
      dispatch(userAction.getUpdatedAccessTokenAPI());
    });
  }

  return (
    <>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={Main} />
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
