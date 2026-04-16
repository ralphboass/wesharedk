'use client'

import { useState, useRef } from 'react'
import { Camera, Loader2, X } from 'lucide-react'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { app } from '@/lib/firebase'

interface ProfileImageUploadProps {
  currentImageUrl?: string
  userId: string
  userName: string
  onImageUploaded: (url: string) => void
}

export default function ProfileImageUpload({ 
  currentImageUrl, 
  userId, 
  userName,
  onImageUploaded 
}: ProfileImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Vælg venligst et billedfil')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Billedet må højst være 5MB')
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload to Firebase Storage
    setUploading(true)
    try {
      const storage = getStorage(app)
      const fileExtension = file.name.split('.').pop()
      const fileName = `profile-images/${userId}.${fileExtension}`
      const storageRef = ref(storage, fileName)
      
      await uploadBytes(storageRef, file)
      const downloadUrl = await getDownloadURL(storageRef)
      
      onImageUploaded(downloadUrl)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Kunne ikke uploade billede. Prøv igen.')
      setPreviewUrl(null)
    } finally {
      setUploading(false)
    }
  }

  function handleRemovePreview() {
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const displayUrl = previewUrl || currentImageUrl

  return (
    <div className="relative">
      <div className="relative w-24 h-24 rounded-full overflow-hidden bg-brand-100 flex items-center justify-center group">
        {displayUrl ? (
          <img 
            src={displayUrl} 
            alt={userName} 
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-3xl font-bold text-brand-600">
            {userName.charAt(0)}
          </span>
        )}
        
        {/* Upload overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="text-white"
          >
            {uploading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Camera className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Camera button for mobile */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-lg hover:bg-brand-700 disabled:opacity-50"
      >
        {uploading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Camera className="w-4 h-4" />
        )}
      </button>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}
