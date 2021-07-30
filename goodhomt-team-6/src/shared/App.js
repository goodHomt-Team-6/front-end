import React from 'react';
import styled from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from '../redux/configureStore';
import Main from '../pages/Main';
import Header from '../components/Header';
import FormExercise from '../pages/FormExercise';
import ExerciseListUp from "../components/ExerciseListUp";
import ExerciseCategory from '../elements/ExerciseCategory';

const App = (props) => {
  return (
    <>
      {/* <Header /> */}
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/exercise" exact component={ExerciseListUp} />
          <Route path="/exercise/form" exact component={FormExercise} />
        </Switch>
      </ConnectedRouter>
    </>
  );
};

export default App;
