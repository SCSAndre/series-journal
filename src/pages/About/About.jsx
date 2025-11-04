import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.header}>
        <h1>📺 About Series Journal</h1>
        <p className={styles.tagline}>Your Personal TV Series Companion</p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>🎯 Project Overview</h2>
          <p>
            Series Journal is a comprehensive CRUD (Create, Read, Update, Delete) application 
            designed to help TV series enthusiasts track and manage their watching history. 
            Built with modern web technologies, this application demonstrates the power of 
            React and component-based architecture.
          </p>
        </section>

        <section className={styles.section}>
          <h2>✨ Key Features</h2>
          <ul className={styles.featureList}>
            <li>
              <strong>Complete CRUD Operations:</strong> Add, view, edit, and delete series entries
            </li>
            <li>
              <strong>Smart Search & Filter:</strong> Find series by title, director, category, or production company
            </li>
            <li>
              <strong>Advanced Sorting:</strong> Sort your collection by various criteria
            </li>
            <li>
              <strong>Statistics Dashboard:</strong> Gain insights into your watching habits
            </li>
            <li>
              <strong>Form Validation:</strong> Real-time validation with visual feedback
            </li>
            <li>
              <strong>Local Storage:</strong> Your data persists between sessions
            </li>
            <li>
              <strong>Responsive Design:</strong> Works seamlessly on desktop and mobile devices
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>🛠️ Technologies Used</h2>
          <div className={styles.techGrid}>
            <div className={styles.techCard}>
              <div className={styles.techIcon}>⚛️</div>
              <h3>React 19</h3>
              <p>Modern UI library with hooks</p>
            </div>
            <div className={styles.techCard}>
              <div className={styles.techIcon}>⚡</div>
              <h3>Vite</h3>
              <p>Lightning-fast build tool</p>
            </div>
            <div className={styles.techCard}>
              <div className={styles.techIcon}>🧭</div>
              <h3>React Router</h3>
              <p>Client-side routing</p>
            </div>
            <div className={styles.techCard}>
              <div className={styles.techIcon}>🎨</div>
              <h3>CSS Modules</h3>
              <p>Scoped styling solution</p>
            </div>
            <div className={styles.techCard}>
              <div className={styles.techIcon}>🔄</div>
              <h3>Context API</h3>
              <p>State management</p>
            </div>
            <div className={styles.techCard}>
              <div className={styles.techIcon}>💾</div>
              <h3>LocalStorage</h3>
              <p>Data persistence</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>🏗️ Architecture</h2>
          <p>
            This application follows React best practices with a component-based architecture:
          </p>
          <ul className={styles.architectureList}>
            <li><strong>Components:</strong> Reusable UI components (NavBar, SerieForm, SerieList)</li>
            <li><strong>Pages:</strong> Route-based page components</li>
            <li><strong>Context:</strong> Global state management with SeriesContext</li>
            <li><strong>CSS Modules:</strong> Scoped styling to prevent conflicts</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>👨‍💻 Developer</h2>
          <div className={styles.developer}>
            <p><strong>Name:</strong> André Safar</p>
            <p><strong>GitHub:</strong> <a href="https://github.com/SCSAndre" target="_blank" rel="noopener noreferrer">@SCSAndre</a></p>
            <p><strong>Project:</strong> Frontend Development Course - Phase 1</p>
            <p><strong>Institution:</strong> College Project</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>📚 Learning Outcomes</h2>
          <p>
            This project demonstrates proficiency in:
          </p>
          <ul className={styles.outcomesList}>
            <li>React component design and composition</li>
            <li>State management with Context API</li>
            <li>Form handling and validation</li>
            <li>Client-side routing with React Router</li>
            <li>CSS Modules for component styling</li>
            <li>LocalStorage for data persistence</li>
            <li>Responsive web design principles</li>
            <li>User experience (UX) best practices</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>🚀 Future Enhancements (Phase 2)</h2>
          <p>
            Planned improvements for the next phase include:
          </p>
          <ul className={styles.futureList}>
            <li>Integration with external TV series API</li>
            <li>UI component libraries (Material-UI, Ant Design, etc.)</li>
            <li>Unit and integration testing</li>
            <li>Advanced filtering and search capabilities</li>
            <li>Data export/import functionality</li>
            <li>User authentication and cloud storage</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;