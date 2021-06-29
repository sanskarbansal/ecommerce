import { useDispatch, useSelector } from "react-redux";
import { List, Avatar, Space } from "antd";
import axios from "axios";
import api from "../../api/dukandar";
import { setProducts } from "../../redux/action-creators/dukandar";
import { baseUrl, url } from "../../api/baseUrl";

export default function Products() {
    const dukandar = useSelector((state: any) => state.dukandar);
    const dispatch = useDispatch();
    let { totalPages, products } = dukandar;
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    axios
                        .get(api.products(1, page), {
                            withCredentials: true,
                        })
                        .then((res) => {
                            dispatch(setProducts(res.data));
                        });
                },
                total: totalPages,
                pageSize: 1,
            }}
            dataSource={products}
            footer={
                <div>
                    <b>ant design</b> footer part
                </div>
            }
            renderItem={(item: any) => (
                <List.Item key={item.id} extra={<img width={272} alt="logo" src={url + "/products/" + item.imageName} />}>
                    <List.Item.Meta title={<a href={item.name}>{item.name}</a>} description={item.description} />
                    {item.content}
                </List.Item>
            )}
        />
    );
}
