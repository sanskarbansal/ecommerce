import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProductListGrahak from "../containers/ProductListGrahak";
import Product from "../common/Product";
export default function GrahakRoutes() {
    const { path } = useRouteMatch();
    console.log(path);
    return (
        <Switch>
            <Route path={`${path}product/:id`}>
                <Product />
            </Route>
            <Route path={`${path}`}>
                <ProductListGrahak />
            </Route>
        </Switch>
    );
}
