import { logoutDukandar } from "../redux/action-creators/dukandar";

const setExpiration = (tokenName: string, paylod: any, dispatch: any, cb: () => void) => {
    if (paylod.exp > Date.now() / 1000) {
        const diffTime = (paylod.exp - Date.now() / 1000) * 1000; //In ms;
        setTimeout(() => {
            alert("Session timeout, login again");
            window.localStorage.removeItem(tokenName);
            dispatch(logoutDukandar());
        }, diffTime);
        cb();
    } else {
        window.localStorage.removeItem(tokenName);
    }
};
export default setExpiration;
