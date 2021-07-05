import { Layout, Menu } from "antd";
import React from "react";
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
    {
        name: "View Cart",
        url: "/viewCart",
        onlyLogin: true,
    },
    {
        name: "Logout",
        url: "/logout",
        onlyLogin: true,
    },
];

export default function GrahakHome() {
    const grahak = useSelector((state: any) => state.grahak);
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["/"]}>
                    {menuLinks.map(({ name, url, onlyLogout, onlyLogin }) => {
                        if ((grahak.user && onlyLogout) || (!grahak.user && onlyLogin)) {
                            return <React.Fragment key={name}></React.Fragment>;
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
