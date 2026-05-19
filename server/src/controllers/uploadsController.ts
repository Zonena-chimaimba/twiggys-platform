import type { Request, Response } from 'express';
import crypto from 'crypto';

export const signUpload = async (req: Request, res: Response): Promise<void> => {
  try {
    const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME || '';
    const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY || '';
    const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET || '';
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || 'twiggy_sithe_uploads';

    if (!cloudinaryCloudName || !cloudinaryApiKey || !cloudinaryApiSecret) {
      res.status(500).json({
        success: false,
        message: 'Cloudinary configuration missing',
      });
      return;
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const folder = 'twiggy-sithe/proof-uploads';

    // IMPORTANT:
    // Do NOT include upload_preset in the signature
    // because this is using an unsigned preset.

    const stringToSign = `folder=${folder}&timestamp=${timestamp}${cloudinaryApiSecret}`;

    const signature = crypto
      .createHash('sha1')
      .update(stringToSign)
      .digest('hex');

    res.status(200).json({
      success: true,
      data: {
        cloudName: cloudinaryCloudName,
        apiKey: cloudinaryApiKey,
        timestamp,
        signature,
        folder,
        uploadPreset,
      },
    });
  } catch (error) {
    console.error('[signUpload] Internal error:', error);

    const message =
      error instanceof Error ? error.message : 'Failed to sign upload';

    res.status(500).json({
      success: false,
      message,
    });
  }
};