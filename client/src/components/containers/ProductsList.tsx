import { useDispatch, useSelector } from "react-redux";
import { Pagination, Card, Image } from "antd";

import axios from "axios";
import api from "../../api/dukandar";
import { setProducts } from "../../redux/action-creators/dukandar";
import { url } from "../../api/baseUrl";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { useEffect } from "react";

export default function Products() {
    const dukandar = useSelector((state: any) => state.dukandar);
    const dispatch = useDispatch();
    let { totalItems, products } = dukandar;
    const limit = 6;
    useEffect(() => {
        axios
            .get(api.products(limit, 1))
            .then((res) => {
                dispatch(setProducts(res.data));
            })
            .catch((err) => {
                if (err.response) console.log(err.response.data);
            });
    }, [dispatch]);
    return (
        <>
            <div className="d-flex">
                {products.map((item: any) => (
                    <Card
                        key={item.id}
                        style={{ width: 300 }}
                        cover={<Image width="300px" height="300px" style={{ objectFit: "cover" }} alt={item.name} src={url + "/products/" + item.imageName} />}
                        actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
                    >
                        <h1>{item.name}</h1>
                        <h2>{item.price}₹</h2>
                        <span>{item.description}</span>
                    </Card>
                ))}
            </div>

            <div style={{ marginTop: "20px" }}>
                <Pagination
                    onChange={(page) => {
                        axios.get(api.products(limit, page)).then((res) => {
                            dispatch(setProducts(res.data));
                        });
                    }}
                    total={totalItems}
                    pageSize={limit}
                />
            </div>
        </>
    );
}
