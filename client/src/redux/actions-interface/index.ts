import { ActionTypesDukandar, ActionTypesGrahak } from "../action-types/action-types";
import * as DukandarActions from "./dukandar-interface";
import * as GrahakActions from "./grahak-interface";
export type ActionDukandar = DukandarActions.SetUserAction | DukandarActions.SetProducts | DukandarActions.LogoutDukandar;
export type ActionGrahak = GrahakActions.SetUserAction | GrahakActions.LogoutAction;
export { ActionTypesDukandar, ActionTypesGrahak };
