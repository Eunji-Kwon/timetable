// 필요한 라이브러리 import
const express = require('express');
const cors = require('cors');
const path = require('path');

// Express 앱 설정
const app = express();
const port = 5096;  // 서버 포트 설정

// CORS 설정 (모든 출처에서 요청을 허용)
app.use(cors());

// API 엔드포인트 설정 (예시)
app.get('/api/schedule/:id', (req, res) => {
  const scheduleId = req.params.id;
  // 실제 데이터베이스에서 데이터 처리하거나 예시 데이터 반환
  res.json({ scheduleId: scheduleId, message: 'Schedule details' });
});

// React 앱 빌드된 파일 제공 (배포 모드일 경우)
app.use(express.static(path.join(__dirname, 'client/build')));

// React 앱의 라우팅을 처리할 모든 요청을 index.html로 처리
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// 서버 시작
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
