import { ActionGrahak, ActionTypesGrahak } from "../actions-interface";

const initialState = {};
const dukandarReducer = (state = initialState, action: ActionGrahak) => {
    switch (action.type) {
        case ActionTypesGrahak.SET_USER:
            return {
                ...state,
                ...action.paylod,
            };
        case ActionTypesGrahak.LOGOUT:
            return { ...initialState };
        default:
            return state;
    }
};

export default dukandarReducer;
