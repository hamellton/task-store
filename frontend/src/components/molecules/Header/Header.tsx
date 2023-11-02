// src/components/Header/Header.tsx
import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #333; /* Цвет фона */
  color: #fff; /* Цвет текста */
  padding: 10px; /* Внутренние отступы */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 24px;
`;

const Menu = styled.div`
  display: flex;
  gap: 20px;
`;

const MenuItem = styled.div`
  font-size: 16px;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>My App</Logo>
      <Menu>
        <MenuItem>Products</MenuItem>
      </Menu>
      <Menu>
        <MenuItem>Account</MenuItem>
      </Menu>
    </HeaderContainer>
  );
};

export default Header;
