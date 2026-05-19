import { api } from './client'
import type { CreateSubmissionDto, Submission, CloudinaryUploadResult } from '@/types'

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dd4xsfvsy/image/upload'
const CLOUDINARY_UPLOAD_PRESET = 'twiggy_sithe_uploads'
const CLOUDINARY_UPLOAD_FOLDER = 'twiggy-sithe/proof-uploads'

export const submissionsApi = {
  create: async (dto: CreateSubmissionDto): Promise<Submission> => {
    const { data } = await api.post('/submissions', dto)
    return data.data.submission as Submission
  },

  uploadToCloudinary: (
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<CloudinaryUploadResult> => {
    return new Promise((resolve, reject) => {
      const form = new FormData()
      form.append('file', file)
      form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      form.append('folder', CLOUDINARY_UPLOAD_FOLDER)

      const xhr = new XMLHttpRequest()
      const url = CLOUDINARY_UPLOAD_URL
      xhr.open('POST', url)
      xhr.timeout = 120_000
      let timeoutId = setTimeout(() => xhr.abort(), 120_000)

      if (onProgress) {
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            onProgress(Math.round((e.loaded / e.total) * 100))
          }
        }
      }

      xhr.onload = () => {
        clearTimeout(timeoutId)
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText) as CloudinaryUploadResult)
          } catch (_) {
            reject(new Error('Cloudinary returned an invalid response'))
          }
        } else {
          const message = xhr.responseText || `Cloudinary upload failed with status ${xhr.status}`
          reject(new Error(message))
        }
      }

      xhr.ontimeout = () => {
        clearTimeout(timeoutId)
        reject(new Error('Upload timed out after 120 seconds'))
      }

      xhr.onerror = () => {
        clearTimeout(timeoutId)
        reject(new Error('Network error during file upload'))
      }

      xhr.send(form)
    })
  },
}
