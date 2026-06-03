'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LandingNav from '@/app/components/landing/LandingNav';
import { scrollToSection } from '@/app/lib/scroll';

const HERO_STATS = [
  { value: '26', label: 'Districts Covered' },
  { value: '21d', label: 'Spectacle Delivery' },
  { value: '100%', label: 'EMR Digital Records' },
];

const CHALLENGE_CARDS = [
  {
    num: '01',
    title: 'Access Gap',
    desc: 'Rural and tribal communities remain far from specialist eye care — screening must come to them, not the other way around.',
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="currentColor" opacity="0.3" />
        <path d="M4 4l16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Affordability',
    desc: 'Quality spectacles remain out of reach for low-income families — subsidised supply chains are essential to close the gap.',
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Late Detection',
    desc: 'Preventable blindness escalates when refractive errors and cataracts are identified too late — early screening saves sight.',
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M3 17l6-6 4 4 8-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 5h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const VISION_POINTS = [
  {
    title: 'Programme Goal',
    desc: 'Conduct widespread screening and distribute affordable eyeglasses, ensuring no one is left behind.',
    icon: '🎯',
  },
  {
    title: 'Our Approach',
    desc: 'A fully technology-driven, data-centric model — efficient, transparent, and accountable end to end.',
    icon: '⚡',
  },
  {
    title: 'Coverage',
    desc: 'All 26 districts. A scalable, replicable delivery model rooted in public health principles.',
    icon: '🗺️',
  },
];

const SCREENING_STEPS = [
  {
    num: '01',
    badge: 'Rural Reach',
    title: 'In-Field Vision Testing',
    desc: 'Paramedics conduct standardised acuity and basic eye exams at camp sites using portable kits.',
  },
  {
    num: '02',
    badge: 'Digital Capture',
    title: 'Digital Refraction',
    desc: 'Prescriptions are captured digitally with quality checks before spectacles are ordered.',
  },
  {
    num: '03',
    badge: 'PMOA Sync',
    title: 'PMOA Entry',
    desc: 'Patient records flow into the Programme Management & Outreach Application in real time.',
  },
  {
    num: '04',
    badge: 'Clinical Review',
    title: 'Specialist Review',
    desc: 'Tele-ophthalmologists review flagged cases and issue referrals for advanced care.',
  },
];

const PIPELINE_STEPS = ['Patient', 'Screening', 'PMOA Entry', 'EMR System'];

const DATA_FEATURES = [
  { title: '21 Days', desc: 'Average spectacle delivery SLA tracked district-wise.' },
  { title: 'SMS Alerts', desc: 'Beneficiaries notified at prescription, dispatch, and delivery.' },
  { title: '100% Digital', desc: 'Paperless records aligned with government EMR standards.' },
];

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-outreach-orange">{children}</p>
  );
}

function PillTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-outreach-orange/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-outreach-orange">
      {children}
    </span>
  );
}

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-outreach-cream font-landing text-outreach-ink">
      <LandingNav />

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[calc(100dvh-72px)] flex-col justify-between overflow-hidden">
        <Image
          src="/hero-screening.jpg"
          alt="Healthcare worker screening a patient"
          fill
          priority
          className="object-cover object-[center_30%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-outreach-teal-dark/93 via-outreach-teal/80 to-outreach-teal/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-outreach-teal-dark/70 via-outreach-teal-dark/10 to-transparent" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-20 lg:px-10">
          <div className="max-w-2xl animate-fade-up">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/95">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
              All 26 Districts • Andhra Pradesh
            </div>

            <h1 className="font-serif text-[clamp(2.75rem,6vw,4.5rem)] font-normal leading-[1.1] text-white">
              Illuminating lives,
              <br />
              <span className="italic text-outreach-orange">district by district.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/88">
              A technology-driven, data-centric initiative bringing quality eye care and affordable spectacles to
              every citizen — leaving no one behind.
            </p>

            <button
              type="button"
              onClick={() => scrollToSection('#challenge')}
              className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-outreach-orange px-8 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-outreach-orange/35 transition-all hover:bg-outreach-orange-muted"
            >
              Explore the program
              <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/20 bg-black/20 backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0 px-6 lg:px-10">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="px-6 py-9 sm:py-10 lg:px-12">
                <div className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-medium leading-none text-white">
                  {stat.value}
                </div>
                <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 01 Challenge ─────────────────────────────────────── */}
      <section
        id="challenge"
        className="bg-outreach-cream px-6 py-24 lg:px-10 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTag>01 — The Challenge</SectionTag>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.15] text-outreach-ink">
              The unseen challenge facing millions.
            </h2>
            <p className="mt-6 text-base leading-[1.85] text-outreach-slate">
              Across Andhra Pradesh, uncorrected vision impairment limits education, livelihoods, and independence —
              especially among children, elders, and rural communities. The Outreach Program exists to close that gap
              with systematic screening, subsidised spectacles, and digital records at population scale.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {CHALLENGE_CARDS.map((card) => (
              <article
                key={card.num}
                className="flex gap-5 rounded-2xl border border-grey-200/80 bg-white p-6 shadow-[0_4px_24px_rgba(15,45,51,0.06)] transition-shadow hover:shadow-md"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-outreach-orange/10 text-outreach-orange">
                  {card.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 text-[10px] font-bold text-outreach-orange/80">{card.num}</div>
                  <h3 className="font-serif text-xl font-semibold text-outreach-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-outreach-slate">{card.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 02 Our Vision ──────────────────────────────────────── */}
      <section
        id="program"
        className="bg-outreach-cream px-6 py-24 lg:px-10 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-outreach-orange/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/vision-child.jpg"
                alt="Child wearing glasses reading"
                width={600}
                height={720}
                className="aspect-[5/6] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 right-4 max-w-[220px] rounded-2xl border border-grey-100 bg-white p-5 shadow-lg sm:right-8">
              <p className="font-serif text-lg font-semibold italic text-outreach-teal">&ldquo;From blurry to bright.&rdquo;</p>
              <p className="mt-1 text-xs text-outreach-slate">Transforming lives, one pair at a time.</p>
            </div>
          </div>

          <div>
            <SectionTag>02 — Our Vision</SectionTag>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.15] text-outreach-ink">
              A comprehensive outreach,{' '}
              <span className="italic text-outreach-orange">end to end.</span>
            </h2>
            <p className="mt-5 text-base leading-[1.85] text-outreach-slate">
              Widespread vision screening and high-quality, affordable eyeglasses for every citizen in need — across
              every district of Andhra Pradesh.
            </p>
            <ul className="mt-10 space-y-8">
              {VISION_POINTS.map((point) => (
                <li key={point.title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-outreach-orange/12 text-lg">
                    {point.icon}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-outreach-ink">{point.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-outreach-slate">{point.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── 03 Screening ─────────────────────────────────────── */}
      <section
        id="screening"
        className="bg-outreach-cream px-6 py-24 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <PillTag># 03 — Screening &amp; Diagnosis</PillTag>
            <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.15] text-outreach-ink">
              Precision at <span className="italic text-outreach-orange">every level.</span>
            </h2>
            <p className="mt-5 text-base leading-[1.85] text-outreach-slate">
              From the first acuity test in a village camp to specialist sign-off — every step is standardised,
              digitised, and auditable for government oversight.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {SCREENING_STEPS.map((step, i) => (
              <div key={step.num} className="relative">
                {i < SCREENING_STEPS.length - 1 && (
                  <span className="absolute -right-3 top-10 z-10 hidden size-2 rounded-full bg-outreach-orange xl:block" />
                )}
                <article className="relative flex h-full flex-col rounded-2xl border border-grey-200/80 bg-white p-6 shadow-sm">
                  <span className="absolute right-5 top-5 font-serif text-4xl font-light text-grey-200">
                    {step.num}
                  </span>
                  <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-outreach-orange/10 text-outreach-orange">
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <PillTag>{step.badge}</PillTag>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-outreach-ink">{step.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-outreach-slate">{step.desc}</p>
                </article>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => router.push('/screening/dashboard')}
              className="inline-flex items-center gap-2 rounded-full border border-outreach-teal px-8 py-3 text-sm font-semibold text-outreach-teal transition-colors hover:bg-outreach-teal/5"
            >
              Open screening portal
              <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ─── 04 Data Integration ──────────────────────────────── */}
      <section id="data" className="bg-outreach-cream px-6 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <PillTag># 04 — Data Integration</PillTag>
            <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.15] text-outreach-ink">
              The digital <span className="italic text-outreach-orange">backbone.</span>
            </h2>
            <p className="mt-5 text-base leading-[1.85] text-outreach-slate">
              Every screening event, prescription, and delivery milestone feeds a secure government pipeline — enabling
              real-time dashboards, audit trails, and district-level accountability.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'eHR Standards-2016 compliant records',
                'End-to-end encrypted data pipeline',
                'Government audit-ready reports',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-outreach-slate">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-outreach-orange/15 text-outreach-orange">
                    <svg className="size-3" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => router.push('/role-selection')}
                className="rounded-full bg-outreach-orange px-8 py-3 text-sm font-semibold text-white hover:bg-outreach-orange-muted"
              >
                Get started
              </button>
              <button
                type="button"
                onClick={() => router.push('/login')}
                className="rounded-full border border-outreach-teal px-8 py-3 text-sm font-semibold text-outreach-teal hover:bg-outreach-teal/5"
              >
                Portal login
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-grey-200/80 bg-white p-6 shadow-sm lg:p-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-outreach-slate">Real-time data pipeline</p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                {PIPELINE_STEPS.map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="rounded-lg bg-outreach-teal/10 px-3 py-2 text-xs font-semibold text-outreach-teal">
                      {step}
                    </span>
                    {i < PIPELINE_STEPS.length - 1 && (
                      <svg className="size-4 text-outreach-orange" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <div className="h-1.5 overflow-hidden rounded-full bg-grey-200">
                  <div className="flex h-full w-full">
                    <div className="w-1/2 bg-outreach-teal" />
                    <div className="w-1/2 bg-outreach-orange" />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-outreach-slate">
                  <span>Live sync active</span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 animate-pulse-soft rounded-full bg-outreach-orange" />
                    Connected
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {DATA_FEATURES.map((feat) => (
                <article
                  key={feat.title}
                  className="rounded-2xl border border-grey-200/80 bg-white p-5 text-center shadow-sm"
                >
                  <div className="mx-auto mb-3 flex size-9 items-center justify-center rounded-lg bg-outreach-orange/10 text-outreach-orange">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-wide text-outreach-orange">{feat.title}</h4>
                  <p className="mt-2 text-[11px] leading-relaxed text-outreach-slate">{feat.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────── */}
      <footer className="bg-outreach-teal-footer px-6 py-14 text-white lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src="/apvision.png" alt="" className="size-10 rounded-full bg-white object-contain p-0.5" />
              <div>
                <div className="font-serif text-sm font-semibold">Andhra Pradesh Vision</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">Outreach Program</div>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Illuminating lives across every district through screening, affordable spectacles, and digital health
              records.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Operated by</h4>
            <p className="mt-3 font-serif text-lg font-semibold">Akriti Ophthalmic Pvt Ltd</p>
            <p className="mt-2 text-sm text-white/65">Andhra Pradesh, India</p>
            <p className="mt-1 text-sm text-white/50">In partnership with Government of Andhra Pradesh</p>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Future vision</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              <li>Technology-enabled delivery</li>
              <li>Transparent supply chain</li>
              <li>Scalable public health model</li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-white/15 pt-8 text-center text-xs text-white/45">
          © {new Date().getFullYear()} Government of Andhra Pradesh. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
