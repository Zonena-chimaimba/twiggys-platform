const http = require('http');

const payload = JSON.stringify({
  customerName: 'Test User',
  phoneNumber: '+265 999 999 999',
  socialUsername: 'testsocial',
  itemOrdered: 'Test item',
  paymentMethod: 'mpamba',
  amountPaid: 1234.5,
  transactionRef: 'ref123',
  paymentProofUrl: 'https://example.com/proof.jpg'
});

console.log('[TEST] Sending submission request...');

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
  console.log('[TEST] Status:', res.statusCode);
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log('[TEST] Response received:', data);
    process.exit(0);
  });
});

req.on('error', (err) => {
  console.log('[TEST] Request error:', err.message);
  process.exit(1);
});

req.write(payload);
req.end();

setTimeout(() => {
  console.log('[TEST] TIMEOUT after 20 seconds - no response from server');
  process.exit(1);
}, 20000);
