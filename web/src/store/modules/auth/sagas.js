import { takeLatest, call, put, all } from 'redux-saga/effects';

import history from '~/services/history';
import { signInSuccess } from './actions';

import api from '~/services/api';

export function* signIn({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, 'sessions', {
    email,
    password,
  });

  const { token, user } = response.data;

  if (!user.admin) {
    console.tron.error('Usuário não autorizado');
    return;
  }

  yield put(signInSuccess(token, user));

  history.push('/deliveries');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
