import React from 'react';
import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { Link } from 'react-router-dom';
import { Container, Content, Profile } from './styles';

import logo from '~/assets/logo_header.svg';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

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
            <Link type="button" onClick={handleSignOut}>
              sair do sistema
            </Link>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
