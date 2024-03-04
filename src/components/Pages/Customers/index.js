import { Avatar, Rate, Space, Typography } from "antd";
import { getCustomers } from "../../../API";
import { useState, useEffect } from "react";
import { Table } from "antd";

const Customers = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res.users);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Customers</Typography.Title>
        <Table
          style={{ width: 1300 }}
          columns={[
            {
              title: "Photo",
              dataIndex: "image",
              render: (link) => {
                return <Avatar src={link} />;
              },
            },
            { title: "First Name", dataIndex: "firstName" },
            { title: "Last Name", dataIndex: "lastName" },
            { title: "Age", dataIndex: "age" },
            { title: "Email", dataIndex: "email" },
            { title: "Phone", dataIndex: "phone" },
          ]}
          loading={loading}
          dataSource={dataSource}
          pagination={{ pageSize: 5 }}
        ></Table>
      </Space>
    </div>
  );
};
export default Customers;
