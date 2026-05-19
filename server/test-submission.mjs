import http from 'http';

const payload = JSON.stringify({
  customerName: 'Test User',
  phoneNumber: '+265 999 999 999',
  socialUsername: '+265 999 999 999',
  itemOrdered: 'Test order details',
  paymentMethod: 'mpamba',
  amountPaid: 1234.5,
  transactionRef: 'publicid123',
  paymentProofUrl: 'https://res.cloudinary.com/demo/image/upload/v123/test.jpg'
});

console.log('🔍 DEBUG: Sending payload:', payload);
console.log('🔍 DEBUG: Payload size:', Buffer.byteLength(payload), 'bytes');

const req = http.request({
  hostname: 'localhost',
  port: 3002,
  path: '/api/submissions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
}, (res) => {
  console.log('📬 Response Status:', res.statusCode);
  let data = '';
  res.on('data', (chunk) => {
    data += chunk.toString();
  });
  res.on('end', () => {
    console.log('📬 Response Body:', data);
    process.exit(0);
  });
});

req.on('error', (err) => {
  console.error('❌ Request Error:', err.message);
  process.exit(1);
});

req.write(payload);
req.end();
