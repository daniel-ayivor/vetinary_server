const http = require('http');
http.get('http://127.0.0.1:5000/api', (res) => {
  console.log('STATUS', res.statusCode);
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => { console.log('BODY', d); process.exit(0); });
}).on('error', (e) => { console.error('ERR', e.message); process.exit(1); });
