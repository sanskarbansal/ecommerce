import { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logoutDukandar } from "../../redux/action-creators/dukandar";
import { Link, useRouteMatch } from "react-router-dom";
import DukandarRoutes from "../routes/DukandarRoutes";
const { Content, Footer, Sider } = Layout;

const menuItems = [
    { menuUrl: "", title: "Home", key: "home" },
    { menuUrl: "/addProduct", title: "Add Product", key: "addProduct" },
    { menuUrl: "/viewOrders", title: "View Order", key: "viewOrder" },
];

export default function DukandarDashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const { url } = useRouteMatch();
    const dispatch = useDispatch();
    const toggleCollapsed = () => {
        setCollapsed((prevState: boolean) => !prevState);
    };
    const logoutUser = () => {
        window.localStorage.removeItem("dukandarToken");
        dispatch(logoutDukandar());
    };

    return (
        <Layout>
            <Sider
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                }}
                collapsed={collapsed}
            >
                <Button type="default" onClick={toggleCollapsed} style={{ width: "100%" }}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["home"]}>
                    {menuItems.map(({ menuUrl, title, key }) => (
                        <Menu.Item key={key}>
                            <Link to={`${url}${menuUrl}`}>{title}</Link>
                        </Menu.Item>
                    ))}
                    <Menu.Item key="logout" onClick={logoutUser}>
                        <span>Logout</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                    <div className="site-layout-background" style={{ padding: 24, textAlign: "center" }}>
                        <DukandarRoutes />
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>Made with ❤️ love</Footer>
            </Layout>
        </Layout>
    );
}
