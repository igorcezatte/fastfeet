import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { Link } from 'react-router-dom';
import { Container, Content, Profile } from './styles';

import logo from '~/assets/logo_header.svg';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
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
            <strong>{profile.name}</strong>
            <Link type="button" onClick={handleSignOut}>
              sair do sistema
            </Link>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
