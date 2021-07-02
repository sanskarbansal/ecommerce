import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import GrahakRoutes from "../routes/GrahakRoutes";
const { Header, Content, Footer } = Layout;
export default function GrahakHome() {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
                    <Menu.Item key={1}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: "0 50px" }}>
                <GrahakRoutes />
            </Content>
            <Footer style={{ textAlign: "center" }}>Bansal General Store ©2018 Created by Sanskar</Footer>
        </Layout>
    );
}
