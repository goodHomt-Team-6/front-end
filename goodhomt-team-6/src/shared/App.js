import React from 'react';
import styled from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from '../redux/configureStore';
import Main from '../pages/Main';
import Header from '../components/Header';
import FormExercise from '../pages/FormExercise';
import ExerciseListUp from "../components/ExerciseListUp";
import Login from '../pages/Login';

const App = (props) => {
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
