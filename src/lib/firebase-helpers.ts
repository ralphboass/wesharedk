import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  doc,
  Timestamp,
  updateDoc,
  increment,
  onSnapshot,
  type Unsubscribe,
} from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth'
import { getDb, getAuthInstance } from './firebase'
import { Ride, User, Booking, Chat } from './types'

// ─── Helper: parse Firestore timestamp ──────────────────
function toDate(val: any): Date {
  if (val instanceof Timestamp) return val.toDate()
  if (val?.toDate) return val.toDate()
  if (val) return new Date(val)
  return new Date()
}

function parseRide(id: string, data: any): Ride {
  return {
    id,
    riderId: data.riderId || '',
    riderName: data.riderName || 'Ukendt',
    departure: data.departure || '',
    departureAddress: data.departureAddress || '',
    destination: data.destination || '',
    destinationAddress: data.destinationAddress || '',
    date: toDate(data.date),
    time: toDate(data.time),
    availableSeats: data.availableSeats || 0,
    totalSeats: data.totalSeats,
    price: data.price || 0,
    isCancelled: data.isCancelled,
    note: data.note,
    createdAt: toDate(data.createdAt),
    status: data.status || 'scheduled',
    isUber: data.isUber,
  }
}

function parseBooking(id: string, data: any): Booking {
  return {
    id,
    rideId: data.rideId || '',
    passengerId: data.passengerId || '',
    passengerName: data.passengerName || '',
    driverId: data.driverId || '',
    driverName: data.driverName || '',
    seatsBooked: data.seatsBooked || 1,
    status: data.status || 'pending',
    timestamp: toDate(data.timestamp),
    departure: data.departure || '',
    destination: data.destination || '',
    rideDate: toDate(data.rideDate),
    rideTime: toDate(data.rideTime),
    price: data.price || 0,
    paymentStatus: data.paymentStatus || 'pending',
    amountPaid: data.amountPaid || 0,
    driverEarnings: data.driverEarnings,
    paymentMethod: data.paymentMethod || 'none',
    paymentIntentId: data.paymentIntentId,
    note: data.note,
  }
}

// ─── Rides ───────────────────────────────────────────────

export async function fetchRides(filters?: {
  departure?: string
  destination?: string
  date?: string
}): Promise<Ride[]> {
  try {
    // Fetch all rides without orderBy to avoid composite index requirement
    const snapshot = await getDocs(collection(getDb(), 'rides'))
    let rides: Ride[] = snapshot.docs.map((d) => parseRide(d.id, d.data()))

    // Filter for scheduled rides only
    rides = rides.filter((r) => r.status === 'scheduled' && !r.isCancelled)

    // Client-side filtering
    if (filters?.departure) {
      const dep = filters.departure.toLowerCase()
      rides = rides.filter(
        (r) =>
          r.departure.toLowerCase().includes(dep) ||
          r.departureAddress.toLowerCase().includes(dep)
      )
    }
    if (filters?.destination) {
      const dest = filters.destination.toLowerCase()
      rides = rides.filter(
        (r) =>
          r.destination.toLowerCase().includes(dest) ||
          r.destinationAddress.toLowerCase().includes(dest)
      )
    }
    if (filters?.date) {
      const filterDate = new Date(filters.date)
      rides = rides.filter((r) => {
        const rideDate = new Date(r.date)
        return (
          rideDate.getFullYear() === filterDate.getFullYear() &&
          rideDate.getMonth() === filterDate.getMonth() &&
          rideDate.getDate() === filterDate.getDate()
        )
      })
    }

    // Only show future rides
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    rides = rides.filter((r) => {
      const rideDate = new Date(r.date)
      return rideDate >= today
    })

    // Sort by date ascending
    rides.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return rides
  } catch (error) {
    console.error('Error fetching rides:', error)
    return []
  }
}

export async function fetchRideById(rideId: string): Promise<Ride | null> {
  try {
    const docSnap = await getDoc(doc(getDb(), 'rides', rideId))
    if (!docSnap.exists()) return null
    return parseRide(docSnap.id, docSnap.data())
  } catch (error) {
    console.error('Error fetching ride:', error)
    return null
  }
}

