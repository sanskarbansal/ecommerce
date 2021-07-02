import { Layout, Menu } from "antd";
import { useEffect } from "react";
import ProductListGrahak from "../containers/ProductListGrahak";

const { Header, Content, Footer } = Layout;

export default function GrahakHome() {
    useEffect(() => {
        // axios
        //     .get(api.getProducts)
        //     .then((res) => {
        //         console.log(res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }, []);
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                    {new Array(15).fill(null).map((_, index) => {
                        const key = index + 1;
                        return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
                    })}
                </Menu>
            </Header>
            <Content style={{ padding: "0 50px" }}>
                <ProductListGrahak />
            </Content>
            <Footer style={{ textAlign: "center" }}>Bansal General Store ©2018 Created by Sanskar</Footer>
        </Layout>
    );
}
