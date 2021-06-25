import { Action, ActionTypesDukandar } from "../actions-interface";

const initialState = {};
const dukandarReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypesDukandar.LOGIN:
            return state;
        case ActionTypesDukandar.SIGNUP:
            return state;
        default:
            return state;
    }
};

export default dukandarReducer;
