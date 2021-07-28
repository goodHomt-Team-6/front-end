import React from 'react';
import styled from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from '../redux/configureStore';

import Main from '../pages/Main';
import Header from '../components/Header';
import SelectExercise from '../pages/SelectExercise';
import FormExercise from '../pages/FormExercise';

const App = (props) => {
  return (
    <>
      <Header />
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/exercise" exact component={SelectExercise} />
          <Route path="/exercise/form" exact component={FormExercise} />
        </Switch>
      </ConnectedRouter>
    </>
  );
};

export default App;
