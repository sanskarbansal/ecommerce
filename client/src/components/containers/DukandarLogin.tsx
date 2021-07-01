import { Form, Input, Button } from "antd";
import { useFormik } from "formik";
import { Row, Col, Card } from "antd";
import { useDispatch } from "react-redux";
import { loginDukandar } from "../../redux/action-creators/dukandar";

const initialValues: { username: string; password: string } = {
    username: "",
    password: "",
};

const DukandarLogin = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            dispatch(loginDukandar(values));
        },
    });
    return (
        <Row className="anm">
            <Col sm={{ span: 16, offset: 4 }} style={{ padding: 12 }} xs={{ span: 24 }}>
                <Card style={{ boxShadow: "#36363657 4px 4px 4px, #cacaca59 -2px -2px 4px" }} title="Register">
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
                            <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
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
