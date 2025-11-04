# 📺 Series Journal

A comprehensive React-based CRUD application for tracking and managing watched TV series.

[![React](https://img.shields.io/badge/React-19.x-blue)](https://react.dev/) [![Vite](https://img.shields.io/badge/Vite-7.x-purple)](https://vitejs.dev/) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

![Series Journal Demo](https://via.placeholder.com/800x400/667eea/ffffff?text=Series+Journal+App)

## 🎯 Overview

**Series Journal** is a full-featured web application for TV series enthusiasts to track and manage their watching history. Built with modern React practices, it demonstrates complete CRUD operations, advanced filtering, statistics visualization, and persistent local storage.

**🎓 Academic Project**: Frontend Development Course - Phase 1  
**👨‍💻 Developer**: [André Safar](https://github.com/SCSAndre)

---

## ✨ Key Features

### 🎬 Core Functionality
- **Create**: Add new series with comprehensive details (7 fields)
- **Read**: View all series in beautiful card-based layouts
- **Update**: Edit existing series with pre-filled forms
- **Delete**: Remove series with confirmation dialogs

### 🚀 Advanced Features
- **🔍 Smart Search**: Real-time filtering across multiple fields
- **🔄 Dynamic Sorting**: 6 sort options with ascending/descending toggle
- **📊 Statistics Dashboard**: Visual insights with category distribution, recently watched, and personalized analytics
- **💾 Auto-Save**: Persistent storage using browser's LocalStorage
- **✓ Form Validation**: Real-time validation with visual feedback
- **📱 Responsive Design**: Mobile-first, works on all devices

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | UI library with hooks |
| **Vite** | 7.1.7 | Build tool & dev server |
| **React Router** | 7.9.5 | Client-side routing |
| **Context API** | Built-in | State management |
| **CSS Modules** | Built-in | Scoped styling |
| **ESLint** | 9.36.0 | Code quality |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm 8+
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone the repository
git clone https://github.com/SCSAndre/series-journal.git
cd series-journal

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 📁 Project Structure

```
series-journal/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── NavBar/
│   │   ├── SerieForm/       # Form with validation
│   │   └── SerieList/       # Card-based list display
│   ├── pages/               # Route-based pages
│   │   ├── Home/
│   │   ├── List/
│   │   ├── Register/
│   │   ├── Edit/
│   │   ├── Statistics/
│   │   └── About/
│   ├── context/
│   │   └── SeriesContext.jsx  # Global state management
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── public/                  # Static assets
├── package.json
└── vite.config.js
```

---

## 📖 Usage Guide

### Adding a New Series
1. Navigate to **"Add Series"** page
2. Fill in all required fields (title, seasons, dates, etc.)
3. Get real-time validation feedback
4. Submit to save automatically

### Viewing Your Collection
- Go to **"My Series"** to see all entries
- Use the search bar to filter by title, director, category, or production company
- Sort by any field (ascending/descending)
- Click **Edit** to modify or **Delete** to remove

### Viewing Statistics
- Visit **"Statistics"** page for insights
- See total series/seasons, favorite category
- View category distribution with visual bars
- Check recently watched series

---

## 🎨 Screenshots

### Home Page
![Home](https://via.placeholder.com/600x300/667eea/ffffff?text=Home+Page)

### Series List
![List](https://via.placeholder.com/600x300/667eea/ffffff?text=Series+List)

### Statistics
![Stats](https://via.placeholder.com/600x300/667eea/ffffff?text=Statistics)

---

## 💾 Data Model

```javascript
{
  id: "unique-id",
  title: "Breaking Bad",
  numberOfSeasons: 5,
  releaseDate: "2008-01-20",
  director: "Vince Gilligan",
  productionCompany: "AMC",
  category: "Drama",
  dateWatched: "2024-01-15",
  createdAt: "2024-01-15T10:30:00Z"
}
```

**Categories**: Drama, Comedy, Action, Thriller, Sci-Fi, Fantasy, Horror, Documentary, Animation, Romance

---

## 🔧 Configuration

### Environment Variables
None required for Phase 1 (client-side only).

### Browser Support
- Chrome/Edge (Chromium) ✅
- Firefox ✅
- Safari ✅
- Modern mobile browsers ✅

---

## 🧪 Testing

```bash
# Currently no automated tests (Phase 2 feature)
# Manual testing recommended:
# 1. Add/Edit/Delete series
# 2. Test search and sort functionality
# 3. Verify responsiveness on different screen sizes
# 4. Test with sample data
```

---

## 📦 Deployment

### Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## 🤝 Contributing

This is an academic project. Suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add improvement'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## 🚀 Roadmap (Phase 2)

- [ ] External TV series API integration (TMDB)
- [ ] UI component library (Material-UI)
- [ ] Unit & integration tests
- [ ] TypeScript migration
- [ ] Series poster images
- [ ] Rating system
- [ ] Export/Import data
- [ ] Dark mode
- [ ] User authentication
- [ ] Cloud storage

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**André Safar**
- GitHub: [@SCSAndre](https://github.com/SCSAndre)
- Project: Frontend Development Course - Phase 1
- Institution: College Project
- Year: 2024-2025

---

## 🙏 Acknowledgments

- React documentation and community
- Vite team for the amazing build tool
- Frontend Development Course instructors
- Open-source contributors

---

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**⭐ Star this repository if you find it helpful!**

**Built with ❤️ using React + Vite**
