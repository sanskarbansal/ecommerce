import { combineReducers } from "redux";
import Dukandar from "./dukandar";
import Grahak from "./grahak";

export default combineReducers({
    dukandar: Dukandar,
    grahak: Grahak,
});
