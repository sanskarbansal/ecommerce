import { Redirect, Route, Switch } from "react-router-dom";
import DukandarHome from "../screens/DukandarHome";
import ProtectedRoute from "../common/ProtectedRoute";
import RedirectLoggedIn from "../common/RedirectLoggedIn";
import DukandarDashboard from "../screens/DukandarDashboard";
import GrahakHome from "../screens/GrahakHome";

export default function Routes() {
    return (
        <Switch>
            <ProtectedRoute path="/dukandar/dashboard">
                <DukandarDashboard />
            </ProtectedRoute>
            <RedirectLoggedIn path="/dukandar/home">
                <DukandarHome />
            </RedirectLoggedIn>
            <Route path="/dukandar/">
                <Redirect to="/dukandar/home" />
            </Route>
            <Route exact path="/">
                <GrahakHome />
            </Route>
        </Switch>
    );
}
