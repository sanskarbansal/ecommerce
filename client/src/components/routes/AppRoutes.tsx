import { Switch } from "react-router-dom";
import DukandarHome from "../screens/DukandarHome";
import ProtectedRoute from "../common/ProtectedRoute";
import RedirectLoggedIn from "../common/RedirectLoggedIn";
import DukandarDashboard from "../screens/DukandarDashboard";

export default function Routes() {
    return (
        <Switch>
            <ProtectedRoute path="/dukandar/dashboard">
                <DukandarDashboard />
            </ProtectedRoute>
            <RedirectLoggedIn path="/dukandar/">
                <DukandarHome />
            </RedirectLoggedIn>
        </Switch>
    );
}
