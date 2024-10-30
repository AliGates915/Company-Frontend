/* eslint-disable react/react-in-jsx-scope */
import "./index.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Layout from "../src/layout/Layout";


import ComapnyInfo from "./pages/services/CompanyInfo";
import Head from "./pages/services/Head";
import SubHead from "./pages/services/SubHead";
import AccountHead from "./pages/services/AccountHead";
import ItemOpening from "./pages/services/ItemOpeningBal";
import JournalVoucher from "./pages/services/JournalVoucher";



function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

  
    // If no user or no authentication cookie, redirect to login
    if (!user ) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            
            {/* services */}
            <Route
              path="info"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ComapnyInfo />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="head"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Head />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="sub-head"
              element={
                <ProtectedRoute>
                  <Layout>
                    <SubHead />
                  </Layout>
                </ProtectedRoute>
              }
            />
             <Route
              path="account-head"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AccountHead />
                  </Layout>
                </ProtectedRoute>
              }
            />
             <Route
              path="item-balance"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ItemOpening />
                  </Layout>
                </ProtectedRoute>
              }
            />
             <Route
              path="voucher"
              element={
                <ProtectedRoute>
                  <Layout>
                    <JournalVoucher />
                  </Layout>
                </ProtectedRoute>
              }
            />
          

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
