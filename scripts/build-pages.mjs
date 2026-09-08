import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'docs');
const base = 'https://sharproduction.github.io/rights-labelled-conformance-corpus';
const copy = (from, to) => fs.cpSync(path.join(root, from), path.join(out, to), { recursive: true, force: true });

copy('web/ru', 'ru');
copy('src', 'src');
copy('data', 'data');
fs.writeFileSync(path.join(out, 'app.mjs'), fs.readFileSync(path.join(root, 'web/app.mjs'), 'utf8').replace("'../src/index.mjs'", "'./src/index.mjs'").replace("'../data/corpus.json'", "'./data/corpus.json'"));
for (const [from, to] of [['web/index.html', 'index.html'], ['web/ru/index.html', 'ru/index.html']]) {
  const html = fs.readFileSync(path.join(root, from), 'utf8')
    .replace('noindex,nofollow', 'index,follow')
    .replace('<title>', `<link rel="canonical" href="${to === 'index.html' ? `${base}/` : `${base}/ru/`}"><title>`)
    .replaceAll('../../shared/styles.css', 'assets/styles.css')
    .replaceAll('../../../shared/styles.css', '../assets/styles.css');
  fs.writeFileSync(path.join(out, to), html);
}
fs.mkdirSync(path.join(out, 'assets'), { recursive: true });
fs.writeFileSync(path.join(out, 'assets/styles.css'), 'body{margin:0;background:#101820;color:#f4f7f8;font:16px system-ui,sans-serif}main{max-width:760px;margin:auto;padding:32px 20px}.brand{color:#87d6c6;font-weight:700}label,input,select,button{margin:6px}input,select,button{padding:8px}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#17232c;padding:16px}.lang,.cta{color:#87d6c6}');
fs.writeFileSync(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
fs.writeFileSync(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${base}/</loc></url><url><loc>${base}/ru/</loc></url></urlset>\n`);
console.log('built Pages explorer');
