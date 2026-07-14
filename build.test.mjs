// 렌더 파리티 테스트 — node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render } from './build.mjs';
import { targets, pages } from './site.config.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const tpl = (name) => readFileSync(join(HERE, 'templates', name), 'utf8');

test('render는 모든 토큰을 치환한다', () => {
  const html = render('a {{EMAIL}} b {{PRIVACY_BASE}} c', {
    EMAIL: 'x@y.z', PRIVACY_BASE: 'https://h',
  });
  assert.equal(html, 'a x@y.z b https://h c');
});

test('알 수 없는 토큰은 실패한다', () => {
  assert.throws(() => render('{{NOPE}}', { EMAIL: 'a' }), /알 수 없는 토큰/);
});

test('모든 템플릿이 각 타깃에서 미치환 토큰 없이 렌더된다', () => {
  for (const p of pages) {
    for (const t of targets) {
      const html = render(tpl(p.template), t.vars);
      assert.doesNotMatch(html, /\{\{\w+\}\}/, `${p.template} @ ${t.key}`);
    }
  }
});

test('두 도메인 출력은 이메일/privacy 도메인만 다르다', () => {
  const [lee, choi] = targets;
  for (const p of pages) {
    const a = render(tpl(p.template), lee.vars).split('\n');
    const b = render(tpl(p.template), choi.vars).split('\n');
    assert.equal(a.length, b.length, `${p.template} 줄 수 동일`);
    a.forEach((line, i) => {
      if (line === b[i]) return;
      // 다른 줄은 반드시 이메일 또는 privacy 도메인 차이여야 한다.
      const isEmail = line.includes(lee.vars.EMAIL) && b[i].includes(choi.vars.EMAIL);
      const isBase = line.includes(lee.vars.PRIVACY_BASE) && b[i].includes(choi.vars.PRIVACY_BASE);
      assert.ok(isEmail || isBase, `예상치 못한 차이 (${p.template}:${i + 1}):\n  lee : ${line}\n  choi: ${b[i]}`);
    });
  }
});

test('myTV privacy 템플릿은 핵심 문구를 포함한다', () => {
  const html = tpl('mytv-privacy.html');
  assert.match(html, /개인정보도 수집하지 않습니다/);
  assert.match(html, /does not collect any personal data/);
  assert.match(html, /DRM/);
});

test('랜딩 템플릿은 myTV 카드와 privacy 링크를 포함한다', () => {
  const html = render(tpl('index.html'), targets[0].vars);
  assert.match(html, /<h3>myTV<\/h3>/);
  assert.match(html, /https:\/\/creativelab-lee\.github\.io\/mytv-privacy\//);
});
