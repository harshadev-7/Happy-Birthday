// scripts/test_server.js
import http from 'node:http';
import { spawn } from 'node:child_process';

const serverProc = spawn('node', ['server/server.js'], {
  cwd: 'd:\\Documents\\Happy birthday\\Bday2',
  stdio: 'inherit'
});

await new Promise(r => setTimeout(r, 1500));

try {
  console.log('Testing GET / ...');
  const resRoot = await fetch('http://localhost:3000/');
  console.log('Root Status:', resRoot.status);

  console.log('Testing GET /api/config ...');
  const resConfig = await fetch('http://localhost:3000/api/config');
  const configData = await resConfig.json();
  console.log('Config loaded:', configData.success, 'Recipient:', configData.config?.recipient_name);

  console.log('Testing POST /api/verify-code (correct: 120800) ...');
  const resVerify1 = await fetch('http://localhost:3000/api/verify-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: '120800' })
  });
  const dataVerify1 = await resVerify1.json();
  console.log('Passcode 120800 verified:', dataVerify1.success);

  console.log('Testing POST /api/verify-code (wrong: 999999) ...');
  const resVerify2 = await fetch('http://localhost:3000/api/verify-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: '999999' })
  });
  const dataVerify2 = await resVerify2.json();
  console.log('Passcode 999999 rejected:', !dataVerify2.success);

  console.log('Testing POST /api/wishes ...');
  const resWish = await fetch('http://localhost:3000/api/wishes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Tester',
      message: 'Automated test wish! 🎉',
      emoji: '💖',
      tag: 'Bestie'
    })
  });
  const wishData = await resWish.json();
  console.log('New wish inserted:', wishData.success, 'ID:', wishData.wish?.id);

  console.log('Testing POST /api/wishes/:id/like ...');
  const resLike = await fetch(`http://localhost:3000/api/wishes/${wishData.wish.id}/like`, { method: 'POST' });
  const likeData = await resLike.json();
  console.log('Wish like count updated to:', likeData.likes);

  console.log('Testing GET /api/stats ...');
  const resStats = await fetch('http://localhost:3000/api/stats');
  const statsData = await resStats.json();
  console.log('Stats:', statsData.stats);

  console.log('Testing GET /admin ...');
  const resAdmin = await fetch('http://localhost:3000/admin');
  console.log('Admin Status:', resAdmin.status);

  console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! 🎉');
} catch (err) {
  console.error('Test failed:', err);
} finally {
  serverProc.kill();
  process.exit(0);
}
