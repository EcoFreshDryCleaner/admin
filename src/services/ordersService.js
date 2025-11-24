import { collection, query, orderBy, where, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/config'

// Universal Order Statuses
// Flow: Pending -> Confirmation -> Picked Up -> Cleaning -> Payment -> Out For Delivery -> Delivered
export const ORDER_STATUSES = {
  // Initial states
  pending: 'Pending',
  confirmed: 'Order Confirmed',

  // Pickup & Processing
  picked_up: 'Picked Up',
  cleaning: 'Cleaning',

  // Payment
  awaiting_payment: 'Awaiting Payment',

  // Delivery states
  out_for_delivery: 'Out for Delivery',

  // Final state
  delivered: 'Delivered',

  // Cancellation
  cancelled: 'Cancelled',
}

// Helper function to get status display text
export const getStatusDisplayText = (status, serviceType = null) => {
  if (!status) return 'Unknown'

  switch (status) {
    case 'pending':
      return 'Pending'
    case 'confirmed':
      return 'Order Confirmed'
    case 'picked_up':
      return 'Picked Up'
    case 'cleaning':
      return 'Cleaning'
    case 'awaiting_payment':
      return 'Awaiting Payment'
    case 'out_for_delivery':
      return 'Out for Delivery'
    case 'delivered':
      return 'Delivered'
    case 'cancelled':
      return 'Cancelled'
    default:
      return ORDER_STATUSES[status] || status.charAt(0).toUpperCase() + status.slice(1)
  }
}

// Helper function to check if order is in progress
export const isOrderInProgress = (status) => {
  const inProgressStatuses = [
    'confirmed',
    'picked_up',
    'cleaning',
    'awaiting_payment',
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
      return 15
    case 'picked_up':
      return 30
    case 'cleaning':
      return 50
    case 'awaiting_payment':
      return 70
    case 'out_for_delivery':
      return 85
    case 'delivered':
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
      cleaning: orders.filter((order) => order.status === 'cleaning').length,
      awaiting_payment: orders.filter((order) => order.status === 'awaiting_payment').length,
      out_for_delivery: orders.filter((order) => order.status === 'out_for_delivery').length,
      delivered: orders.filter((order) => order.status === 'delivered').length,
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
      cleaning: 0,
      awaiting_payment: 0,
      out_for_delivery: 0,
      delivered: 0,
      cancelled: 0,
      inProgress: 0,
    }
  }
}
