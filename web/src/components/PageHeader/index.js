import React from 'react';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function HeaderList({ title, children }) {
  return <Container>{children}</Container>;
}

HeaderList.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
};

HeaderList.defaultProps = {
  children: null,
};
