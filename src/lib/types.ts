export interface Ride {
  id: string
  driverId: string
  driverName: string
  driverPhotoUrl?: string
  driverRating?: number
  driverNumberOfTrips?: number
  departureAddress: string
  departureCity: string
  departureLat: number
  departureLng: number
  destinationAddress: string
  destinationCity: string
  destinationLat: number
  destinationLng: number
  departureDate: Date
  departureTime: string
  availableSeats: number
  totalSeats: number
  pricePerSeat: number
  status: string
  description?: string
  createdAt: Date
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  profileImageUrl?: string
  numberOfTrips: number
  rating?: number
  uclaVerified?: boolean
}

export interface Booking {
  id: string
  rideId: string
  passengerId: string
  passengerName: string
  driverId: string
  driverName: string
  numberOfSeats: number
  totalPrice: number
  status: string
  paymentStatus: string
  createdAt: Date
}

export interface SearchFilters {
  departure: string
  destination: string
  date: string
  passengers: number
}
