import fs from 'fs';
import path from 'path';

const files = [
  'app/admin/reports/page.tsx',
  'app/patient/prescriptions/page.tsx',
  'app/patient/profile/page.tsx',
  'app/patient/referrals/page.tsx',
  'app/nodal/teams/page.tsx',
  'app/nodal/approvals/page.tsx',
  'app/vendor/order/[id]/page.tsx',
  'app/vendor/delivery/page.tsx',
  'app/tele/video/page.tsx',
  'app/screening/search/page.tsx',
  'app/screening/register/page.tsx',
  'app/screening/camps/page.tsx',
];

function migrate(content) {
  if (!content.includes('app-layout')) return content;

  if (!content.includes('AppShell')) {
    content = content.replace(
      /import Topbar from '@\/app\/components\/Topbar';\n/,
      "import Topbar from '@/app/components/Topbar';\nimport { AppShell } from '@/app/components/layout';\n",
    );
  }

  if (content.includes("from '@/app/components/ui'")) {
    content = content.replace(/import \{([^}]+)\} from '@\/app\/components\/ui';/, (m, imports) => {
      const parts = imports.split(',').map((s) => s.trim()).filter(Boolean);
      for (const ex of [
        'Button', 'Input', 'Select', 'Textarea', 'FormGroup', 'Card', 'CardBody', 'CardHeader', 'CardTitle',
        'StatsGrid', 'TableWrap', 'DataTable', 'ListItem', 'fadeDelay', 'Stepper',
      ]) {
        if (!parts.includes(ex)) parts.push(ex);
      }
      return `import { ${parts.join(', ')} } from '@/app/components/ui';`;
    });
  } else {
    content = content.replace(
      /import Topbar from '@\/app\/components\/Topbar';\n/,
      "import Topbar from '@/app/components/Topbar';\nimport { Button, Input, Select, Textarea, FormGroup, Card, CardBody, CardHeader, CardTitle, fadeDelay } from '@/app/components/ui';\n",
    );
  }

  content = content.replace(
    /<div className="app-layout">\s*\n\s*<Sidebar([^/]*)\/>\s*\n\s*<div className="main-content">\s*\n\s*<Topbar([^/]*)\/>\s*\n\s*<main className="page-body"([^>]*)>/,
    '<AppShell\n      sidebar={<Sidebar$1/>}\n      topbar={<Topbar$2/>}\n    >',
  );

  content = content.replace(/<\/main>\s*\n\s*<\/div>\s*\n\s*<\/div>/, '</AppShell>');

  const reps = [
    [/className="stats-grid stats-grid-4([^"]*)"/g, ''],
    [/className="stats-grid stats-grid-3([^"]*)"/g, ''],
    [/className="stats-grid([^"]*)"/g, ''],
    [/className="card mb-20"/g, 'className="mb-3"'],
    [/className="card mb-16"/g, 'className="mb-2.5"'],
    [/className="card mb-24"/g, 'className="mb-3.5"'],
    [/className="card mt-12"/g, 'className="mt-2"'],
    [/className="card mt-10"/g, 'className="mt-2.5"'],
    [/className={`card animate-fade-up d\$\{i \+ 1\}`}/g, 'className={`animate-fade-up ${fadeDelay(i + 1)}`}'],
    [/className={`card animate-fade-up d\$\{i\+1\}`}/g, 'className={`animate-fade-up ${fadeDelay(i + 1)}`}'],
    [/className="flex items-center gap-12"/g, 'className="flex items-center gap-2"'],
    [/className="flex gap-12 mt-24"/g, 'className="mt-3.5 flex gap-2"'],
    [/className="video-container"/g, 'className="relative max-h-[380px] aspect-video overflow-hidden rounded-xl bg-[#0a0a12]"'],
    [/className="video-placeholder"/g, 'className="flex h-full flex-col items-center justify-center gap-3 text-white/60"'],
    [/className="video-btn video-btn-grey"/g, 'className="flex size-10 items-center justify-center rounded-full text-lg transition-colors"'],
    [/className="video-btn video-btn-red"/g, 'className="flex size-10 items-center justify-center rounded-full bg-error text-lg transition-colors"'],
    [/className="badge badge-success"/g, 'className="inline-flex rounded-full bg-success/10 px-2.5 py-0.5 text-[11px] font-semibold text-success"'],
    [/className="badge badge-error"/g, 'className="inline-flex rounded-full bg-error/10 px-2.5 py-0.5 text-[11px] font-semibold text-error"'],
    [/className="badge badge-info"/g, 'className="inline-flex rounded-full bg-info/10 px-2.5 py-0.5 text-[11px] font-semibold text-info"'],
    [/className="badge badge-warning"/g, 'className="inline-flex rounded-full bg-warning/10 px-2.5 py-0.5 text-[11px] font-semibold text-warning"'],
    [/className="spinner"/g, 'className="size-8 animate-spin rounded-full border-2 border-grey-200 border-t-primary"'],
    [/mt-24/g, 'mt-3.5'],
    [/mb-24/g, 'mb-3.5'],
    [/mb-20/g, 'mb-3'],
    [/mb-16/g, 'mb-2.5'],
    [/mt-12/g, 'mt-2'],
    [/mt-20/g, 'mt-3'],
  ];
  for (const [re, rep] of reps) content = content.replace(re, rep);

  return content;
}

for (const f of files) {
  const p = path.join(process.cwd(), f);
  if (!fs.existsSync(p)) {
    console.log('skip', f);
    continue;
  }
  const c = fs.readFileSync(p, 'utf8');
  const out = migrate(c);
  if (out !== c) {
    fs.writeFileSync(p, out);
    console.log('migrated', f);
  } else console.log('unchanged', f);
}
