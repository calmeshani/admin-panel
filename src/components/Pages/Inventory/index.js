import { Avatar, Card, Rate, Space, Typography } from "antd";
import { getInventory } from "../../../API";
import { useState, useEffect } from "react";
import { Table } from "antd";

const Inventory = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInventory().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Inventory</Typography.Title>
        <Table
          style={{ width: 1300 }}
          columns={[
            {
              title: "Tumbnail",
              dataIndex: "thumbnail",
              render: (link) => {
                return <Avatar src={link} />;
              },
            },
            { title: "Title", dataIndex: "title" },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => <span>${value}</span>,
            },
            { title: "Discount", dataIndex: "discountPercentage" },
            { title: "Stock", dataIndex: "stock" },
            { title: "Brand", dataIndex: "brand" },
            {
              title: "Rating",
              dataIndex: "rating",
              render: (rating) => {
                return <Rate value={rating} allowHalf disabled />;
              },
            },
          ]}
          loading={loading}
          dataSource={dataSource}
          pagination={{ pageSize: 5 }}
        ></Table>
      </Space>
    </div>
  );
};
export default Inventory;
