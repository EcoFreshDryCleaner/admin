/**
 * Firestore Database Seeding Script
 *
 * This script automatically creates the sample promotions in your Firestore database
 * based on the examples from firestore-sample-data.md
 *
 * Usage:
 * 1. Make sure you have Firebase config set up
 * 2. Run: node scripts/seed-promotions.js
 *
 * Note: This script will create the promotions collection and add sample data.
 * Only ONE promotion will have showModal: true as required by the system.
 */

import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore'

// Your Firebase configuration (update with your actual values)
const firebaseConfig = {
  apiKey: 'AIzaSyBA4e8J5bkdXm8AiZ2Al9vnVI_M2KE469M',
  authDomain: 'ecofresh-2690b.firebaseapp.com',
  projectId: 'ecofresh-2690b',
  storageBucket: 'ecofresh-2690b.firebasestorage.app',
  messagingSenderId: '172084272805',
  appId: '1:172084272805:web:9617cf7b0809526604b74c',
  measurementId: 'G-K2EJ1EBCYY',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Sample promotions data from firestore-sample-data.md
const samplePromotions = [
  {
    title: 'Bulk Order Discount',
    description: 'Save big when you order 10+ items. Perfect for families and businesses.',
    icon: '📦',
    originalPrice: '129.90',
    discountPrice: '99.90',
    discountPercentage: '23%',
    features: [
      'Minimum 10 items',
      'Free pickup & delivery',
      'Same-day service available',
      'Premium care included',
    ],
    expiryDate: 'Dec 31, 2024',
    featured: true,
    badge: 'Most Popular',
    active: true,
    showModal: false,
    modalConfig: {
      buttonText: 'Get Offer',
      buttonLink: '#mobile-app',
      closeText: 'Maybe Later',
      delay: 3000,
      showOnMobile: true,
      dismissible: true,
      showOnce: false,
      image: null,
    },
  },
  {
    title: 'Student Discount',
    description: 'Special pricing for students with valid ID. Keep your professional attire fresh.',
    icon: '🎓',
    originalPrice: '12.99',
    discountPrice: '9.99',
    discountPercentage: '23%',
    features: [
      'Valid student ID required',
      'All service levels included',
      'Free pickup & delivery',
      '24-hour turnaround',
    ],
    expiryDate: 'Ongoing',
    featured: false,
    badge: null,
    active: true,
    showModal: false,
    modalConfig: {
      buttonText: 'Get Student Discount',
      buttonLink: '#mobile-app',
      closeText: 'Maybe Later',
      delay: 3000,
      showOnMobile: true,
      dismissible: true,
      showOnce: false,
      image: null,
    },
  },
  {
    title: '🎉 New Customer Special!',
    description: 'First-time customers get 50% off their first order of 5+ items!',
    icon: '🎁',
    originalPrice: null,
    discountPrice: null,
    discountPercentage: '50%',
    features: [
      'First-time customers only',
      'Minimum 5 items',
      'Free pickup & delivery',
      'Premium care included',
    ],
    expiryDate: 'Ongoing',
    featured: true,
    badge: 'Limited Time',
    active: true,
    showModal: true, // This will be the modal promotion
    modalConfig: {
      buttonText: 'Claim Your Discount',
      buttonLink: '#mobile-app',
      closeText: 'Maybe Later',
      delay: 3000,
      showOnMobile: true,
      dismissible: true,
      showOnce: true,
      image:
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=center',
    },
  },
  {
    title: 'Weekend Special',
    description: 'Drop off on Friday, get your clothes back by Monday morning.',
    icon: '📅',
    originalPrice: '15.99',
    discountPrice: '12.99',
    discountPercentage: '19%',
    features: [
      'Friday drop-off only',
      'Monday delivery guaranteed',
      'Premium care included',
      'Perfect for weekend prep',
    ],
    expiryDate: 'Every Friday',
    featured: false,
    badge: null,
    active: true,
    showModal: false,
    modalConfig: {
      buttonText: 'Book Weekend Service',
      buttonLink: '#mobile-app',
      closeText: 'Maybe Later',
      delay: 3000,
      showOnMobile: true,
      dismissible: true,
      showOnce: false,
      image: null,
    },
  },
  {
    title: 'Express Service Premium',
    description: 'Get your clothes back in just 2 hours with our express service.',
    icon: '⚡',
    originalPrice: '24.99',
    discountPrice: '19.99',
    discountPercentage: '20%',
    features: [
      '2-hour turnaround',
      'Premium care included',
      'Priority processing',
      'Free pickup & delivery',
    ],
    expiryDate: 'Ongoing',
    featured: false,
    badge: 'Fast',
    active: true,
    showModal: false,
    modalConfig: {
      buttonText: 'Book Express Service',
      buttonLink: '#mobile-app',
      closeText: 'Maybe Later',
      delay: 3000,
      showOnMobile: true,
      dismissible: true,
      showOnce: false,
      image: null,
    },
  },
]

/**
 * Ensures only one modal promotion exists by setting others to false
 */
async function ensureOnlyOneModal() {
  try {
    console.log('🔍 Checking for existing modal promotions...')

    const q = query(
      collection(db, 'promotions'),
      where('active', '==', true),
      where('showModal', '==', true),
    )

    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      console.log(`⚠️  Found ${querySnapshot.docs.length} existing modal promotion(s)`)

      // Update all existing modal promotions to not show as modal
      const updatePromises = querySnapshot.docs.map((doc) =>
        updateDoc(doc.ref, {
          showModal: false,
          updatedAt: serverTimestamp(),
        }),
      )

      await Promise.all(updatePromises)
      console.log('✅ Updated existing modal promotions to showModal: false')
    } else {
      console.log('✅ No existing modal promotions found')
    }
  } catch (error) {
    console.error('❌ Error ensuring only one modal promotion:', error)
    throw error
  }
}

