/**
 * Firestore Services Seeding Script
 *
 * This script automatically creates the services in your Firestore database
 * based on the existing servicesData.js file
 *
 * Usage:
 * 1. Make sure you have Firebase config set up
 * 2. Run: node scripts/seed-services.js
 *
 * Note: This script will create the services collection and add all service data.
 * Services will be marked as active and ordered by the order field.
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

// Services data from the original servicesData.js
const servicesData = [
  {
    slug: 'free-pickup-delivery',
    title: 'Free Pickup and Delivery',
    subtitle: 'Convenient service right to your door',
    heroImage: 'https://cdn.ecofreshdrycleaner.com/delivery-1.jpg',
    order: 1,
    price: 0,
    featured: false,
    icon: 'car-outline',
    overview: {
      title: 'Convenient Service to Your Door',
      description:
        'Experience the ultimate convenience with our free pickup and delivery service. We come to you, saving you time and hassle while ensuring your garments receive professional care.',
      image: 'https://cdn.ecofreshdrycleaner.com/delivery-2.jpg',
      features: [
        'Free pickup from your home or office',
        'Flexible scheduling to fit your needs',
        'Service within 10 miles of our location',
        'Real-time text notifications',
        'Secure and professional handling',
        'Same-day pickup available',
      ],
    },
    process: [
      {
        title: 'Schedule Your Pickup',
        description:
          'Book your pickup online or call us. Choose a convenient time that works with your schedule.',
      },
      {
        title: 'We Come to You',
        description:
          'Our professional team arrives at your location to collect your garments with care.',
      },
      {
        title: 'Professional Processing',
        description:
          'Your items are processed using our state-of-the-art equipment and eco-friendly methods.',
      },
      {
        title: 'Quality Inspection',
        description:
          'Each item is carefully inspected to ensure the highest quality standards are met.',
      },
      {
        title: 'Secure Delivery',
        description:
          'Your clean garments are delivered back to you at your preferred time and location.',
      },
    ],
    // benefits: [
    //   {
    //     title: 'Time Saving',
    //     description: 'No more trips to the dry cleaner - we handle everything for you.',
    //   },
    //   {
    //     title: 'Convenient',
    //     description: 'Schedule pickups and deliveries that fit your busy lifestyle.',
    //   },
    //   {
    //     title: 'Reliable',
    //     description: 'Consistent, on-time service you can count on every time.',
    //   },
    //   {
    //     title: 'Professional',
    //     description: 'Trained staff handle your garments with the utmost care.',
    //   },
    // ],
  },
  {
    slug: 'wash-fold-laundry',
    title: 'Wash & Fold Laundry',
    subtitle: 'Fresh and clean everyday clothes',
    heroImage: 'https://cdn.ecofreshdrycleaner.com/wash-fold-1.jpg',
    order: 2,
    price: 12.99,
    featured: true, // Make this featured
    icon: 'refresh-outline',
    overview: {
      title: 'Complete Laundry Service',
      description:
        'Our wash and fold service takes the hassle out of laundry day. We handle everything from sorting to folding, delivering fresh, clean clothes ready to wear.',
      image: 'https://cdn.ecofreshdrycleaner.com/wash-fold-2.jpg',
      features: [
        'Gentle washing with premium detergents',
        'Professional drying and folding',
        'Separated by type and color',
        'Fabric softener options available',
        'Stain removal treatment',
        'Quick turnaround time',
      ],
    },
    process: [
      {
        title: 'Sorting & Inspection',
        description: 'We carefully sort your laundry by color, fabric type, and care requirements.',
      },
      {
        title: 'Gentle Washing',
        description: 'Your clothes are washed using gentle cycles and premium detergents.',
      },
      {
        title: 'Professional Drying',
        description: 'Items are dried at appropriate temperatures to prevent shrinkage and damage.',
      },
      {
        title: 'Expert Folding',
        description: 'Each item is professionally folded and organized for easy storage.',
      },
      {
        title: 'Quality Check',
        description: 'Final inspection ensures everything meets our high standards.',
      },
    ],
    // benefits: [
    //   {
    //     title: 'Time Saving',
    //     description: 'Free up hours of your week with our professional laundry service.',
    //   },
    //   {
    //     title: 'Gentle Care',
    //     description: 'Your clothes receive gentle treatment to maintain their quality.',
    //   },
    //   {
    //     title: 'Professional Results',
    //     description: 'Expert folding and organization for easy storage and wear.',
    //   },
    //   {
    //     title: 'Bulk Pricing',
    //     description: 'Special rates available for larger orders and regular customers.',
    //   },
    // ],
  },
  {
    slug: 'shirt-laundry',
    title: 'Shirt Laundry',
    subtitle: 'The Perfect Shirt Laundry Service',
    heroImage: 'https://cdn.ecofreshdrycleaner.com/shirts-1.jpg',
    order: 3,
    price: 8.99,
    featured: false,
    icon: 'shirt-outline',
    overview: {
      title: 'Professional Shirt Care',
      description:
        'Specialized care for your dress shirts and business attire. Our shirt laundry service ensures crisp, professional results every time.',
      image: 'https://cdn.ecofreshdrycleaner.com/shirts-2.jpg',
      features: [
        'Specialized shirt washing techniques',
        'Professional pressing and starching',
        'Collar and cuff attention',
        'Button inspection and repair',
        'Hanger-ready presentation',
        'Express service available',
      ],
    },
    process: [
      {
        title: 'Pre-treatment',
        description: 'Collars and cuffs receive special attention to remove oils and stains.',
      },
      {
        title: 'Gentle Washing',
        description: 'Shirts are washed using specialized techniques to preserve fabric integrity.',
      },
      {
        title: 'Professional Pressing',
        description: 'Each shirt is carefully pressed to achieve crisp, professional results.',
      },
      {
        title: 'Quality Inspection',
        description: 'Buttons, seams, and overall appearance are checked for perfection.',
      },
      {
        title: 'Hanger Ready',
        description: 'Shirts are presented on hangers, ready to wear immediately.',
      },
    ],
    // benefits: [
    //   {
    //     title: 'Professional Results',
    //     description: 'Crisp, professional appearance that makes a great impression.',
    //   },
    //   {
    //     title: 'Fabric Care',
    //     description: 'Specialized techniques preserve your shirt quality and longevity.',
    //   },
    //   {
    //     title: 'Convenience',
    //     description: 'Hanger-ready shirts save you time getting ready for work.',
    //   },
    //   {
    //     title: 'Express Service',
    //     description: 'Quick turnaround for when you need shirts in a hurry.',
    //   },
    // ],
  },
  {
    slug: 'dry-cleaning',
    title: 'Professional Dry Cleaning',
    subtitle: 'Expert care for your finest garments',
    heroImage: 'https://cdn.ecofreshdrycleaner.com/dry-cleaning-1.jpg',
    order: 4,
    price: 15.99,
    featured: false,
    icon: 'shirt-outline',
    overview: {
      title: 'Expert Care for Delicate Fabrics',
      description:
        'Our professional dry cleaning service uses eco-friendly solvents and state-of-the-art equipment to safely clean your most delicate and valuable garments.',
      image: 'https://cdn.ecofreshdrycleaner.com/dry-cleaning-2.jpg',
      features: [
        'Eco-friendly GreenEarth cleaning',
        'Professional pressing and finishing',
        'Stain treatment and removal',
        'Fabric protection treatments',
        'Quality inspection process',
        'Delicate fabric expertise',
      ],
    },
    process: [
      {
        title: 'Garment Inspection',
        description:
          'Each item is carefully inspected for stains, damage, and special care requirements.',
      },
      {
        title: 'Pre-treatment',
        description: 'Stains and problem areas receive specialized treatment before cleaning.',
      },
      {
        title: 'Eco-Friendly Cleaning',
        description:
          'Items are cleaned using our GreenEarth solvent system, safe for fabrics and environment.',
      },
      {
        title: 'Professional Finishing',
        description: 'Garments are pressed and finished to restore their original appearance.',
      },
      {
        title: 'Final Inspection',
        description: 'Quality check ensures every item meets our high standards before return.',
      },
    ],
    // benefits: [
    //   {
    //     title: 'Eco-Friendly',
    //     description: 'GreenEarth cleaning is safe for your clothes and the environment.',
    //   },
    //   {
    //     title: 'Expert Care',
    //     description: 'Specialized knowledge for handling delicate and valuable garments.',
    //   },
    //   {
    //     title: 'Stain Removal',
    //     description: 'Professional stain treatment for the most challenging marks.',
    //   },
    //   {
    //     title: 'Fabric Protection',
    //     description: 'Treatments to help protect and extend the life of your garments.',
    //   },
    // ],
  },
  {
    slug: 'wedding-dresses',
    title: 'Wedding Dress Cleaning & Preservation',
    subtitle: 'Preserve your special memories',
    heroImage: 'https://cdn.ecofreshdrycleaner.com/wedding-2.jpg',
    order: 5,
    price: 89.99,
    featured: false,
    icon: 'heart-outline',
    overview: {
      title: 'Expert Wedding Gown Care',
      description:
        'Specialized cleaning and preservation services for your most important dress. We understand the sentimental value and provide the utmost care.',
      image: 'https://cdn.ecofreshdrycleaner.com/wedding-1.jpg',
      features: [
        'Expert wedding gown cleaning',
        'Professional stain removal',
        'Acid-free preservation packaging',
        'Lifetime protection guarantee',
        'Specialized fabric care',
        'Memorial box presentation',
      ],
    },
    process: [
      {
        title: 'Detailed Inspection',
        description:
          'Comprehensive examination of fabric, embellishments, and any stains or damage.',
      },
      {
        title: 'Specialized Cleaning',
        description:
          'Gentle cleaning process designed specifically for wedding gown fabrics and details.',
      },
      {
        title: 'Stain Treatment',
        description:
          'Professional removal of wedding day stains including makeup, food, and grass.',
      },
      {
        title: 'Preservation Process',
        description: 'Acid-free packaging and preservation techniques for long-term storage.',
      },
      {
        title: 'Memorial Presentation',
        description: 'Beautiful presentation box for safe, long-term storage of your memories.',
      },
    ],
    // benefits: [
    //   {
    //     title: 'Expert Care',
    //     description: 'Specialized knowledge in wedding gown fabrics and construction.',
    //   },
    //   {
    //     title: 'Stain Removal',
    //     description: 'Professional treatment of wedding day stains and marks.',
    //   },
    //   {
    //     title: 'Preservation',
    //     description: 'Acid-free packaging ensures your gown stays beautiful for generations.',
    //   },
    //   {
    //     title: 'Memorial Quality',
    //     description: 'Beautiful presentation for passing down to future generations.',
    //   },
    // ],
  },
  {
    slug: 'outerwear',
    title: 'Outerwear Cleaning',
    subtitle: 'Professional care for coats and jackets',
    heroImage: 'https://cdn.ecofreshdrycleaner.com/outerwear-2.jpg',
    order: 6,
    price: 19.99,
    featured: false,
    icon: 'snow-outline',
    overview: {
      title: 'Specialized Outerwear Care',
      description:
        'Professional cleaning for coats, jackets, and outerwear. We handle everything from wool coats to down jackets with specialized care.',
      image: 'https://cdn.ecofreshdrycleaner.com/outerwear-1.jpg',
      features: [
        'Wool and cashmere expertise',
        'Down jacket cleaning',
        'Leather and suede care',
        'Waterproofing treatments',
        'Professional pressing',
        'Seasonal storage preparation',
      ],
    },
    process: [
      {
        title: 'Fabric Assessment',
        description:
          'Careful evaluation of fabric type and construction to determine best cleaning method.',
      },
      {
        title: 'Specialized Cleaning',
        description: 'Appropriate cleaning method based on fabric type and care requirements.',
      },
      {
        title: 'Stain Treatment',
        description: 'Professional removal of outdoor stains, salt, and weather-related marks.',
      },
      {
        title: 'Professional Finishing',
        description: 'Proper pressing and shaping to maintain garment structure and appearance.',
      },
      {
        title: 'Protective Treatment',
        description: 'Waterproofing and protective treatments as needed for weather protection.',
      },
    ],
    // benefits: [
    //   {
    //     title: 'Fabric Expertise',
    //     description: 'Specialized knowledge for wool, cashmere, down, and technical fabrics.',
    //   },
    //   {
    //     title: 'Weather Protection',
    //     description: 'Professional waterproofing and protective treatments.',
    //   },
    //   {
    //     title: 'Seasonal Care',
    //     description: 'Proper cleaning and storage preparation for seasonal items.',
    //   },
    //   {
    //     title: 'Longevity',
    //     description: 'Expert care extends the life and performance of your outerwear.',
    //   },
    // ],
  },
  {
    slug: 'alterations',
    title: 'Alterations & Repairs',
    subtitle: 'Expert tailoring services',
    heroImage: 'https://cdn.ecofreshdrycleaner.com/alterations-1.jpg',
    order: 7,
    price: 12.99,
    featured: false,
    icon: 'cut-outline',
    overview: {
      title: 'Professional Tailoring Services',
      description:
        'Expert alterations and repairs to make your clothes fit perfectly. From simple hemming to complex alterations, we handle it all.',
      image: 'https://cdn.ecofreshdrycleaner.com/alterations-2.jpg',
      features: [
        'Hemming and tapering',
        'Button replacement and repair',
        'Zipper repairs and replacement',
        'Seam mending and reinforcement',
        'Custom alterations',
        'Rush service available',
      ],
    },
    process: [
      {
        title: 'Consultation',
        description:
          'Professional fitting and consultation to understand your needs and preferences.',
      },
      {
        title: 'Precise Measurements',
        description: 'Accurate measurements and marking for perfect fit and appearance.',
      },
      {
        title: 'Expert Craftsmanship',
        description: 'Skilled tailoring using professional techniques and quality materials.',
      },
      {
        title: 'Quality Check',
        description: 'Thorough inspection to ensure alterations meet our high standards.',
      },
      {
        title: 'Final Fitting',
        description: 'Final fitting to ensure perfect results and customer satisfaction.',
      },
    ],
    // benefits: [
    //   {
    //     title: 'Perfect Fit',
    //     description: 'Expert alterations ensure your clothes fit you perfectly.',
    //   },
    //   {
    //     title: 'Quality Craftsmanship',
    //     description: 'Professional techniques and attention to detail in every alteration.',
    //   },
    //   {
    //     title: 'Versatile Services',
    //     description: 'From simple repairs to complex alterations, we handle it all.',
    //   },
    //   {
    //     title: 'Rush Service',
    //     description: 'Quick turnaround available for urgent alterations and repairs.',
    //   },
    // ],
  },
  {
    slug: 'shoes',
    title: 'Shoe Repair & Shine',
    subtitle: 'Restore your favorite footwear',
    heroImage: 'https://cdn.ecofreshdrycleaner.com/shoe-1.jpg',
    order: 8,
    price: 9.99,
    featured: false,
    icon: 'footsteps-outline',
    overview: {
      title: 'Professional Shoe Care',
      description:
        'Expert shoe repair and shining services to keep your footwear looking and performing their best. From leather dress shoes to casual sneakers.',
      image: 'https://cdn.ecofreshdrycleaner.com/shoe-2.jpg',
      features: [
        'Professional shoe shining',
        'Sole and heel repair',
        'Leather conditioning',
        'Color restoration',
        'Waterproofing treatment',
        'Express shine service',
      ],
    },
    process: [
      {
        title: 'Assessment',
        description: 'Thorough evaluation of shoe condition and repair needs.',
      },
      {
        title: 'Cleaning & Preparation',
        description: 'Deep cleaning and preparation for repair or shine service.',
      },
      {
        title: 'Repair Work',
        description: 'Professional repairs including sole replacement, heel repair, and stitching.',
      },
      {
        title: 'Shine & Polish',
        description: 'Expert shining and polishing for that professional finish.',
      },
      {
        title: 'Protective Treatment',
        description: 'Conditioning and waterproofing treatments for long-lasting protection.',
      },
    ],
    // benefits: [
    //   {
    //     title: 'Professional Shine',
    //     description: 'Expert shining techniques for that mirror-like finish.',
    //   },
    //   {
    //     title: 'Quality Repairs',
    //     description: 'Professional repairs that extend the life of your footwear.',
    //   },
    //   {
    //     title: 'Leather Care',
    //     description: 'Specialized conditioning and protection for leather shoes.',
    //   },
    //   {
    //     title: 'Express Service',
    //     description: 'Quick shine service available for same-day results.',
    //   },
    // ],
  },
  {
    slug: 'leather-products',
    title: 'Leather & Suede Care',
    subtitle: 'Specialized care for leather goods',
    heroImage: 'https://cdn.ecofreshdrycleaner.com/leather-1.jpg',
    order: 9,
    price: 24.99,
    featured: false,
    icon: 'bag-outline',
    overview: {
      title: 'Expert Leather and Suede Care',
      description:
        'Specialized cleaning and restoration services for leather and suede items. We handle everything from jackets to handbags with expert care.',
      image: 'https://cdn.ecofreshdrycleaner.com/leather-2.jpg',
      features: [
        'Leather cleaning and conditioning',
        'Suede restoration and cleaning',
        'Color touch-up and restoration',
        'Waterproofing treatments',
        'Odor removal',
        'Professional finishing',
      ],
    },
    process: [
      {
        title: 'Leather Assessment',
        description:
          'Careful evaluation of leather type, condition, and specific care requirements.',
      },
      {
        title: 'Specialized Cleaning',
        description:
          'Gentle cleaning process designed specifically for leather and suede materials.',
      },
      {
        title: 'Conditioning Treatment',
        description: 'Professional conditioning to restore suppleness and prevent cracking.',
      },
      {
        title: 'Color Restoration',
        description: 'Touch-up and color restoration for faded or damaged areas.',
      },
      {
        title: 'Protective Finishing',
        description: 'Waterproofing and protective treatments for long-lasting care.',
      },
    ],
    // benefits: [
    //   {
    //     title: 'Expert Knowledge',
    //     description: 'Specialized expertise in leather and suede care techniques.',
    //   },
    //   {
    //     title: 'Restoration',
    //     description: 'Professional restoration brings new life to worn leather items.',
    //   },
    //   {
    //     title: 'Protection',
    //     description: 'Conditioning and waterproofing treatments protect your investment.',
    //   },
    //   {
    //     title: 'Longevity',
    //     description: 'Proper care extends the life and beauty of your leather goods.',
    //   },
    // ],
  },
  {
    slug: 'bedding-household',
    title: 'Bedding & Household Items',
    subtitle: 'Care for your home textiles',
    heroImage: 'https://cdn.ecofreshdrycleaner.com/bedding-1.jpg',
    order: 10,
    price: 29.99,
    featured: false,
    icon: 'bed-outline',
    overview: {
      title: 'Home Textile Care',
      description:
        "Professional cleaning for comforters, blankets, curtains, and other household textiles. We handle large items that don't fit in home washers.",
      image: 'https://cdn.ecofreshdrycleaner.com/bedding-2.jpg',
      features: [
        'Comforter and duvet cleaning',
        'Blanket and throw cleaning',
        'Curtain and drapery care',
        'Pillow cleaning and sanitizing',
        'Large item handling',
        'Seasonal storage preparation',
      ],
    },
    process: [
      {
        title: 'Size Assessment',
        description: 'Evaluation of item size and cleaning requirements for proper handling.',
      },
      {
        title: 'Pre-treatment',
        description: 'Specialized treatment for stains and soiled areas before cleaning.',
      },
      {
        title: 'Large Item Cleaning',
        description: 'Professional cleaning using equipment designed for large household items.',
      },
      {
        title: 'Thorough Drying',
        description: 'Complete drying process to prevent mildew and ensure freshness.',
      },
      {
        title: 'Packaging & Storage',
        description: 'Proper packaging for storage or immediate use in your home.',
      },
    ],
    // benefits: [
    //   {
    //     title: 'Large Item Expertise',
    //     description: 'Specialized equipment and techniques for oversized household items.',
    //   },
    //   {
    //     title: 'Deep Cleaning',
    //     description: 'Professional cleaning removes allergens, dust mites, and odors.',
    //   },
    //   {
    //     title: 'Convenience',
    //     description: 'Handle items too large for home washing machines.',
    //   },
    //   {
    //     title: 'Seasonal Care',
    //     description: 'Proper cleaning and storage preparation for seasonal items.',
    //   },
    // ],
  },
]

/**
 * Seeds the services collection with sample data
 */
