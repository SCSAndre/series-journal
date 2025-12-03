/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api'; // Importa a configuração do Axios

const SeriesContext = createContext();

// Hook personalizado para usar o contexto
export const useSeries = () => {
  const context = useContext(SeriesContext);
  if (!context) {
    throw new Error('useSeries must be used within a SeriesProvider');
  }
  return context;
};

export const SeriesProvider = ({ children }) => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true); // Novo estado para carregamento
  const [error, setError] = useState(null);     // Novo estado para erros
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  // Carregar dados da API ao iniciar o componente
  useEffect(() => {
    fetchSeries();
  }, []);

  // Função para buscar séries na API (GET)
  const fetchSeries = async () => {
    setLoading(true);
    try {
      const response = await api.get('/series');
      setSeries(response.data);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar séries:', err);
      setError('Não foi possível carregar as séries. Verifique se a API está rodando.');
    } finally {
      setLoading(false);
    }
  };

  // Adicionar nova série (POST)
  const addSerie = async (serieData) => {
    try {
      // A API gera o ID, então mandamos os dados sem ID
      const response = await api.post('/series', serieData);
      
      // Atualizamos a lista local adicionando a resposta da API
      setSeries((prevSeries) => [...prevSeries, response.data]);
      return response.data;
    } catch (err) {
      console.error('Erro ao adicionar série:', err);
      throw err; // Lança o erro para ser tratado no componente (ex: exibir Toast)
    }
  };

  // Atualizar série existente (PUT)
  const updateSerie = async (id, updatedData) => {
    try {
      // Envia PUT para /series/:id com o corpo contendo os campos atualizados
      const response = await api.put(`/series/${id}`, updatedData);

      // Atualiza o estado local de forma segura
      setSeries((prevSeries) => 
        prevSeries.map(serie => (serie.id === id || String(serie.id) === String(id)) ? response.data : serie)
      );
      return response.data;
    } catch (err) {
      console.error('Erro ao atualizar série:', err);
      throw err;
    }
  };

  // Deletar série (DELETE)
  const deleteSerie = async (id) => {
    try {
      await api.delete(`/series/${id}`);
      // Remove do estado local
      setSeries((prevSeries) => prevSeries.filter(serie => serie.id !== id));
    } catch (err) {
      console.error('Erro ao deletar série:', err);
      throw err;
    }
  };

  // Obter uma única série (Busca no estado local para ser mais rápido)
  // Se não encontrar (ex: reload na página de edit), busca na API
  const getSerie = async (id) => {
    // Tenta achar no estado atual
    const existing = series.find(s => s.id === id || s.id === Number(id)); // API pode retornar ID como number
    if (existing) return existing;

    // Se não achar, busca na API
    try {
      const response = await api.get(`/series/${id}`);
      return response.data;
    } catch (err) {
      console.error('Erro ao buscar série específica:', err);
      return null;
    }
  };

  // --- FILTROS E ESTATÍSTICAS (Lógica mantida no Frontend) ---

  const getFilteredSeries = () => {
    const searchLower = (searchTerm || '').toLowerCase();
    
    // Garante que series é um array antes de filtrar
    if (!Array.isArray(series)) return [];

    let filtered = series.filter((serie) => {
      const title = (serie.title || '').toLowerCase();
      const director = (serie.director || '').toLowerCase();
      const production = (serie.productionCompany || '').toLowerCase();
      const category = (serie.category || '').toLowerCase();
      return (
        title.includes(searchLower) ||
        director.includes(searchLower) ||
        production.includes(searchLower) ||
        category.includes(searchLower)
      );
    });

    // Ordenação
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'numberOfSeasons') {
        aValue = parseInt(aValue || 0, 10);
        bValue = parseInt(bValue || 0, 10);
      }

      if (sortBy === 'releaseDate' || sortBy === 'dateWatched') {
        aValue = aValue ? new Date(aValue) : new Date(0);
        bValue = bValue ? new Date(bValue) : new Date(0);
      }

      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      if (aValue === bValue) return 0;

      const asc = aValue > bValue ? 1 : -1;
      return sortOrder === 'asc' ? asc : -asc;
    });

    return filtered;
  };

  const getStatistics = () => {
    if (!series.length) return {
      totalSeries: 0, totalSeasons: 0, categoryCount: {}, favoriteCategory: 'N/A', recentlyWatched: []
    };

    const totalSeries = series.length;
    const totalSeasons = series.reduce((sum, serie) => sum + parseInt(serie.numberOfSeasons || 0), 0);
    
    const categoryCount = {};
    series.forEach(serie => {
      if(serie.category) {
        categoryCount[serie.category] = (categoryCount[serie.category] || 0) + 1;
      }
    });
    
    const favoriteCategory = Object.keys(categoryCount).length
      ? Object.keys(categoryCount).reduce((a, b) =>
          (categoryCount[a] > categoryCount[b] ? a : b)
        )
      : 'N/A';

    const sortedByDate = [...series].sort((a, b) => 
      new Date(b.dateWatched || 0) - new Date(a.dateWatched || 0)
    );
    const recentlyWatched = sortedByDate.slice(0, 5);

    return {
      totalSeries,
      totalSeasons,
      categoryCount,
      favoriteCategory,
      recentlyWatched,
    };
  };

  const value = {
    series,
    loading,      // Exportando estado de loading
    error,        // Exportando estado de erro
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    addSerie,
    updateSerie,
    deleteSerie,
    getSerie,
    getFilteredSeries,
    getStatistics,
    fetchSeries, // Útil se quiser forçar recarregamento manual
  };

  return (
    <SeriesContext.Provider value={value}>
      {children}
    </SeriesContext.Provider>
  );
};

SeriesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};