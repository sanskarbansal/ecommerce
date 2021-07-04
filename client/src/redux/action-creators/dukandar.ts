import axios from "axios";
import jwtDecode from "jwt-decode";
import { Dispatch } from "react";
import dukandarAPI from "../../api/dukandar";
import setExpiration from "../../utils/maintainSession";
import { ActionDukandar, ActionTypesDukandar } from "../actions-interface";

const setDukandar = (token: any, user: any): ActionDukandar => ({
    type: ActionTypesDukandar.SET_USER,
    paylod: { token, user },
});

const logoutDukandar = (): ActionDukandar => ({
    type: ActionTypesDukandar.LOGOUT,
});

const loginDukandar = (values: any) => (dispatch: Dispatch<ActionDukandar>) => {
    axios
        .post(dukandarAPI.login, {
            ...values,
        })
        .then(async (data) => {
            let token = data.data.token;
            window.localStorage.setItem("dukandarToken", token);
            const user = await jwtDecode(token);
            setExpiration("dukandarToken", user, dispatch, () => {
                console.log("Expiration set");
            });
            dispatch(setDukandar(token, user));
        })
        .catch((err) => {
            console.log(err.response.data);
        });
};

const setProducts = (products: any): ActionDukandar => ({
    type: ActionTypesDukandar.SET_PRODUCTS,
    paylod: products,
});
export { loginDukandar, setDukandar, setProducts, logoutDukandar };
