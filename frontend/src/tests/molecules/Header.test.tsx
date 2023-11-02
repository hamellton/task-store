import React from 'react';
import { render } from '@testing-library/react';
import Header from '../../components/molecules/Header/Header';

test('renders Header component', () => {
  const { getByText } = render(<Header />);
  const logoElement = getByText('My App');
  const productsElement = getByText('Products');
  const accountElement = getByText('Account');

  expect(logoElement).toBeInTheDocument();
  expect(productsElement).toBeInTheDocument();
  expect(accountElement).toBeInTheDocument();
});
