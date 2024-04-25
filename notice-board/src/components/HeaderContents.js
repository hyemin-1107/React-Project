import React from "react";
import styled from "styled-components";
import ico_logo from "../images/ico_logo.png";

const HeaderContents = () => {
  return (
    <Header>
      <HeaderWrap>
        <Logo>
          <LogoIco src={ico_logo} />
          <div>Daily Record</div>
        </Logo>
        <Nav>
          <ul>
            <li>Board</li>
          </ul>
        </Nav>
      </HeaderWrap>
    </Header>
  );
};

export default HeaderContents;

const Header = styled.header`
  height: 80px;

  background-color: #66bacf;
  border-bottom: 2px solid #444;
  box-shadow:
    rgba(0, 0, 0, 0.2) 0px 1px 3px,
    rgba(0, 0, 0, 0.2) 0px 5px 10px,
    0px 0px 0px;
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 0 250px;

  height: 80px;
`;

const Logo = styled.h1`
  display: flex;
  align-items: center;
  gap: 11px;

  div {
    color: #fff;

    font-size: 33px;
    text-shadow: 3px 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

const LogoIco = styled.img`
  width: 36px;
`;

const Nav = styled.nav`
  ul {
    display: flex;

    gap: 53px;

    font-size: 33px;
    font-weight: 600;

    li {
      display: flex;
      align-items: center;

      height: 80px;

      color: #fff;
      text-shadow: 3px 4px 6px rgba(0, 0, 0, 0.2);
    }
  }
`;
