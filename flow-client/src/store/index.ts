import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { firebaseReducer, getFirebase } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { composeWithDevTools } from "redux-devtools-extension";
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

const middleware = [thunk.withExtraArgument({ getFirebase })];
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
