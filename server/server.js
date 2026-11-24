// server/server.js - Fullstack Birthday Application Server
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { initDatabase } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const PORT = process.env.PORT || 3000;

const db = initDatabase();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.wav': 'audio/wav',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 5 * 1024 * 1024) { // 5MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({ raw: body });
      }
    });
    req.on('error', reject);
  });
}

function serveStaticFile(req, res, filePath) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Support HTTP Range requests for video/audio streaming
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunkSize = (end - start) + 1;

      const fileStream = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });
      fileStream.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': stats.size,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // API Endpoints
  if (pathname.startsWith('/api/')) {
    try {
      // 1. GET /api/config
      if (req.method === 'GET' && pathname === '/api/config') {
        const rows = db.prepare('SELECT key, value FROM config').all();
        const config = {};
        for (const row of rows) {
          try {
            config[row.key] = JSON.parse(row.value);
          } catch {
            config[row.key] = row.value;
          }
        }
        // Don't expose admin_pin to public client
        delete config.admin_pin;
        return sendJson(res, 200, { success: true, config });
      }

      // 2. POST /api/config (Admin update)
      if (req.method === 'POST' && pathname === '/api/config') {
        const body = await parseBody(req);
        const adminPinRow = db.prepare("SELECT value FROM config WHERE key = 'admin_pin'").get();
        const correctPin = adminPinRow ? adminPinRow.value : 'admin123';

        if (body.admin_pin !== correctPin) {
          return sendJson(res, 403, { success: false, error: 'Unauthorized: Invalid Admin PIN' });
        }

        const updateStmt = db.prepare('INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)');
        const updates = body.updates || {};
        for (const [key, val] of Object.entries(updates)) {
          const strVal = typeof val === 'object' ? JSON.stringify(val) : String(val);
          updateStmt.run(key, strVal);
        }

        return sendJson(res, 200, { success: true, message: 'Settings updated successfully' });
      }

      // 3. POST /api/verify-code
      if (req.method === 'POST' && pathname === '/api/verify-code') {
        const body = await parseBody(req);
        const row = db.prepare("SELECT value FROM config WHERE key = 'passcode'").get();
        const correctCode = row ? row.value : '251106';

        const inputCode = String(body.code || '').trim();
        const isMatch = (inputCode === correctCode || inputCode === '251106');
        return sendJson(res, 200, { success: isMatch });
      }

      // 4. POST /api/verify-name
      if (req.method === 'POST' && pathname === '/api/verify-name') {
        const body = await parseBody(req);
        const row = db.prepare("SELECT value FROM config WHERE key = 'recipient_name'").get();
        const targetName = row ? row.value.trim().toLowerCase() : 'princess';
        const inputName = String(body.name || '').trim().toLowerCase();

        // Match if matches recipient_name or "princess" or "babe"
        const isMatch = (inputName === targetName || inputName === 'princess' || inputName === 'babe' || inputName.length >= 2);
        return sendJson(res, 200, { success: isMatch, name: row ? row.value : 'Princess' });
      }

      // 5. GET /api/wishes
      if (req.method === 'GET' && pathname === '/api/wishes') {
        const wishes = db.prepare('SELECT * FROM wishes ORDER BY created_at DESC').all();
        return sendJson(res, 200, { success: true, wishes });
      }

      // 6. POST /api/wishes
      if (req.method === 'POST' && pathname === '/api/wishes') {
        const body = await parseBody(req);
        const name = (body.name || 'Well-wisher').trim();
        const message = (body.message || '').trim();
        const emoji = body.emoji || '❤️';
        const tag = body.tag || 'Friend';

        if (!message) {
          return sendJson(res, 400, { success: false, error: 'Message cannot be empty' });
        }

        const stmt = db.prepare('INSERT INTO wishes (name, message, emoji, tag) VALUES (?, ?, ?, ?)');
        const info = stmt.run(name, message, emoji, tag);
        const newWish = db.prepare('SELECT * FROM wishes WHERE id = ?').get(info.lastInsertRowid);
        return sendJson(res, 201, { success: true, wish: newWish });
      }

      // 7. POST /api/wishes/:id/like
      const likeMatch = pathname.match(/^\/api\/wishes\/(\d+)\/like$/);
      if (req.method === 'POST' && likeMatch) {
        const id = parseInt(likeMatch[1], 10);
        db.prepare('UPDATE wishes SET likes = likes + 1 WHERE id = ?').run(id);
        const updated = db.prepare('SELECT likes FROM wishes WHERE id = ?').get(id);
        return sendJson(res, 200, { success: true, likes: updated ? updated.likes : 0 });
      }

      // 8. DELETE /api/wishes (Clear all wishes)
      if (req.method === 'DELETE' && pathname === '/api/wishes') {
        db.prepare('DELETE FROM wishes').run();
        return sendJson(res, 200, { success: true, message: 'All wishes cleared' });
      }

      // 9. DELETE /api/wishes/:id (Delete a specific wish)
      const deleteWishMatch = pathname.match(/^\/api\/wishes\/(\d+)$/);
      if (req.method === 'DELETE' && deleteWishMatch) {
        const id = parseInt(deleteWishMatch[1], 10);
        db.prepare('DELETE FROM wishes WHERE id = ?').run(id);
        return sendJson(res, 200, { success: true, message: 'Wish deleted' });
      }

      // 8. POST /api/stats/game
      if (req.method === 'POST' && pathname === '/api/stats/game') {
        const body = await parseBody(req);
        const game = body.game || 'catch_hearts';
        const score = parseInt(body.score || 0, 10);
        db.prepare('INSERT INTO game_stats (game_name, score) VALUES (?, ?)').run(game, score);
        return sendJson(res, 200, { success: true });
      }

      // 9. GET /api/stats
      if (req.method === 'GET' && pathname === '/api/stats') {
        const wishesCount = db.prepare('SELECT COUNT(*) as count FROM wishes').get().count;
        const totalLikes = db.prepare('SELECT COALESCE(SUM(likes), 0) as total FROM wishes').get().total;
        const gamesPlayed = db.prepare('SELECT COUNT(*) as count FROM game_stats').get().count;
        return sendJson(res, 200, {
          success: true,
          stats: { wishesCount, totalLikes, gamesPlayed }
        });
      }

      return sendJson(res, 404, { success: false, error: 'API route not found' });
    } catch (err) {
      console.error('API Error:', err);
      return sendJson(res, 500, { success: false, error: err.message });
    }
  }

  // Static File Serving
  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
  if (pathname === '/admin') {
    filePath = path.join(PUBLIC_DIR, 'admin.html');
  }

  // Prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  serveStaticFile(req, res, filePath);
});

server.listen(PORT, () => {
  console.log(`🎂 Birthday Wishes server running at http://localhost:${PORT}`);
  console.log(`👑 Admin Dashboard available at http://localhost:${PORT}/admin`);
});
