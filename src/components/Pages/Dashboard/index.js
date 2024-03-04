import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  getCustomers,
  getInventory,
  getOrders,
  getRevenue,
} from "../../../API";
import "../Dashboard/index.css";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [orders, setOrders] = useState(0);
  const [Inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [Revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.total);
    });
    getInventory().then((res) => {
      setInventory(res.total);
    });
    getCustomers().then((res) => {
      setCustomers(res.total);
    });
    getRevenue().then((res) => {
      setRevenue(res.total);
    });
  }, []);

  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Dashboard</Typography.Title>
        <Space direction="horizontal">
          <DashboardCard
            icon={
              <ShoppingCartOutlined
                style={{
                  color: "red",
                  backgroundColor: "rgba(225,0,0,0.25)",
                  borderRadius: 20,
                  fontSize: 15,
                  padding: 8,
                }}
              />
            }
            title={"Orders"}
            value={orders}
          />
          <DashboardCard
            icon={
              <ShoppingOutlined
                style={{
                  color: "orange",
                  backgroundColor: "rgba(225,225,0,0.25)",
                  borderRadius: 20,
                  fontSize: 15,
                  padding: 8,
                }}
              />
            }
            title={"Inventory"}
            value={Inventory}
          />
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "purple",
                  backgroundColor: "rgba(225,0,225,0.25)",
                  borderRadius: 20,
                  fontSize: 15,
                  padding: 8,
                }}
              />
            }
            title={"Customers"}
            value={customers}
          />
          <DashboardCard
            icon={
              <DollarOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,225,225,0.25)",
                  borderRadius: 20,
                  fontSize: 15,
                  padding: 8,
                }}
              />
            }
            title={"Revenue"}
            value={Revenue}
          />
        </Space>
        <Space>
          <RecentOrders />
          <DashboardChart />
        </Space>
      </Space>
    </div>
  );
};

const DashboardCard = ({ icon, title, value }) => {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
};

const RecentOrders = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products.splice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      <Table
        columns={[
          { id: 1 },
          { title: "Title", dataIndex: "title" },
          { title: "Quantity", dataIndex: "quantity" },
          { title: "Price", dataIndex: "discountedPrice" },
        ]}
        pagination={false}
        loading={loading}
        dataSource={dataSource}
      ></Table>
    </>
  );
};

const DashboardChart = () => {
  const [revenueData, setRevenueData] = useState({ labels: [], datasets: [] });
  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => {
        return `user-${cart.userId}`;
      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
      });
      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: "red",
          },
        ],
      };
      setRevenueData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar options={options} data={revenueData} />
    </Card>
  );
};
export default Dashboard;
