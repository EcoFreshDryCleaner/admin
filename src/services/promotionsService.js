import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  query,
  where,
  orderBy,
  getDocs
} from 'firebase/firestore'
import { db } from '../firebase/config'

// Collection reference for promotions
export const promotionsRef = collection(db, 'promotions')

// Query for all promotions (admin view)
export const allPromotionsQuery = query(
  promotionsRef,
  orderBy('createdAt', 'desc')
)

// Query for active promotions only
export const activePromotionsQuery = query(
  promotionsRef,
  where('active', '==', true),
  orderBy('createdAt', 'desc')
)

// Create new promotion
export const createPromotion = async (promotionData) => {
  try {
    // If this promotion is set to show as modal, ensure no other modal exists
    if (promotionData.showModal) {
      await ensureOnlyOneModal()
    }

    const docRef = await addDoc(promotionsRef, {
      ...promotionData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      active: promotionData.active !== undefined ? promotionData.active : true,
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating promotion:', error)
    throw error
  }
}

// Update existing promotion
export const updatePromotion = async (id, updateData) => {
  try {
    // If this promotion is set to show as modal, ensure no other modal exists
    if (updateData.showModal) {
      await ensureOnlyOneModal(id)
    }

    const docRef = doc(db, 'promotions', id)
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    })
    return true
  } catch (error) {
    console.error('Error updating promotion:', error)
    throw error
  }
}

// Delete promotion
export const deletePromotion = async (id) => {
  try {
    const docRef = doc(db, 'promotions', id)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error('Error deleting promotion:', error)
    throw error
  }
}

// Toggle promotion active status
export const togglePromotionStatus = async (id, currentStatus) => {
  try {
    const docRef = doc(db, 'promotions', id)
    await updateDoc(docRef, {
      active: !currentStatus,
      updatedAt: serverTimestamp(),
    })
    return true
  } catch (error) {
    console.error('Error toggling promotion status:', error)
    throw error
  }
}

// Helper function to ensure only one modal promotion exists
const ensureOnlyOneModal = async (excludeId = null) => {
  try {
    const modalQuery = query(
      promotionsRef,
      where('active', '==', true),
      where('showModal', '==', true)
    )

    const querySnapshot = await getDocs(modalQuery)

    // Update all existing modal promotions to not show as modal
    const updatePromises = querySnapshot.docs
      .filter((doc) => doc.id !== excludeId)
      .map((doc) =>
        updateDoc(doc.ref, {
          showModal: false,
          updatedAt: serverTimestamp(),
        })
      )

    if (updatePromises.length > 0) {
      await Promise.all(updatePromises)
    }
  } catch (error) {
    console.error('Error ensuring only one modal promotion:', error)
    throw error
  }
}
