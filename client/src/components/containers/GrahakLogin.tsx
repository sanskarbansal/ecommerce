import { Form, Input, Button } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginGrahak } from "../../redux/action-creators/grahak";

const GrahakLogin = () => {
    const dispatch = useDispatch();
    const onFinish = (values: any) => {
        dispatch(loginGrahak(values));
    };

    const onFinishFailed = (errorInfo: any) => {};

    return (
        <Form
            style={{ marginTop: 10 }}
            name="basic"
            labelCol={{
                offset: 5,
            }}
            wrapperCol={{
                span: 14,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Please input your username!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 11,
                    span: 2,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default GrahakLogin;
