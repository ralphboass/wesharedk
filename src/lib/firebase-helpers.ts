import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  addDoc,
  doc,
  Timestamp,
  updateDoc,
  increment,
} from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth'
import { getDb, getAuthInstance } from './firebase'
import { Ride, User, Booking } from './types'

// ─── Rides ───────────────────────────────────────────────

export async function fetchRides(filters?: {
  departureCity?: string
  destinationCity?: string
  date?: string
}): Promise<Ride[]> {
  try {
    let q = query(
      collection(getDb(), 'rides'),
      where('status', '==', 'active'),
      orderBy('departureDate', 'asc')
    )

    const snapshot = await getDocs(q)
    let rides: Ride[] = snapshot.docs.map((d) => {
      const data = d.data()
      return {
        id: d.id,
        driverId: data.driverId || '',
        driverName: data.driverName || 'Ukendt',
        driverPhotoUrl: data.driverPhotoUrl,
        driverRating: data.driverRating,
        driverNumberOfTrips: data.driverNumberOfTrips,
        departureAddress: data.departureAddress || '',
        departureCity: data.departureCity || '',
        departureLat: data.departureLat || 0,
        departureLng: data.departureLng || 0,
        destinationAddress: data.destinationAddress || '',
        destinationCity: data.destinationCity || '',
        destinationLat: data.destinationLat || 0,
        destinationLng: data.destinationLng || 0,
        departureDate: data.departureDate instanceof Timestamp
          ? data.departureDate.toDate()
          : new Date(data.departureDate),
        departureTime: data.departureTime || '',
        availableSeats: data.availableSeats || 0,
        totalSeats: data.totalSeats || 0,
        pricePerSeat: data.pricePerSeat || 0,
        status: data.status || 'active',
        description: data.description,
        createdAt: data.createdAt instanceof Timestamp
          ? data.createdAt.toDate()
          : new Date(),
      }
    })

    // Client-side filtering
    if (filters?.departureCity) {
      const dep = filters.departureCity.toLowerCase()
      rides = rides.filter(
        (r) =>
          r.departureCity.toLowerCase().includes(dep) ||
          r.departureAddress.toLowerCase().includes(dep)
      )
    }
    if (filters?.destinationCity) {
      const dest = filters.destinationCity.toLowerCase()
      rides = rides.filter(
        (r) =>
          r.destinationCity.toLowerCase().includes(dest) ||
          r.destinationAddress.toLowerCase().includes(dest)
      )
    }
    if (filters?.date) {
      const filterDate = new Date(filters.date)
      rides = rides.filter((r) => {
        const rideDate = new Date(r.departureDate)
        return (
          rideDate.getFullYear() === filterDate.getFullYear() &&
          rideDate.getMonth() === filterDate.getMonth() &&
          rideDate.getDate() === filterDate.getDate()
        )
      })
    }

    // Only show future rides
    rides = rides.filter((r) => new Date(r.departureDate) >= new Date(new Date().setHours(0, 0, 0, 0)))

    return rides
  } catch (error) {
    console.error('Error fetching rides:', error)
    return []
  }
}

export async function fetchRideById(rideId: string): Promise<Ride | null> {
  try {
    const docRef = doc(getDb(), 'rides', rideId)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) return null
    const data = docSnap.data()
    return {
      id: docSnap.id,
      driverId: data.driverId || '',
      driverName: data.driverName || 'Ukendt',
      driverPhotoUrl: data.driverPhotoUrl,
      driverRating: data.driverRating,
      driverNumberOfTrips: data.driverNumberOfTrips,
      departureAddress: data.departureAddress || '',
      departureCity: data.departureCity || '',
      departureLat: data.departureLat || 0,
      departureLng: data.departureLng || 0,
      destinationAddress: data.destinationAddress || '',
      destinationCity: data.destinationCity || '',
      destinationLat: data.destinationLat || 0,
      destinationLng: data.destinationLng || 0,
      departureDate: data.departureDate instanceof Timestamp
        ? data.departureDate.toDate()
        : new Date(data.departureDate),
      departureTime: data.departureTime || '',
      availableSeats: data.availableSeats || 0,
      totalSeats: data.totalSeats || 0,
      pricePerSeat: data.pricePerSeat || 0,
      status: data.status || 'active',
      description: data.description,
      createdAt: data.createdAt instanceof Timestamp
        ? data.createdAt.toDate()
        : new Date(),
    }
  } catch (error) {
    console.error('Error fetching ride:', error)
    return null
  }
}

export async function createRide(ride: Omit<Ride, 'id' | 'createdAt'>): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(getDb(), 'rides'), {
      ...ride,
      departureDate: Timestamp.fromDate(new Date(ride.departureDate)),
      createdAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating ride:', error)
    return null
  }
}

// ─── Bookings ────────────────────────────────────────────

export async function createBooking(booking: {
  rideId: string
  passengerId: string
  passengerName: string
  driverId: string
  driverName: string
  numberOfSeats: number
  totalPrice: number
}): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(getDb(), 'bookings'), {
      ...booking,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: Timestamp.now(),
    })

    // Decrement available seats
    const rideRef = doc(getDb(), 'rides', booking.rideId)
    await updateDoc(rideRef, {
      availableSeats: increment(-booking.numberOfSeats),
    })

    return docRef.id
  } catch (error) {
    console.error('Error creating booking:', error)
    return null
  }
}

export async function fetchUserBookings(userId: string): Promise<Booking[]> {
  try {
    const q = query(
      collection(getDb(), 'bookings'),
      where('passengerId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((d) => {
      const data = d.data()
      return {
        id: d.id,
        rideId: data.rideId,
        passengerId: data.passengerId,
        passengerName: data.passengerName,
        driverId: data.driverId,
        driverName: data.driverName,
        numberOfSeats: data.numberOfSeats,
        totalPrice: data.totalPrice,
        status: data.status,
        paymentStatus: data.paymentStatus,
        createdAt: data.createdAt instanceof Timestamp
          ? data.createdAt.toDate()
          : new Date(),
      }
    })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return []
  }
}

// ─── Auth ────────────────────────────────────────────────

export async function signUp(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
): Promise<FirebaseUser> {
  const userCredential = await createUserWithEmailAndPassword(getAuthInstance(), email, password)
  const user = userCredential.user

  const { setDoc } = await import('firebase/firestore')
  await setDoc(doc(getDb(), 'users', user.uid), {
    email,
    firstName,
    lastName,
    phoneNumber,
    profileImageUrl: null,
    fcmToken: null,
    numberOfTrips: 0,
    createdAt: Timestamp.now(),
  })

  return user
}

export async function signIn(email: string, password: string): Promise<FirebaseUser> {
  const userCredential = await signInWithEmailAndPassword(getAuthInstance(), email, password)
  return userCredential.user
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(getAuthInstance())
}

export function onAuthChange(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(getAuthInstance(), callback)
}

export async function fetchUser(userId: string): Promise<User | null> {
  try {
    const docSnap = await getDoc(doc(getDb(), 'users', userId))
    if (!docSnap.exists()) return null
    const data = docSnap.data()
    return {
      id: docSnap.id,
      email: data.email || '',
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      phoneNumber: data.phoneNumber || '',
      profileImageUrl: data.profileImageUrl,
      numberOfTrips: data.numberOfTrips || 0,
      rating: data.rating,
      uclaVerified: data.uclaVerified,
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}
