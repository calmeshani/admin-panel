import { Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Inventory from "../Pages/Inventory";
import Customers from "../Pages/Customers";
import Orders from "../Pages/Orders";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes For Side Menu Items */}
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
    </Routes>
  );
};

export default AppRoutes;
