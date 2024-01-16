import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// screens
import HomeScreen from "./screens/user/HomeScreen.jsx";
import LoginScreen from "./screens/user/LoginScreen.jsx";
import RegisterScreen from "./screens/user/RegisterScreen.jsx";
import ProfileScreen from "./screens/user/ProfileScreen.jsx";
import AdminScreen from "./screens/admin/AdminScreen.jsx";
import AdminLoginScreen from "./screens/admin/AdminLoginScreen.jsx";
import AdminRegisterScreen from "./screens/admin/AdminRegisterScreen.jsx";
import EditUserScreen from "./screens/admin/EditUserScreen.jsx";
import AddUserScreen from "./screens/admin/AddUserScreen.jsx";

// components
import App from "./App.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminPrivateRoute from "./components/AdminPrivateRoute.jsx";

import store from "./store.js";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path="/admin-login" element={<AdminLoginScreen />} />
      <Route path="/admin-register" element={<AdminRegisterScreen />} />
      <Route path="" element={<AdminPrivateRoute />}>
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/edit-user" element={<EditUserScreen />} />
        <Route path="/add-user" element={<AddUserScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
