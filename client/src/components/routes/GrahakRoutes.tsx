import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import ProductListGrahak from "../containers/ProductListGrahak";
import Product from "../common/Product";
import GrahakLogin from "../containers/GrahakLogin";
import { useDispatch, useSelector } from "react-redux";
import { logoutGrahak } from "../../redux/action-creators/grahak";
import { useEffect } from "react";

const RedirectLoggedIn = ({ children, ...rest }: any) => {
    const grahak = useSelector((state: any) => state.grahak);
    return (
        <Route
            {...rest}
            render={() => {
                if (!grahak.user) return children;
                return <Redirect to="/" />;
            }}
        />
    );
};

const ProtectedRoute = ({ children, ...rest }: any) => {
    const grahak = useSelector((state: any) => state.grahak);
    console.log(grahak);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (grahak && grahak.user && grahak.token) return children;
                return (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {
                                from: location,
                            },
                        }}
                    />
                );
            }}
        />
    );
};

const LogoutUser = () => {
    const dispatch = useDispatch();
    dispatch(logoutGrahak());
    window.localStorage.removeItem("grahakToken");
    return <Redirect to="/" />;
};

export default function GrahakRoutes() {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <RedirectLoggedIn path={`${path}login`}>
                <GrahakLogin />
            </RedirectLoggedIn>
            <RedirectLoggedIn path={`${path}register`}>Register</RedirectLoggedIn>
            <Route path={`${path}product/:id`}>
                <Product />
            </Route>
            <ProtectedRoute path={`${path}viewCart`}>View Cart</ProtectedRoute>
            <ProtectedRoute path={`${path}logout`}>
                <LogoutUser />
            </ProtectedRoute>
            <Route path={`${path}`}>
                <ProductListGrahak />
            </Route>
        </Switch>
    );
}
