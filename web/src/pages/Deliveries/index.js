import React from 'react';

import { MdSearch, MdAdd } from 'react-icons/md';

import PageHeader from '~/components/PageHeader';
import { Container, Content } from './styles';

export default function Deliveries() {
  return (
    <>
      <Container>
        <Content>
          <PageHeader>
            <h1>Gerenciamento de Encomendas</h1>
            <div>
              <div>
                <MdSearch size={20} color="#999" />
                <input placeholder="Buscar por encomendas" />
              </div>
              <button type="button">
                <MdAdd size={20} color="#fff" />
                CADASTRAR
              </button>
            </div>
          </PageHeader>
        </Content>
      </Container>
    </>
  );
}
