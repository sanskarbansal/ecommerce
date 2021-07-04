import axios from "axios";
import jwtDecode from "jwt-decode";
import { Dispatch } from "react";
import api from "../../api/grahak";
import { ActionGrahak, ActionTypesGrahak } from "../actions-interface";

const setGrahak = (token: string, user: any): ActionGrahak => ({
    type: ActionTypesGrahak.SET_USER,
    paylod: {
        token,
        user,
    },
});

const loginGrahak = (values: any) => (dispatch: Dispatch<ActionGrahak>) => {
    axios
        .post(api.login, values)
        .then((res) => {
            let token = res.data.token;
            const user = jwtDecode(token);
            window.localStorage.setItem("grahakToken", token);
            dispatch(setGrahak(token, user));
        })
        .catch((err) => {
            console.log(err.response.data);
        });
};

export { loginGrahak, setGrahak };
