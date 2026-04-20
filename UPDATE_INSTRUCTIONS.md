# Remaining Manual Updates Needed

## 1. Fix ProfileImageUpload (if not already fixed)

Check line 50 in `src/components/ProfileImageUpload.tsx`:
- Should be: `const storage = getStorage()`
- NOT: `const storage = getStorage(app)`

## 2. Update Home Page (`src/app/page.tsx`)

Add these sections:

### Hero Section with Background:
```tsx
<div className="relative bg-gradient-to-br from-brand-500 to-brand-700 text-white">
  <div className="absolute inset-0 opacity-20">
    {/* Add background image of Danish road/car here */}
    <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover" />
  </div>
  <div className="relative max-w-7xl mx-auto px-4 py-20">
    <h1 className="text-5xl font-bold mb-4">Del din rejse med WeShare</h1>
    <p className="text-xl mb-8">100% gratis samkørsel i Danmark</p>
  </div>
</div>
```

### App Download Section:
```tsx
<section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-4">Download vores app</h2>
    <p className="text-gray-600 mb-8">Få den bedste oplevelse med WeShare appen</p>
    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
      <img src="/screenshot.PNG" alt="WeShare App" className="w-64 rounded-2xl shadow-2xl" />
      <div>
        <a 
          href="https://apps.apple.com/dk/app/weshare-ride/id6754946645"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <img 
            src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/da-dk?size=250x83&amp;releaseDate=1234567890" 
            alt="Download on App Store" 
            className="h-14"
          />
        </a>
      </div>
    </div>
  </div>
</section>
```

## 3. Update Navigation (`src/components/Header.tsx` or similar)

Replace text logo with image:
```tsx
<Link href="/">
  <img src="/logo.png" alt="WeShare" className="h-10" />
</Link>
```

Add "Om Os" link:
```tsx
<Link href="/om-os" className="text-gray-700 hover:text-brand-600">
  Om os
</Link>
```

## 4. Update Footer

Change email to: `hello@weshare-ride.dk`
Change location to: `Aarhus, Danmark`

Example:
```tsx
<div>
  <h3 className="font-semibold mb-2">Kontakt</h3>
  <p>Email: hello@weshare-ride.dk</p>
  <p>Aarhus, Danmark</p>
</div>
```

## 5. Background Image

Download a free image from:
- Unsplash: https://unsplash.com/s/photos/denmark-road
- Pexels: https://www.pexels.com/search/danish%20highway/

Save as `/public/hero-bg.jpg`

## 6. Test Build

```bash
npm run build
```

If successful, push to GitHub:
```bash
git add -A
git commit -m "Update home page with logo, app download section, and contact info"
git push origin main
```
