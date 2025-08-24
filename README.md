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

### Environment Configuration

Create a `.env` file with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

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

## 🚀 Deployment

The admin site is configured to be deployed at the `/admin/` path. When deploying:

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

## Deployment

The admin site is configured to be deployed at the `/admin/` path. When deploying:

1. Build the project: `npm run build`
2. Upload the `dist/` folder to your web server
3. Ensure the server is configured to serve the admin site at `/admin/`
4. For SPA routing, configure your server to redirect all `/admin/*` requests to `/admin/index.html`

### Server Configuration Examples

**Apache (.htaccess):**

```apache
RewriteEngine On
RewriteBase /admin/
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /admin/index.html [L]
```

**Nginx:**

```nginx
location /admin/ {
    try_files $uri $uri/ /admin/index.html;
}
```

**Netlify (`_redirects`):**

```
/admin/*    /admin/index.html   200
```

**Vercel (`vercel.json`):**

```json
{
  "rewrites": [{ "source": "/admin/(.*)", "destination": "/admin/index.html" }]
}
```

## 🐛 Troubleshooting

### Common Issues

**Authentication Problems:**

- Ensure Firebase project is properly configured
- Verify admin user document exists in Firestore
- Check Firebase Authentication is enabled

**Build Issues:**

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (requires 16+)
- Verify environment variables are set correctly

**Responsive Design Issues:**

- Test on actual devices, not just browser dev tools
- Check CSS custom properties are loading
- Verify breakpoint media queries are working

### Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile**: iOS Safari 14+, Chrome Mobile 88+
- **Features**: CSS Grid, Flexbox, CSS Custom Properties, ES2020+

## 🤝 Contributing

### Development Guidelines

- Follow Vue 3 Composition API patterns
- Use mobile-first responsive design approach
- Maintain consistent CSS architecture
- Test on multiple device sizes
- Follow existing code structure and naming conventions

### Code Quality

- Use ESLint for code linting
- Follow Vue.js style guide
- Write meaningful commit messages
- Test responsive breakpoints thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🔗 Related Projects

- **Main Site**: [EcoFresh Dry Cleaner](../site/) - Customer-facing website
- **Firebase**: [Firebase Console](https://console.firebase.google.com/) - Backend services
- **Vue.js**: [Vue 3 Documentation](https://vuejs.org/) - Frontend framework
