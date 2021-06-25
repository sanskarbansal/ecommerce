import { Action, ActionTypesDukandar } from "../actions-interface";

const initialState = {};
const dukandarReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypesDukandar.SET_USER:
            return { ...state, ...action.paylod };
        default:
            return state;
    }
};

export default dukandarReducer;
