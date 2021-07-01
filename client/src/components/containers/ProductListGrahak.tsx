import React from "react";

import { Pagination, Image, Card } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import api from "../../api/grahak";
import { url } from "../../api/baseUrl";

const limit = 4;

export default function ProductListGrahak() {
    const [products, setProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    useEffect(() => {
        axios
            .get(api.getProducts)
            .then((res) => {
                setProducts(res.data.rows);
                setTotalItems(res.data.count);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    return (
        <>
            <div>Product List Grahak</div>
            <div className="d-flex">
                {products.map((item: any) => (
                    <Card
                        style={{ width: 300 }}
                        cover={<Image width="300px" height="300px" style={{ objectFit: "cover" }} alt={item.name} src={url + "/products/" + item.imageName} />}
                        // actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
                    >
                        <h1>{item.name}</h1>
                        <h2>{item.price}₹</h2>
                        <span>{item.description}</span>
                    </Card>
                ))}
            </div>
            <Pagination total={totalItems} pageSize={limit} />
        </>
    );
}
