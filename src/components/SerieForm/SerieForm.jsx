import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSeries } from '../../context/SeriesContext';
import { sanitizeObject } from '../../utils/sanitize';
import styles from './SerieForm.module.css';

const SerieForm = ({ serieToEdit, onSuccess, onCancel }) => {
  const { addSerie, updateSerie } = useSeries();
  
  const [formData, setFormData] = useState({
    title: '',
    numberOfSeasons: '',
    releaseDate: '',
    director: '',
    productionCompany: '',
    category: '',
    dateWatched: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Novos estados para lidar com a API
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const categories = [
    'Drama', 'Comedy', 'Action', 'Thriller', 'Sci-Fi',
    'Fantasy', 'Horror', 'Documentary', 'Animation', 'Romance',
  ];

  // Load serie data if editing
  useEffect(() => {
    if (serieToEdit) {
      setFormData(serieToEdit);
    }
  }, [serieToEdit]);

  // Validation rules (Mantidas iguais)
  const validate = (name, value) => {
    switch (name) {
      case 'title':
        if (!value || !value.toString().trim()) return 'Title is required';
        if (value.toString().trim().length < 1) return 'Title must be at least 1 character';
        return '';
      case 'numberOfSeasons':
        if (!value) return 'Number of seasons is required';
        if (isNaN(value) || parseInt(value) < 1 || parseInt(value) > 50) {
          return 'Must be a number between 1 and 50';
        }
        return '';
      case 'releaseDate':
        if (!value) return 'Release date is required';
        // Opcional: validar data futura se necessário
        return '';
      case 'director':
        if (!value || !value.toString().trim()) return 'Director is required';
        if (value.toString().trim().length < 2) return 'Director name must be at least 2 characters';
        return '';
      case 'productionCompany':
        if (!value || !value.toString().trim()) return 'Production company is required';
        if (value.toString().trim().length < 2) return 'Production company must be at least 2 characters';
        return '';
      case 'category':
        if (!value) return 'Category is required';
        return '';
      case 'dateWatched':
        if (!value) return 'Date watched is required';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validate(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validate(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => { // Agora é ASYNC
    e.preventDefault();
    setApiError(null); // Limpa erros de API anteriores

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      // Ignoramos campos como 'id' ou 'createdAt' na validação
      if (key === 'id' || key === 'createdAt') return;
      const error = validate(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true); // Bloqueia o botão

    try {
      const sanitizedData = sanitizeObject(formData);

      if (serieToEdit) {
        await updateSerie(serieToEdit.id, sanitizedData);
      } else {
        await addSerie(sanitizedData);
      }

      // Só executa se a API der sucesso
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Limpa formulário apenas se for inclusão
      if (!serieToEdit) {
        setFormData({
          title: '', numberOfSeasons: '', releaseDate: '', director: '',
          productionCompany: '', category: '', dateWatched: '',
        });
        setTouched({});
        setErrors({});
      }

      if (onSuccess) onSuccess();

    } catch (error) {
      console.error("Erro no formulário:", error);
      setApiError("Failed to save series. Server might be offline.");
    } finally {
      setIsSubmitting(false); // Libera o botão independente do resultado
    }
  };

  const isFieldValid = (name) => touched[name] && !errors[name] && formData[name];
  const isFieldInvalid = (name) => touched[name] && errors[name];

  return (
    <div className={styles.formContainer}>
      {/* Mensagens de Feedback */}
      {showSuccess && (
        <div className={styles.successMessage} role="status" aria-live="polite">
          ✓ Series {serieToEdit ? 'updated' : 'added'} successfully!
        </div>
      )}
      
      {apiError && (
        <div className={styles.error} style={{ padding: '10px', marginBottom: '15px', backgroundColor: '#ffebee', border: '1px solid #ffcdd2', borderRadius: '4px', textAlign: 'center' }}>
          ⚠️ {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* ------ Title ------ */}
        <div className={styles.formGroup}>
          <label htmlFor="title">Title <span className={styles.required}>*</span></label>
          <input
            type="text" id="title" name="title"
            value={formData.title} onChange={handleChange} onBlur={handleBlur}
            className={`${styles.input} ${isFieldValid('title') ? styles.valid : ''} ${isFieldInvalid('title') ? styles.invalid : ''}`}
            placeholder="Enter series title"
            disabled={isSubmitting}
          />
          {isFieldValid('title') && <span className={styles.checkmark}>✓</span>}
          {isFieldInvalid('title') && <span className={styles.error}>{errors.title}</span>}
        </div>

        <div className={styles.formRow}>
          {/* ------ Seasons ------ */}
          <div className={styles.formGroup}>
            <label htmlFor="numberOfSeasons">Number of Seasons <span className={styles.required}>*</span></label>
            <input
              type="number" id="numberOfSeasons" name="numberOfSeasons"
              value={formData.numberOfSeasons} onChange={handleChange} onBlur={handleBlur}
              className={`${styles.input} ${isFieldValid('numberOfSeasons') ? styles.valid : ''} ${isFieldInvalid('numberOfSeasons') ? styles.invalid : ''}`}
              placeholder="e.g., 5" min="1" max="50"
              disabled={isSubmitting}
            />
            {isFieldValid('numberOfSeasons') && <span className={styles.checkmark}>✓</span>}
            {isFieldInvalid('numberOfSeasons') && <span className={styles.error}>{errors.numberOfSeasons}</span>}
          </div>

          {/* ------ Category ------ */}
          <div className={styles.formGroup}>
            <label htmlFor="category">Category <span className={styles.required}>*</span></label>
            <select
              id="category" name="category"
              value={formData.category} onChange={handleChange} onBlur={handleBlur}
              className={`${styles.select} ${isFieldValid('category') ? styles.valid : ''} ${isFieldInvalid('category') ? styles.invalid : ''}`}
              disabled={isSubmitting}
            >
              <option value="">Select a category</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            {isFieldValid('category') && <span className={styles.checkmark}>✓</span>}
            {isFieldInvalid('category') && <span className={styles.error}>{errors.category}</span>}
          </div>
        </div>

        <div className={styles.formRow}>
          {/* ------ Release Date ------ */}
          <div className={styles.formGroup}>
            <label htmlFor="releaseDate">Season Release Date <span className={styles.required}>*</span></label>
            <input
              type="date" id="releaseDate" name="releaseDate"
              value={formData.releaseDate} onChange={handleChange} onBlur={handleBlur}
              className={`${styles.input} ${isFieldValid('releaseDate') ? styles.valid : ''} ${isFieldInvalid('releaseDate') ? styles.invalid : ''}`}
              disabled={isSubmitting}
            />
            {isFieldValid('releaseDate') && <span className={styles.checkmark}>✓</span>}
            {isFieldInvalid('releaseDate') && <span className={styles.error}>{errors.releaseDate}</span>}
          </div>

          {/* ------ Date Watched ------ */}
          <div className={styles.formGroup}>
            <label htmlFor="dateWatched">Date Watched <span className={styles.required}>*</span></label>
            <input
              type="date" id="dateWatched" name="dateWatched"
              value={formData.dateWatched} onChange={handleChange} onBlur={handleBlur}
              className={`${styles.input} ${isFieldValid('dateWatched') ? styles.valid : ''} ${isFieldInvalid('dateWatched') ? styles.invalid : ''}`}
              disabled={isSubmitting}
            />
            {isFieldValid('dateWatched') && <span className={styles.checkmark}>✓</span>}
            {isFieldInvalid('dateWatched') && <span className={styles.error}>{errors.dateWatched}</span>}
          </div>
        </div>

        {/* ------ Director ------ */}
        <div className={styles.formGroup}>
          <label htmlFor="director">Director <span className={styles.required}>*</span></label>
          <input
            type="text" id="director" name="director"
            value={formData.director} onChange={handleChange} onBlur={handleBlur}
            className={`${styles.input} ${isFieldValid('director') ? styles.valid : ''} ${isFieldInvalid('director') ? styles.invalid : ''}`}
            placeholder="Enter director name"
            disabled={isSubmitting}
          />
          {isFieldValid('director') && <span className={styles.checkmark}>✓</span>}
          {isFieldInvalid('director') && <span className={styles.error}>{errors.director}</span>}
        </div>

        {/* ------ Production Company ------ */}
        <div className={styles.formGroup}>
          <label htmlFor="productionCompany">Production Company <span className={styles.required}>*</span></label>
          <input
            type="text" id="productionCompany" name="productionCompany"
            value={formData.productionCompany} onChange={handleChange} onBlur={handleBlur}
            className={`${styles.input} ${isFieldValid('productionCompany') ? styles.valid : ''} ${isFieldInvalid('productionCompany') ? styles.invalid : ''}`}
            placeholder="e.g., Netflix, HBO, AMC"
            disabled={isSubmitting}
          />
          {isFieldValid('productionCompany') && <span className={styles.checkmark}>✓</span>}
          {isFieldInvalid('productionCompany') && <span className={styles.error}>{errors.productionCompany}</span>}
        </div>

        {/* ------ Buttons ------ */}
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting 
              ? (serieToEdit ? 'Updating...' : 'Saving...') 
              : (serieToEdit ? '💾 Update Series' : '➕ Add Series')}
          </button>
          
          {onCancel && (
            <button type="button" onClick={onCancel} className={styles.cancelButton} disabled={isSubmitting}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

SerieForm.propTypes = {
  serieToEdit: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // ID agora pode ser number na API
    title: PropTypes.string,
    numberOfSeasons: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    releaseDate: PropTypes.string,
    director: PropTypes.string,
    productionCompany: PropTypes.string,
    category: PropTypes.string,
    dateWatched: PropTypes.string,
    createdAt: PropTypes.string,
  }),
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

export default SerieForm;