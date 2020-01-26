import React from "react";
import { Provider } from "react-redux";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/firestore";

import { CSSReset, ThemeProvider, theme, DefaultTheme } from "@chakra-ui/core";
import { Router, Route, Switch } from "react-router-dom";

import history from "./utils/history";
import store from "./store";
import { firebaseConfig } from "./config";
import LoginPage from "./routes/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./routes/Home";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import palette, { Palette } from "./utils/palette";
import Board from "./routes/Board";

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const config = {
  userProfile: "users",
  useFirestoreForProfile: true
};

export interface CustomThemeProps extends DefaultTheme {
  palette: Palette;
}

export const customTheme: CustomThemeProps = {
  ...theme,
  colors: {
    ...theme.colors
  },
  palette: palette
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Provider store={store}>
        <ReactReduxFirebaseProvider
          config={config}
          firebase={firebase}
          createFirestoreInstance={createFirestoreInstance}
          dispatch={store.dispatch}
        >
          <Router history={history}>
            <Switch>
              <PrivateRoute path="/" exact component={Home} />
              <PrivateRoute path="/b/:boardId" exact component={Board} />
              <Route path="/login" exact component={LoginPage} />
            </Switch>
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
