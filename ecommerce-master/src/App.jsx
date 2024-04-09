import { lazy, useState } from "react";
import "./App.css";
import { Suspense } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const PrivateRoute = lazy(() => import("../utils/PrivateRoute"));
import Loading from "./components/Loading";
import Cookies from "js-cookie";
import { Provider } from "react-redux";
import store from "./store/store.js";
import SignUP from "./pages/SignUp.jsx";
import MyOrders from "./pages/MyOrders.jsx";
// import Protected from "../utils/Protected";
function App() {
  function checkStatus() {
    const token = Cookies.get("token");
    if (!token) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUP/>}/>
              <Route path="/myorders" element={<MyOrders/>}/>


              {/* Protected Routes  */}
              {/* <Route element={<PrivateRoute checkStatus={checkStatus} />}> */}
                <Route path="/home" element={<Home />} />
              {/* </Route> */}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
