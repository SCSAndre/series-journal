import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSeries } from '../../context/SeriesContext';
import { useEscapeKey } from '../../hooks/useKeyboardShortcuts';
import styles from './SerieList.module.css';

const SerieList = ({ series }) => {
  const navigate = useNavigate();
  const { deleteSerie } = useSeries();
  
  // Estado para controlar qual item está sendo deletado
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  // Estado para feedback visual de carregamento durante a exclusão
  const [isDeleting, setIsDeleting] = useState(false);

  // Close delete modal on ESC key
  useEscapeKey(() => {
    if (deleteConfirm && !isDeleting) {
      setDeleteConfirm(null);
    }
  });

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteClick = (id) => {
    setDeleteConfirm(id);
  };

  const handleDeleteConfirm = async (id) => {
    setIsDeleting(true);
    try {
      await deleteSerie(id);
      // O modal fecha automaticamente porque o item some da lista 'series'
      // Mas por segurança, limpamos o estado:
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting series:", error);
      alert("Failed to delete series. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setDeleteConfirm(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
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
          {/* Modal de Confirmação de Exclusão */}
          {deleteConfirm === serie.id && (
            <div className={styles.deleteOverlay}>
              <div className={styles.deleteModal}>
                <h3>⚠️ Confirm Delete</h3>
                <p>Are you sure you want to delete <strong>{serie.title}</strong>?</p>
                <div className={styles.deleteButtons}>
                  <button 
                    className={styles.confirmDelete}
                    onClick={() => handleDeleteConfirm(serie.id)}
                    disabled={isDeleting}
                    style={{ opacity: isDeleting ? 0.7 : 1, cursor: isDeleting ? 'wait' : 'pointer' }}
                  >
                    {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                  </button>
                  <button 
                    className={styles.cancelDelete}
                    onClick={handleDeleteCancel}
                    disabled={isDeleting}
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
      // Atualizado: ID agora aceita string ou number (comum em APIs)
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string,
      numberOfSeasons: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      releaseDate: PropTypes.string,
      director: PropTypes.string,
      productionCompany: PropTypes.string,
      category: PropTypes.string,
      dateWatched: PropTypes.string,
    })
  ).isRequired,
};

export default SerieList;