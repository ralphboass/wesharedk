# WeShareRide.dk - Testing Checklist

## Complete User Flow Testing

### 1. User Registration & Authentication ✓
- [ ] Navigate to signup page
- [ ] Fill in all required fields (first name, last name, email, phone, password)
- [ ] Accept terms and privacy policy (links should be clickable)
- [ ] Submit registration
- [ ] Verify email verification page appears
- [ ] Check email for verification link
- [ ] Click verification link
- [ ] Verify redirect to login/home page

### 2. Profile Management ✓
- [ ] Navigate to profile page
- [ ] Verify profile information displays correctly
- [ ] Test profile image upload:
  - [ ] Hover over profile image - camera icon appears
  - [ ] Click camera button
  - [ ] Select image file (max 5MB)
  - [ ] Verify image uploads and displays
- [ ] Check "Mine rejser" section shows created rides

### 3. Ride Creation (2-Step Flow) ✓
**Step 1: Route Selection**
- [ ] Click "Opret lift" button
- [ ] Redirects to `/rides/new/step1`
- [ ] Progress bar shows "Rute" active
- [ ] Test departure address autocomplete:
  - [ ] Type Danish address
  - [ ] Select from DAWA suggestions
  - [ ] City auto-fills
- [ ] Test destination address autocomplete
- [ ] Click "Næste: Tid og pris"
- [ ] Verify data saved to sessionStorage

**Step 2: Details**
- [ ] Verify route summary displays correctly
- [ ] Progress bar shows "Detaljer" active
- [ ] Select date (must be today or future)
- [ ] Select time using hour/minute dropdowns (15-min intervals)
- [ ] Select number of seats (1-6)
- [ ] Enter price per person
- [ ] Add optional note
- [ ] Verify payment info box displays
- [ ] Click "Opret lift"
- [ ] Verify redirect to ride detail page

### 4. Ride Browsing (Unauthenticated) ✓
- [ ] Log out
- [ ] Navigate to `/rides`
- [ ] Verify rides display without login
- [ ] Test search filters:
  - [ ] Search by departure city/address
  - [ ] Search by destination city/address
  - [ ] Search by date
- [ ] Click on a ride
- [ ] Verify ride details display
- [ ] Verify "Log ind for at booke" button shows

### 5. Ride Browsing (Authenticated) ✓
- [ ] Log in
- [ ] Navigate to `/rides`
- [ ] Verify rides display
- [ ] Click on a ride
- [ ] Verify ride details show:
  - [ ] Route with addresses
  - [ ] Date and time
  - [ ] Available seats
  - [ ] Price per person
  - [ ] Driver information
  - [ ] Payment information box
  - [ ] "Send besked til chauffør" button

### 6. Booking Flow ✓
- [ ] On ride detail page, select number of seats
- [ ] Add optional message to driver
- [ ] Verify total price calculates correctly
- [ ] Verify payment info displays (MobilePay/agreement)
- [ ] Click "Send bookinganmodning"
- [ ] Verify success message appears
- [ ] Click "Se mine bookinger"
- [ ] Verify booking appears in "Mine bookinger" tab

### 7. Bookings Management ✓
**As Passenger:**
- [ ] Navigate to `/bookings`
- [ ] Select "Mine bookinger" tab
- [ ] Verify booking displays with:
  - [ ] Route information
  - [ ] Date and time
  - [ ] Number of seats
  - [ ] Total price
  - [ ] Driver name
  - [ ] Payment info (MobilePay reminder)
  - [ ] Status badge
- [ ] Test cancel booking (if pending/confirmed)

**As Driver:**
- [ ] Select "Anmodninger" tab
- [ ] Verify booking requests show
- [ ] Test confirm booking (green checkmark)
- [ ] Test reject booking (red X)
- [ ] Verify available seats update

**My Rides:**
- [ ] Select "Mine rejser" tab
- [ ] Verify all created rides display
- [ ] Click on a ride to view details

### 8. Messaging ✓
- [ ] From ride detail page, click "Send besked til chauffør"
- [ ] Verify redirect to messages page
- [ ] Send a test message
- [ ] Verify message appears in chat
- [ ] Check recipient receives message

### 9. Payment Information Display ✓
- [ ] Ride creation page shows payment info
- [ ] Ride detail page shows payment info
- [ ] Booking sidebar shows payment reminder
- [ ] Confirmed bookings show payment reminder
- [ ] All mention MobilePay and "WeShareRide.dk er gratis"

### 10. Mobile Responsiveness ✓
- [ ] Test on mobile viewport (375px width)
- [ ] Verify 2-step ride creation works on mobile
- [ ] Verify time picker works on mobile
- [ ] Verify address autocomplete works on mobile
- [ ] Verify all pages are responsive

## Firebase Configuration Checklist

### Firestore Rules ✓
- [ ] Rides collection allows public read
- [ ] Rides collection requires auth for create
- [ ] Rides collection validates riderId matches auth.uid
- [ ] Users collection properly secured
- [ ] Bookings collection properly secured

### Firebase Storage Rules ✓
- [ ] Profile images allow public read
- [ ] Profile images require auth for write
- [ ] Profile images validate userId matches path

### Firestore Indexes
- [ ] Check if any composite indexes are needed
- [ ] Verify queries work without index errors

## Known Issues to Test

1. **Disk Space**: Ensure sufficient disk space for git operations
2. **Session Storage**: Verify ride creation data persists between steps
3. **Image Upload**: Test with various image formats and sizes
4. **Time Selection**: Verify 24-hour format displays correctly
5. **Address Autocomplete**: Test with various Danish addresses

## Post-Deployment Verification

- [ ] All pages load without errors
- [ ] No console errors in browser
- [ ] All images load correctly
- [ ] All links work
- [ ] Forms submit successfully
- [ ] Firebase connection works
- [ ] DAWA API integration works
