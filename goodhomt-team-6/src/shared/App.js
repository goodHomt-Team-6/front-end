import React from 'react';
import styled from 'styled-components';
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { history } from "../redux/configureStore";

import Main from "../pages/Main";
import Header from "../components/Header";

const App = (props) => {
  return (
    <>
      <Header />
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={Main} />
        </Switch>
      </ConnectedRouter>
    </>
  );

};

export default App;

