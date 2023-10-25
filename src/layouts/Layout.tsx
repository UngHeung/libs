import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import App from "../App";
import styled from "styled-components";

const Layout = () => {
  return (
    <>
      <Header />
      <StyledMain>
        <App />
      </StyledMain>
      <Footer />
    </>
  );
};

export default Layout;

const StyledMain = styled.main`
  width: 100vw;
  margin-top: 50px;
`;
