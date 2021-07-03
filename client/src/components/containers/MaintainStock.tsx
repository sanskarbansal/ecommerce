import { Form, Input, Button, Row, Select, Col } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import axios from "axios";
import api from "../../api/dukandar";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
const { Option } = Select;

interface product {
    id: string;
    name: string;
}

const MaintainStock = () => {
    const [productNames, setProductNames]: [product | [], any] = useState([]);
    const [form] = useForm();
    useEffect(() => {
        axios
            .get(api.productNames)
            .then((res) => {
                setProductNames(res.data.products);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }, []);
    const onFinish = (values: any) => {
        console.log(values);
        axios
            .post(api.maintainStock, values)
            .then((res) => {
                alert(res.data.message);
                form.resetFields();
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    return (
        <Form name="dynamic_form_nest_item" form={form} onFinish={onFinish} autoComplete="off">
            <Form.List name="productIds">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            wrapperCol={{ span: 23 }}
                                            {...restField}
                                            name={[name, "id"]}
                                            fieldKey={[fieldKey, "id"]}
                                            rules={[{ required: true, message: "Missing Product Name" }]}
                                        >
                                            <Select
                                                showSearch
                                                placeholder="Select a Product"
                                                optionFilterProp="children"
                                                filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                {productNames.map(({ id, name }) => (
                                                    <Option key={id} value={id}>
                                                        {name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={11}>
                                        <Form.Item
                                            wrapperCol={{ span: 24 }}
                                            {...restField}
                                            name={[name, "value"]}
                                            fieldKey={[fieldKey, "value"]}
                                            rules={[{ required: true, message: "Missing Product Quantity" }]}
                                        >
                                            <Input type="number" placeholder="Add Quantity" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={1}>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Col>
                                </Row>
                            </>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => {
                                    for (let i = 0; i < 4; i++) add();
                                }}
                                block
                                icon={<PlusOutlined />}
                            >
                                Add field
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default MaintainStock;
