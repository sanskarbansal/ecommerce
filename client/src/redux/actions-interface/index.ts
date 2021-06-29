import Product from "../../types/Product";
import ActionTypesDukandar from "../action-types/action-types";

interface UserPaylod {
    token: string;
    user: any;
}

interface ProductPaylod {
    products: Product[];
    totalItems: number;
}

interface SetUserAction {
    type: ActionTypesDukandar.SET_USER;
    paylod: UserPaylod;
}

interface LogoutDukandar {
    type: ActionTypesDukandar.LOGOUT;
}

interface SetProducts {
    type: ActionTypesDukandar.SET_PRODUCTS;
    paylod: ProductPaylod;
}

export type Action = SetUserAction | SetProducts | LogoutDukandar;
export { ActionTypesDukandar };
