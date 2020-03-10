import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '../../assets/logo.svg';

// import { Container } from './styles';

const schema = Yup.object().shape({
  email: Yup.string().required('Insira seu e-mail'),
  password: Yup.string().required('Insira sua senha'),
});

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="FastFeet" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <label>SEU E-MAIL</label>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <label>SUA SENHA</label>
        <Input name="password" type="password" placeholder="*********" />
        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  );
}
