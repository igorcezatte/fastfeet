import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo_header.svg';
import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <Link to="/deliveries">ENCOMENDAS</Link>
          <Link to="/deliverymen">ENTREGADORES</Link>
          <Link to="/recipients">DESTINATÁRIOS</Link>
          <Link to="/problems">PROBLEMAS</Link>
        </nav>

        <aside>
          <Profile>
            <strong>Nome usuário logado</strong>
            <Link to="/">sair do sistema</Link>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
