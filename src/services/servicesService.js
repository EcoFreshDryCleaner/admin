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
  getDocs,
} from 'firebase/firestore'
import { db } from '../firebase/config'

// Collection reference for services
export const servicesRef = collection(db, 'services')

// Query for all services (admin view)
export const allServicesQuery = query(servicesRef, orderBy('order', 'asc'))

// Query for active services only
export const activeServicesQuery = query(
  servicesRef,
  where('active', '==', true),
  orderBy('order', 'asc'),
)

// Query for featured services only
export const featuredServicesQuery = query(
  servicesRef,
  where('active', '==', true),
  where('featured', '==', true),
  orderBy('order', 'asc'),
)

// Create new service
export const createService = async (serviceData) => {
  try {
    const docRef = await addDoc(servicesRef, {
      ...serviceData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      active: serviceData.active !== undefined ? serviceData.active : true,
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating service:', error)
    throw error
  }
}

// Update existing service
export const updateService = async (id, updateData) => {
  try {
    const docRef = doc(db, 'services', id)
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    })
    return true
  } catch (error) {
    console.error('Error updating service:', error)
    throw error
  }
}

// Delete service
export const deleteService = async (id) => {
  try {
    const docRef = doc(db, 'services', id)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error('Error deleting service:', error)
    throw error
  }
}

// Toggle service active status
export const toggleServiceStatus = async (id, currentStatus) => {
  try {
    const docRef = doc(db, 'services', id)
    await updateDoc(docRef, {
      active: !currentStatus,
      updatedAt: serverTimestamp(),
    })
    return true
  } catch (error) {
    console.error('Error toggling service status:', error)
    throw error
  }
}

// Toggle service featured status
export const toggleServiceFeatured = async (id, currentFeatured) => {
  try {
    const docRef = doc(db, 'services', id)
    await updateDoc(docRef, {
      featured: !currentFeatured,
      updatedAt: serverTimestamp(),
    })
    return true
  } catch (error) {
    console.error('Error toggling service featured status:', error)
    throw error
  }
}

// Update service order
export const updateServiceOrder = async (id, newOrder) => {
  try {
    const docRef = doc(db, 'services', id)
    await updateDoc(docRef, {
      order: newOrder,
      updatedAt: serverTimestamp(),
    })
    return true
  } catch (error) {
    console.error('Error updating service order:', error)
    throw error
  }
}

// Reorder services (bulk update)
export const reorderServices = async (serviceOrders) => {
  try {
    const updatePromises = serviceOrders.map(({ id, order }) =>
      updateServiceOrder(id, order)
    )
    await Promise.all(updatePromises)
    return true
  } catch (error) {
    console.error('Error reordering services:', error)
    throw error
  }
}
