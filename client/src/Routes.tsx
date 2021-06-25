import { Switch, Route } from "react-router-dom";

import React from "react";
import DukandarHome from "./components/screens/DukandarHome";

export default function Routes() {
    return (
        <Switch>
            <Route path="/dukandar/">
                <DukandarHome />
            </Route>
        </Switch>
    );
}
