import Routes from "./components/routes/AppRoutes";
import "./App.css";
import "./index.css";
import { useCallback, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import setExpiration from "./utils/maintainSession";
import { setDukandar } from "./redux/action-creators/dukandar";
import { setGrahak } from "./redux/action-creators/grahak";

function App() {
    const dispatch = useDispatch();
    const handleToken = useCallback(
        (tokenName, cb) => {
            let token = window.localStorage.getItem(tokenName);
            if (token) {
                try {
                    const user: any = jwtDecode(token);
                    if (user) {
                        setExpiration(tokenName, user, dispatch, () => cb(token, user));
                    }
                } catch (err) {
                    window.localStorage.removeItem(tokenName);
                    return;
                }
            }
        },
        [dispatch]
    );
    useEffect(() => {
        handleToken("dukandarToken", (token: string, user: any) => {
            dispatch(setDukandar(token, user));
        });
        handleToken("grahakToken", (token: string, user: any) => {
            dispatch(setGrahak(token, user));
        });
    }, [handleToken, dispatch]);

    return <Routes />;
}

export default App;
