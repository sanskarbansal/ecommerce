import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import api from "../../api/grahak";
import { Row, Col, Image, Spin, Button, List, Card, Typography } from "antd";
import { url } from "../../api/baseUrl";

interface Dukandar {
    id: string;
    dob?: Date;
    name: string;
    email: string;
    username: string;
    phone_no: string;
}
interface Feature {
    name: string;
    description: string;
    ProductId: string;
}

interface ProductType {
    id: string;
    name: string;
    description: string;
    price: number;
    mrp: number;
    imageName: string;
    DukandarId: string;
    Dukandar: Dukandar;
    ProductFeature: Feature[];
}

export default function Product() {
    const { params }: { params: any } = useRouteMatch();
    const [loading, setloading] = useState(true);
    const [product, setproduct]: [ProductType, any] = useState({
        id: "",
        name: "",
        description: "",
        price: 0,
        mrp: 0,
        imageName: "",
        DukandarId: "",
        Dukandar: {
            id: "",
            name: "",
            email: "",
            username: "",
            phone_no: "",
        },
        ProductFeature: [],
    });
    const { id } = params;

    useEffect(() => {
        axios
            .get(api.getProduct + id)
            .then((res) => {
                setproduct(res.data);
                setloading(false);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }, [id]);
    return (
        <>
            {loading ? (
                <Spin size="large" />
            ) : (
                <Row>
                    <Col span={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Image width="60%" src={url + "/products/" + product.imageName} />
                    </Col>
                    <Col span={12}>
                        <h1>{product.name.toUpperCase()}</h1>
                        <h4>
                            <span style={{ color: "blue" }}>MRP </span> : <span style={{ textDecoration: "line-through" }}> {product.mrp} </span> ₹
                        </h4>
                        <h4>
                            <span style={{ color: "red" }}>Price</span>: {product.price} ₹
                        </h4>
                        <h2>About This Item:</h2>

                        <Typography.Text>{product.description}</Typography.Text>
                        <List
                            size="large"
                            dataSource={product.ProductFeature}
                            renderItem={(item) => (
                                <List.Item style={{ width: "100%", padding: 0 }}>
                                    <Card style={{ width: "100%" }} title={item.name}>
                                        {item.description}
                                    </Card>
                                </List.Item>
                            )}
                        />
                        <Button style={{ marginTop: 10 }} type="primary">
                            Add To Cart
                        </Button>
                    </Col>
                </Row>
            )}
        </>
    );
}
