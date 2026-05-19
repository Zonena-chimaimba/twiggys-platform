import type { PaymentMethod, SubmissionStatus } from '@/types'

export function formatCurrency(amount: number, currency = 'MWK'): string {
  return `${currency} ${amount.toLocaleString('en-MW', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  mpamba: 'TNM Mpamba',
  airtel_money: 'Airtel Money',
  national_bank: 'National Bank',
}

export const STATUS_LABELS: Record<SubmissionStatus, string> = {
  pending: 'Pending',
  reviewing: 'Reviewing',
  confirmed: 'Confirmed',
  processing: 'Processing',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export function getWhatsAppLink(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/${digits}`
}
