import { Layout, Menu } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GrahakRoutes from "../routes/GrahakRoutes";
const { Header, Content, Footer } = Layout;

const menuLinks = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Login",
        url: "/login",
        onlyLogout: true,
    },
    {
        name: "Register",
        url: "/register",
        onlyLogout: true,
    },
];

export default function GrahakHome() {
    const grahak = useSelector((state: any) => state.grahak);
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["/"]}>
                    {menuLinks.map(({ name, url, onlyLogout }) => {
                        if (onlyLogout && grahak.user) {
                            return <></>;
                        }
                        return (
                            <Menu.Item key={url}>
                                <Link to={url}>{name}</Link>
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </Header>
            <Content style={{ padding: "0 50px" }}>
                <GrahakRoutes />
            </Content>
            <Footer style={{ textAlign: "center" }}>Bansal General Store ©2018 Created by Sanskar</Footer>
        </Layout>
    );
}
