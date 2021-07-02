import React from "react";

import { Pagination, Image, Card } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import axios from "axios";
import api from "../../api/grahak";
import { url as apiUrl } from "../../api/baseUrl";

const limit = 4;

export default function ProductListGrahak() {
    const [products, setProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const { url } = useRouteMatch();

    const handleGetProducts = (page = 1) => {
        axios
            .get(api.getProducts(page, limit))
            .then((res) => {
                setProducts(res.data.rows);
                setTotalItems(res.data.count);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };
    useEffect(() => {
        handleGetProducts();
    }, []);
    console.log(url);
    return (
        <>
            <div className="d-flex" style={{ marginTop: "20px" }}>
                {products.map((item: any) => (
                    <Card
                        style={{ width: 300 }}
                        cover={
                            <Image width="300px" height="300px" style={{ objectFit: "cover" }} alt={item.name} src={apiUrl + "/products/" + item.imageName} />
                        }
                    >
                        <Link to={`/product/${item.id}`}>
                            <h1>{item.name}</h1>
                            <h2>{item.price}₹</h2>
                            <span>{item.description}</span>
                        </Link>
                    </Card>
                ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <Pagination
                    total={totalItems}
                    pageSize={limit}
                    onChange={(page) => {
                        handleGetProducts(page);
                    }}
                />
            </div>
        </>
    );
}
