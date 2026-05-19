import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { InputField, TextareaField } from '@/components/ui/FormField'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { ProofUpload } from '@/components/public/ProofUpload'
import { useUpload } from '@/hooks/useUpload'
import { submissionsApi } from '@/api/submissions'
import axios from 'axios'
import type { PaymentMethod } from '@/types'
import { PAYMENT_METHODS } from '@/components/public/PaymentMethodCard'

const schema = z.object({
  customerName: z.string().min(2, 'Full name is required').max(100),
  customerPhone: z
    .string()
    .min(7, 'Phone number is required')
    .regex(/^[+\d\s()\\-]+$/, 'Invalid phone number format'),
  whatsappNumber: z.string().optional(),
  orderDetails: z
    .string()
    .min(10, 'Please describe your order in more detail')
    .max(5000),
  paymentMethod: z.enum(['mpamba', 'airtel_money', 'national_bank'], {
    errorMap: () => ({ message: 'Please select a payment method' }),
  }),
  amountPaid: z.coerce
    .number({ invalid_type_error: 'Please enter the amount you paid' })
    .positive('Amount must be greater than 0'),
})

type FormValues = z.infer<typeof schema>

interface OrderFormProps {
  onSuccess: () => void
}

export function OrderForm({ onSuccess }: OrderFormProps) {
  const uploadState = useUpload()
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const selectedMethod = watch('paymentMethod') as PaymentMethod | undefined

  const onSubmit = async (values: FormValues) => {
    if (!uploadState.uploaded || !uploadState.result) {
      setSubmitError('Please upload your payment proof before submitting')
      return
    }
    setSubmitError('')
    try {
      await submissionsApi.create({
        customerName: values.customerName,
        phoneNumber: values.customerPhone,
        socialUsername: values.whatsappNumber,
        itemOrdered: values.orderDetails,
        paymentMethod: values.paymentMethod as PaymentMethod,
        amountPaid: values.amountPaid,
        transactionRef: uploadState.result.public_id,
        paymentProofUrl: uploadState.result.secure_url,
      })
      onSuccess()
    } catch (err) {
      console.error('Order submission error:', err)
      if (axios.isAxiosError(err)) {
        console.error('Response data:', err.response?.data)
        console.error('Status code:', err.response?.status)
        const backendMessage = (err.response?.data as any)?.message || (err.response?.data as any)?.error || err.message
        setSubmitError(String(backendMessage ?? 'Submission failed. Please check your connection and try again.'))
      } else {
        setSubmitError(String((err as any)?.message ?? 'Submission failed. Please check your connection and try again.'))
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="bg-brand-black-card border border-white/[0.08] rounded-2xl p-6 space-y-5">
        <p className="font-body text-[10px] tracking-widest uppercase text-brand-white/30">
          Your Details
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InputField
            label="Full Name"
            placeholder="Your full name"
            required
            autoComplete="name"
            error={errors.customerName?.message}
            {...register('customerName')}
          />
          <InputField
            label="Phone Number"
            placeholder="+265 9XX XXX XXX"
            required
            autoComplete="tel"
            error={errors.customerPhone?.message}
            {...register('customerPhone')}
          />
        </div>
        <InputField
          label="WhatsApp Number"
          placeholder="If different from phone number"
          hint="We'll use this to confirm your order"
          autoComplete="tel"
          error={errors.whatsappNumber?.message}
          {...register('whatsappNumber')}
        />
      </div>

      <div className="bg-brand-black-card border border-white/[0.08] rounded-2xl p-6 space-y-5">
        <p className="font-body text-[10px] tracking-widest uppercase text-brand-white/30">
          Order Details
        </p>
        <TextareaField
          label="What did you order?"
          placeholder="Describe the items — brand, size, colour, quantity, any other details..."
          required
          rows={4}
          error={errors.orderDetails?.message}
          {...register('orderDetails')}
        />
      </div>

      <div className="bg-brand-black-card border border-white/[0.08] rounded-2xl p-6 space-y-5">
        <p className="font-body text-[10px] tracking-widest uppercase text-brand-white/30">
          Payment Details
        </p>
        <div>
          <p className="font-body text-xs text-brand-white/50 mb-3">
            Payment Method <span className="text-brand-pink">*</span>
          </p>
          <div className="grid grid-cols-3 gap-3">
            {PAYMENT_METHODS.map((m) => {
              const isSelected = selectedMethod === m.id
              return (
                <label
                  key={m.id}
                  className={`cursor-pointer border rounded-xl p-3 text-center transition-all ${
                    isSelected
                      ? 'border-brand-pink bg-brand-pink/10 text-brand-white'
                      : 'border-white/10 text-brand-white/40 hover:border-white/20 hover:text-brand-white/70'
                  }`}
                >
                  <input
                    type="radio"
                    value={m.id}
                    className="sr-only"
                    {...register('paymentMethod')}
                  />
                  <div className="text-xl mb-1.5">{m.icon}</div>
                  <div className="font-body text-xs leading-tight">{m.name}</div>
                </label>
              )
            })}
          </div>
          {errors.paymentMethod && (
            <p className="font-body text-xs text-red-400 mt-2">
              {errors.paymentMethod.message}
            </p>
          )}
        </div>

        <InputField
          label="Amount Paid"
          placeholder="0.00"
          required
          type="number"
          step="0.01"
          min="0"
          prefix="MWK"
          error={errors.amountPaid?.message}
          {...register('amountPaid')}
        />
      </div>

      <div className="bg-brand-black-card border border-white/[0.08] rounded-2xl p-6 space-y-4">
        <p className="font-body text-[10px] tracking-widest uppercase text-brand-white/30">
          Payment Proof <span className="text-brand-pink normal-case text-[9px]">required</span>
        </p>
        <ProofUpload uploadState={uploadState} />
      </div>

      {submitError && <ErrorMessage message={submitError} />}

      {uploadState.file && !uploadState.uploaded && (
        <p className="text-center font-body text-xs text-brand-white/25">
          Click &quot;Upload Proof&quot; above before submitting
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || (!!uploadState.file && !uploadState.uploaded)}
        className="w-full bg-brand-pink text-white font-body font-medium py-4 rounded-full hover:bg-brand-pink/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Submitting Order…
          </>
        ) : (
          'Submit Order'
        )}
      </button>
    </form>
  )
}
