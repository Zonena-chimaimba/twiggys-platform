import { config } from 'dotenv';
config({ path: 'server/.env' });

console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY len:', (process.env.CLOUDINARY_API_KEY || '').length);
console.log('CLOUDINARY_API_SECRET len:', (process.env.CLOUDINARY_API_SECRET || '').length);
console.log('CLOUDINARY_API_SECRET match:', process.env.CLOUDINARY_API_SECRET === 'tWnJBSWlYwvNmLrTr6Z8xH5P2K0');
console.log('CLOUDINARY_UPLOAD_PRESET:', process.env.CLOUDINARY_UPLOAD_PRESET);
