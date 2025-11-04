/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

const SeriesContext = createContext();

// Custom hook to use the context
export const useSeries = () => {
  const context = useContext(SeriesContext);
  if (!context) {
    throw new Error('useSeries must be used within a SeriesProvider');
  }
  return context;
};

export const SeriesProvider = ({ children }) => {
  const [series, setSeries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const storedSeries = localStorage.getItem('seriesJournal');
      if (storedSeries) {
        const parsed = JSON.parse(storedSeries);
        if (Array.isArray(parsed)) {
          setSeries(parsed);
        }
      }
    } catch (err) {
      // If parsing fails, clear the corrupted data
      console.warn('Failed to parse seriesJournal from localStorage, clearing key.', err);
      localStorage.removeItem('seriesJournal');
    }
  }, []);

  // Save to localStorage whenever series changes
  useEffect(() => {
    localStorage.setItem('seriesJournal', JSON.stringify(series));
  }, [series]);

  // Add a new serie
  const addSerie = (serie) => {
    const newSerie = {
      ...serie,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setSeries([...series, newSerie]);
    return newSerie;
  };

  // Update an existing serie
  const updateSerie = (id, updatedSerie) => {
    setSeries(series.map(serie => 
      serie.id === id ? { ...updatedSerie, id, createdAt: serie.createdAt } : serie
    ));
  };

  // Delete a serie
  const deleteSerie = (id) => {
    setSeries(series.filter(serie => serie.id !== id));
  };

  // Get a single serie by id
  const getSerie = (id) => {
    return series.find(serie => serie.id === id);
  };

  // Filter series based on search term
  const getFilteredSeries = () => {
    const searchLower = (searchTerm || '').toLowerCase();
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

    // Sort the filtered results (stable comparator with equality returning 0)
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'numberOfSeasons') {
        aValue = parseInt(aValue, 10);
        bValue = parseInt(bValue, 10);
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

  // Get statistics
  const getStatistics = () => {
    const totalSeries = series.length;
    const totalSeasons = series.reduce((sum, serie) => sum + parseInt(serie.numberOfSeasons), 0);
    
    // Category distribution
    const categoryCount = {};
    series.forEach(serie => {
      categoryCount[serie.category] = (categoryCount[serie.category] || 0) + 1;
    });
    
    const favoriteCategory = Object.keys(categoryCount).length
      ? Object.keys(categoryCount).reduce((a, b) =>
          (categoryCount[a] > categoryCount[b] ? a : b)
        )
      : 'N/A';

    // Most recent watched
    const sortedByDate = [...series].sort((a, b) => 
      new Date(b.dateWatched) - new Date(a.dateWatched)
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

  // Load sample data
  const loadSampleData = () => {
    const sampleSeries = [
      {
        id: '1',
        title: 'Breaking Bad',
        numberOfSeasons: 5,
        releaseDate: '2008-01-20',
        director: 'Vince Gilligan',
        productionCompany: 'AMC',
        category: 'Drama',
        dateWatched: '2024-01-15',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Stranger Things',
        numberOfSeasons: 4,
        releaseDate: '2016-07-15',
        director: 'The Duffer Brothers',
        productionCompany: 'Netflix',
        category: 'Sci-Fi',
        dateWatched: '2024-02-20',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'The Office',
        numberOfSeasons: 9,
        releaseDate: '2005-03-24',
        director: 'Greg Daniels',
        productionCompany: 'NBC',
        category: 'Comedy',
        dateWatched: '2024-03-10',
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'Game of Thrones',
        numberOfSeasons: 8,
        releaseDate: '2011-04-17',
        director: 'David Benioff',
        productionCompany: 'HBO',
        category: 'Fantasy',
        dateWatched: '2023-12-05',
        createdAt: new Date().toISOString(),
      },
      {
        id: '5',
        title: 'The Crown',
        numberOfSeasons: 6,
        releaseDate: '2016-11-04',
        director: 'Peter Morgan',
        productionCompany: 'Netflix',
        category: 'Drama',
        dateWatched: '2024-01-28',
        createdAt: new Date().toISOString(),
      },
    ];
    setSeries(sampleSeries);
  };

  // Clear all data
  const clearAllData = () => {
    setSeries([]);
    localStorage.removeItem('seriesJournal');
  };

  const value = {
    series,
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
    loadSampleData,
    clearAllData,
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