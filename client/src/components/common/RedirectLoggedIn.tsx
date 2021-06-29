import { useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";

export default function RedirectLoggedIn({ children, ...rest }: any) {
    const dukandar = useSelector((state: any) => state.dukandar);
    const { state }: any = useLocation();
    const pathname = (state && state.from && state.from.pathname) || "/dukandar/dashboard";
    return (
        <Route
            {...rest}
            render={() => {
                if (dukandar.token && dukandar.user) return <Redirect to={{ pathname }} />;
                return children;
            }}
        />
    );
}
