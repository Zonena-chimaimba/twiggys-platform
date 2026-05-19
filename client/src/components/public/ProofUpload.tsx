import { useRef } from 'react'
import type { ChangeEvent, DragEvent } from 'react'
import { Upload, X, CheckCircle2, AlertCircle, FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { useUpload } from '@/hooks/useUpload'

interface ProofUploadProps {
  uploadState: ReturnType<typeof useUpload>
}

export function ProofUpload({ uploadState }: ProofUploadProps) {
  const {
    file,
    preview,
    progress,
    uploading,
    uploaded,
    error,
    selectFile,
    upload,
    reset,
  } = uploadState

  const inputRef = useRef<HTMLInputElement>(null)
  const isPdf = file?.type === 'application/pdf'

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) selectFile(selected)
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files[0]
    if (dropped) selectFile(dropped)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  if (!file) {
    return (
      <div>
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl p-10 cursor-pointer hover:border-brand-pink/30 hover:bg-brand-pink/[0.02] transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-brand-pink/10 transition-colors">
            <Upload size={22} className="text-brand-white/30 group-hover:text-brand-pink/60 transition-colors" />
          </div>
          <p className="font-body text-brand-white/40 text-sm text-center leading-relaxed">
            Tap to upload your payment screenshot
          </p>
          <p className="font-body text-brand-white/20 text-xs mt-1.5 text-center">
            JPG, PNG, PDF — max 10MB
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          onChange={handleFileChange}
          className="sr-only"
          aria-label="Upload payment proof"
        />
        {error && (
          <div className="flex items-center gap-2 mt-3 text-red-400 font-body text-xs">
            <AlertCircle size={13} />
            <span>{error}</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="relative rounded-xl overflow-hidden border border-white/10">
        {isPdf ? (
          <div className="w-full h-52 flex items-center justify-center bg-white/5">
            <FileText size={48} className="text-brand-white/30" />
          </div>
        ) : (
          preview && (
            <img
              src={preview}
              alt="Payment proof preview"
              className="w-full max-h-52 object-cover"
            />
          )
        )}

        {!uploading && !uploaded && (
          <button
            type="button"
            onClick={reset}
            aria-label="Remove file"
            className="absolute top-2 right-2 bg-brand-black/80 backdrop-blur-sm rounded-full p-1.5 text-brand-white/60 hover:text-brand-white transition-colors"
          >
            <X size={13} />
          </button>
        )}

        {uploaded && (
          <div className="absolute inset-0 bg-brand-black/40 flex items-center justify-center">
            <div className="bg-brand-black/80 backdrop-blur-sm rounded-full p-3">
              <CheckCircle2 size={28} className="text-green-400" />
            </div>
          </div>
        )}
      </div>

      <p className="font-body text-xs text-brand-white/40 truncate px-1">{file.name}</p>

      {uploading && (
        <div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-pink transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-body text-[11px] text-brand-white/30 mt-1">{progress}% uploaded</p>
        </div>
      )}

      {uploaded && (
        <div className="flex items-center gap-2 text-green-400 font-body text-sm">
          <CheckCircle2 size={15} />
          <span>Proof uploaded successfully</span>
        </div>
      )}

      {!uploaded && !uploading && (
        <Button type="button" variant="ghost" size="sm" onClick={() => void upload()} fullWidth>
          <Upload size={14} />
          Upload Proof
        </Button>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-400 font-body text-xs">
          <AlertCircle size={13} />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
