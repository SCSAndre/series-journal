# 📺 Series Journal

A comprehensive React-based CRUD application for tracking and managing watched TV series. Built as part of the Frontend Development Course - Phase 1.

![Series Journal](https://img.shields.io/badge/React-19.x-blue) ![Vite](https://img.shields.io/badge/Vite-7.x-purple) ![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Project Overview

Series Journal is a full-featured web application that allows users to maintain a personal journal of TV series they've watched. The application implements complete CRUD (Create, Read, Update, Delete) functionality with an intuitive user interface, real-time form validation, advanced search and filtering capabilities, and persistent local storage.

## ✨ Features

### Core Functionality
- ✅ **Create**: Add new series with comprehensive details
- ✅ **Read**: View all series in an organized card-based layout
- ✅ **Update**: Edit existing series information
- ✅ **Delete**: Remove series with confirmation dialog

### Advanced Features
- 🔍 **Smart Search**: Real-time filtering across multiple fields (title, director, category, production company)
- 🔄 **Dynamic Sorting**: Sort by title, category, director, number of seasons, release date, or date watched
- 📊 **Statistics Dashboard**: Visual insights including:
  - Total series and seasons count
  - Category distribution with progress bars
  - Favorite category analysis
  - Recently watched series
  - Personalized insights
- 💾 **Auto-Save**: Automatic data persistence using browser's LocalStorage
- 🎬 **Sample Data**: Quick-load feature with 5 pre-configured series for testing
- ✓ **Form Validation**: Real-time validation with visual feedback (green checkmarks, red error messages)
- 📱 **Responsive Design**: Fully functional on desktop, tablet, and mobile devices

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **React 19** | UI library with modern hooks (useState, useEffect, useContext) |
| **Vite** | Fast build tool and development server |
| **React Router v7** | Client-side routing and navigation |
| **Context API** | Global state management |
| **CSS Modules** | Scoped component styling |
| **LocalStorage API** | Data persistence |

## 📁 Project Structure

```
series-journal/
├── src/
│   ├── components/
│   │   ├── NavBar/
│   │   │   ├── NavBar.jsx
│   │   │   └── NavBar.module.css
│   │   ├── SerieForm/
│   │   │   ├── SerieForm.jsx
│   │   │   └── SerieForm.module.css
│   │   └── SerieList/
│   │       ├── SerieList.jsx
│   │       └── SerieList.module.css
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.module.css
│   │   ├── About/
│   │   │   ├── About.jsx
│   │   │   └── About.module.css
│   │   ├── Register/
│   │   │   ├── Register.jsx
│   │   │   └── Register.module.css
│   │   ├── List/
│   │   │   ├── List.jsx
│   │   │   └── List.module.css
│   │   ├── Statistics/
│   │   │   ├── Statistics.jsx
│   │   │   └── Statistics.module.css
│   │   └── Edit/
│   │       ├── Edit.jsx
│   │       └── Edit.module.css
│   ├── context/
│   │   └── SeriesContext.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 16.x or higher
- **npm**: Version 8.x or higher (comes with Node.js)
- **Git**: For version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SCSAndre/series-journal.git
   cd series-journal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser** Navigate to `http://localhost:5173/` (or the URL shown in your terminal)

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📱 Application Pages

### 1. Home (/)
- Welcome page with project overview
- Quick statistics display
- Call-to-action buttons
- Sample data loader
- Feature highlights

### 2. My Series (/list)
- Card-based series display
- Real-time search functionality
- Sort controls with ascending/descending toggle
- Edit and delete actions per series
- Empty state with helpful message

### 3. Add Series (/register)
- Comprehensive form with all required fields
- Real-time validation with visual feedback
- Success message on submission
- Helpful tips section

### 4. Edit Series (/edit/:id)
- Pre-filled form with existing data
- Same validation as add form
- Cancel option to return to list
- Success confirmation

### 5. Statistics (/statistics)
- Overview cards (total series, seasons, favorite category, average)
- Category distribution chart with percentages
- Recently watched series list
- Personalized insights

### 6. About (/about)
- Project description and goals
- Technology stack details
- Architecture explanation
- Developer information
- Learning outcomes

## 🎨 Component Documentation

### NavBar Component
**Location**: `src/components/NavBar/NavBar.jsx`

**Purpose**: Provides navigation across all pages

**Props**: None (uses React Router's useLocation hook)

**Features**:
- Active link highlighting
- Responsive design
- Gradient background
- Smooth transitions

### SerieForm Component
**Location**: `src/components/SerieForm/SerieForm.jsx`

**Purpose**: Handles both adding new series and editing existing ones

**Props**:
- `serieToEdit` (object, optional): Serie data for editing
- `onSuccess` (function, optional): Callback after successful submission
- `onCancel` (function, optional): Callback for cancel action

**Features**:
- Real-time validation
- Visual feedback (checkmarks, error messages)
- Controlled inputs
- Field-level error handling
- Success message display

**Form Fields**:
- Title (text, required, min 1 char)
- Number of Seasons (number, required, 1-50)
- Release Date (date, required, not future)
- Director (text, required, min 2 chars)
- Production Company (text, required, min 2 chars)
- Category (select, required, 10 options)
- Date Watched (date, required, not future)

### SerieList Component
**Location**: `src/components/SerieList/SerieList.jsx`

**Purpose**: Displays series in a card-based layout

**Props**:
- `series` (array, required): Array of serie objects to display

**Features**:
- Card-based responsive grid
- Edit and delete buttons per card
- Delete confirmation modal
- Empty state handling
- Hover effects and animations
- Date formatting

**Styling note:** The UI uses `CSS Modules` and handcrafted styles for Phase 1; no external UI component library is included. A component library (e.g., Material-UI) is considered for Phase 2.

## 💾 Data Model

Each series object contains:

```javascript
{
  id: "unique-identifier",
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

**Available Categories**:
- Drama
- Comedy
- Action
- Thriller
- Sci-Fi
- Fantasy
- Horror
- Documentary
- Animation
- Romance

## 🔧 Context API Usage

### SeriesContext
**Location**: `src/context/SeriesContext.jsx`

**Purpose**: Manages global state for all series data and operations

**Provided Values**:
- `series`: Array of all series
- `searchTerm`: Current search query
- `setSearchTerm`: Update search query
- `sortBy`: Current sort field
- `setSortBy`: Update sort field
- `sortOrder`: Current sort order (asc or desc)
- `setSortOrder`: Update sort order
- `addSerie(serie)`: Add new series
- `updateSerie(id, serie)`: Update existing series
- `deleteSerie(id)`: Delete series
- `getSerie(id)`: Get single series by ID
- `getFilteredSeries()`: Get filtered and sorted series
- `getStatistics()`: Get statistics object
- `loadSampleData()`: Load 5 sample series
- `clearAllData()`: Clear all data from storage

**Usage Example**:

```javascript
import { useSeries } from '../context/SeriesContext';

function MyComponent() {
  const { series, addSerie, getFilteredSeries } = useSeries();
  
  const filteredSeries = getFilteredSeries();
  
  return (
    // Your component JSX
  );
}
```

## 🎯 Key Learning Outcomes

This project demonstrates proficiency in:

### React Fundamentals
- Functional components
- Hooks (useState, useEffect, useContext)
- Component composition
- Props and prop drilling prevention

### State Management
- Context API implementation
- Global state management
- Local component state
- State persistence

### Routing
- React Router v6 setup
- Route parameters
- Programmatic navigation
- Active link styling

### Form Handling
- Controlled components
- Real-time validation
- Error handling
- User feedback

### CSS & Styling
- CSS Modules
- Responsive design
- Animations and transitions
- Modern layout techniques (Grid, Flexbox)

### Data Management
- CRUD operations
- LocalStorage API
- Data filtering and sorting
- Data transformation

### User Experience
- Loading states
- Empty states
- Confirmation dialogs
- Success messages
- Responsive design

## 🐛 Known Issues / Limitations

- Data is stored locally in browser (cleared if browser data is cleared)
- No backend integration (Phase 2 feature)
- No user authentication (Phase 2 feature)
- No image upload for series posters (Phase 2 feature)
- Limited to single browser/device (no cloud sync)

## 🚀 Future Enhancements (Phase 2)

- ☐ Integration with external TV series API (TMDB, TVMaze)
- ☐ UI component library (Material-UI or Ant Design)
- ☐ Unit and integration tests (Jest, React Testing Library)
- ☐ Series poster images
- ☐ Rating system
- ☐ Personal notes/reviews
- ☐ Export data to JSON/CSV
- ☐ Import data from file
- ☐ Dark mode toggle
- ☐ Multiple user profiles
- ☐ Cloud storage integration
- ☐ Social sharing features

## 👨‍💻 Developer

- **Name**: André Safar
- **GitHub**: [@SCSAndre](https://github.com/SCSAndre)
- **Project**: Frontend Development Course - Phase 1
- **Date**: November 2024

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Frontend Development Course instructors
- React documentation and community
- Vite team for the amazing build tool
- All open-source contributors

## 📞 Support

For questions or issues, please open an issue on the GitHub repository.

---

**Built with ❤️ using React and Vite**

---

## How to Create the File

### Option 1: Using VSCode

1. In VSCode, click on the **Explorer** icon (top left)
2. Right-click on the root folder (series-journal)
3. Select **"New File"**
4. Name it: `README.md`
5. Copy and paste the entire content above
6. Save the file (**Ctrl + S**)

### Option 2: Using Command Line

```bash
# Make sure you're in the project root
cd C:\Users\andre\Desktop\series-journal

# Create the file (this opens Notepad)
notepad README.md
```

Then paste the content and save.

### Verify the README

After creating the file:

1. **Check in VSCode**: You should see `README.md` in the root folder
2. **Preview in VSCode**: Right-click on `README.md` → "Open Preview"
3. **Check formatting**: Make sure all sections look good

### Commit the README to GitHub

```bash
git add README.md
git commit -m "docs: Add comprehensive README documentation"
git push origin main
```

(If `main` doesn't work, try `git push origin master`)

### View on GitHub

Go to: https://github.com/SCSAndre/series-journal

The README should now display beautifully on your repository homepage! 🎉