async function seedServices() {
  try {
    console.log('🚀 Starting Firestore services seeding...')

    // Add each service to the database
    const createdServices = []

    for (const service of servicesData) {
      try {
        // Add timestamps and active status
        const serviceWithTimestamps = {
          ...service,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        const docRef = await db.collection('services').add(serviceWithTimestamps)

        createdServices.push({
          id: docRef.id,
          title: service.title,
          slug: service.slug,
          featured: service.featured,
          order: service.order,
        })

        console.log(`✅ Created service: ${service.title} (ID: ${docRef.id})`)

        // Small delay to avoid overwhelming Firestore
        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`❌ Error creating service "${service.title}":`, error)
      }
    }

    // Summary
    console.log('\n🎉 Services seeding completed!')
    console.log(`📊 Created ${createdServices.length} services`)

    const featuredServices = createdServices.filter((s) => s.featured)
    if (featuredServices.length > 0) {
      console.log(`⭐ Featured services:`)
      featuredServices.forEach((service) => {
        console.log(`  - ${service.title}`)
      })
    }

    console.log('\n📋 Created services (in order):')
    createdServices
      .sort((a, b) => a.order - b.order)
      .forEach((service) => {
        const status = service.featured ? '⭐ FEATURED' : '📋 REGULAR'
        console.log(`  ${status} - ${service.title} (${service.slug})`)
      })

    console.log('\n✨ Your Firestore database is now ready with all services!')
  } catch (error) {
    console.error('❌ Fatal error during seeding:', error)
    process.exit(1)
  }
}

