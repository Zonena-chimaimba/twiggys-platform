import type { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.ts';
import { appendFileSync } from 'fs';

// Normalize status to lowercase for consistent frontend consumption
function normalizeStatus(status: string): string {
  return status.toLowerCase();
}

function normalizeSubmission<T extends { status: string }>(s: T): T {
  return { ...s, status: normalizeStatus(s.status) };
}

export const createSubmission = async (req: Request, res: Response): Promise<void> => {
  const logFile = './submission-trace.log';
  const log = (msg: string) => {
    const ts = new Date().toISOString();
    console.log(`[${ts}] ${msg}`);
    try {
      appendFileSync(logFile, `[${ts}] ${msg}\n`);
    } catch (_e) {
      // ignore write errors
    }
  };

  log('[ENTRY] createSubmission called');
  log(`[BODY] ${JSON.stringify(req.body)}`);

  try {
    log('[STEP] Before destructuring');
    const {
      customerName,
      phoneNumber,
      socialUsername,
      itemOrdered,
      paymentMethod,
      amountPaid,
      transactionRef,
      paymentProofUrl,
    } = req.body;
    log('[STEP] After destructuring');

    log('[VALIDATION] Starting validation');
    if (
      !customerName ||
      !phoneNumber ||
      !itemOrdered ||
      !amountPaid ||
      !paymentMethod ||
      !transactionRef ||
      !paymentProofUrl
    ) {
      log('[VALIDATION] FAILED - Missing fields');
      res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
      return;
    }
    log('[VALIDATION] PASSED');

    log('[DB] Before prisma.submission.create');
    log(`[DB] Data: customerName=${customerName}, phone=${phoneNumber}, item=${itemOrdered}, amount=${amountPaid}`);
    const submission = await prisma.submission.create({
      data: {
        customerName,
        phoneNumber,
        socialUsername,
        itemOrdered,
        amountPaid: parseFloat(String(amountPaid)),
        paymentMethod,
        transactionRef,
        paymentProofUrl,
      },
    });
    log(`[DB] After create - submission.id=${submission.id}`);

    log('[RESPONSE] Before res.status(201).json()');
    res.status(201).json({
      success: true,
      message: 'Submission created successfully',
      data: {
        submission: normalizeSubmission(submission),
      },
    });
    log('[RESPONSE] After res.status(201).json() - request complete');
  } catch (error) {
    log(`[ERROR] Caught exception: ${error instanceof Error ? error.message : String(error)}`);
    log(`[ERROR] Stack: ${error instanceof Error ? error.stack : 'N/A'}`);
    const message = error instanceof Error ? error.message : 'Failed to create submission';
    res.status(500).json({
      success: false,
      message,
    });
    log('[ERROR] Sent 500 response');
  }
};

export const getSubmissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(String(req.query.page ?? '1'), 10)
    const limit = parseInt(String(req.query.limit ?? '20'), 10)
    const status = String(req.query.status ?? '')
    const search = String(req.query.search ?? '')
    const where: Prisma.SubmissionWhereInput = {}

    if (status && status !== 'all') {
      where.status = { in: [status.toUpperCase(), status.toLowerCase()] }
    }
    if (search) {
      where.OR = [
        { customerName: { contains: search, mode: 'insensitive' } },
        { phoneNumber: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [submissions, total] = await Promise.all([
      prisma.submission.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.submission.count({ where }),
    ])

    res.status(200).json({
      success: true,
      data: {
        submissions: submissions.map(normalizeSubmission),
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch submissions'
    res.status(500).json({
      success: false,
      message,
    })
  }
}

export const getSubmission = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    if (!id) {
      res.status(400).json({ success: false, message: 'Submission id is required' })
      return
    }

    const submission = await prisma.submission.findUnique({ where: { id } })

    if (!submission) {
      res.status(404).json({ success: false, message: 'Submission not found' })
      return
    }

    res.status(200).json({
      success: true,
      data: { submission: normalizeSubmission(submission) },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch submission'
    res.status(500).json({ success: false, message })
  }
}

export const updateSubmissionStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    if (!id) {
      res.status(400).json({ success: false, message: 'Submission id is required' })
      return
    }

    const { status } = req.body
    // Store status as uppercase in DB for consistency with Prisma default
    const normalizedForDb = String(status).toUpperCase()

    const submission = await prisma.submission.update({
      where: { id },
      data: { status: normalizedForDb },
    })

    res.status(200).json({
      success: true,
      data: { submission: normalizeSubmission(submission) },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update submission'
    res.status(500).json({ success: false, message })
  }
}

export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const [total, pending, reviewing, confirmed, processing, completed] = await Promise.all([
      prisma.submission.count(),
      prisma.submission.count({ where: { status: { in: ['PENDING', 'pending'] } } }),
      prisma.submission.count({ where: { status: { in: ['REVIEWING', 'reviewing'] } } }),
      prisma.submission.count({ where: { status: { in: ['CONFIRMED', 'confirmed'] } } }),
      prisma.submission.count({ where: { status: { in: ['PROCESSING', 'processing'] } } }),
      prisma.submission.count({ where: { status: { in: ['COMPLETED', 'completed'] } } }),
    ])

    res.status(200).json({
      success: true,
      data: {
        stats: { total, pending, reviewing, confirmed, processing, completed, cancelled: 0 },
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch stats'
    res.status(500).json({ success: false, message })
  }
}
