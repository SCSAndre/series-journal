import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSeries } from '../../context/SeriesContext';
import { useEscapeKey } from '../../hooks/useKeyboardShortcuts';
import styles from './SerieList.module.css';

const SerieList = ({ series }) => {
  const navigate = useNavigate();
  const { deleteSerie } = useSeries();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Close delete modal on ESC key
  useEscapeKey(() => {
    if (deleteConfirm) {
      setDeleteConfirm(null);
    }
  });

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteClick = (id) => {
    setDeleteConfirm(id);
  };

  const handleDeleteConfirm = (id) => {
    deleteSerie(id);
    setDeleteConfirm(null);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (series.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📺</div>
        <h3>No series found</h3>
        <p>Start adding your favorite series to your journal!</p>
        <button 
          className={styles.addButton}
          onClick={() => navigate('/register')}
        >
          ➕ Add Your First Series
        </button>
      </div>
    );
  }

  return (
    <div className={styles.seriesList}>
      {series.map((serie) => (
        <div key={serie.id} className={styles.card}>
          {deleteConfirm === serie.id && (
            <div className={styles.deleteOverlay}>
              <div className={styles.deleteModal}>
                <h3>⚠️ Confirm Delete</h3>
                <p>Are you sure you want to delete <strong>{serie.title}</strong>?</p>
                <div className={styles.deleteButtons}>
                  <button 
                    className={styles.confirmDelete}
                    onClick={() => handleDeleteConfirm(serie.id)}
                  >
                    Yes, Delete
                  </button>
                  <button 
                    className={styles.cancelDelete}
                    onClick={handleDeleteCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className={styles.cardHeader}>
            <h3 className={styles.title}>{serie.title}</h3>
            <span className={styles.category}>{serie.category}</span>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.infoRow}>
              <span className={styles.label}>📺 Seasons:</span>
              <span className={styles.value}>{serie.numberOfSeasons}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>🎬 Director:</span>
              <span className={styles.value}>{serie.director}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>🏢 Production:</span>
              <span className={styles.value}>{serie.productionCompany}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>📅 Released:</span>
              <span className={styles.value}>{formatDate(serie.releaseDate)}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>👁️ Watched:</span>
              <span className={styles.value}>{formatDate(serie.dateWatched)}</span>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <button 
              className={styles.editButton}
              onClick={() => handleEdit(serie.id)}
            >
              ✏️ Edit
            </button>
            <button 
              className={styles.deleteButton}
              onClick={() => handleDeleteClick(serie.id)}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

SerieList.propTypes = {
  series: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      numberOfSeasons: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      releaseDate: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      productionCompany: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      dateWatched: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SerieList;