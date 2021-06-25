import axios from "axios";
import jwtDecode from "jwt-decode";
import { Dispatch } from "react";
import dukandarAPI from "../../api/dukandar";
import { Action, ActionTypesDukandar } from "../actions-interface";

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
            dispatch({ type: ActionTypesDukandar.SET_USER, paylod: { token, user } });
        })
        .catch((err) => {
            console.log(err.response.data);
        });
};

export { loginDukandar };
