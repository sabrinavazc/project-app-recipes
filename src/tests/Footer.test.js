import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer';

describe('Footer', () => {
  it('deve renderizar o componente Footer.js', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    const footerElement = screen.getByTestId('footer');
    const mealsButton = screen.getByTestId('meals-bottom-btn');
    const drinksButton = screen.getByTestId('drinks-bottom-btn');

    expect(footerElement).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
    expect(drinksButton).toBeInTheDocument();
  });
});
