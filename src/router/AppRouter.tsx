import React from "react";
import Home from "../pages/home/Home";
import ImageUpload from "../pages/fileUpload/ImageUpload/ImageUpload";
import { Routes, Route } from "react-router-dom";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload">
          <Route path="image" element={<ImageUpload />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
