import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { useAuth } from '@/context/AuthContext'

// ─── Schema ───────────────────────────────────────────────────────────────────

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

type FormValues = z.infer<typeof schema>

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminLoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [apiError, setApiError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    setApiError('')
    try {
      await login(values.username, values.password)
      navigate('/admin', { replace: true })
    } catch {
      setApiError('Invalid username or password. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-6">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-pink/[0.04] blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-sm animate-fade-up">

        {/* Logo + heading */}
        <div className="flex flex-col items-center mb-10">
          <Logo size={72} className="mb-5" />
          <h1 className="font-display text-2xl text-brand-white font-light">
            Admin Portal
          </h1>
          <p className="font-body text-brand-white/25 text-xs tracking-widest uppercase mt-1.5">
            Twiggy &amp; Sithe's
          </p>
        </div>

        {/* Form card */}
        <div className="bg-brand-black-card border border-white/[0.08] rounded-2xl p-7">
          {apiError && <ErrorMessage message={apiError} className="mb-5" />}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs text-brand-white/50">Username</label>
              <input
                type="text"
                autoComplete="username"
                placeholder="admin"
                {...register('username')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-brand-white placeholder-white/20 focus:outline-none focus:border-brand-pink/50 transition-colors"
              />
              {errors.username && (
                <p className="font-body text-xs text-red-400">{errors.username.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs text-brand-white/50">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  {...register('password')}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-11 font-body text-sm text-brand-white placeholder-white/20 focus:outline-none focus:border-brand-pink/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-white/25 hover:text-brand-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="font-body text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              size="md"
              fullWidth
              loading={isSubmitting}
              className="mt-2"
            >
              Sign In
            </Button>
          </form>
        </div>

        <p className="text-center font-body text-brand-white/20 text-xs mt-6">
          Admin access only — no public registration
        </p>
      </div>
    </div>
  )
}
