# creativelab-everyone 홈페이지 (단일 소스)

랜딩 페이지와 각 앱의 개인정보처리방침을 **한 곳에서 관리**하고, 두 도메인용 사본을
자동 생성한다. 예전처럼 두 저장소를 손으로 나란히 고치지 않는다.

## 구조

```
templates/
  index.html         랜딩 페이지 (제품 카드 · 아이디어 월)
  mytv-privacy.html  myTV 개인정보처리방침 (한/영)
site.config.mjs      배포 대상(도메인)별 이메일·privacy 도메인 값
build.mjs            {{TOKEN}} 치환 생성기 (외부 의존성 없음)
build.test.mjs       파리티 테스트 (node --test)
```

## 생성 · 배포

```bash
node build.mjs     # 두 github.io 저장소에 index.html / mytv-privacy/ 생성
node --test        # 렌더 파리티 검증
```

생성 대상(사이드바이드 저장소):

| 도메인 | 저장소 | 이메일 |
|---|---|---|
| creativelab-lee.github.io | `../creativelab-lee.github.io` | creativelab.lee@gmail.com |
| inphilchoi.github.io | `../inphilchoi.github.io` | creativelab.choi@gmail.com |

`build.mjs` 실행 후 각 github.io 저장소에서 커밋·푸시하면 GitHub Pages에 반영된다.
개인정보처리방침 URL: `https://<도메인>/mytv-privacy/`

## dual-domain 규칙

두 도메인은 **이메일과 privacy 도메인만** 다르다. 그 외 내용이 갈라지면 안 되며,
`build.test.mjs`의 "두 도메인 출력은 이메일/privacy 도메인만 다르다" 테스트가 이를 강제한다.
새 앱을 추가할 때는 `templates/`에 페이지를 넣고 `site.config.mjs`의 `pages`에 등록한다.
