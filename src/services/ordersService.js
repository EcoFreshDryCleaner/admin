import { collection, query, orderBy, where, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/config'

// Universal Order Statuses
export const ORDER_STATUSES = {
  // Initial states
  pending: 'Pending Confirmation',
  confirmed: 'Order Confirmed',

  // Pickup service flow
  picked_up: 'Picked Up',

  // Dropoff service flow
  dropped_off: 'Dropped Off',

  // Processing states
  in_progress: 'In Progress',
  cleaning: 'Cleaning',

  // Ready states
  ready: 'Ready',
  ready_for_pickup: 'Ready for Pickup',

  // Delivery states
  out_for_delivery: 'Out for Delivery',

  // Final states
  delivered: 'Delivered',
  completed: 'Completed',

  // Cancellation
  cancelled: 'Cancelled',
}

// Helper function to get status display text
export const getStatusDisplayText = (status, serviceType = null) => {
  if (!status) return 'Unknown'

  switch (status) {
    case 'picked_up':
      return serviceType === 'dropoff' ? 'Dropped Off' : 'Picked Up'
    case 'dropped_off':
      return 'Dropped Off'
    case 'delivered':
      return serviceType === 'dropoff' ? 'Completed' : 'Delivered'
    default:
      return ORDER_STATUSES[status] || status.charAt(0).toUpperCase() + status.slice(1)
  }
}

// Helper function to check if order is in progress
export const isOrderInProgress = (status) => {
  const inProgressStatuses = [
    'confirmed',
    'picked_up',
    'dropped_off',
    'in_progress',
    'cleaning',
    'ready',
    'ready_for_pickup',
    'out_for_delivery',
  ]
  return inProgressStatuses.includes(status)
}

// Helper function to get status progression percentage
export const getStatusProgress = (status) => {
  switch (status) {
    case 'pending':
      return 0
    case 'confirmed':
      return 10
    case 'picked_up':
    case 'dropped_off':
      return 20
    case 'in_progress':
      return 30
    case 'cleaning':
      return 50
    case 'ready':
    case 'ready_for_pickup':
      return 75
    case 'out_for_delivery':
      return 90
    case 'delivered':
    case 'completed':
      return 100
    case 'cancelled':
      return 0
    default:
      return 0
  }
}

// Collection reference for orders
export const ordersRef = collection(db, 'orders')

// Query for all orders (admin view)
export const allOrdersQuery = query(ordersRef, orderBy('date_placed', 'desc'))

// Query for orders by status
export const ordersByStatusQuery = (status) =>
  query(ordersRef, where('status', '==', status), orderBy('date_placed', 'desc'))

// Query for in-progress orders
export const inProgressOrdersQuery = query(
  ordersRef,
  where('in_progress', '==', true),
  orderBy('date_placed', 'desc'),
)

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  try {
    const orderRef = doc(db, 'orders', orderId)
    await updateDoc(orderRef, {
      status: status,
      in_progress: isOrderInProgress(status),
      updatedAt: new Date(),
    })
    return true
  } catch (error) {
    console.error('Error updating order status:', error)
    throw error
  }
}

// Get orders count by status
export const getOrdersCountByStatus = async () => {
  try {
    const allOrders = await getDocs(allOrdersQuery)
    const orders = allOrders.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    return {
      total: orders.length,
      pending: orders.filter((order) => order.status === 'pending').length,
      confirmed: orders.filter((order) => order.status === 'confirmed').length,
      picked_up: orders.filter((order) => order.status === 'picked_up').length,
      dropped_off: orders.filter((order) => order.status === 'dropped_off').length,
      in_progress: orders.filter((order) => order.status === 'in_progress').length,
      cleaning: orders.filter((order) => order.status === 'cleaning').length,
      ready: orders.filter((order) => order.status === 'ready').length,
      ready_for_pickup: orders.filter((order) => order.status === 'ready_for_pickup').length,
      out_for_delivery: orders.filter((order) => order.status === 'out_for_delivery').length,
      delivered: orders.filter((order) => order.status === 'delivered').length,
      completed: orders.filter((order) => order.status === 'completed').length,
      cancelled: orders.filter((order) => order.status === 'cancelled').length,
      inProgress: orders.filter((order) => isOrderInProgress(order.status)).length,
    }
  } catch (error) {
    console.error('Error getting orders count:', error)
    return {
      total: 0,
      pending: 0,
      confirmed: 0,
      picked_up: 0,
      dropped_off: 0,
      in_progress: 0,
      cleaning: 0,
      ready: 0,
      ready_for_pickup: 0,
      out_for_delivery: 0,
      delivered: 0,
      completed: 0,
      cancelled: 0,
      inProgress: 0,
    }
  }
}
