import { useState } from "react";
import { Form, Input, Button } from "antd";
import { useFormik } from "formik";
import axios from "axios";
import api from "../../api/dukandar";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/action-creators/dukandar";
import { useForm } from "antd/lib/form/Form";

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
    const formik = useFormik({
        initialValues,
        onSubmit: (values: any, actions) => {
            const formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
            }
            if (!productImage) return alert("Please upload a file image");
            formData.append("productImage", productImage!);
            axios
                .post(api.addProduct, formData)
                .then((res) => {
                    alert("Product Added Successfully");
                    actions.resetForm();
                    form.resetFields();
                    dispatch(setProducts({ products: [res.data] }));
                })
                .catch((err) => console.log(err.data));
        },
    });
    console.log(formik.values);
    return (
        <>
            <Form
                form={form}
                initialValues={formik.values}
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
