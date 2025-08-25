# EcoFresh Admin Panel 🔧

A modern, responsive admin panel for managing EcoFresh Dry Cleaner promotions and special offers. Built with Vue 3, Vite, and Firebase integration for real-time data management.

## 🏢 About EcoFresh Admin

The EcoFresh Admin Panel provides a powerful, user-friendly interface to manage promotional content, track performance metrics, and maintain the digital presence of EcoFresh Dry Cleaner services.

### What Our Admin Panel Offers

- **Promotion Management**: Full CRUD operations for promotional content
- **Real-time Dashboard**: Live statistics and performance metrics
- **Mobile-First Design**: Responsive interface optimized for all devices
- **Secure Access**: Firebase authentication with admin role verification
- **Instant Updates**: Real-time synchronization across all platforms

## 🌟 Features

- **Dashboard**: Real-time statistics and recent promotions overview
- **Promotion Management**: Create, edit, delete, and manage promotional content
- **Smart Filtering**: Filter by status, featured, and modal settings
- **Responsive Design**: Mobile-first design with adaptive layouts
- **Real-time Data**: Live updates with VueFire and Firestore
- **Secure Authentication**: Firebase Auth with admin role verification

## 🛠️ Tech Stack

- **Frontend**: Vue 3.5.18 with Composition API
- **Build Tool**: Vite 7.0.6 with `/admin/` base path
- **State Management**: Pinia 2.1.7
- **Database**: Firebase 12.1.0 (Firestore)
- **Authentication**: Firebase Auth
- **Real-time Data**: VueFire 3.2.2
- **Styling**: Custom CSS with mobile-first responsive design
- **Icons**: Font Awesome 7.0.0
- **Deployment**: GitHub Pages with gh-pages

## 🚀 Development

### Prerequisites

- Node.js (^20.19.0 or >=22.12.0)
- npm or yarn
- Firebase project with Firestore and Authentication enabled

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run format       # Format code with Prettier
npm run deploy       # Deploy to GitHub Pages
```

## 📱 Responsive Design

The admin panel features a **mobile-first responsive design** with:

- **Mobile (< 640px)**: Vertical stacked layouts, full-width elements, touch-optimized
- **Tablet (640px+)**: Horizontal layouts, optimized spacing, improved navigation
- **Desktop (1024px+)**: Full desktop experience with table views and enhanced spacing

### Layout Features

- **Dashboard**: Stats cards stack horizontally on wide screens, vertically on mobile
- **Promotions**: Table view for desktop, card view for mobile devices
- **Navigation**: Adaptive header and navigation based on screen size
- **Forms**: Responsive input layouts with proper mobile spacing

## 📁 Project Structure

```
admin/
├── src/
│   ├── components/          # Reusable Vue components
│   │   ├── DashboardLayout.vue    # Main layout with responsive header/nav
│   │   └── PromotionForm.vue      # Promotion creation/editing form
│   ├── views/              # Page components
│   │   ├── Dashboard.vue          # Dashboard with responsive stats
│   │   ├── Promotions.vue         # Promotions management (table/card views)
│   │   ├── Login.vue             # Authentication page
│   │   ├── EditPromotion.vue     # Edit existing promotion
│   │   └── NewPromotion.vue      # Create new promotion
│   ├── services/           # Firebase and API services
│   │   ├── authService.js         # Authentication logic
│   │   └── promotionsService.js   # Firestore operations
│   ├── stores/             # Pinia state management
│   │   └── auth.js               # Authentication store
│   ├── styles/             # Global CSS and responsive utilities
│   ├── firebase/           # Firebase configuration
│   │   └── config.js             # Firebase app initialization
│   ├── router/             # Vue Router setup
│   ├── App.vue             # Main app component
│   └── main.js             # App entry point
├── public/                 # Static assets
└── package.json
```

## 🔧 Development

### Code Quality

- **Prettier**: Code formatting with consistent style
- **Vue DevTools**: Development debugging and testing
- **ESLint**: Code quality (can be added if needed)

### Firebase Integration

The admin panel uses Firebase for core services:

- **Authentication**: Firebase Auth for secure admin access
- **Database**: Firestore for promotions data with real-time updates
- **Real-time Sync**: VueFire integration for live data updates
- **Security**: Admin role verification through Firestore

### Customization

#### Colors and Styling

The admin panel uses custom CSS with:

- **Mobile-first approach** with progressive enhancement
- **Custom CSS variables** for consistent theming
- **Responsive utilities** for breakpoint management
- **No external UI frameworks** - pure custom CSS for better control

#### Admin Setup

To set up admin access:

1. **Create Firebase project** with Firestore and Authentication enabled
2. **Set up admin user** in Firestore at `/users/{uid}` with:
   ```json
   {
     "admin": true,
     "email": "admin@example.com"
   }
   ```
3. **Update Firebase config** in `src/firebase/config.js`

## 📊 Data Management

### Firestore Collections

- **promotions**: Main promotions data with real-time updates
- **users**: User accounts with admin role verification

### Real-time Features

- Live promotion updates across all connected clients
- Instant status changes and modifications
- Real-time dashboard statistics
- Live filtering and search results

## 📞 Support

- **Business Inquiries**: hello@ecofriendlydrycleaner.com
- **Technical Support**: dev@tanuj.xyz
- **Developer**: Tanuj Siripurapu

---

**EcoFresh Admin Panel** - Professional, responsive, and secure promotion management. 🚀
