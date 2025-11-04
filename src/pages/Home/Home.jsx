import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeries } from '../../context/SeriesContext';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const { series, loadSampleData } = useSeries();

  // Memoize expensive calculations
  const totalSeasons = useMemo(
    () => series.reduce((sum, s) => sum + parseInt(s.numberOfSeasons || 0, 10), 0),
    [series]
  );

  // Use callback to prevent function recreation on every render
  const handleLoadSample = useCallback(() => {
    loadSampleData();
    navigate('/list');
  }, [loadSampleData, navigate]);

  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          📺 Welcome to Series Journal
        </h1>
        <p className={styles.subtitle}>
          Your personal companion for tracking and organizing all the TV series you've watched
        </p>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{series.length}</div>
            <div className={styles.statLabel}>Series Tracked</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{totalSeasons}</div>
            <div className={styles.statLabel}>Total Seasons</div>
          </div>
        </div>

        <div className={styles.actions}>
          <button 
            className={styles.primaryButton}
            onClick={() => navigate('/register')}
          >
            ➕ Add New Series
          </button>
          <button 
            className={styles.secondaryButton}
            onClick={() => navigate('/list')}
          >
            📋 View My Series
          </button>
        </div>

        {series.length === 0 && (
          <div className={styles.sampleData}>
            <p>New here? Try loading some sample data to explore the features!</p>
            <button 
              className={styles.sampleButton}
              onClick={handleLoadSample}
            >
              🎬 Load Sample Series
            </button>
          </div>
        )}
      </div>

      <div className={styles.features}>
        <h2>Features</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📝</div>
            <h3>Easy Management</h3>
            <p>Add, edit, and delete series with a simple and intuitive interface</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔍</div>
            <h3>Smart Search</h3>
            <p>Quickly find series by title, director, category, or production company</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h3>Statistics</h3>
            <p>View insights about your watching habits and favorite categories</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💾</div>
            <h3>Auto-Save</h3>
            <p>Your data is automatically saved locally - no account needed!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;