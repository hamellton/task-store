import React from "react";
import styled, { css } from "styled-components";
import { Colors } from "../../../types/baseTypes";
import useDevice, { DeviceTypes } from "../../../hooks/useDevice";

const HeaderContainer = styled.header<{ device?: DeviceTypes }>`
  background-color: ${Colors.primaryBackground};
  color: ${Colors.white};
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 100%;
  ${(props) =>
    props.device === DeviceTypes.MOBILE &&
    css`
      text-align: center;
      padding: 10px 30px;
    `}
`;

const Logo = styled.div<{ device?: DeviceTypes }>`
  color: ${Colors.white};
  font-size: 24px;
  font-weight: bold;
  ${(props) =>
    props.device === DeviceTypes.MOBILE &&
    css`
      font-size: 18px;
    `}
`;

const Menu = styled.div<{ device?: DeviceTypes }>`
  font-size: 18px;
  ${(props) =>
    props.device === DeviceTypes.MOBILE &&
    css`
      font-size: 16px;
    `}
`;

const Login = styled.div<{ device?: DeviceTypes }>`
  font-size: 18px;
  ${(props) =>
    props.device === DeviceTypes.MOBILE &&
    css`
      font-size: 16px;
    `}
`;

const Header: React.FC = () => {
  const { device } = useDevice() ?? {};

  return (
    <HeaderContainer device={device}>
      <Logo device={device}>Logo</Logo>
      <Menu device={device}>Products</Menu>
      <Login device={device}>Login</Login>
    </HeaderContainer>
  );
};

export default Header;
