import Routes from "./components/routes/AppRoutes";
import "./App.css";
import "./index.css";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setDukandar } from "./redux/action-creators/dukandar";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        let token = window.localStorage.getItem("dukandarToken");
        if (token) {
            try {
                const user = jwtDecode(token);
                if (user) dispatch(setDukandar(token, user));
            } catch (err) {
                window.localStorage.removeItem("dukandarToken");
                return;
            }
        }
    }, [dispatch]);
    return <Routes />;
}

export default App;
