import React from "react";
import Nav from "./Nav";
import styled from "styled-components";

const Header = () => {
  return (
    <StyledHeader>
      <LogoH2>
        <img src="" alt="Logo" />
      </LogoH2>
      <Nav />
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 50px;
`;

const LogoH2 = styled.h2`
  width: 100px;
`;
