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
    series 
  } = useSeries();

  // Memoize filtered series to prevent unnecessary recalculations
  const filteredSeries = useMemo(() => getFilteredSeries(), [getFilteredSeries]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className={styles.listPage}>
      <div className={styles.header}>
        <h1>📋 My Series Collection</h1>
        <p>Manage and browse your watched series</p>
      </div>

      {series.length > 0 && (
        <div className={styles.controls}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search by title, director, category, or production company..."
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

      <SerieList series={filteredSeries} />
    </div>
  );
};

export default List;