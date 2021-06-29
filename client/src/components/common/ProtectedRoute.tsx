import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute({ children, ...rest }: any) {
    const dukandar = useSelector((state: any) => state.dukandar);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (dukandar.token && dukandar.user) return <>{children}</>;
                return <Redirect to={{ pathname: "/dukandar/", state: { from: location } }} />;
            }}
        />
    );
}
