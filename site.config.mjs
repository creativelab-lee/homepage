// dual-domain 배포 설정 — 두 도메인은 이메일과 privacy 도메인만 다르다.
// 새 배포 대상을 늘리려면 여기에 항목만 추가하면 build.mjs가 동일 템플릿으로 생성한다.

export const targets = [
  {
    key: 'lee',
    outDir: '../creativelab-lee.github.io',
    vars: {
      EMAIL: 'creativelab.lee@gmail.com',
      PRIVACY_BASE: 'https://creativelab-lee.github.io',
    },
  },
  {
    key: 'choi',
    outDir: '../inphilchoi.github.io',
    vars: {
      EMAIL: 'creativelab.choi@gmail.com',
      PRIVACY_BASE: 'https://inphilchoi.github.io',
    },
  },
];

// 템플릿 → 각 배포 대상 안의 출력 경로. (privacy는 <base>/mytv-privacy/ 로 서빙되도록 폴더 index)
export const pages = [
  { template: 'index.html', out: 'index.html' },
  { template: 'mytv-privacy.html', out: 'mytv-privacy/index.html' },
  { template: 'voicenotes-privacy.html', out: 'voicenotes-privacy/index.html' },
  { template: 'sudam-privacy.html', out: 'sudam-privacy/index.html' },
];

// 정적 에셋(실제 앱 아이콘 등) — 두 배포 대상에 그대로 복사한다.
export const assets = [
  { from: 'assets/icons/calendar.png', to: 'assets/icons/calendar.png' },
  { from: 'assets/icons/song.png', to: 'assets/icons/song.png' },
  { from: 'assets/icons/mytv.png', to: 'assets/icons/mytv.png' },
  { from: 'assets/icons/voicenotes.png', to: 'assets/icons/voicenotes.png' },
  { from: 'assets/icons/sudam.png', to: 'assets/icons/sudam.png' },
  { from: 'assets/icons/fretwise.png', to: 'assets/icons/fretwise.png' },
  { from: 'assets/icons/lottolab.png', to: 'assets/icons/lottolab.png' },
  { from: 'assets/icons/singon.png', to: 'assets/icons/singon.png' },
  { from: 'assets/icons/cardly.png', to: 'assets/icons/cardly.png' },
  { from: 'assets/icons/ttorang.png', to: 'assets/icons/ttorang.png' },
  { from: 'assets/icons/dailymap.png', to: 'assets/icons/dailymap.png' },
];
