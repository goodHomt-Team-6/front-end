import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from '../redux/configureStore';
import Main from '../pages/Main';
import Header from '../components/Header';
import FormExercise from '../pages/FormExercise';
import ExerciseListUp from "../components/ExerciseListUp";
import Login from '../pages/Login';
import { useSelector, useDispatch } from 'react-redux';
import { setCookie } from './Cookie';

const App = (props) => {

  useEffect(() => {
    // const dispatch = useDispatch();
    // let is_login = useSelector((store) => store.user.is_login);

    const is_token = window.location.href.includes("token");
    if (is_token) {
      let token = window.location.href.split('/')[3].split('=')[1];
      console.log(token);
      setCookie("token", token);
      window.location.replace('/');
      // is_login = true;
    }
    return;
  }, []);


  return (
    <>
      {/* <Header /> */}
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/exercise" exact component={ExerciseListUp} />
          <Route path="/exercise/form" exact component={FormExercise} />
        </Switch>
      </ConnectedRouter>
    </>
  );
};

export default App;
