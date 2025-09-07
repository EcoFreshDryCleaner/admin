/**
 * Firestore Locations Seeding Script
 *
 * This script automatically creates the locations in your Firestore database
 * based on the hardcoded locations from SchedulePickupScreen.js
 *
 * Usage:
 * 1. Make sure you have Firebase config set up
 * 2. Run: node scripts/seed-locations.js
 *
 * Note: This script will create the locations collection and add all location data.
 * Locations will be marked as active and ordered by the order field.
 */

import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Get the directory of the current script
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load service account credentials
const serviceAccountPath = join(__dirname, 'ecofresh-2690b-firebase-adminsdk-fbsvc-e9346d7220.json')
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'))

// Initialize Firebase Admin SDK
const app = initializeApp({
  credential: cert(serviceAccount),
  projectId: 'ecofresh-2690b'
})

// Initialize Firestore Admin
const db = getFirestore(app)

// Locations data from ContactSection.vue
const locationsData = [
  {
    id: 'mathews',
    name: 'Mathews Location',
    address: '1115 A Mathews Mint Hill Rd, Mathews, NC 28105',
    order: 1,
    active: true,
    phone: '(794) 847-5992',
    hours: {
      monday: '7:00 AM - 6:00 PM',
      tuesday: '7:00 AM - 6:00 PM',
      wednesday: '7:00 AM - 6:00 PM',
      thursday: '7:00 AM - 6:00 PM',
      friday: '7:00 AM - 6:00 PM',
      saturday: '9:00 AM - 3:00 PM',
      sunday: 'Closed'
    },
    services: ['pickup', 'dropoff', 'express'],
    coordinates: {
      latitude: 35.0168,
      longitude: -80.7237
    }
  },
  {
    id: 'mallard-creek',
    name: 'Mallard Creek Location',
    address: '2712 W Mallard Creek Church Rd, Charlotte, NC 28262',
    order: 2,
    active: true,
    phone: '(704) 717-8180',
    hours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '9:00 AM - 3:00 PM',
      sunday: 'Closed'
    },
    services: ['pickup', 'dropoff', 'express', 'alterations'],
    coordinates: {
      latitude: 35.3142,
      longitude: -80.7414
    }
  },
  {
    id: 'piedmont-row',
    name: 'Piedmont Row Location',
    address: '4625 Piedmont Row Dr #145A, Charlotte, NC 28210',
    order: 3,
    active: true,
    phone: '(704) 554-1788',
    hours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '9:00 AM - 3:00 PM',
      sunday: 'Closed'
    },
    services: ['pickup', 'dropoff', 'express', 'alterations', 'shoe_repair'],
    coordinates: {
      latitude: 35.1342,
      longitude: -80.8506
    }
  }
]

/**
 * Seed locations to Firestore
 */
async function seedLocations() {
  try {
    console.log('🌱 Starting locations seeding...')
    
    // Get reference to locations collection
    const locationsRef = db.collection('locations')
    
    // Check if locations already exist
    const existingLocations = await locationsRef.get()
    
    if (!existingLocations.empty) {
      console.log(`⚠️  Found ${existingLocations.size} existing locations.`)
      console.log('   This script will add new locations but won\'t overwrite existing ones.')
      console.log('   To completely reset, delete the locations collection first.\n')
    }
    
    let addedCount = 0
    let skippedCount = 0
    
    // Add each location
    for (const locationData of locationsData) {
      try {
        // Check if location with this ID already exists
        const existingLocation = await locationsRef.where('id', '==', locationData.id).get()
        
        if (!existingLocation.empty) {
          console.log(`⏭️  Skipping ${locationData.name} - already exists`)
          skippedCount++
          continue
        }
        
        // Add timestamp
        const locationWithTimestamp = {
          ...locationData,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
        // Add to Firestore
        await locationsRef.add(locationWithTimestamp)
        console.log(`✅ Added location: ${locationData.name}`)
        addedCount++
        
      } catch (error) {
        console.error(`❌ Error adding location ${locationData.name}:`, error.message)
      }
    }
    
    console.log('\n🎉 Locations seeding completed!')
    console.log(`   Added: ${addedCount} locations`)
    console.log(`   Skipped: ${skippedCount} locations`)
    console.log(`   Total locations in database: ${addedCount + skippedCount}`)
    
    // Display summary
    console.log('\n📋 Location Summary:')
    for (const location of locationsData) {
      console.log(`   • ${location.name} (${location.id})`)
      console.log(`     ${location.address}`)
      console.log(`     Services: ${location.services.join(', ')}`)
      console.log('')
    }
    
  } catch (error) {
    console.error('❌ Error during locations seeding:', error)
    process.exit(1)
  }
}

/**
 * Verify the seeded data
 */
async function verifyLocations() {
  try {
    console.log('\n🔍 Verifying seeded locations...')
    
    const locationsRef = db.collection('locations')
    const snapshot = await locationsRef.orderBy('order').get()
    
    if (snapshot.empty) {
      console.log('❌ No locations found in database')
      return
    }
    
    console.log(`✅ Found ${snapshot.size} locations in database:`)
    snapshot.forEach(doc => {
      const data = doc.data()
      console.log(`   • ${data.name} (${data.id}) - ${data.active ? 'Active' : 'Inactive'}`)
    })
    
  } catch (error) {
    console.error('❌ Error verifying locations:', error)
  }
}

// Main execution
async function main() {
  try {
    await seedLocations()
    await verifyLocations()
    console.log('\n✨ All done! Locations are ready to use in your mobile app.')
  } catch (error) {
    console.error('❌ Script failed:', error)
    process.exit(1)
  } finally {
    // Close the app to exit the process
    process.exit(0)
  }
}

// Run the script
main()
