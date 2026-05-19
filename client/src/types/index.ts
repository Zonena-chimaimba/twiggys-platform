export type PaymentMethod = 'mpamba' | 'airtel_money' | 'national_bank'

export type SubmissionStatus =
  | 'pending'
  | 'reviewing'
  | 'confirmed'
  | 'processing'
  | 'completed'
  | 'cancelled'

export interface Admin {
  id: string
  email: string
  name?: string
}

export interface DashboardStats {
  total: number
  pending: number
  reviewing: number
  confirmed: number
  processing: number
  completed: number
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaymentProof {
  id: string
  cloudinaryUrl: string
  publicId: string
}

export interface Submission {
  id: string
  customerName: string
  phoneNumber: string
  socialUsername?: string
  itemOrdered: string
  amountPaid: number | string
  paymentMethod: PaymentMethod
  transactionRef: string
  paymentProofUrl: string
  status: SubmissionStatus
  createdAt: string
}

export interface CreateSubmissionDto {
  customerName: string
  phoneNumber: string
  socialUsername?: string
  itemOrdered: string
  amountPaid: number
  paymentMethod: PaymentMethod
  transactionRef: string
  paymentProofUrl: string
}

export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  original_filename: string
  format: string
  resource_type: string
  [key: string]: unknown
}
