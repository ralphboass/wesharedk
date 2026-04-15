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
    
    // Users collection - allow authenticated users to read and manage their own profile
    match /users/{userId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
      allow delete: if request.auth != null && request.auth.uid == userId;
    }
    
    // Rides collection - allow authenticated users to create and read rides
    match /rides/{rideId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.resource.data.riderId == request.auth.uid;
      allow update: if request.auth != null && 
        (resource.data.riderId == request.auth.uid || 
         request.resource.data.keys().hasOnly(['availableSeats']));
      allow delete: if request.auth != null && resource.data.riderId == request.auth.uid;
    }
    
    // Bookings collection - allow passengers and drivers to manage bookings
    match /bookings/{bookingId} {
      allow read: if request.auth != null && 
        (resource.data.passengerId == request.auth.uid || 
         resource.data.driverId == request.auth.uid);
      allow create: if request.auth != null && request.resource.data.passengerId == request.auth.uid;
      // Driver can update booking status (confirm/reject)
      allow update: if request.auth != null && 
                       request.auth.uid == resource.data.driverId;
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
- ✅ Only the driver can modify their own rides

### Bookings Collection
- ✅ Only authenticated users can create bookings
- ✅ Users can only see bookings they're involved in
- ✅ Drivers can update booking status

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
