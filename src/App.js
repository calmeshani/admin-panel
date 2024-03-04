import "./App.css";
import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import SideMenu from "./components/SideMenu";
import { Space } from "antd";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Space className="SideMenuandAppContent">
        <SideMenu></SideMenu>
        <AppContent></AppContent>
      </Space>
      <AppFooter />
    </div>
  );
}

export default App;
