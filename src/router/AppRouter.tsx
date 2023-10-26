import React from "react";
import Home from "../pages/home/Home";
import ImageUpload from "../pages/imageUpload/ImageUpload";
import { Routes, Route } from "react-router-dom";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload">
          <Route path="image" element={<ImageUpload limit={10} />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
