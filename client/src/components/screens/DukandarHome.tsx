import React from "react";
import { useState } from "react";
import DukandarRegister from "../containers/DukandarRegister";
import { Row, Col, Radio, Typography } from "antd";
import DukandarLogin from "../containers/DukandarLogin";

export default function DukandarHome() {
    const [isLogin, setLogin] = useState(false);
    return (
        <>
            <Typography.Title level={1} style={{ textAlign: "center", marginBottom: 20 }}>
                <span style={{ background: "white", boxShadow: "#36363657 4px 4px 4px, #cacaca59 -2px -2px 4px", padding: "10px 40px" }}>Dukandar Portal</span>
            </Typography.Title>
            <div
                style={{
                    zIndex: -1000,
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                    bottom: "0px",
                    right: "0px",
                    background: "url(http://localhost:3000/4706264.jpg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "700px",
                    backgroundPosition: "0px 45%",
                }}
            ></div>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "nowrap", alignItems: "center", minHeight: "100vh" }}>
                <Row style={{ minWidth: "100vw" }}>
                    <Col md={{ span: 8 }} sm={{ span: 1 }}></Col>
                    <Col md={{ span: 16 }} sm={{ span: 24 }}>
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
                    </Col>
                </Row>
            </div>
        </>
    );
}
