/* eslint-disable react/react-in-jsx-scope */
import "./index.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

import Layout from "../src/layout/Layout";


import ComapnyInfo from "./pages/services/CompanyInfo";
import Head from "./pages/services/Head";
import SubHead from "./pages/services/SubHead";
import AccountHead from "./pages/services/AccountHead";
import ItemOpening from "./pages/services/ItemOpeningBal";
import JournalVoucher from "./pages/services/JournalVoucher";



function App() {
  const { darkMode } = useContext(DarkModeContext);



  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
               
                  <Home />
                
              }
            />
            
            {/* services */}
            <Route
              path="info"
              element={
                
                  <Layout>
                    <ComapnyInfo />
                  </Layout>
                
              }
            />
            <Route
              path="head"
              element={
                
                  <Layout>
                    <Head />
                  </Layout>
                
              }
            />
            <Route
              path="sub-head"
              element={
                
                  <Layout>
                    <SubHead />
                  </Layout>
              
              }
            />
             <Route
              path="account-head"
              element={
               
                  <Layout>
                    <AccountHead />
                  </Layout>
               
              }
            />
             <Route
              path="item-balance"
              element={
                
                  <Layout>
                    <ItemOpening />
                  </Layout>
                
              }
            />
             <Route
              path="voucher"
              element={
                
                  <Layout>
                    <JournalVoucher />
                  </Layout>
               
              }
            />
          

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
