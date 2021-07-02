import { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import axios from "axios";
import api from "../../api/dukandar";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/action-creators/dukandar";
import { useForm } from "antd/lib/form/Form";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const initialValues = {
    name: "",
    description: "",
    price: null,
    mrp: null,
};

export default function AddProduct() {
    const [form] = useForm();
    const [productImage, setProductImage] = useState(null);
    const dispatch = useDispatch();
    const onFinish = (values: any) => {
        const formData = new FormData();
        for (let key in values) {
            if (typeof values[key] === "object") {
                formData.append(key, JSON.stringify(values[key]));
            } else {
                formData.append(key, values[key]);
            }
        }
        if (!productImage) return alert("Please upload a file image");
        formData.append("productImage", productImage!);
        axios
            .post(api.addProduct, formData)
            .then((res) => {
                alert("Product Added Successfully");
                form.resetFields();
                dispatch(setProducts({ products: [res.data] }));
            })
            .catch((err) => console.log(err.response.data.error));
        form.resetFields();
    };
    return (
        <>
            <Form
                form={form}
                initialValues={initialValues}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 20,
                }}
                onFinish={onFinish}
            >
                <Form.Item name="name" label="Name">
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="price" label="Price">
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="mrp" label="MRP">
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="productImage" label="Image">
                    <Input onChange={(event: any) => setProductImage(event.target.files[0])} type="file" />
                </Form.Item>

                <Form.List name="productFeatures">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <Row>
                                    <Col span={4}>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item name={[name, "name"]} wrapperCol={{ span: 23 }}>
                                            <Input placeholder="Product Feature Name" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={14}>
                                        <Form.Item name={[name, "description"]} wrapperCol={{ span: 24 }}>
                                            <Input.TextArea placeholder="Product Feature Description" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            ))}
                            <Form.Item wrapperCol={{ span: 24 }}>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add field
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button style={{ width: "100%" }} htmlType="submit" type="primary">
                        Add Product
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