/**
 * Cleans up the database by removing all services (use with caution!)
 */
async function clearServices() {
  try {
    console.log('🧹 Clearing all services from database...')

    const snapshot = await db.collection('services').get()

    if (snapshot.empty) {
      console.log('✅ No services to clear')
      return
    }

    console.log(`🗑️  Found ${snapshot.docs.length} services to delete`)

    // Note: In production, you might want to use updateDoc to mark as inactive instead
    const deletePromises = snapshot.docs.map((doc) => doc.ref.delete())

    await Promise.all(deletePromises)
    console.log('✅ All services deleted')
  } catch (error) {
    console.error('❌ Error clearing services:', error)
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2)

  if (args.includes('--clear')) {
    await clearServices()
    return
  }

  if (args.includes('--help')) {
    console.log(`
📚 Firestore Services Seeding Script

Usage:
  node scripts/seed-services.js          # Seed database with all services
  node scripts/seed-services.js --clear  # Clear all services (permanent deletion)
  node scripts/seed-services.js --help   # Show this help message

This script will:
✅ Create the services collection if it doesn't exist
✅ Add 10 services to your database
✅ Set proper order and featured status
✅ Set proper timestamps for all documents

Make sure your Firebase config is correct before running!
    `)
    return
  }

  // Default action: seed the database
  await seedServices()
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
