import React from 'react';
import styled from 'styled-components';
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { history } from "../redux/configureStore";

import Main from "../pages/Main";
import Header from "../components/Header";
import ExerciseList from "../components/ExerciseList";

const App = (props) => {
  return (
    <>
      {/* <Header /> */}
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/exercise" exact component={ExerciseList} />
        </Switch>
      </ConnectedRouter>
    </>
  );

};

export default App;

