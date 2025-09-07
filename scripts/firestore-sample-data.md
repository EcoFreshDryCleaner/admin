# Firestore Database Structure

## Collections

### 1. `promotions` Collection

This collection stores all promotional offers and deals. One promotion can be designated as the modal promotion by setting `showModal: true`.

**Document Structure:**

```json
{
  "title": "Bulk Order Discount",
  "description": "Save big when you order 10+ items. Perfect for families and businesses.",
  "icon": "📦",
  "originalPrice": "129.90",
  "discountPrice": "99.90",
  "discountPercentage": "23%",
  "features": [
    "Minimum 10 items",
    "Free pickup & delivery",
    "Same-day service available",
    "Premium care included"
  ],
  "expiryDate": "Dec 31, 2024",
  "featured": true,
  "badge": "Most Popular",
  "active": true,
  "showModal": false,
  "modalConfig": {
    "buttonText": "Get Offer",
    "buttonLink": "#mobile-app",
    "closeText": "Maybe Later",
    "delay": 3000,
    "showOnMobile": true,
    "dismissible": true,
    "showOnce": false,
    "image": null
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

**Sample Documents:**

**Document 1 (Regular Promotion):**

```json
{
  "title": "Student Discount",
  "description": "Special pricing for students with valid ID. Keep your professional attire fresh.",
  "icon": "🎓",
  "originalPrice": "12.99",
  "discountPrice": "9.99",
  "discountPercentage": "23%",
  "features": [
    "Valid student ID required",
    "All service levels included",
    "Free pickup & delivery",
    "24-hour turnaround"
  ],
  "expiryDate": "Ongoing",
  "featured": false,
  "badge": null,
  "active": true,
  "showModal": false,
  "modalConfig": {
    "buttonText": "Get Student Discount",
    "buttonLink": "#mobile-app",
    "closeText": "Maybe Later",
    "delay": 3000,
    "showOnMobile": true,
    "dismissible": true,
    "showOnce": false,
    "image": null
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

**Document 2 (Modal Promotion):**

```json
{
  "title": "🎉 New Customer Special!",
  "description": "First-time customers get 50% off their first order of 5+ items!",
  "icon": "🎁",
  "originalPrice": null,
  "discountPrice": null,
  "discountPercentage": "50%",
  "features": [
    "First-time customers only",
    "Minimum 5 items",
    "Free pickup & delivery",
    "Premium care included"
  ],
  "expiryDate": "Ongoing",
  "featured": true,
  "badge": "Limited Time",
  "active": true,
  "showModal": true,
  "modalConfig": {
    "buttonText": "Claim Your Discount",
    "buttonLink": "#mobile-app",
    "closeText": "Maybe Later",
    "delay": 3000,
    "showOnMobile": true,
    "dismissible": true,
    "showOnce": true,
    "image": "https://example.com/new-customer-promo.jpg"
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

**Document 3 (Regular Promotion):**

```json
{
  "title": "Weekend Special",
  "description": "Drop off on Friday, get your clothes back by Monday morning.",
  "icon": "📅",
  "originalPrice": "15.99",
  "discountPrice": "12.99",
  "discountPercentage": "19%",
  "features": [
    "Friday drop-off only",
    "Monday delivery guaranteed",
    "Premium care included",
    "Perfect for weekend prep"
  ],
  "expiryDate": "Every Friday",
  "featured": false,
  "badge": null,
  "active": true,
  "showModal": false,
  "modalConfig": {
    "buttonText": "Book Weekend Service",
    "buttonLink": "#mobile-app",
    "closeText": "Maybe Later",
    "delay": 3000,
    "showOnMobile": true,
    "dismissible": true,
    "showOnce": false,
    "image": null
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### 2. `promotionClaims` Collection

This collection tracks when users claim promotions (optional, for analytics).

**Document Structure:**

```json
{
  "promotionId": "promotion-doc-id",
  "userId": "user-id-if-available",
  "claimedAt": "2024-01-01T00:00:00Z",
  "userAgent": "Mozilla/5.0...",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Promotions collection - read-only for public
    match /promotions/{document} {
      allow read: if true;
      allow write: if false; // Only allow admin writes
    }

    // Promotion claims - allow writes for tracking
    match /promotionClaims/{document} {
      allow read: if false; // No public reads
      allow create: if true; // Allow creating claims
      allow update, delete: if false; // No updates/deletes
    }
  }
}
```

## Setup Instructions

1. **Create Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select existing one
   - Enable Firestore Database

2. **Update Firebase Config:**
   - Replace placeholder values in `src/firebase/config.js` with your actual Firebase config
   - Get config from Project Settings > General > Your apps

3. **Create Collections:**
   - In Firestore Console, create the collections: `promotions`, `promotionClaims`
   - Add sample documents as shown above
   - **Important:** Only ONE promotion should have `showModal: true` at any time

4. **Install Dependencies:**

   ```bash
   npm install firebase
   ```

5. **Test the Integration:**
   - The components will now load data from Firestore
   - Check browser console for any connection errors
   - Verify data is loading correctly

## Field Descriptions

### Core Promotion Fields (Required for All Promotions):

- **`title`**: Display name of the promotion (e.g., "Student Discount", "Bulk Order Special")
- **`description`**: Detailed explanation of what the promotion offers and any terms/conditions
- **`icon`**: Emoji or icon representation to make promotions visually appealing (e.g., "🎓", "📦", "🎁")
- **`active`**: Boolean that controls visibility - `true` = visible to users, `false` = hidden (for archiving/seasonal control)
- **`showModal`**: Boolean that designates if this promotion appears as a modal overlay (`true`) or in the promotions grid (`false`)
- **`createdAt`**: Timestamp when the promotion was created (automatically set)
- **`updatedAt`**: Timestamp when the promotion was last modified (automatically updated)

### Pricing Fields (Optional - for discount promotions):

- **`originalPrice`**: Original price before discount (e.g., "129.90", "15.99")
- **`discountPrice`**: Price after discount (e.g., "99.90", "12.99")
- **`discountPercentage`**: Percentage discount (e.g., "23%", "19%")

### Display & Priority Fields:

- **`featured`**: Boolean that gives promotions priority - `true` = appears first, gets special styling (larger scale, blue border, "Claim Now" button)
- **`badge`**: Optional text overlay (e.g., "Most Popular", "Limited Time", "New") - appears in top-right corner

### Content Fields:

- **`features`**: Array of bullet points highlighting key benefits (e.g., ["Free pickup", "24-hour service", "Premium care"])
- **`expiryDate`**: When the promotion expires (e.g., "Dec 31, 2024", "Ongoing", "Every Friday")

### Modal Configuration Object (Required for All Promotions):

The `modalConfig` object contains all modal-related settings and is present on every promotion for consistency:

- **`buttonText`**: Text displayed on the primary action button (e.g., "Get Offer", "Claim Now", "Book Service")
- **`buttonLink`**: Where the button navigates when clicked (e.g., "#mobile-app", "/checkout", external URL)
- **`closeText`**: Text for the secondary/close button (e.g., "Maybe Later", "Not Now", "Close")
- **`delay`**: Time in milliseconds before the modal appears (e.g., 3000 = 3 seconds)
- **`showOnMobile`**: Boolean controlling if modal appears on mobile devices (`true` = show everywhere, `false` = desktop only)
- **`dismissible`**: Boolean controlling if users can close the modal (`true` = can close, `false` = must take action)
- **`showOnce`**: Boolean controlling if modal shows only once per user (`true` = one-time, `false` = shows every visit)
- **`image`**: Optional promotional image URL for visual appeal (especially useful for modal promotions)

### Modal vs Regular Promotion Field Requirements:

| Field                                                                                                                       | Regular Promotions | Modal Promotions   | Notes                       |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------ | --------------------------- |
| `title`, `description`, `icon`                                                                                              | ✅ Required        | ✅ Required        | Core content                |
| `active`, `showModal`                                                                                                       | ✅ Required        | ✅ Required        | Control visibility          |
| `modalConfig`                                                                                                               | ✅ Required        | ✅ Required        | Contains all modal settings |
| `modalConfig.buttonText`, `modalConfig.buttonLink`                                                                          | ✅ Required        | ✅ Required        | User actions                |
| `modalConfig.delay`, `modalConfig.showOnMobile`, `modalConfig.dismissible`, `modalConfig.closeText`, `modalConfig.showOnce` | ❌ Optional        | ✅ **Required**    | Modal behavior              |
| `modalConfig.image`                                                                                                         | ❌ Optional        | ✅ **Recommended** | Better modal UX             |
| `featured`, `badge`, `features`                                                                                             | ❌ Optional        | ❌ Optional        | Enhanced display            |

## Important Notes

1. **Single Modal Rule:** Only ONE promotion should have `showModal: true` at any time. The system automatically ensures this by setting other promotions to `showModal: false` when a new modal promotion is created.

2. **Modal vs Regular Promotions:**
   - Promotions with `showModal: true` appear in the modal overlay
   - Promotions with `showModal: false` appear in the promotions grid
   - Both types have the complete `modalConfig` object for consistency

3. **Automatic Management:** The `ensureOnlyOneModal()` function automatically manages the single modal rule when creating or updating promotions.

4. **Field Dependencies:** When `showModal: true`, the modal-specific fields in `modalConfig` become critical for proper user experience. Without them, the modal may not function as expected.

5. **Best Practices:**
   - Always include the complete `modalConfig` object for all promotions
   - For modal promotions, ensure all modal-specific fields are properly set
   - Use `modalConfig.image` for modal promotions to make them more engaging
   - Set `modalConfig.showOnce: true` for modal promotions to avoid annoying repeat visitors
   - Use `modalConfig.delay: 3000` (3 seconds) to let users read the page before showing the modal

6. **Consistency:** All promotions now use the same `modalConfig` structure, making it easy to:
   - Convert regular promotions to modal promotions
   - Maintain consistent button text and behavior
   - Switch between modal and grid display modes
   - Manage all modal-related settings in one place

7. **Backward Compatibility:** The new nested structure maintains all functionality while providing better organization and consistency across all promotions.
