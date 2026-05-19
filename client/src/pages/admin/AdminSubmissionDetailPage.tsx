import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, CheckCircle2, MessageCircle } from 'lucide-react'
import { adminApi } from '@/api/admin'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Spinner } from '@/components/ui/Spinner'
import { Button } from '@/components/ui/Button'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import type { Submission, SubmissionStatus } from '@/types'
import {
  formatCurrency,
  formatDateTime,
  PAYMENT_METHOD_LABELS,
  getWhatsAppLink,
} from '@/utils/formatting'

// ─── All status options ───────────────────────────────────────────────────────

const ALL_STATUSES: SubmissionStatus[] = [
  'pending',
  'reviewing',
  'confirmed',
  'processing',
  'completed',
  'cancelled',
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminSubmissionDetailPage() {
  const { id } = useParams<{ id: string }>()

  const [submission, setSubmission] = useState<Submission | null>(null)
  const [loading, setLoading]       = useState(true)
  const [fetchError, setFetchError] = useState('')

  // Status update state
  const [newStatus, setNewStatus]   = useState<SubmissionStatus>('pending')
  const [updating, setUpdating]     = useState(false)
  const [updateError, setUpdateError] = useState('')
  const [justUpdated, setJustUpdated] = useState(false)

  // Load submission
  useEffect(() => {
    if (!id) return
    setLoading(true)
    adminApi
      .getSubmission(id)
      .then((s) => {
        setSubmission(s)
        setNewStatus(s.status)
      })
      .catch(() => setFetchError('Failed to load submission'))
      .finally(() => setLoading(false))
  }, [id])

  const handleUpdate = async () => {
    if (!id) return
    setUpdating(true)
    setUpdateError('')
    try {
      const updated = await adminApi.updateStatus(id, newStatus)
      setSubmission(updated)
      setJustUpdated(true)
      setTimeout(() => setJustUpdated(false), 2500)
    } catch {
      setUpdateError('Failed to update status. Please try again.')
    } finally {
      setUpdating(false)
    }
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size={28} />
      </div>
    )
  }

  // ── Fetch error ────────────────────────────────────────────────────────────
  if (fetchError || !submission) {
    return (
      <div className="max-w-md space-y-4">
        <ErrorMessage message={fetchError || 'Submission not found'} />
        <Link
          to="/admin/submissions"
          className="inline-flex items-center gap-2 text-brand-pink/70 hover:text-brand-pink font-body text-sm transition-colors"
        >
          <ArrowLeft size={14} />
          Back to submissions
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <Link
          to="/admin/submissions"
          className="mt-1 text-brand-white/35 hover:text-brand-white transition-colors flex-shrink-0"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <h1 className="font-display text-2xl text-brand-white font-light">
              {submission.customerName}
            </h1>
            <StatusBadge status={submission.status} />
          </div>
          <p className="font-body text-brand-white/30 text-xs">
            Submitted {formatDateTime(submission.createdAt)}
          </p>
        </div>
      </div>

      {/* ── Customer + payment info (2 columns) ─────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Customer */}
        <div className="bg-brand-black-card border border-white/[0.08] rounded-2xl p-5">
          <p className="font-body text-[10px] tracking-widest uppercase text-brand-white/25 mb-4">
            Customer
          </p>
          <div className="space-y-3">
            {[
              { label: 'Name',      value: submission.customerName },
              { label: 'Phone',     value: submission.phoneNumber },
              { label: 'WhatsApp',  value: submission.socialUsername ?? '—' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="font-body text-[10px] text-brand-white/25 uppercase tracking-wider mb-0.5">
                  {label}
                </p>
                <p className="font-body text-brand-white text-sm">{value}</p>
              </div>
            ))}
          </div>
          {/* WhatsApp CTA */}
          <a
            href={getWhatsAppLink(
              submission.socialUsername ?? submission.phoneNumber
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-[#25D366] font-body text-xs hover:underline"
          >
            <MessageCircle size={13} />
            Message on WhatsApp
          </a>
        </div>

        {/* Payment */}
        <div className="bg-brand-black-card border border-white/[0.08] rounded-2xl p-5">
          <p className="font-body text-[10px] tracking-widest uppercase text-brand-white/25 mb-4">
            Payment
          </p>
          <div className="space-y-3">
            {[
              {
                label: 'Method',
                value: PAYMENT_METHOD_LABELS[submission.paymentMethod] ?? submission.paymentMethod,
              },
              {
                label: 'Amount Paid',
                value: formatCurrency(Number(submission.amountPaid)),
              },
              {
                label: 'Submitted',
                value: formatDateTime(submission.createdAt),
              },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="font-body text-[10px] text-brand-white/25 uppercase tracking-wider mb-0.5">
                  {label}
                </p>
                <p className="font-body text-brand-white text-sm font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Order details ────────────────────────────────────────────────────── */}
      <div className="bg-brand-black-card border border-white/[0.08] rounded-2xl p-5">
        <p className="font-body text-[10px] tracking-widest uppercase text-brand-white/25 mb-4">
          Order Details
        </p>
        <p className="font-body text-brand-white/75 text-sm leading-relaxed whitespace-pre-wrap">
          {submission.itemOrdered}
        </p>
      </div>

      {/* ── Payment Proof ────────────────────────────────────────────────────── */}
      <div className="bg-brand-black-card border border-white/[0.08] rounded-2xl p-5">
        <p className="font-body text-[10px] tracking-widest uppercase text-brand-white/25 mb-4">
          Payment Proof
        </p>
        <a
          href={submission.paymentProofUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative rounded-xl overflow-hidden border border-white/[0.07] hover:border-brand-pink/30 transition-colors block"
          aria-label="View proof image"
        >
          <img
            src={submission.paymentProofUrl}
            alt="Payment proof"
            className="w-full aspect-video object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/50 flex items-center justify-center transition-all">
            <ExternalLink
              size={20}
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </a>
      </div>

      {/* ── Status update ────────────────────────────────────────────────────── */}
      <div className="bg-brand-black-card border border-white/[0.08] rounded-2xl p-5 space-y-5">
        <p className="font-body text-[10px] tracking-widest uppercase text-brand-white/25">
          Update Status
        </p>

        {/* Status pills */}
        <div>
          <p className="font-body text-xs text-brand-white/40 mb-3">Status</p>
          <div className="flex flex-wrap gap-2">
            {ALL_STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setNewStatus(s)}
                className={`px-3.5 py-1.5 rounded-full font-body text-xs font-medium border transition-all ${
                  newStatus === s
                    ? 'bg-brand-pink text-white border-brand-pink'
                    : 'border-white/10 text-brand-white/40 hover:text-brand-white hover:border-white/20'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {updateError && <ErrorMessage message={updateError} />}

        {/* Save row */}
        <div className="flex items-center gap-4">
          <Button
            type="button"
            size="md"
            loading={updating}
            onClick={handleUpdate}
          >
            Save Changes
          </Button>

          {justUpdated && (
            <div className="flex items-center gap-2 text-green-400 font-body text-sm animate-fade-in">
              <CheckCircle2 size={15} />
              <span>Updated</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
