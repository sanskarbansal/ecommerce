import Product from "../../types/Product";
import { ActionTypesDukandar } from "../action-types/action-types";

interface UserPaylod {
    token: string;
    user: any;
}

interface ProductPaylod {
    products: Product[];
    totalItems: number;
}

export interface SetUserAction {
    type: ActionTypesDukandar.SET_USER;
    paylod: UserPaylod;
}

export interface LogoutDukandar {
    type: ActionTypesDukandar.LOGOUT;
}

export interface SetProducts {
    type: ActionTypesDukandar.SET_PRODUCTS;
    paylod: ProductPaylod;
}
// export { UserPaylod, ProductPaylod, SetUserAction, LogoutDukandar, SetProducts };