export async function createRide(ride: {
  riderId: string
  riderName: string
  departure: string
  departureAddress: string
  destination: string
  destinationAddress: string
  date: Date
  time: Date
  availableSeats: number
  totalSeats: number
  price: number
  note?: string
}): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(getDb(), 'rides'), {
      riderId: ride.riderId,
      riderName: ride.riderName,
      departure: ride.departure,
      departureAddress: ride.departureAddress,
      destination: ride.destination,
      destinationAddress: ride.destinationAddress,
      date: Timestamp.fromDate(ride.date),
      time: Timestamp.fromDate(ride.time),
      availableSeats: ride.availableSeats,
      totalSeats: ride.totalSeats,
      price: ride.price,
      note: ride.note || null,
      status: 'scheduled',
      isCancelled: false,
      createdAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error: any) {
    console.error('Error creating ride:', error)
    console.error('Error details:', error.message, error.code)
    throw error
  }
}

export async function cancelRide(rideId: string): Promise<void> {
  await updateDoc(doc(getDb(), 'rides', rideId), {
    isCancelled: true,
    status: 'finished',
  })
}

// ─── Bookings ────────────────────────────────────────────

export async function createBooking(booking: {
  rideId: string
  passengerId: string
  passengerName: string
  driverId: string
  driverName: string
  seatsBooked: number
  departure: string
  destination: string
  rideDate: Date
  rideTime: Date
  price: number
  note?: string
}): Promise<string | null> {
  try {
    const totalPrice = booking.price * booking.seatsBooked
    const docRef = await addDoc(collection(getDb(), 'bookings'), {
      rideId: booking.rideId,
      passengerId: booking.passengerId,
      passengerName: booking.passengerName,
      driverId: booking.driverId,
      driverName: booking.driverName,
      seatsBooked: booking.seatsBooked,
      status: 'pending',
      timestamp: Timestamp.now(),
      departure: booking.departure,
      destination: booking.destination,
      rideDate: Timestamp.fromDate(booking.rideDate),
      rideTime: Timestamp.fromDate(booking.rideTime),
      price: booking.price,
      paymentStatus: 'pending',
      amountPaid: totalPrice,
      driverEarnings: totalPrice,
      paymentMethod: 'none',
      note: booking.note || null,
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating booking:', error)
    return null
  }
}

export async function confirmBooking(bookingId: string, rideId: string, seatsBooked: number): Promise<void> {
  await updateDoc(doc(getDb(), 'bookings', bookingId), {
    status: 'confirmed',
  })
  // Decrement available seats on the ride
  await updateDoc(doc(getDb(), 'rides', rideId), {
    availableSeats: increment(-seatsBooked),
  })
}

export async function rejectBooking(bookingId: string): Promise<void> {
  await updateDoc(doc(getDb(), 'bookings', bookingId), {
    status: 'cancelled',
  })
}

export async function cancelBooking(bookingId: string, rideId: string, seatsBooked: number): Promise<void> {
  const bookingSnap = await getDoc(doc(getDb(), 'bookings', bookingId))
  const bookingData = bookingSnap.data()
  await updateDoc(doc(getDb(), 'bookings', bookingId), {
    status: 'cancelled',
  })
  // Only restore seats if booking was confirmed
  if (bookingData?.status === 'confirmed') {
    await updateDoc(doc(getDb(), 'rides', rideId), {
      availableSeats: increment(seatsBooked),
    })
  }
}

export async function fetchUserBookings(userId: string): Promise<Booking[]> {
  try {
    const q = query(
      collection(getDb(), 'bookings'),
      where('passengerId', '==', userId),
      orderBy('timestamp', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((d) => parseBooking(d.id, d.data()))
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return []
  }
}

export async function fetchDriverBookings(driverId: string): Promise<Booking[]> {
  try {
    const q = query(
      collection(getDb(), 'bookings'),
      where('driverId', '==', driverId),
      orderBy('timestamp', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((d) => parseBooking(d.id, d.data()))
  } catch (error) {
    console.error('Error fetching driver bookings:', error)
    return []
  }
}

export async function fetchRideBookings(rideId: string): Promise<Booking[]> {
  try {
    const q = query(
      collection(getDb(), 'bookings'),
      where('rideId', '==', rideId)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((d) => parseBooking(d.id, d.data()))
  } catch (error) {
    console.error('Error fetching ride bookings:', error)
    return []
  }
}

// ─── Chat / Messaging ───────────────────────────────────

export async function sendMessage(msg: {
  content: string
  senderId: string
  receiverId: string
  rideId?: string
}): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(getDb(), 'chats'), {
      content: msg.content,
      senderId: msg.senderId,
      receiverId: msg.receiverId,
      timestamp: Timestamp.now(),
      isRead: false,
      rideId: msg.rideId || null,
      status: 'sent',
      isSystemMessage: false,
    })
    return docRef.id
  } catch (error) {
    console.error('Error sending message:', error)
    return null
  }
}

export function listenToMessages(
  userId1: string,
  userId2: string,
  callback: (msgs: Chat[]) => void
): Unsubscribe {
  // Listen for messages between two users (both directions)
  const q = query(
    collection(getDb(), 'chats'),
    where('senderId', 'in', [userId1, userId2]),
    orderBy('timestamp', 'asc')
  )

  return onSnapshot(q, (snapshot) => {
    const msgs: Chat[] = snapshot.docs
      .map((d) => {
        const data = d.data()
        return {
          id: d.id,
          content: data.content || '',
          senderId: data.senderId || '',
          receiverId: data.receiverId || '',
          timestamp: toDate(data.timestamp),
          isRead: data.isRead || false,
          rideId: data.rideId,
          status: data.status,
          isSystemMessage: data.isSystemMessage,
        }
      })
      // Filter to only messages between these two users
      .filter(
        (m) =>
          (m.senderId === userId1 && m.receiverId === userId2) ||
          (m.senderId === userId2 && m.receiverId === userId1)
      )
    callback(msgs)
  })
}

export async function markMessagesAsRead(senderId: string, receiverId: string): Promise<void> {
  try {
    const q = query(
      collection(getDb(), 'chats'),
      where('senderId', '==', senderId),
      where('receiverId', '==', receiverId),
      where('isRead', '==', false)
    )
    const snapshot = await getDocs(q)
    const promises = snapshot.docs.map((d) =>
      updateDoc(doc(getDb(), 'chats', d.id), { isRead: true, status: 'read' })
    )
    await Promise.all(promises)
  } catch (error) {
    console.error('Error marking messages as read:', error)
  }
}

export async function fetchUserConversations(userId: string): Promise<{
  oderId: string
  otherUserName: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  rideId?: string
}[]> {
  try {
    // Get all messages where user is sender or receiver
    const sentQ = query(collection(getDb(), 'chats'), where('senderId', '==', userId))
    const recvQ = query(collection(getDb(), 'chats'), where('receiverId', '==', userId))

    const [sentSnap, recvSnap] = await Promise.all([getDocs(sentQ), getDocs(recvQ)])

    const allMessages: Chat[] = [...sentSnap.docs, ...recvSnap.docs].map((d) => {
      const data = d.data()
      return {
        id: d.id,
        content: data.content || '',
        senderId: data.senderId || '',
        receiverId: data.receiverId || '',
        timestamp: toDate(data.timestamp),
        isRead: data.isRead || false,
        rideId: data.rideId,
        status: data.status,
        isSystemMessage: data.isSystemMessage,
      }
    })

    // Group by other user
    const convMap = new Map<string, { msgs: Chat[]; unread: number }>()
    for (const m of allMessages) {
      const otherId = m.senderId === userId ? m.receiverId : m.senderId
      if (!convMap.has(otherId)) convMap.set(otherId, { msgs: [], unread: 0 })
      const conv = convMap.get(otherId)!
      conv.msgs.push(m)
      if (m.receiverId === userId && !m.isRead) conv.unread++
    }

    // Build conversation list
    const conversations = []
    const convEntries = Array.from(convMap.entries())
    for (const [otherId, { msgs, unread }] of convEntries) {
      const sorted = msgs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      const last = sorted[0]
      // Fetch other user name
      const otherUser = await fetchUser(otherId)
      conversations.push({
        oderId: otherId,
        otherUserName: otherUser ? `${otherUser.firstName} ${otherUser.lastName}` : 'Ukendt',
        lastMessage: last.content,
        lastMessageTime: last.timestamp,
        unreadCount: unread,
        rideId: last.rideId,
      })
    }

    return conversations.sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime())
  } catch (error) {
    console.error('Error fetching conversations:', error)
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

  const now = Timestamp.now()

  // Create user document matching app2 User model exactly
  await setDoc(doc(getDb(), 'users', user.uid), {
    email,
    firstName,
    lastName,
    phoneNumber,
    profileImageUrl: null,
    fcmToken: null,
    numberOfTrips: 0,
    walletBalance: 0,
    emailVerified: false,
    createdAt: now,
    updatedAt: now,
  })

  // Generate 6-digit verification code and store in Firestore
  const verificationCode = String(Math.floor(100000 + Math.random() * 900000))
  await setDoc(doc(getDb(), 'emailVerifications', email), {
    email,
    code: verificationCode,
    createdAt: Timestamp.now(),
    expiresAt: new Date(Date.now() + 3600000), // 1 hour
    verified: false,
  })

  // Queue verification email via Firebase Trigger Email extension
  await addDoc(collection(getDb(), 'mail'), {
    to: [email],
    message: {
      subject: 'Bekræft din e-mail - WeShare',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #007AFF; margin: 0;">WeShare</h1>
          </div>
          <h2 style="color: #333;">Bekræft din e-mailadresse</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Velkommen til WeShare! Bekræft venligst din e-mailadresse for at færdiggøre din registrering.
          </p>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Brug denne kode i appen for at bekræfte din e-mail:
          </p>
          <div style="background-color: #f0f8ff; border: 2px solid #007AFF; border-radius: 8px; padding: 30px; margin: 30px 0; text-align: center;">
            <p style="color: #666; font-size: 14px; margin: 0 0 10px 0;">Din bekræftelseskode:</p>
            <p style="color: #007AFF; font-size: 36px; font-weight: bold; letter-spacing: 8px; margin: 0; font-family: 'Courier New', monospace;">${verificationCode}</p>
          </div>
          <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
            <p style="color: #856404; font-size: 14px; margin: 0;">
              <strong>Vigtigt:</strong> Denne kode udløber om 1 time.
            </p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">WeShare - Din samkørselsapp</p>
        </div>
      `,
    },
  })

  return user
}

export async function verifyEmailCode(email: string, code: string): Promise<boolean> {
  try {
    const docSnap = await getDoc(doc(getDb(), 'emailVerifications', email))
    if (!docSnap.exists()) return false
    const data = docSnap.data()

    if (data.code !== code) return false
    if (data.verified) return false

    const expiresAt = toDate(data.expiresAt)
    if (new Date() > expiresAt) return false

    // Mark as verified
    await updateDoc(doc(getDb(), 'emailVerifications', email), { verified: true })

    // Update user document
    const auth = getAuthInstance()
    const currentUser = auth.currentUser
    if (currentUser) {
      await updateDoc(doc(getDb(), 'users', currentUser.uid), {
        emailVerified: true,
        updatedAt: Timestamp.now(),
      })
    }

    return true
  } catch (error) {
    console.error('Error verifying email:', error)
    return false
  }
}

export async function resendVerificationEmail(email: string): Promise<void> {
  const verificationCode = String(Math.floor(100000 + Math.random() * 900000))

  await setDoc(doc(getDb(), 'emailVerifications', email), {
    email,
    code: verificationCode,
    createdAt: Timestamp.now(),
    expiresAt: new Date(Date.now() + 3600000),
    verified: false,
  })

  await addDoc(collection(getDb(), 'mail'), {
    to: [email],
    message: {
      subject: 'Bekræft din e-mail - WeShare',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #007AFF; margin: 0;">WeShare</h1>
          </div>
          <h2 style="color: #333;">Ny bekræftelseskode</h2>
          <div style="background-color: #f0f8ff; border: 2px solid #007AFF; border-radius: 8px; padding: 30px; margin: 30px 0; text-align: center;">
            <p style="color: #666; font-size: 14px; margin: 0 0 10px 0;">Din nye bekræftelseskode:</p>
            <p style="color: #007AFF; font-size: 36px; font-weight: bold; letter-spacing: 8px; margin: 0; font-family: 'Courier New', monospace;">${verificationCode}</p>
          </div>
          <p style="color: #999; font-size: 12px; text-align: center;">WeShare - Din samkørselsapp</p>
        </div>
      `,
    },
  })
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
      createdAt: toDate(data.createdAt),
      updatedAt: toDate(data.updatedAt),
      fcmToken: data.fcmToken,
      numberOfTrips: data.numberOfTrips || 0,
      address: data.address,
      emailVerified: data.emailVerified,
      phoneVerified: data.phoneVerified,
      walletBalance: data.walletBalance || 0,
      balance: data.balance,
      driverRating: data.driverRating,
      driverReviewCount: data.driverReviewCount,
      passengerRating: data.passengerRating,
      passengerReviewCount: data.passengerReviewCount,
      biography: data.biography,
      stripeConnectAccountId: data.stripeConnectAccountId,
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export async function updateUserProfile(userId: string, updates: Partial<User>): Promise<void> {
  const data: any = { ...updates, updatedAt: Timestamp.now() }
  // Remove id from updates
  delete data.id
  await updateDoc(doc(getDb(), 'users', userId), data)
}

export async function fetchUserRides(userId: string): Promise<Ride[]> {
  try {
    const q = query(
      collection(getDb(), 'rides'),
      where('riderId', '==', userId)
    )
    const snapshot = await getDocs(q)
    const rides = snapshot.docs.map((d) => parseRide(d.id, d.data()))
    
    // Sort by date descending in memory
    rides.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    return rides
  } catch (error) {
    console.error('Error fetching user rides:', error)
    return []
  }
}
