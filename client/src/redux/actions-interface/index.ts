import ActionTypesDukandar from "../action-types/action-types";

interface UserPaylod {
    token: string;
    user: any;
}

interface SetUserAction {
    type: ActionTypesDukandar.SET_USER;
    paylod: UserPaylod;
}

export type Action = SetUserAction;
export { ActionTypesDukandar };
