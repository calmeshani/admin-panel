import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import Logo from "../../Images/Logo.png";
import "../AppHeader/index.css";
import { getComments, getOrders } from "../../API";
import { useState, useEffect } from "react";
import Item from "antd/es/list/Item";

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
  return (
    <div className="AppHeader">
      <Image width={50} src={Logo}></Image>
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
        title="comments"
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
        title="notifications"
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
