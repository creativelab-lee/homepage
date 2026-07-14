// 홈페이지 단일 소스 → dual-domain 생성기.
// templates/*.html 의 {{TOKEN}} 을 각 배포 대상 값으로 치환해 out 경로에 쓴다.
// 미치환 토큰이 남으면 즉시 실패한다(파리티 가드). 외부 의존성 없음(node 내장).
//
//   node build.mjs          # 두 도메인 저장소에 생성
//   node --test             # 렌더 로직 파리티 검증

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));

/** 템플릿 문자열의 {{KEY}} 를 vars[KEY] 로 치환. 남은 토큰이 있으면 throw. */
export function render(template, vars) {
  const out = template.replace(/\{\{(\w+)\}\}/g, (m, key) => {
    if (!(key in vars)) throw new Error(`알 수 없는 토큰: {{${key}}}`);
    return vars[key];
  });
  const leftover = out.match(/\{\{\w+\}\}/);
  if (leftover) throw new Error(`미치환 토큰 남음: ${leftover[0]}`);
  return out;
}

export function buildTarget(target, pages, { templatesDir, baseDir }) {
  const written = [];
  for (const page of pages) {
    const tpl = readFileSync(join(templatesDir, page.template), 'utf8');
    const html = render(tpl, target.vars);
    const outPath = resolve(baseDir, target.outDir, page.out);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
    written.push(outPath);
  }
  return written;
}

// node build.mjs 로 직접 실행할 때만 파일을 쓴다(테스트 import 시엔 실행 안 함).
if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  const { targets, pages } = await import('./site.config.mjs');
  const opts = { templatesDir: join(HERE, 'templates'), baseDir: HERE };
  for (const t of targets) {
    const written = buildTarget(t, pages, opts);
    console.log(`[${t.key}] ${written.length}개 생성:`);
    for (const w of written) console.log(`  → ${w}`);
  }
  console.log('완료.');
}
