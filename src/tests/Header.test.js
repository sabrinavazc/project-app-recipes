import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

describe('Testando o componente `<Header />`', () => {
  const profileId = 'profile-top-btn';
  const searchId = 'search-top-btn';
  const pageTitleId = 'page-title';
  const searchBar = 'search-input';
  test('1 - Teste se o componente renderiza corretamente', () => {
    render(<Header title="Teste" />);

    const search = screen.getByTestId(searchId);
    const profile = screen.getByTestId(profileId);
    const pageTitle = screen.getByTestId(pageTitleId);

    expect(search).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Teste');
  });

  test('2 - Teste se passar false para o  showSearchIcon nao renderiza ', () => {
    render(<Header showSearchIcon={ false } title="Test Title" />);
    const searchIcon = screen.queryByAltText('search icon');
    expect(searchIcon).toBeNull();
  });

  test('3 - Teste se ao clicar no icone redireciona para o profile ', async () => {
    render(
      <BrowserRouter>
        <Header title="Teste" />
      </BrowserRouter>,
    );
    const profile = screen.getByTestId(profileId);
    expect(profile).toBeInTheDocument();

    act(() => {
      fireEvent.click(profile);
    });

    await waitFor(() => {
      expect(window.location.pathname).toBe('/profile');
    });
  });

  test('4 - Testa se inicialmente a barra de pesquisa nao aparece na tela', () => {
    render(<Header title="Teste" />);
    const searchInput = screen.queryByTestId(searchBar);
    expect(searchInput).toBeNull();
  });

  test('5 - Testa se quando clica no botao de pesquisa, a barra de pesquisa aparece na tela', () => {
    render(<Header title="Teste" />);
    const searchButton = screen.getByTestId(searchId);
    fireEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchBar);
    expect(searchInput).toBeInTheDocument();
  });

  test('6 - Testa se quando clicado no botao pela segunda vez, a barra de pesquisa desaparece', () => {
    render(<Header title="Test" />);
    const searchButton = screen.getByTestId(searchId);
    fireEvent.click(searchButton);
    fireEvent.click(searchButton);
    const searchInput = screen.queryByTestId(searchBar);
    expect(searchInput).toBeNull();
  });
});
