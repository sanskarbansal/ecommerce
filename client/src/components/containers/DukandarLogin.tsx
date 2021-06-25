import { Form, Input, Button } from "antd";
import { useFormik } from "formik";
import { Row, Col, Card } from "antd";

const initialValues: { username: string; password: string } = {
    username: "",
    password: "",
};

const DukandarLogin = () => {
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            console.log(values);
        },
    });
    return (
        <Row className="anm">
            <Col sm={{ span: 16, offset: 4 }} xs={{ span: 24 }}>
                <Card title="Register">
                    <Form onFinish={formik.handleSubmit}>
                        <Form.Item
                            style={{ minWidth: "300px" }}
                            label={<span style={{ display: "inline-block", textAlign: "left", minWidth: "100px" }}>Username</span>}
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username !",
                                },
                            ]}
                        >
                            <Input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        </Form.Item>

                        <Form.Item
                            style={{ minWidth: "300px" }}
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
                            style={{ minWidth: "300px" }}
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default DukandarLogin;
