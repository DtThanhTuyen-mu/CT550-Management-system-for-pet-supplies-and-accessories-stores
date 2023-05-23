// import './App.css';

import Home from "./pages/home/Home";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Product from "./pages/product/Product";
import User from "./pages/user/User";
import Customer from "./pages/customer/Customer";
import DetailUser from "./pages/detailuser/DetailUser";
import CreateUser from "./pages/createUser/CreateUser";
import EditProduct from "./pages/editproduct/EditProduct";
import Schedule from "./pages/schedule/Schedule";
import { staffInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Service from "./pages/iservice/Service";
import CreateProduct from "./pages/createProduct/CreateProduct";
import EditUser from "./components/edituser/EditUser";
import EditService from "./pages/editservice/EditService";
import CreateService from "./pages/createService/CreateService";
import Bill from "./pages/bill/Bill";
import Statistical from "./pages/statistical/Statistical";
import StatisticalCus from "./pages/statisticalCus/StatisticalCus"
function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/admin/login" replace />}>
            {/* <Route path="login" element={<Login />}></Route> */}
          </Route>
          <Route path="/admin/*">
            <Route path="login">
              <Route index element={<Login />}></Route>
            </Route>
            <Route path="dashboard">
              <Route index element={<Home />}></Route>
            </Route>
            <Route path="list">
              <Route index element={<List />}></Route>
            </Route>
            <Route path="product">
              <Route index element={<Product />}></Route>
              <Route path=":productId" element={<Product />}></Route>
              <Route path="create" element={<CreateProduct />}></Route>
              <Route path="editproduct/:id" element={<EditProduct />}></Route>
            </Route>
            <Route path="service">
              <Route index element={<Service />}></Route>
              <Route
                path="create"
                element={<CreateService title="Thêm dịch vụ mới" />}
              ></Route>
              <Route path="editservice/:id" element={<EditService />}></Route>
            </Route>
            <Route path="schedule">
              <Route index element={<Schedule />}></Route>
            </Route>
            <Route path="bill">
              <Route index element={<Bill />}></Route>
            </Route>
            <Route path="statistical">
              <Route index element={<Statistical />}></Route>
            </Route>
            <Route path="customer">
              <Route index element={<Customer />}></Route>
              <Route
                path="statistical/:id/:name"
                element={<StatisticalCus title="Thêm nhân viên mới" />}
              />
            </Route>
            <Route path="detailuser">
              <Route index element={<DetailUser />}></Route>
            </Route>
            <Route path="user">
              <Route index element={<User />}></Route>
              <Route
                path="create"
                element={<CreateUser title="Thêm nhân viên mới" />}
              />
              <Route
                path="edituser/:id"
                element={<EditUser title="Chỉnh sửa thông tin" />}
              />
              <Route path=":userId" element={<DetailUser />}></Route>
            </Route>
            {/* <Route path="statistical">
              <Route index element={<Statistical />}> </Route>
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Home /> */}
      {/* <p>Lam nao co len nha</p> */}
    </div>
  );
}

export default App;
