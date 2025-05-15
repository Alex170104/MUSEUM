import { render, screen } from '@testing-library/react';
import Header from '../Header/Header.tsx';

test('affiche le bouton Accueil', () => {
  render(<Header />);
  expect(screen.getByText('Accueil')).toBeInTheDocument();
});