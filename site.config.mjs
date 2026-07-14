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
];
