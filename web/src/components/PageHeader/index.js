import React from 'react';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function HeaderList({ children }) {
  return <Container>{children}</Container>;
}

HeaderList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

HeaderList.defaultProps = {
  children: null,
};
