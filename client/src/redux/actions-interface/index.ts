import DukandarInterface from "../../types/DukandarInterface";
import ActionTypesDukandar from "../action-types/action-types";

interface LoginPaylod {
    username?: string;
    password: string;
    email?: string;
    phone_no?: string;
}

interface SignUpPaylod extends DukandarInterface {}

interface LoginAction {
    type: ActionTypesDukandar.LOGIN;
    paylod: LoginPaylod;
}
interface SignUpAction {
    type: ActionTypesDukandar.SIGNUP;
    paylod: SignUpPaylod;
}

export type Action = LoginAction | SignUpAction;
export { ActionTypesDukandar };
