# EcoFresh Admin

A modern, mobile-responsive admin panel for managing EcoFresh promotions and special offers. Built with Vue 3, Vite, Firebase, and VueFire for real-time data management.

## ✨ Features

- 🔐 **Firebase Authentication** - Secure admin access with user verification
- 📊 **Responsive Dashboard** - Mobile-first design with promotion statistics
- 🎯 **Promotion Management** - Full CRUD operations for promotions
- 📱 **Mobile-First Design** - Optimized for all device sizes
- 🎨 **Modern UI/UX** - Clean, sleek interface with FontAwesome icons
- 🔥 **Real-time Data** - Live updates with VueFire and Firestore
- 📋 **Smart Filtering** - Filter promotions by status, featured, and modal settings
- 🎭 **Dual Layout System** - Table view for desktop, card view for mobile
- 🌈 **Responsive Breakpoints** - Optimized for mobile (640px), tablet (1024px), and desktop

## 🛠️ Technical Stack

- **Frontend Framework**: Vue 3 with Composition API
- **Build Tool**: Vite with `/admin/` base path configuration
- **State Management**: Pinia for authentication and app state
- **Database**: Firebase Firestore with real-time updates
- **Authentication**: Firebase Auth with admin role verification
- **Styling**: Custom CSS with mobile-first responsive design
- **Icons**: FontAwesome (Solid, Regular, Brands)
- **Routing**: Vue Router with navigation guards
- **Real-time Data**: VueFire for Firestore integration

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

## 🔧 Development Setup

### Prerequisites

- Node.js 16+ and npm
- Firebase project with Firestore and Authentication enabled
- Admin user account with `admin: true` in Firestore

## 🚀 Getting Started

### 1. Install Dependencies

```sh
npm install
```

### 2. Configure Firebase

Update `src/firebase/config.js` with your Firebase project settings.

### 3. Set Up Admin User

In Firestore, create a user document at `/users/{uid}` with:

```json
{
  "admin": true,
  "email": "admin@example.com"
}
```

### 4. Start Development Server

```sh
npm run dev
```

## 📁 Project Structure

```
admin/
├── src/
│   ├── components/          # Reusable Vue components
│   │   ├── DashboardLayout.vue    # Main layout with responsive header/nav
│   │   └── ...
│   ├── views/              # Page components
│   │   ├── Dashboard.vue          # Dashboard with responsive stats
│   │   ├── Promotions.vue         # Promotions management (table/card views)
│   │   ├── Login.vue             # Authentication page
│   │   └── ...
│   ├── services/           # Firebase and API services
│   │   ├── authService.js         # Authentication logic
│   │   └── promotionsService.js   # Firestore operations
│   ├── stores/             # Pinia state management
│   │   └── auth.js               # Authentication store
│   ├── styles/             # Global CSS and responsive utilities
│   │   └── admin.css             # Mobile-first responsive styles
│   └── firebase/           # Firebase configuration
│       └── config.js             # Firebase app initialization
```

## 🎨 Styling & Design

### CSS Architecture

- **Mobile-first approach** with progressive enhancement
- **Custom CSS variables** for consistent theming
- **Responsive utilities** for breakpoint management
- **No Tailwind dependencies** - pure custom CSS for better control

### Design Principles

- **Clean and modern** interface with subtle shadows and gradients
- **Touch-friendly** elements with proper sizing for mobile
- **Consistent spacing** using CSS custom properties
- **Smooth transitions** and hover effects for better UX

## 🔐 Authentication & Security

### Admin Access Control

- Firebase Authentication for user login
- Firestore document verification (`/users/{uid}.admin === true`)
- Protected routes with navigation guards
- Automatic redirect to login for unauthenticated users

### Security Features

- Server-side validation of admin status
- Secure Firebase configuration
- Protected API endpoints
- Session management with Pinia

## 📊 Data Management

### Firestore Collections

- **promotions**: Main promotions data with real-time updates
- **users**: User accounts with admin role verification

### Real-time Features

- Live promotion updates across all connected clients
- Instant status changes and modifications
- Real-time dashboard statistics
- Live filtering and search results

## 📦 Project Setup

### Install Dependencies

```sh
npm install
```

### Development Commands

```sh
# Start development server with hot-reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint and fix files
npm run lint
```

### Build Configuration

- **Base Path**: `/admin/` for deployment
- **Output Directory**: `dist/` folder
- **Environment Variables**: Support for `.env` files
- **Asset Optimization**: Automatic CSS/JS minification and optimization

## 📞 Dev Support

For development questions or technical support, please contact:

- **Developer**: Tanuj Siripurapu
- **Email**: dev@tanuj.xyz

---

Built with ❤️ using Vue 3 and modern web technologies.
