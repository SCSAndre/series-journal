import { useParams, useNavigate } from 'react-router-dom';
import { useSeries } from '../../context/SeriesContext';
import { useToast } from '../../context/ToastContext';
import SerieForm from '../../components/SerieForm/SerieForm';
import styles from './Edit.module.css';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSerie } = useSeries();
  const { success } = useToast();

  const serie = getSerie(id);

  if (!serie) {
    return (
      <div className={styles.edit}>
        <div className={styles.notFound}>
          <h2>⚠️ Series Not Found</h2>
          <p>The series you're trying to edit doesn't exist.</p>
          <button 
            className={styles.backButton}
            onClick={() => navigate('/list')}
          >
            ← Back to List
          </button>
        </div>
      </div>
    );
  }

  const handleSuccess = () => {
    success('Series updated successfully! Redirecting...');
    setTimeout(() => {
      navigate('/list');
    }, 1500);
  };

  const handleCancel = () => {
    navigate('/list');
  };

  return (
    <div className={styles.edit}>
      <div className={styles.header}>
        <h1>✏️ Edit Series</h1>
        <p>Update the information for "{serie.title}"</p>
      </div>

      <SerieForm 
        serieToEdit={serie} 
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Edit;