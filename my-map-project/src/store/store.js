import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./data/reducers";
import saveMarkersToLocalStorage from "./middleware";

// через composeWithDevTools не получаетя реализовать
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(saveMarkersToLocalStorage))
);

export default store;
