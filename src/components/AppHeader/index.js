import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { BellFilled, MailOutlined } from "@ant-design/icons";
import { getComments, getOrders } from "../../API";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../../Images/Logo.png";
import "../AppHeader/index.css";

const AppHeader = () => {
  const [comment, setComment] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    getComments().then((res) => {
      setComment(res.comments);
    });
  }, []);
  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);
  const navigate = useNavigate();
  return (
    <div className="AppHeader">
      <Image
        width={50}
        style={{ cursor: "pointer" }}
        src={Logo}
        preview={false}
        onClick={() => {
          navigate("/");
        }}
      ></Image>
      <Typography.Title>Funwood Dashboard</Typography.Title>
      <Space>
        <Badge count={comment.length} dot>
          <MailOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
        <Badge count={orders.length} dot>
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={() => {
              setNotificationOpen(true);
            }}
          />
        </Badge>
      </Space>
      <Drawer
        title="Comments"
        open={commentsOpen}
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={comment}
          renderItem={(Item) => {
            return <List.Item>{Item.body}</List.Item>;
          }}
        ></List>
      </Drawer>
      <Drawer
        title="Notifications"
        open={notificationOpen}
        onClose={() => {
          setNotificationOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={orders}
          renderItem={(Item) => {
            return (
              <List.Item>
                <Typography.Text strong>{Item.title}</Typography.Text> has been
                ordered!
              </List.Item>
            );
          }}
        ></List>
      </Drawer>
    </div>
  );
};

export default AppHeader;
