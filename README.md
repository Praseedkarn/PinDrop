# 🗺️ PinDrop - Travel Dashboard

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

**Visualize your travel journey on an interactive world map** - PinDrop helps you mark visited places, create wishlists, and save travel memories with beautiful map visualizations.

## ✨ Features

### 🗺️ Interactive Mapping
- **Multiple Map Themes**: Standard, Satellite, Dark, and Topographic views
- **Click-to-Add Pins**: Click directly on the map to add new locations
- **Custom Markers**: Color-coded pins for visited, wishlist, and favorite places
- **Real-time Coordinates**: Get precise coordinates with map clicks

### 📍 Smart Pin Management
- **Add/Edit/Delete Pins**: Full CRUD operations for your travel locations
- **Rich Details**: Add names, descriptions, ratings, dates, and photos
- **Categories & Tags**: Organize by visited status, favorites, or custom categories
- **Search & Filter**: Find pins by name, location, or notes

### 🎨 Beautiful Interface
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Glassmorphism UI**: Modern design with subtle animations
- **Dark/Light Themes**: Choose your preferred color scheme
- **Intuitive Navigation**: Easy-to-use sidebar and controls

### 💾 Data Management
- **Local Storage**: All data saved in your browser
- **Import/Export**: Backup and restore your travel data as JSON
- **Auto-backup**: Automatic data protection
- **Coordinate Converter**: Convert between different coordinate formats

## 🚀 Live Demo

👉 **[Try PinDrop Live](https://praseedkarn.github.io/PinDrop/)**

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/Praseedkarn/PinDrop.git
cd PinDrop
Install dependencies

bash
npm install
# or
yarn install
Start development server

bash
npm start
# or
yarn start
Open in browser

text
http://localhost:3000
📦 Build for Production
bash
npm run build
# or
yarn build
The build files will be in the build/ folder.

🎯 Usage Guide
Adding a Pin
Click the "+" floating button or "Add Pin" in sidebar

Choose:

🗺️ Select on Map: Click anywhere on the map

✏️ Enter Manually: Fill in coordinates manually

Add details (name, country, notes, rating, etc.)

Click "Add Pin"

Managing Pins
Click any pin on map to view/edit

Use sidebar to search, filter, and sort pins

Export data via Settings for backup

Import data to restore from backup

Map Controls
Zoom: Mouse wheel or +/- buttons

Pan: Click and drag

Themes: Switch between map styles

View Toggle: Switch between Map and List views

🏗️ Project Structure
text
PinDrop/
├── src/
│   ├── components/          # React components
│   │   ├── Map/            # Map-related components
│   │   ├── Pins/           # Pin management components
│   │   ├── UI/             # UI components (Header, Sidebar, etc.)
│   │   └── Stats/          # Statistics panel
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   ├── styles/             # CSS/SCSS files
│   └── utils/              # Utility functions
├── public/                 # Static assets
└── package.json           # Dependencies and scripts
🛡️ Tech Stack
Frontend: React 18 + TypeScript

Mapping: Leaflet + React-Leaflet

Styling: CSS3 with modern features (Flexbox, Grid, CSS Variables)

State Management: React Hooks (useState, useEffect, useMemo)

Storage: Browser LocalStorage API

Build Tool: Create React App

Deployment: GitHub Pages

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

👨‍💻 Author
Praseed Karn - GitHub

🙏 Acknowledgments
Leaflet for the amazing mapping library

OpenStreetMap for free map tiles

React Icons for beautiful icons

All contributors and supporters

📞 Support
Found a bug or have a feature request? Open an issue

<div align="center"> Made with ❤️ and 🗺️ by Praseed Karn <br> ⭐ Star this repo if you found it useful! </div> ```
