import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SerieForm from './SerieForm';

// Mock do Contexto (Simula as funções da API para o teste não precisar do backend real)
vi.mock('../../context/SeriesContext', () => ({
  useSeries: () => ({
    addSerie: vi.fn(),
    updateSerie: vi.fn(),
  }),
}));

describe('SerieForm Component', () => {
  it('should render all main input fields', () => {
    render(<SerieForm />);

    // Verifica se os campos existem na tela
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Seasons/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Director/i)).toBeInTheDocument();
    
    // Verifica se o botão de salvar existe
    expect(screen.getByRole('button', { name: /Add Series/i })).toBeInTheDocument();
  });
});