/**
 * Seeds the promotions collection with sample data
 */
async function seedPromotions() {
  try {
    console.log('🚀 Starting Firestore database seeding...')

    // Ensure only one modal promotion exists
    await ensureOnlyOneModal()

    // Add each promotion to the database
    const createdPromotions = []

    for (const promotion of samplePromotions) {
      try {
        // Add timestamps
        const promotionWithTimestamps = {
          ...promotion,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }

        const docRef = await addDoc(collection(db, 'promotions'), promotionWithTimestamps)

        createdPromotions.push({
          id: docRef.id,
          title: promotion.title,
          showModal: promotion.showModal,
        })

        console.log(`✅ Created promotion: ${promotion.title} (ID: ${docRef.id})`)

        // Small delay to avoid overwhelming Firestore
        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`❌ Error creating promotion "${promotion.title}":`, error)
      }
    }

    // Summary
    console.log('\n🎉 Database seeding completed!')
    console.log(`📊 Created ${createdPromotions.length} promotions`)

    const modalPromotion = createdPromotions.find((p) => p.showModal)
    if (modalPromotion) {
      console.log(`🎭 Modal promotion: ${modalPromotion.title} (ID: ${modalPromotion.id})`)
    }

    console.log('\n📋 Created promotions:')
    createdPromotions.forEach((promo) => {
      const status = promo.showModal ? '🎭 MODAL' : '📋 GRID'
      console.log(`  ${status} - ${promo.title}`)
    })

    console.log('\n✨ Your Firestore database is now ready with sample promotions!')
  } catch (error) {
    console.error('❌ Fatal error during seeding:', error)
    process.exit(1)
  }
}

/**
 * Cleans up the database by removing all promotions (use with caution!)
 */
async function clearPromotions() {
  try {
    console.log('🧹 Clearing all promotions from database...')

    const q = query(collection(db, 'promotions'))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      console.log('✅ No promotions to clear')
      return
    }

    console.log(`🗑️  Found ${querySnapshot.docs.length} promotions to delete`)

    // Note: In production, you might want to use deleteDoc instead of updateDoc
    const deletePromises = querySnapshot.docs.map((doc) =>
      updateDoc(doc.ref, {
        active: false,
        updatedAt: serverTimestamp(),
      }),
    )

    await Promise.all(deletePromises)
    console.log('✅ All promotions marked as inactive')
  } catch (error) {
    console.error('❌ Error clearing promotions:', error)
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2)

  if (args.includes('--clear')) {
    await clearPromotions()
    return
  }

  if (args.includes('--help')) {
    console.log(`
📚 Firestore Database Seeding Script

Usage:
  node scripts/seed-promotions.js          # Seed database with sample promotions
  node scripts/seed-promotions.js --clear  # Clear all promotions (mark as inactive)
  node scripts/seed-promotions.js --help   # Show this help message

This script will:
✅ Create the promotions collection if it doesn't exist
✅ Add 5 sample promotions to your database
✅ Ensure only ONE promotion has showModal: true
✅ Set proper timestamps for all documents

Make sure your Firebase config is correct before running!
    `)
    return
  }

  // Default action: seed the database
  await seedPromotions()
}

// Run the script
main()
  .then(() => {
    console.log('\n🏁 Script execution completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Script execution failed:', error)
    process.exit(1)
  })
