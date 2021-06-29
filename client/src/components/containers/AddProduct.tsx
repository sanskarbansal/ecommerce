import React, { useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import { useFormik } from "formik";
import axios from "axios";
import api from "../../api/dukandar";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/action-creators/dukandar";
import { UploadOutlined } from "@ant-design/icons";

export default function AddProduct() {
    const [productImage, setProductImage] = useState(null);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            price: null,
            mrp: null,
        },
        onSubmit: (values: any) => {
            const formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
            }
            if (!productImage) return alert("Please upload a file image");
            formData.append("productImage", productImage!);
            axios
                .post(api.addProduct, formData)
                .then((res) => {
                    dispatch(setProducts([res.data]));
                })
                .catch((err) => console.log(err.data));
        },
    });
    return (
        <>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                onFinish={formik.handleSubmit}
            >
                <Form.Item name="name" label="Name">
                    <Input onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item name="price" label="Price">
                    <Input onChange={formik.handleChange} type="number" />
                </Form.Item>
                <Form.Item name="mrp" label="MRP">
                    <Input onChange={formik.handleChange} type="number" />
                </Form.Item>
                <Form.Item name="productImage" label="Image">
                    <Input onChange={(event: any) => setProductImage(event.target.files[0])} type="file" />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">Add Product</Button>
                </Form.Item>
            </Form>
        </>
    );
}
