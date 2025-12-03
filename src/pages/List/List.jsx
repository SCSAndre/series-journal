import { useMemo } from 'react';
import { useSeries } from '../../context/SeriesContext';
import SerieList from '../../components/SerieList/SerieList';
import styles from './List.module.css';

const List = () => {
  const { 
    getFilteredSeries, 
    searchTerm, 
    setSearchTerm, 
    sortBy, 
    setSortBy, 
    sortOrder, 
    setSortOrder,
    series,
    loading,     // Novo: vem do Contexto
    error,       // Novo: vem do Contexto
    fetchSeries  // Novo: para tentar carregar de novo em caso de erro
  } = useSeries();

  // Memoize filtered series to prevent unnecessary recalculations
  // getFilteredSeries already depends on internal state; we only need it as dependency
  const filteredSeries = useMemo(() => getFilteredSeries(), [getFilteredSeries]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // 1. Estado de Carregamento
  if (loading) {
    return (
      <div className={styles.listPage} style={{ textAlign: 'center', marginTop: '50px' }}>
        <div className={styles.header}>
          <h1>📋 My Series Collection</h1>
        </div>
        <div style={{ fontSize: '1.2rem', color: '#666' }}>
          ⏳ Loading your series library...
        </div>
      </div>
    );
  }

  // 2. Estado de Erro
  if (error) {
    return (
      <div className={styles.listPage} style={{ textAlign: 'center', marginTop: '50px' }}>
        <div className={styles.header}>
          <h1>📋 My Series Collection</h1>
        </div>
        <div style={{ color: '#d32f2f', marginBottom: '20px' }}>
          ⚠️ {error}
        </div>
        <button 
          onClick={fetchSeries}
          style={{ padding: '10px 20px', cursor: 'pointer', background: '#646cff', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.listPage}>
      <div className={styles.header}>
        <h1>📋 My Series Collection</h1>
        <p>Manage and browse your watched series</p>
      </div>

      {/* Só mostra os controles se tiver séries ou se estiver buscando */}
      {(series.length > 0 || searchTerm) && (
        <div className={styles.controls}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search by title, director, category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            {searchTerm && (
              <button 
                className={styles.clearButton}
                onClick={() => setSearchTerm('')}
              >
                ✕
              </button>
            )}
          </div>

          <div className={styles.sortControls}>
            <label htmlFor="sortBy">Sort by:</label>
            <select 
              id="sortBy"
              value={sortBy} 
              onChange={handleSortChange}
              className={styles.sortSelect}
            >
              <option value="title">Title</option>
              <option value="category">Category</option>
              <option value="director">Director</option>
              <option value="numberOfSeasons">Number of Seasons</option>
              <option value="releaseDate">Release Date</option>
              <option value="dateWatched">Date Watched</option>
            </select>

            <button 
              className={styles.sortOrderButton}
              onClick={toggleSortOrder}
              title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      )}

      {series.length > 0 && (
        <div className={styles.resultsInfo}>
          Showing {filteredSeries.length} of {series.length} series
          {searchTerm && ` for "${searchTerm}"`}
        </div>
      )}

      {series.length === 0 && !searchTerm && (
        <div style={{ textAlign: 'center', marginTop: '40px', color: '#888' }}>
          <p>No series found in the database.</p>
          <p>Go to "Register" to add your first one!</p>
        </div>
      )}

      <SerieList series={filteredSeries} />
    </div>
  );
};

export default List;