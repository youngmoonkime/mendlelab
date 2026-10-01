# MENDLELAB 티저 웹사이트

맨들랩 첫 페이지 티저(3D 로고 인트로, PLAY / SPACE / MAKE 스크롤 페이지, 체험 3종)를 그대로 옮긴 정적 웹사이트입니다. 빌드 과정 없이 폴더째 올리면 바로 동작합니다.

## 폴더 구성

- `index.html` : 페이지 전체(스타일, 화면, 동작 코드가 한 파일에 있음)
- `assets/` : 로고 이미지 (3D 로고용 조각 3개 + 파비콘/공유 이미지용 전체 로고)
- `vendor/htm-preact-standalone.umd.js` : 화면을 그리는 작은 라이브러리(Preact + htm, 약 13KB)

## 내 컴퓨터에서 보기

`index.html`을 브라우저로 열면 됩니다. 폰에서 시험하려면 같은 와이파이에서 간단한 로컬 서버를 띄우는 방법이 편합니다.

```
cd mendlelab-web
python3 -m http.server 8000
```

그 뒤 브라우저에서 `http://localhost:8000` 으로 접속합니다.

## 인터넷에 올리기

폴더 전체를 아래 서비스 중 하나에 그대로 올리면 됩니다.

- Netlify: app.netlify.com 에서 폴더를 끌어다 놓기
- GitHub Pages: 저장소에 올린 뒤 Settings > Pages 에서 배포
- Vercel, Cloudflare Pages 등 정적 사이트 호스팅

아이폰의 기울기 기능(로고가 폰 기울기를 따라 움직임)은 보안상 **https 주소에서만** 동작합니다. 위 서비스들은 기본으로 https를 제공합니다.

## 자주 고칠 곳 (index.html 안)

- 색과 레이아웃: `<style>` 안의 CSS
- 문구: `is coming`, `PLAY`/`SPACE`/`MAKE`, 각 체험의 안내 문장은 `<script>` 안에서 검색해 바꾸면 됩니다.
- 인트로 속도: CSS의 `.part-frame`, `.part-ring`, `.part-arrow` 애니메이션 시간, 타이핑 시작은 `setTimeout(step, 1800)`
- 게임 난이도: `tick()` 함수 안의 속도(`vy`)와 현무암 확률(`stoneChance`)
- 인스타그램 주소: `https://www.instagram.com/mendlelab/`

## 외부 연결

글꼴(Silkscreen, IBM Plex Sans KR)만 Google Fonts에서 불러옵니다. 나머지는 모두 이 폴더 안에 들어 있습니다.

## 라이선스 참고

`vendor/` 의 htm(Apache-2.0)과 Preact(MIT)는 오픈소스이며 상업적 사용이 가능합니다.
