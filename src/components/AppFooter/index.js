import { Typography } from "antd";
import "../AppFooter/index.css";

const AppFooter = () => {
  return (
    <div className="AppFooter">
      <Typography.Link href="tel:+123456789">+123456789</Typography.Link>
      <Typography.Link href="https://www.google.com/" target={"_blank"}>
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="https://www.google.com/" target={"_blank"}>
        Terms and conditions
      </Typography.Link>
    </div>
  );
};

export default AppFooter;
