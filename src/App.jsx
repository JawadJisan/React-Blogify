import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import Profile from "./pages/Profile";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { useAuth } from "./hooks/useAuth";
import React, { useState, useEffect } from "react";
import PrivateRoutes from "./routes/PrivateRoutes";
import OtherProfile from "./pages/OtherProfile";

function App() {
  const { auth, setAuth } = useAuth();

  // console.log(auth);

  useEffect(() => {
    const storedUser = localStorage.getItem("LogedInUser");
    if (storedUser) {
      setAuth(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <body className="bg-[#030317] text-white">
        <Header />
        <Routes>
          {/* <Route element={<PrivateRoutes />}></Route> */}
          <Route
            element={
              <PrivateRoutes>
                <CreateBlog />
              </PrivateRoutes>
            }
            path="/createBlog"
          />
          <Route element={<HomePage />} path="/" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<RegisterPage />} path="/register" />
          <Route element={<BlogDetails />} path="/blogDetails/:id" />
          <Route element={<Profile />} path="/profile" />
          <Route element={<OtherProfile />} path="/profile/:id" />
        </Routes>
        <Footer />
      </body>
    </>
  );
}

export default App;
