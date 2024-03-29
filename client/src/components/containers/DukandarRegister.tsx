import { Form, Input, Button } from "antd";
import { useFormik } from "formik";
import DukandarInterface from "../../types/DukandarInterface";
import { Row, Col, Card } from "antd";
import axios from "axios";
import dukandarAPI from "../../api/dukandar";
const { register } = dukandarAPI;

const initialValues: DukandarInterface = {
    name: "",
    dob: undefined,
    username: "",
    password: "",
    email_id: "",
    phone_no: "",
    city: "",
    state: "",
    zip_postcode: 0,
    country: "",
    line_1: "",
    line_2: "",
};

const DukandarRegister = () => {
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            axios
                .post(register, {
                    ...values,
                })
                .then((data) => {
                    if (data.data.dukandar) alert("Now you can login");
                })
                .catch((err) => {
                    if (err.response && err.response.data) alert(err.response.data.error);
                });
        },
    });
    return (
        <Row className="anm">
            <Col sm={{ span: 16, offset: 4 }} xs={{ span: 24 }}>
                <Card style={{ boxShadow: "#36363657 4px 4px 4px, #cacaca59 -2px -2px 4px" }} title="Register">
                    <Form onFinish={formik.handleSubmit}>
                        <Form.Item
                            label={<span style={{ display: "inline-block", textAlign: "left", minWidth: "100px" }}>Name</span>}
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your name!",
                                },
                            ]}
                        >
                            <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        </Form.Item>
                        <Form.Item
                            label={<span style={{ display: "inline-block", textAlign: "left", minWidth: "100px" }}>Email Id</span>}
                            name="email_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email id!",
                                },
                            ]}
                        >
                            <Input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        </Form.Item>
                        <Form.Item
                            label={<span style={{ display: "inline-block", textAlign: "left", minWidth: "100px" }}>Username</span>}
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username !",
                                },
                            ]}
                        >
                            <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        </Form.Item>
                        <Form.Item
                            label={<span style={{ display: "inline-block", textAlign: "left", minWidth: "100px" }}>Phone Number</span>}
                            name="phone_no"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your phone number",
                                },
                            ]}
                        >
                            <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        </Form.Item>
                        <Row>
                            <Col xs={{ span: 8 }}>
                                <Form.Item
                                    label={<span style={{ display: "inline-block", textAlign: "left", minWidth: "100px" }}>City</span>}
                                    name="city"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your city",
                                        },
                                    ]}
                                >
                                    <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 8 }}>
                                <Form.Item
                                    label={<span style={{ display: "inline-block", textAlign: "left", minWidth: "100px" }}>State</span>}
                                    name="state"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your State",
                                        },
                                    ]}
                                >
                                    <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 8 }}>
                                <Form.Item
                                    label={<span style={{ display: "inline-block", textAlign: "left", minWidth: "100px" }}>Zip Code</span>}
                                    name="zip_postcode"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your zip code",
                                        },
                                    ]}
                                >
                                    <Input type="number" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            label={<span style={{ display: "inline-block", textAlign: "left", minWidth: "100px" }}>Country</span>}
                            name="country"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your country",
                                },
                            ]}
                        >
                            <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ display: "inline-block", textAlign: "left", minWidth: "100px" }}>Password</span>}
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 10,
                                span: 4,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                REGISTER
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default DukandarRegister;
