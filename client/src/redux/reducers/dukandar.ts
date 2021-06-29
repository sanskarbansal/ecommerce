import axios from "axios";
import { Action, ActionTypesDukandar } from "../actions-interface";

const initialState: any = {
    products: [],
    totalPages: 0,
};
const dukandarReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypesDukandar.SET_USER:
            let token = action.paylod.token;
            axios.defaults.headers.common["Authorization"] = token;
            return { ...state, ...action.paylod, changed: true };
        case ActionTypesDukandar.SET_PRODUCTS:
            return {
                ...state,
                products: [...action.paylod.products],
                totalPages: action.paylod.totalPages,
            };
        case ActionTypesDukandar.LOGOUT:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default dukandarReducer;
