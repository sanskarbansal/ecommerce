import axios from "axios";
import jwtDecode from "jwt-decode";
import { Dispatch } from "react";
import dukandarAPI from "../../api/dukandar";
import { Action, ActionTypesDukandar } from "../actions-interface";

const setDukandar = (token: any, user: any): Action => ({
    type: ActionTypesDukandar.SET_USER,
    paylod: { token, user },
});

const loginDukandar = (values: any) => (dispatch: Dispatch<Action>) => {
    console.log(values);
    axios
        .post(
            dukandarAPI.login,
            {
                ...values,
            },
            {
                withCredentials: true,
            }
        )
        .then(async (data) => {
            let token = data.data.token;
            window.localStorage.setItem("dukandarToken", token);
            const user = await jwtDecode(token);
            dispatch(setDukandar(token, user));
        })
        .catch((err) => {
            console.log(err.response.data);
        });
};

const setProducts = (products: any) => ({
    type: ActionTypesDukandar.SET_PRODUCTS,
    paylod: products,
});
export { loginDukandar, setDukandar, setProducts };
