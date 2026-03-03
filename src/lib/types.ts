// Matches app2/Models/Ride.swift exactly
export interface Ride {
  id: string
  riderId: string
  riderName: string
  departure: string
  departureAddress: string
  destination: string
  destinationAddress: string
  date: Date
  time: Date
  availableSeats: number
  totalSeats?: number
  price: number
  isCancelled?: boolean
  note?: string
  createdAt?: Date
  status?: 'scheduled' | 'finished' | 'completed'
  isUber?: boolean
}

// Matches app2/Models/User.swift exactly
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  profileImageUrl?: string
  createdAt: Date
  updatedAt: Date
  fcmToken?: string
  numberOfTrips: number
  address?: string
  emailVerified?: boolean
  phoneVerified?: boolean
  walletBalance: number
  balance?: number
  driverRating?: number
  driverReviewCount?: number
  passengerRating?: number
  passengerReviewCount?: number
  biography?: string
  stripeConnectAccountId?: string
}

// Matches app2/Models/Booking.swift exactly
export interface Booking {
  id: string
  rideId: string
  passengerId: string
  passengerName: string
  driverId: string
  driverName: string
  seatsBooked: number
  status: 'pending' | 'payment_required' | 'confirmed' | 'cancelled' | 'completed'
  timestamp: Date
  departure: string
  destination: string
  rideDate: Date
  rideTime: Date
  price: number
  paymentStatus: 'pending' | 'succeeded' | 'failed' | 'refunded'
  amountPaid: number
  driverEarnings?: number
  paymentMethod: string
  paymentIntentId?: string
  note?: string
}

// Matches app2/Models/Chat.swift exactly
export interface Chat {
  id: string
  content: string
  senderId: string
  receiverId: string
  timestamp: Date
  isRead: boolean
  rideId?: string
  status?: 'sent' | 'delivered' | 'read'
  isSystemMessage?: boolean
}

// Conversation thread (grouped chats between two users)
export interface Conversation {
  oderId: string
  otherUserName: string
  otherUserPhotoUrl?: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  rideId?: string
}

export interface SearchFilters {
  departure: string
  destination: string
  date: string
  passengers: number
}
