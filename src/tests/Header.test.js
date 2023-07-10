import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

describe('Testando o componente `<Header />`', () => {
  const profileId = 'profile-top-btn';
  const searchId = 'search-top-btn';
  const pageTitleId = 'page-title';
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
});
