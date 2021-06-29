import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddProduct from "../containers/AddProduct";
import ProductsList from "../containers/ProductsList";
export default function DukandarRoutes() {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}/addProduct`}>
                <AddProduct />
            </Route>
            <Route exact path={`${path}/viewOrders`}>
                {/* <ViewOrders /> */}
            </Route>
            <Route path={`${path}/`}>
                <ProductsList />
            </Route>
        </Switch>
    );
}
