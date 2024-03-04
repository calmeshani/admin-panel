import { Space, Typography } from "antd";
import { getOrders } from "../../../API";
import { useState, useEffect } from "react";
import { Table } from "antd";

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Orders</Typography.Title>
        <Table
          style={{ width: 1300 }}
          columns={[
            { title: "Title", dataIndex: "title" },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => <span>${value}</span>,
            },
            { title: "Quantity", dataIndex: "quantity" },
          ]}
          loading={loading}
          dataSource={dataSource}
          pagination={{ pageSize: 5 }}
        ></Table>
      </Space>
    </div>
  );
};
export default Orders;
