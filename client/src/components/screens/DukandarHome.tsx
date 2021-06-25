import React from "react";
import { useState } from "react";
import DukandarRegister from "../containers/DukandarRegister";
import { Row, Col, Radio, Typography } from "antd";
import DukandarLogin from "../containers/DukandarLogin";

export default function DukandarHome() {
    const [isLogin, setLogin] = useState(true);
    return (
        <>
            <Typography.Title level={1} style={{ textAlign: "center" }}>
                Dukandar Portal
            </Typography.Title>
            {isLogin ? <DukandarLogin /> : <DukandarRegister />}
            <Row justify="center" style={{ marginTop: 20 }}>
                <Col>
                    <Radio.Group value={isLogin}>
                        <Radio.Button value={true} onClick={() => setLogin(true)}>
                            LOGIN
                        </Radio.Button>
                        <Radio.Button value={false} onClick={() => setLogin(false)}>
                            REGISTER
                        </Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
        </>
    );
}
