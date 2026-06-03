import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

const files = globSync('app/**/page.tsx', { cwd: process.cwd(), ignore: ['app/page.tsx'] });

function fix(content, file) {
  let c = content;

  if (!c.includes('AppShell') && c.includes('app-layout')) return c;

  if (!c.includes("from '@/app/components/layout'") && c.includes('AppShell')) {
    // already has AppShell
  }

  const btnMap = [
    [/<button className="btn btn-primary btn-full btn-lg"([^>]*)>/g, '<Button variant="primary" size="lg" full$1>'],
    [/<button className="btn btn-primary btn-full"([^>]*)>/g, '<Button variant="primary" full$1>'],
    [/<button className="btn btn-primary btn-sm"([^>]*)>/g, '<Button variant="primary" size="sm"$1>'],
    [/<button className="btn btn-primary"([^>]*)>/g, '<Button variant="primary"$1>'],
    [/<button className="btn btn-accent btn-full"([^>]*)>/g, '<Button variant="accent" full$1>'],
    [/<button className="btn btn-accent btn-sm"([^>]*)>/g, '<Button variant="accent" size="sm"$1>'],
    [/<button className="btn btn-outline btn-sm"([^>]*)>/g, '<Button variant="outline" size="sm"$1>'],
    [/<button className="btn btn-outline"([^>]*)>/g, '<Button variant="outline"$1>'],
    [/<button className="btn btn-ghost btn-sm"([^>]*)>/g, '<Button variant="ghost" size="sm"$1>'],
    [/<button className="btn btn-ghost"([^>]*)>/g, '<Button variant="ghost"$1>'],
    [/<button className="btn btn-sm"([^>]*)>/g, '<Button size="sm"$1>'],
    [/<button className="btn btn-full"([^>]*)>/g, '<Button full$1>'],
    [/<button([^>]*?)className="btn btn-sm"([^>]*)>/g, '<Button size="sm"$1$2>'],
    [/<button key=\{([^}]+)\} onClick=\{([^}]+)\} className="btn btn-sm"([^>]*)>/g, '<Button key={$1} size="sm" onClick={$2}$3>'],
  ];

  for (const [re, rep] of btnMap) c = c.replace(re, rep);
  c = c.replace(/<\/button>/g, '</Button>');

  // Fix mistaken Button on non-buttons - revert input buttons? inputs don't use button tag for submit in these files

  c = c.replace(/className="form-input form-select"/g, 'className=""');
  c = c.replace(/<input([^>]*?)className="form-input"([^>]*?)\/>/g, '<Input$1$2 />');
  c = c.replace(/<input([^>]*?)className="form-input"([^>]*)>/g, '<Input$1$2>');
  c = c.replace(/<select([^>]*?)className="form-input form-select"([^>]*)>/g, '<Select$1$2>');
  c = c.replace(/<select([^>]*?)className=""([^>]*)>/g, '<Select$1$2>');
  c = c.replace(/<textarea([^>]*?)className="form-input"([^>]*)>/g, '<Textarea$1$2>');

  return c;
}

for (const f of files) {
  const p = path.join(process.cwd(), f);
  const before = fs.readFileSync(p, 'utf8');
  const after = fix(before, f);
  if (after !== before) {
    fs.writeFileSync(p, after);
    console.log('fixed', f);
  }
}
