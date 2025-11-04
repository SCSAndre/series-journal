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

  const categories = [
    'Drama',
    'Comedy',
    'Action',
    'Thriller',
    'Sci-Fi',
    'Fantasy',
    'Horror',
    'Documentary',
    'Animation',
    'Romance',
  ];

  // Load serie data if editing
  useEffect(() => {
    if (serieToEdit) {
      setFormData(serieToEdit);
    }
  }, [serieToEdit]);

  // Validation rules
  const validate = (name, value) => {
    switch (name) {
      case 'title':
        if (!value.trim()) return 'Title is required';
        if (value.trim().length < 1) return 'Title must be at least 1 character';
        return '';

      case 'numberOfSeasons':
        if (!value) return 'Number of seasons is required';
        if (isNaN(value) || parseInt(value) < 1 || parseInt(value) > 50) {
          return 'Must be a number between 1 and 50';
        }
        return '';

      case 'releaseDate':
        if (!value) return 'Release date is required';
        if (new Date(value) > new Date()) return 'Release date cannot be in the future';
        return '';

      case 'director':
        if (!value.trim()) return 'Director is required';
        if (value.trim().length < 2) return 'Director name must be at least 2 characters';
        return '';

      case 'productionCompany':
        if (!value.trim()) return 'Production company is required';
        if (value.trim().length < 2) return 'Production company must be at least 2 characters';
        return '';

      case 'category':
        if (!value) return 'Category is required';
        return '';

      case 'dateWatched':
        if (!value) return 'Date watched is required';
        if (new Date(value) > new Date()) return 'Date watched cannot be in the future';
        return '';

      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on change if field was touched
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validate(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Sanitize form data before submission
    const sanitizedData = sanitizeObject(formData);

    // Submit the form
    if (serieToEdit) {
      updateSerie(serieToEdit.id, sanitizedData);
    } else {
      addSerie(sanitizedData);
    }

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Reset form if adding new serie
    if (!serieToEdit) {
      setFormData({
        title: '',
        numberOfSeasons: '',
        releaseDate: '',
        director: '',
        productionCompany: '',
        category: '',
        dateWatched: '',
      });
      setTouched({});
      setErrors({});
    }

    // Call success callback
    if (onSuccess) onSuccess();
  };

  const isFieldValid = (name) => {
    return touched[name] && !errors[name] && formData[name];
  };

  const isFieldInvalid = (name) => {
    return touched[name] && errors[name];
  };

  return (
    <div className={styles.formContainer}>
      {showSuccess && (
        <div className={styles.successMessage} role="status" aria-live="polite">
          ✓ Series {serieToEdit ? 'updated' : 'added'} successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">
            Title <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${isFieldValid('title') ? styles.valid : ''} ${isFieldInvalid('title') ? styles.invalid : ''}`}
            placeholder="Enter series title"
            aria-invalid={isFieldInvalid('title') ? 'true' : 'false'}
            aria-describedby={isFieldInvalid('title') ? 'error-title' : undefined}
          />
          {isFieldValid('title') && <span className={styles.checkmark}>✓</span>}
          {isFieldInvalid('title') && (
            <span id="error-title" className={styles.error} role="alert">{errors.title}</span>
          )}
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="numberOfSeasons">
              Number of Seasons <span className={styles.required}>*</span>
            </label>
            <input
              type="number"
              id="numberOfSeasons"
              name="numberOfSeasons"
              value={formData.numberOfSeasons}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${styles.input} ${isFieldValid('numberOfSeasons') ? styles.valid : ''} ${isFieldInvalid('numberOfSeasons') ? styles.invalid : ''}`}
              placeholder="e.g., 5"
              min="1"
              max="50"
              aria-invalid={isFieldInvalid('numberOfSeasons') ? 'true' : 'false'}
              aria-describedby={isFieldInvalid('numberOfSeasons') ? 'error-numberOfSeasons' : undefined}
            />
            {isFieldValid('numberOfSeasons') && <span className={styles.checkmark}>✓</span>}
            {isFieldInvalid('numberOfSeasons') && (
              <span id="error-numberOfSeasons" className={styles.error} role="alert">{errors.numberOfSeasons}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">
              Category <span className={styles.required}>*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${styles.select} ${isFieldValid('category') ? styles.valid : ''} ${isFieldInvalid('category') ? styles.invalid : ''}`}
              aria-invalid={isFieldInvalid('category') ? 'true' : 'false'}
              aria-describedby={isFieldInvalid('category') ? 'error-category' : undefined}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {isFieldValid('category') && <span className={styles.checkmark}>✓</span>}
            {isFieldInvalid('category') && (
              <span id="error-category" className={styles.error} role="alert">{errors.category}</span>
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="releaseDate">
              Season Release Date <span className={styles.required}>*</span>
            </label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${styles.input} ${isFieldValid('releaseDate') ? styles.valid : ''} ${isFieldInvalid('releaseDate') ? styles.invalid : ''}`}
              aria-invalid={isFieldInvalid('releaseDate') ? 'true' : 'false'}
              aria-describedby={isFieldInvalid('releaseDate') ? 'error-releaseDate' : undefined}
            />
            {isFieldValid('releaseDate') && <span className={styles.checkmark}>✓</span>}
            {isFieldInvalid('releaseDate') && (
              <span id="error-releaseDate" className={styles.error} role="alert">{errors.releaseDate}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dateWatched">
              Date Watched <span className={styles.required}>*</span>
            </label>
            <input
              type="date"
              id="dateWatched"
              name="dateWatched"
              value={formData.dateWatched}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${styles.input} ${isFieldValid('dateWatched') ? styles.valid : ''} ${isFieldInvalid('dateWatched') ? styles.invalid : ''}`}
              aria-invalid={isFieldInvalid('dateWatched') ? 'true' : 'false'}
              aria-describedby={isFieldInvalid('dateWatched') ? 'error-dateWatched' : undefined}
            />
            {isFieldValid('dateWatched') && <span className={styles.checkmark}>✓</span>}
            {isFieldInvalid('dateWatched') && (
              <span id="error-dateWatched" className={styles.error} role="alert">{errors.dateWatched}</span>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="director">
            Director <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="director"
            name="director"
            value={formData.director}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${isFieldValid('director') ? styles.valid : ''} ${isFieldInvalid('director') ? styles.invalid : ''}`}
            placeholder="Enter director name"
            aria-invalid={isFieldInvalid('director') ? 'true' : 'false'}
            aria-describedby={isFieldInvalid('director') ? 'error-director' : undefined}
          />
          {isFieldValid('director') && <span className={styles.checkmark}>✓</span>}
          {isFieldInvalid('director') && (
            <span id="error-director" className={styles.error} role="alert">{errors.director}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="productionCompany">
            Production Company <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="productionCompany"
            name="productionCompany"
            value={formData.productionCompany}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${isFieldValid('productionCompany') ? styles.valid : ''} ${isFieldInvalid('productionCompany') ? styles.invalid : ''}`}
            placeholder="e.g., Netflix, HBO, AMC"
            aria-invalid={isFieldInvalid('productionCompany') ? 'true' : 'false'}
            aria-describedby={isFieldInvalid('productionCompany') ? 'error-productionCompany' : undefined}
          />
          {isFieldValid('productionCompany') && <span className={styles.checkmark}>✓</span>}
          {isFieldInvalid('productionCompany') && (
            <span id="error-productionCompany" className={styles.error} role="alert">{errors.productionCompany}</span>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>
            {serieToEdit ? '💾 Update Series' : '➕ Add Series'}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className={styles.cancelButton}>
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
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    numberOfSeasons: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    releaseDate: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    productionCompany: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    dateWatched: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
  }),
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

export default SerieForm;