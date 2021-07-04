import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import ProductListGrahak from "../containers/ProductListGrahak";
import Product from "../common/Product";
import GrahakLogin from "../containers/GrahakLogin";
import { useSelector } from "react-redux";

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
            <Route path={`${path}`}>
                <ProductListGrahak />
            </Route>
        </Switch>
    );
}
