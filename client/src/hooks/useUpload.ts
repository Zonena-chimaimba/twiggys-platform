import { useState, useCallback } from 'react'
import { submissionsApi } from '@/api/submissions'
import type { CloudinaryUploadResult } from '@/types'

interface UploadState {
  file: File | null
  preview: string | null
  progress: number
  uploading: boolean
  uploaded: boolean
  result: CloudinaryUploadResult | null
  error: string | null
}

interface UseUploadReturn extends UploadState {
  selectFile: (file: File) => void
  upload: () => Promise<void>
  reset: () => void
}

const INITIAL: UploadState = {
  file: null,
  preview: null,
  progress: 0,
  uploading: false,
  uploaded: false,
  result: null,
  error: null,
}

export function useUpload(): UseUploadReturn {
  const [state, setState] = useState<UploadState>(INITIAL)

  const selectFile = useCallback((file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setState((s) => ({ ...s, error: 'File must be under 10MB' }))
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setState({
        ...INITIAL,
        file,
        preview: e.target?.result as string,
      })
    }
    reader.readAsDataURL(file)
  }, [])

  const upload = useCallback(async () => {
    if (!state.file) return

    setState((s) => ({ ...s, uploading: true, error: null, progress: 0 }))

    try {
      const result = await submissionsApi.uploadToCloudinary(
        state.file,
        (percent) => setState((s) => ({ ...s, progress: percent }))
      )
      setState((s) => ({ ...s, uploading: false, uploaded: true, result }))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed'
      setState((s) => ({
        ...s,
        uploading: false,
        error: message,
      }))
    }
  }, [state.file])

  const reset = useCallback(() => setState(INITIAL), [])

  return { ...state, selectFile, upload, reset }
}
