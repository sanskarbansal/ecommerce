import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddProduct from "../containers/AddProduct";
import MaintainStock from "../containers/MaintainStock";
import ProductsList from "../containers/ProductsList";
import ViewStock from "../containers/ViewStock";

export default function DukandarRoutes() {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}/addProduct`}>
                <AddProduct />
            </Route>
            <Route path={`${path}/maintainStock`}>
                <MaintainStock />
            </Route>
            <Route path={`${path}/viewStock`}>
                <ViewStock />
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
