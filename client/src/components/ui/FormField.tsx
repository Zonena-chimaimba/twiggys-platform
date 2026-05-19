import { forwardRef } from 'react'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
  prefix?: string
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      hint,
      prefix,
      className = '',
      ...props
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="font-body text-xs text-brand-white/50 tracking-wide">
          {label}
          {props.required && <span className="text-brand-pink ml-0.5">*</span>}
        </label>
        <div className="relative">
          {prefix && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-brand-white/30 text-sm pointer-events-none select-none">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            {...props}
            className={`
              w-full bg-white/5 border rounded-xl px-4 py-3 font-body text-sm text-brand-white
              placeholder-white/20 transition-colors focus:outline-none
              ${prefix ? 'pl-14' : ''}
              ${error ? 'border-red-500/40 focus:border-red-500/60' : 'border-white/10 focus:border-brand-pink/50'}
              ${className}
            `}
          />
        </div>
        {error && <p className="font-body text-xs text-red-400">{error}</p>}
        {hint && !error && <p className="font-body text-xs text-brand-white/25">{hint}</p>}
      </div>
    )
  },
)
InputField.displayName = 'InputField'

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  hint?: string
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  (
    {
      label,
      error,
      hint,
      className = '',
      ...props
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="font-body text-xs text-brand-white/50 tracking-wide">
          {label}
          {props.required && <span className="text-brand-pink ml-0.5">*</span>}
        </label>
        <textarea
          ref={ref}
          {...props}
          className={`
            w-full bg-white/5 border rounded-xl px-4 py-3 font-body text-sm text-brand-white
            placeholder-white/20 transition-colors focus:outline-none resize-none
            ${error ? 'border-red-500/40 focus:border-red-500/60' : 'border-white/10 focus:border-brand-pink/50'}
            ${className}
          `}
        />
        {error && <p className="font-body text-xs text-red-400">{error}</p>}
        {hint && !error && <p className="font-body text-xs text-brand-white/25">{hint}</p>}
      </div>
    )
  },
)
TextareaField.displayName = 'TextareaField'
