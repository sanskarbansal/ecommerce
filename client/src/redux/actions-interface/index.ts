import Product from "../../types/Product";
import ActionTypesDukandar from "../action-types/action-types";

interface UserPaylod {
    token: string;
    user: any;
}

interface ProductPaylod {
    products: Product[];
    totalPages: number;
}

interface SetUserAction {
    type: ActionTypesDukandar.SET_USER;
    paylod: UserPaylod;
}

interface SetProducts {
    type: ActionTypesDukandar.SET_PRODUCTS;
    paylod: ProductPaylod;
}

export type Action = SetUserAction | SetProducts;
export { ActionTypesDukandar };
