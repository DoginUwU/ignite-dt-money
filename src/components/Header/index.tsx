import React from 'react';
import logoImg from '../../assets/logo.svg';

import { Container, Content } from "./styles";

interface HeaderProps { 
  onClickNewTransaction: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClickNewTransaction }) => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type="button" onClick={onClickNewTransaction}>
          Nova transação
        </button>
      </Content>
    </Container>
  );
};

export { Header };