import { ActionTypesGrahak } from "../action-types/action-types";

interface UserPaylod {
    token: string;
    user: any;
}
export interface SetUserAction {
    type: ActionTypesGrahak.SET_USER;
    paylod: UserPaylod;
}
