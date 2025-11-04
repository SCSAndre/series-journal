import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import SerieForm from '../../components/SerieForm/SerieForm';
import styles from './Register.module.css';

const Register = () => {
  const navigate = useNavigate();
  const { success } = useToast();

  const handleSuccess = () => {
    success('Series added successfully! Redirecting...');
    // Optional: Navigate to list after successful registration
    setTimeout(() => {
      navigate('/list');
    }, 2000);
  };

  return (
    <div className={styles.register}>
      <div className={styles.header}>
        <h1>➕ Add New Series</h1>
        <p>Fill in the details of the series you've watched</p>
      </div>

      <SerieForm onSuccess={handleSuccess} />

      <div className={styles.tips}>
        <h3>💡 Tips</h3>
        <ul>
          <li>Make sure to fill in all required fields marked with *</li>
          <li>The form validates in real-time - look for green checkmarks!</li>
          <li>You can always edit the series information later</li>
          <li>Your data is automatically saved to your browser</li>
        </ul>
      </div>
    </div>
  );
};

export default Register;