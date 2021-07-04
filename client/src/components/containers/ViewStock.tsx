import { Table, Input, Space, Button } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../api/dukandar";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useRef } from "react";

export default function ViewStock() {
    const [products, setProducts] = useState([]);
    const searchInput: any = useRef(null);
    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {};
    const [state, setState] = useState({
        searchText: "",
        searchedColumn: "",
    });
    const handleReset = (clearFilters: any) => {
        clearFilters();
        setState({ ...state, searchText: "" });
    };
    const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
        confirm();
        setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    const columns = [
        {
            title: "Product Id",
            dataIndex: "id",
        },
        {
            title: "Product Name",
            dataIndex: "name",

            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={searchInput}
                        placeholder={`Search name`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, "name")}
                        style={{ marginBottom: 8, display: "block" }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, "name")}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                            Reset
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                confirm({ closeDropdown: false });
                                setState({
                                    searchText: selectedKeys[0],
                                    searchedColumn: "name",
                                });
                            }}
                        >
                            Filter
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
            onFilter: (value: any, record: any) => (record["name"] ? record["name"].toString().toLowerCase().includes(value.toLowerCase()) : ""),
            onFilterDropdownVisibleChange: (visible: any) => {
                if (visible) {
                    setTimeout(() => searchInput.current.select(), 100);
                }
            },
            render: (text: any) =>
                state.searchedColumn === "name" ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                        searchWords={[state.searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ""}
                    />
                ) : (
                    text
                ),
        },
        {
            title: "Stock",
            dataIndex: "inStock",
            sorter: {
                compare: (a: any, b: any) => a.inStock - b.inStock,
                multiple: 2,
            },
        },
    ];

    useEffect(() => {
        axios
            .get(api.productNamesWithStock)
            .then((res) => {
                setProducts(res.data.products);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }, []);
    return <Table rowKey={(record) => record.id} columns={columns} dataSource={products} />;
}
