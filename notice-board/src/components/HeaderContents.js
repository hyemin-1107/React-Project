import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ico_sun from "../images/ico_sun.png";

const HeaderContents = () => {
  const navigate = useNavigate();
  const navigateToBoard = () => {
    navigate("/notice-board");
  };
  const navigateToMain = () => {
    navigate("/");
  };
  return (
    <Header>
      <HeaderWrap>
        <LogoContents onClick={navigateToMain}>
          <LogoIco src={ico_sun} />
          <div>Daily Record</div>
        </LogoContents>
        <Gnb>
          <ul>
            <li onClick={navigateToBoard}>Board</li>
          </ul>
        </Gnb>
      </HeaderWrap>
    </Header>
  );
};

export default HeaderContents;

const Header = styled.header`
  display: flex;
  justify-content: center;
  height: 80px;

  background-color: #fff;
  border-bottom: 1px solid #888;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px,
    rgba(0, 0, 0, 0.1) 0px 5px 10px,
    0px 0px 0px;
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;

  width: 1000px;
  height: 80px;

  cursor: pointer;
`;

const LogoContents = styled.h1`
  display: flex;
  align-items: center;
  gap: 4px;
  div {
    font-size: 39px;

    color: #66bacf;

    -webkit-text-stroke: 1px #666;
    text-shadow: 3px 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

const LogoIco = styled.img`
  width: 36px;
`;

const Gnb = styled.nav`
  ul {
    display: flex;

    margin-right: 20px;

    font-size: 33px;
    font-weight: 600;

    li {
      display: flex;
      align-items: center;

      height: 80px;

      font-size: 39px;
      color: #66bacf;

      -webkit-text-stroke: 1px #666;
      text-shadow: 3px 4px 6px rgba(0, 0, 0, 0.2);

      cursor: pointer;
    }
  }
`;
