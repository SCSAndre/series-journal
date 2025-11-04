import styles from './Loading.module.css';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default Loading;
