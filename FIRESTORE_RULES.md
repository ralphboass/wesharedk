# Firestore Security Rules for WeShare DK

## Problem
User signup creates Firebase Auth user but fails to create Firestore user document.

## Solution
Update your Firestore Security Rules in Firebase Console to allow user document creation.

## Steps to Fix

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select **weshare-dk** project
3. Navigate to **Firestore Database** → **Rules** tab
4. Replace with the rules below
5. Click **Publish**

## Required Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection
    match /users/{userId} {
      // Allow user to create their own document during signup
      allow create: if request.auth.uid == userId;
      
      // Allow user to read and update their own document
      allow read, update: if request.auth != null && request.auth.uid == userId;
      
      // Allow reading other users' public info (for ride listings)
      allow read: if request.auth != null;
    }
    
    // Rides collection
    match /rides/{rideId} {
      // Allow anyone (even unauthenticated) to read rides for browsing
      allow read: if true;
      
      // Only authenticated users can create rides (riderId must match auth uid)
      allow create: if request.auth != null && 
                       request.auth.uid == request.resource.data.riderId;
      
      // Only the rider can update/delete their own ride
      allow update, delete: if request.auth != null && 
                               request.auth.uid == resource.data.riderId;
    }
    
    // Bookings collection
    match /bookings/{bookingId} {
      // Only authenticated users can create bookings
      allow create: if request.auth != null && 
                       request.auth.uid == request.resource.data.passengerId;
      
      // Users can read bookings where they are passenger or driver
      allow read: if request.auth != null && 
                     (request.auth.uid == resource.data.passengerId || 
                      request.auth.uid == resource.data.riderId);
      
      // Rider can update booking status (confirm/reject)
      // Passenger can also update (cancel)
      allow update: if request.auth != null && 
                       (request.auth.uid == resource.data.riderId ||
                        request.auth.uid == resource.data.passengerId);
    }
  }
}
```

## What These Rules Do

### Users Collection
- ✅ Users can create their own document during signup (`allow create: if request.auth.uid == userId`)
- ✅ Users can read/update their own profile
- ✅ Authenticated users can read other users' info (needed for driver profiles in ride listings)

### Rides Collection
- ✅ Anyone can browse active rides (even without login)
- ✅ Only authenticated users can create rides
- ✅ Only the rider can modify their own rides

### Bookings Collection
- ✅ Only authenticated users can create bookings
- ✅ Users can only see bookings they're involved in
- ✅ Rider can update booking status

## After Publishing

1. Go back to your webapp
2. Try signing up again with a **new email** (the old one is already in Firebase Auth)
3. The user document should now be created in Firestore

## Cleanup Old Test User (Optional)

If you want to clean up the test user that failed:
1. Go to **Authentication** → **Users** tab
2. Find the test user
3. Delete it
4. Try signup again with the same email

## Verify It Works

After signup succeeds, check:
1. **Authentication** → User appears ✅
2. **Firestore Database** → `users` collection → Document with user's UID exists ✅
