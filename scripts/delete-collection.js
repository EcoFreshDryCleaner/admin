/**
 * Firestore Collection Deletion Script
 *
 * This script deletes all documents from any Firestore collection
 * WARNING: This action is irreversible and will permanently remove all data!
 *
 * Usage:
 * 1. Make sure you have Firebase config set up
 * 2. Run: node scripts/delete-orders.js <collection-name>
 * 3. Confirm deletion when prompted
 *
 * Examples:
 * - node scripts/delete-orders.js orders
 * - node scripts/delete-orders.js promotions
 * - node scripts/delete-orders.js services
 *
 * Note: This script will permanently delete ALL documents from the specified collection.
 * Use with extreme caution in production environments.
 */

import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import readline from 'readline'

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

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

/**
 * Prompts user for confirmation before proceeding with deletion
 */
function promptConfirmation(message) {
  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      resolve(answer.toLowerCase().trim())
    })
  })
}

/**
 * Deletes all documents from the specified Firestore collection
 * @param {string} collectionName - The name of the collection to delete
 */
async function deleteAllDocuments(collectionName) {
  try {
    console.log(`🗑️  Starting ${collectionName} deletion process...`)

    // Get all documents from the collection
    const snapshot = await db.collection(collectionName).get()

    if (snapshot.empty) {
      console.log(`✅ No documents found in the ${collectionName} collection`)
      return
    }

    const totalDocuments = snapshot.docs.length
    console.log(`📊 Found ${totalDocuments} documents to delete`)

    // Show sample of documents that will be deleted
    console.log(`\n📋 Sample ${collectionName} documents that will be deleted:`)
    snapshot.docs.slice(0, 5).forEach((doc, index) => {
      const docData = doc.data()
      
      // Try to extract meaningful information based on collection type
      let displayInfo = `Document ID: ${doc.id}`
      
      if (collectionName === 'orders') {
        const customerName = docData.customer_name || docData.name || 'Unknown Customer'
        const orderDate = docData.date_placed
          ? docData.date_placed.toDate
            ? docData.date_placed.toDate().toLocaleDateString()
            : 'Unknown Date'
          : 'Unknown Date'
        const status = docData.status || 'Unknown Status'
        displayInfo = `${customerName} - ${orderDate} (${status})`
      } else if (collectionName === 'promotions') {
        const title = docData.title || 'Untitled Promotion'
        const active = docData.active ? 'Active' : 'Inactive'
        displayInfo = `${title} (${active})`
      } else if (collectionName === 'services') {
        const title = docData.title || 'Untitled Service'
        const featured = docData.featured ? 'Featured' : 'Regular'
        displayInfo = `${title} (${featured})`
      } else if (collectionName === 'users') {
        const email = docData.email || 'No Email'
        const admin = docData.admin ? 'Admin' : 'User'
        displayInfo = `${email} (${admin})`
      } else {
        // Generic display for unknown collections
        const keys = Object.keys(docData).slice(0, 2)
        const preview = keys.map(key => `${key}: ${docData[key]}`).join(', ')
        displayInfo = preview || 'No data'
      }
      
      console.log(`  ${index + 1}. ${displayInfo}`)
    })

    if (totalDocuments > 5) {
      console.log(`  ... and ${totalDocuments - 5} more documents`)
    }

    // Final confirmation
    const finalConfirm = await promptConfirmation(
      `\n⚠️  WARNING: This will permanently delete ALL ${totalDocuments} documents from the ${collectionName} collection!\n` +
        `This action cannot be undone. Are you absolutely sure? (yes/no): `,
    )

    if (finalConfirm !== 'yes') {
      console.log('❌ Deletion cancelled by user')
      return
    }

    // Delete documents in batches to avoid overwhelming Firestore
    console.log(`\n🗑️  Deleting ${collectionName} documents...`)
    const batchSize = 500 // Firestore batch limit
    let deletedCount = 0
    let batchCount = 0

    for (let i = 0; i < totalDocuments; i += batchSize) {
      const batch = db.batch()
      const batchDocs = snapshot.docs.slice(i, i + batchSize)

      batchDocs.forEach((doc) => {
        batch.delete(doc.ref)
      })

      await batch.commit()
      deletedCount += batchDocs.length
      batchCount++

      console.log(
        `✅ Deleted batch ${batchCount}: ${batchDocs.length} documents (${deletedCount}/${totalDocuments})`,
      )

      // Small delay between batches to avoid overwhelming Firestore
      if (i + batchSize < totalDocuments) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }

    console.log(`\n🎉 ${collectionName} deletion completed successfully!`)
    console.log(`📊 Total documents deleted: ${deletedCount}`)
    console.log(`📦 Batches processed: ${batchCount}`)
  } catch (error) {
    console.error(`❌ Error deleting ${collectionName} documents:`, error)
    throw error
  }
}

/**
 * Shows help information
 */
function showHelp() {
  console.log(`
📚 Firestore Collection Deletion Script

⚠️  WARNING: This script will permanently delete ALL documents from the specified collection!

Usage:
  node scripts/delete-orders.js <collection-name>    # Delete all documents from collection
  node scripts/delete-orders.js --help              # Show this help message

Examples:
  node scripts/delete-orders.js orders              # Delete all orders
  node scripts/delete-orders.js promotions          # Delete all promotions
  node scripts/delete-orders.js services            # Delete all services
  node scripts/delete-orders.js users               # Delete all users

This script will:
❌ Permanently delete ALL documents from the specified collection
❌ Remove all data and history
❌ This action cannot be undone

Safety Features:
✅ Requires explicit user confirmation
✅ Shows sample of documents before deletion
✅ Processes deletions in batches
✅ Provides progress updates
✅ Smart document preview based on collection type

Supported Collections:
📦 orders     - Customer orders and order history
🎯 promotions - Marketing promotions and offers
🛠️  services   - Service definitions and details
👥 users      - User accounts and profiles
📄 [any]      - Any other Firestore collection

Make sure your Firebase config is correct before running!
  `)
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2)

  if (args.includes('--help')) {
    showHelp()
    return
  }

  // Check if collection name is provided
  if (args.length === 0) {
    console.error('❌ Error: Collection name is required!')
    console.log('\nUsage: node scripts/delete-orders.js <collection-name>')
    console.log('Example: node scripts/delete-orders.js orders')
    console.log('Run with --help for more information.')
    process.exit(1)
  }

  const collectionName = args[0].toLowerCase()

  // Validate collection name
  if (!/^[a-zA-Z0-9_-]+$/.test(collectionName)) {
    console.error('❌ Error: Invalid collection name!')
    console.log('Collection names can only contain letters, numbers, underscores, and hyphens.')
    process.exit(1)
  }

  try {
    // Initial warning
    console.log('🚨 COLLECTION DELETION SCRIPT 🚨')
    console.log(`This script will permanently delete ALL documents from the "${collectionName}" collection!`)
    console.log('Make sure you have a backup if needed.\n')

    const confirm = await promptConfirmation('Do you want to continue? (yes/no): ')

    if (confirm !== 'yes') {
      console.log('❌ Script cancelled by user')
      return
    }

    // Proceed with deletion
    await deleteAllDocuments(collectionName)
  } catch (error) {
    console.error('\n💥 Script execution failed:', error)
    process.exit(1)
  } finally {
    rl.close()
  }
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
