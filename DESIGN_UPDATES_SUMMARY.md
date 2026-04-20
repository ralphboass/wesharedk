# Design Updates Summary

## ✅ Completed Changes:

### 1. Removed "24 timers format" text
- **File:** `src/components/TimePicker.tsx`
- **Change:** Removed helper text about 24-hour format

### 2. Created "Om Os" page
- **File:** `src/app/om-os/page.tsx` (NEW)
- **Content:** About two Aarhus BSS students, mission, why WeShare is free

### 3. Updated Privacy Policy
- **File:** `src/app/privacy/page.tsx`
- **Changes:** 
  - Proper GDPR-compliant content in Danish
  - Updated email to hello@weshare-ride.dk
  - Updated location to Aarhus, Danmark

### 4. Updated Terms of Service
- **File:** `src/app/terms/page.tsx`
- **Changes:**
  - Complete service terms in Danish
  - Updated email to hello@weshare-ride.dk
  - Updated location to Aarhus, Danmark

### 5. Moved Assets to Public Folder
- **Files:** `logo.png`, `screenshot.PNG`
- **Location:** Now in `/public/` folder for web access

## 🔧 Critical Fix Needed:

### ProfileImageUpload Firebase Import Error
**File:** `src/components/ProfileImageUpload.tsx`
**Line 6:** Remove `import { app } from '@/lib/firebase'`
**Line 50:** Change `const storage = getStorage(app)` to `const storage = getStorage()`

This is blocking Vercel deployment!

## 📋 Remaining Tasks:

### 1. Update Home Page (`src/app/page.tsx`)
Need to add:
- Background image of car on Danish road
- WeShare logo (use `/logo.png`)
- App download section with:
  - Link: https://apps.apple.com/dk/app/weshare-ride/id6754946645
  - Screenshot: `/screenshot.PNG`

### 2. Update Navigation/Header
- Replace text logo with image logo (`/logo.png`)
- Add "Om Os" link to navigation

### 3. Update Footer
- Change email from `support@weshare.dk` to `hello@weshare-ride.dk`
- Change location from generic to "Aarhus, Danmark"
- Ensure Privacy and Terms links point to correct pages

### 4. Find Background Image
- Need a nice image of a car on a Danish road for hero section
- Suggested sources:
  - Unsplash.com (search: "denmark road", "car denmark", "danish highway")
  - Pexels.com
  - Free stock photo sites

## 🚀 Deployment Steps:

1. **Fix ProfileImageUpload.tsx** (CRITICAL - blocks deployment)
2. Commit all completed changes
3. Update home page with logo and app section
4. Update navigation and footer
5. Add background image
6. Test locally with `npm run build`
7. Push to GitHub
8. Verify Vercel deployment succeeds

## 📧 Contact Information Updates:

All instances of email should be: **hello@weshare-ride.dk**
All instances of location should be: **Aarhus, Danmark**

Updated in:
- ✅ Privacy policy
- ✅ Terms of service
- ⏳ Footer (pending)
- ⏳ Contact page if exists (pending)
