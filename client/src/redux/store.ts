import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
createStore(rootReducer, applyMiddleware(thunk));
