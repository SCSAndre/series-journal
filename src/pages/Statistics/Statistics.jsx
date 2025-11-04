import { useMemo } from 'react';
import { useSeries } from '../../context/SeriesContext';
import styles from './Statistics.module.css';

const Statistics = () => {
  const { getStatistics, series } = useSeries();
  
  // Memoize statistics to prevent recalculation on every render
  const stats = useMemo(() => getStatistics(), [getStatistics]);

  // Memoize sorted category entries
  const categoryEntries = useMemo(
    () => {
      if (!stats.categoryCount) return [];
      return Object.entries(stats.categoryCount).sort((a, b) => b[1] - a[1]);
    },
    [stats.categoryCount]
  );

  if (series.length === 0) {
    return (
      <div className={styles.statistics}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📊</div>
          <h2>No Statistics Available</h2>
          <p>Start adding series to see your watching statistics!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.statistics}>
      <div className={styles.header}>
        <h1>📊 Your Watching Statistics</h1>
        <p>Insights about your series collection</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📺</div>
          <div className={styles.statValue}>{stats.totalSeries}</div>
          <div className={styles.statLabel}>Total Series</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🎬</div>
          <div className={styles.statValue}>{stats.totalSeasons}</div>
          <div className={styles.statLabel}>Total Seasons</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>⭐</div>
          <div className={styles.statValue}>{stats.favoriteCategory}</div>
          <div className={styles.statLabel}>Favorite Category</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📈</div>
          <div className={styles.statValue}>
            {stats.totalSeasons > 0 ? (stats.totalSeasons / stats.totalSeries).toFixed(1) : 0}
          </div>
          <div className={styles.statLabel}>Avg Seasons/Series</div>
        </div>
      </div>

      <div className={styles.section}>
        <h2>📊 Category Distribution</h2>
        <div className={styles.categoryChart}>
          {categoryEntries.map(([category, count]) => {
            const percentage = (count / stats.totalSeries) * 100;
            return (
              <div key={category} className={styles.categoryRow}>
                <div className={styles.categoryInfo}>
                  <span className={styles.categoryName}>{category}</span>
                  <span className={styles.categoryCount}>{count} series</span>
                </div>
                <div 
                  className={styles.progressBar}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Number(percentage.toFixed(0))}
                  aria-label={`Category ${category}: ${percentage.toFixed(0)}%`}
                >
                  <div
                    className={styles.progressFill}
                    style={{ width: `${percentage}%` }}
                  >
                    <span className={styles.percentage}>{percentage.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {stats.recentlyWatched.length > 0 && (
        <div className={styles.section}>
          <h2>🕒 Recently Watched</h2>
          <div className={styles.recentList}>
            {stats.recentlyWatched.map((serie, index) => (
              <div key={serie.id} className={styles.recentItem}>
                <div className={styles.recentRank}>#{index + 1}</div>
                <div className={styles.recentInfo}>
                  <div className={styles.recentTitle}>{serie.title}</div>
                  <div className={styles.recentMeta}>
                    {serie.category} • {serie.numberOfSeasons} seasons • 
                    Watched on {new Date(serie.dateWatched).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.insights}>
        <h3>💡 Insights</h3>
        <ul>
          <li>
            You've watched a total of <strong>{stats.totalSeasons} seasons</strong> across 
            <strong> {stats.totalSeries} series</strong>!
          </li>
          <li>
            Your favorite category is <strong>{stats.favoriteCategory}</strong> with 
            <strong> {stats.categoryCount[stats.favoriteCategory]} series</strong>.
          </li>
          <li>
            On average, each series you watch has 
            <strong> {(stats.totalSeasons / stats.totalSeries).toFixed(1)} seasons</strong>.
          </li>
          {categoryEntries.length > 1 && (
            <li>
              You enjoy variety! You've watched series from 
              <strong> {categoryEntries.length} different categories</strong>.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Statistics;