# Database Seeding Scripts

This directory contains scripts to automatically populate your Firestore database with sample data.

## 🚀 Quick Start

### 1. Install Dependencies

Make sure you have the Firebase SDK installed:

```bash
npm install firebase
```

### 2. Update Firebase Config

Edit `scripts/seed-promotions.js` and update the `firebaseConfig` object with your actual Firebase project credentials.

### 3. Run the Seeding Script

```bash
# Seed the database with sample promotions
node scripts/seed-promotions.js

# Show help
node scripts/seed-promotions.js --help

# Clear all promotions (mark as inactive)
node scripts/seed-promotions.js --clear
```

## 📋 What Gets Created

The seeding script will create **5 sample promotions** in your Firestore database:

1. **Bulk Order Discount** 📦 - Featured promotion with pricing
2. **Student Discount** 🎓 - Regular promotion for students
3. **🎉 New Customer Special!** 🎁 - **Modal promotion** (showModal: true)
4. **Weekend Special** 📅 - Regular promotion for weekend service
5. **Express Service Premium** ⚡ - Fast service promotion

## 🎭 Modal Promotion

Only **ONE** promotion will have `showModal: true`:

- **New Customer Special** - 50% off first order
- Appears as a modal overlay after 3 seconds
- Shows only once per user
- Includes an image for better UX

## 🔧 Script Features

- ✅ **Automatic Modal Management**: Ensures only one modal promotion exists
- ✅ **Timestamp Handling**: Automatically sets `createdAt` and `updatedAt`
- ✅ **Error Handling**: Graceful error handling and reporting
- ✅ **Progress Tracking**: Shows real-time progress during seeding
- ✅ **Safety Features**: Won't overwrite existing data
- ✅ **Cleanup Options**: Can clear promotions if needed

## 📊 Database Structure

The script creates documents with all the fields from `firestore-sample-data.md`:

- Core fields (title, description, icon, etc.)
- Pricing fields (originalPrice, discountPrice, etc.)
- **`modalConfig` object** containing all modal-related settings:
  - `buttonText`, `buttonLink`, `closeText`
  - `delay`, `showOnMobile`, `dismissible`, `showOnce`
  - `image` for visual appeal
- Timestamps and metadata

## 🎭 Modal Configuration

All promotions now include a **`modalConfig`** object for consistency:

```json
{
  "showModal": true,
  "modalConfig": {
    "buttonText": "Claim Your Discount",
    "buttonLink": "#mobile-app",
    "closeText": "Maybe Later",
    "delay": 3000,
    "showOnMobile": true,
    "dismissible": true,
    "showOnce": true,
    "image": "https://example.com/promo-image.jpg"
  }
}
```

**Benefits of the new structure:**

- ✅ **Consistency**: All promotions use the same modal configuration format
- ✅ **Organization**: Modal settings are grouped logically
- ✅ **Flexibility**: Easy to convert between modal and grid promotions
- ✅ **Maintainability**: All modal settings in one place

## 🚨 Important Notes

1. **Firebase Config**: Make sure your Firebase config is correct before running
2. **Permissions**: Your Firebase project must allow writes to Firestore
3. **Single Modal Rule**: The system automatically ensures only one modal promotion exists
4. **Data Safety**: The script won't delete existing data, only add new promotions

## 🧹 Cleanup

If you need to remove the sample data:

```bash
node scripts/seed-promotions.js --clear
```

This will mark all promotions as `active: false` (they won't be deleted, just hidden).

## 🔍 Verification

After running the script, you can verify the data in:

1. **Firebase Console** → Firestore Database → promotions collection
2. **Your Website** - Check if promotions appear in the grid and modal
3. **Browser Console** - Look for any error messages

## 🆘 Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/unauthorized)"**
   - Check your Firebase config
   - Ensure your project allows Firestore writes

2. **"Collection doesn't exist"**
   - The script will create the collection automatically
   - This is normal for new projects

3. **"Permission denied"**
   - Check your Firestore security rules
   - Ensure public read access is enabled

### Getting Help:

- Check the browser console for error messages
- Verify your Firebase project settings
- Review the Firestore security rules in `firestore-sample-data.md`

## 📝 Customization

To add your own promotions:

1. Edit the `samplePromotions` array in `seed-promotions.js`
2. Add your promotion data following the same structure
3. Run the script again

The script will automatically handle timestamps and modal management for you!
