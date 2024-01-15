import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// screens
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import AdminScreen from "./screens/AdminScreen.jsx";
import AdminLoginScreen from "./screens/AdminLoginScreen.jsx";
import AdminRegisterScreen from "./screens/AdminRegisterScreen.jsx";
import EditUserScreen from "./screens/EditUserScreen.jsx";
import AddUserScreen from "./screens/AddUserScreen.jsx";

// components
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
