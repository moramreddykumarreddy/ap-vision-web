# AP Vision Care Web — Color Theme Report

Colors are defined in **`app/globals.css`** (Tailwind `@theme`) and **`app/lib/theme.ts`** (JavaScript / inline styles). They align with the Flutter app `AppColors` where noted.

---

## 1. Brand — Trust blue (AP Government + clinical)

| Token | Hex | Tailwind examples | Typical use |
|--------|-----|-------------------|-------------|
| **primary** | `#1A3A6B` | `bg-primary`, `text-primary`, `border-primary` | Headings, sidebar text accents, stat KPIs, links |
| **primary-dark** | `#0D2347` | `bg-primary-dark`, `from-primary-dark` | Navbar, sidebar, footer, page heroes, modal overlay |
| **primary-light** | `#2952A3` | `bg-primary-light`, `text-blue` | Gradients, charts, secondary brand emphasis |
| **primary-container** | `#E8F4FC` | `bg-primary-container`, `bg-blue-soft` | Soft highlights, login role chip, report info boxes |

**Aliases:** `navy` = primary, `navy-2` = primary-dark, `blue` = primary-light, `blue-soft` = primary-container

---

## 2. Wellness — Healing teal (accent / CTAs)

| Token | Hex | Tailwind examples | Typical use |
|--------|-----|-------------------|-------------|
| **accent** | `#00897B` | `bg-accent`, `text-accent` | Primary buttons, hero accent text, progress on charts |
| **accent-dark** | `#00695C` | `bg-accent-dark`, `text-accent-dark` | Button hover, school vision banner gradient end |
| **accent-light** | `#4DB6AC` | `bg-accent-light` | AI section icons, chart bars (lowest hotspot) |
| **accent-soft** | `#B2DFDB` | `bg-accent-soft` | Icon tile backgrounds, badges, appointment card tint |

**Aliases:** `teal` = accent, `teal-d` = accent-dark, `teal-soft` = accent-soft

---

## 3. Clinical & information blues

| Token | Hex | Tailwind examples | Typical use |
|--------|-----|-------------------|-------------|
| **clinical** | `#0277BD` | `bg-clinical`, `text-clinical` | Analytics series, AI dashboard, nutrition bars |
| **info** | `#01579B` | `bg-info`, `text-info` | Info badges, teleconsultation gradients |
| **info-light** | `#2196F3` | `bg-info-light` | Lighter info accents (available in theme) |

---

## 4. Status (medical semantics)

| Token | Hex | Tailwind examples | Typical use |
|--------|-----|-------------------|-------------|
| **success** | `#2E7D32` | `bg-success`, `text-success` | Completed, approved, delivered, high coverage |
| **success-light** | `#4CAF50` | — | Available in CSS (lighter green) |
| **warning** | `#E65100` | `bg-warning`, `text-warning` | Pending, scheduled, medium risk (badges only) |
| **warning-light** | `#FF9800` | `bg-warning-light` | District progress (below target) |
| **error** | `#C62828` | `bg-error`, `text-error` | Referrals, urgent, rejected, notification dot |
| **error-light** | `#F44336` | — | Scanner line, strong alert accents |

**Aliases:** `green` / `green-soft`, `amber` / `amber-soft`, `red` / `red-soft` map to success, warning, and error families.

---

## 5. Highlight gold (program / teleconsult)

| Token | Hex | Tailwind examples | Typical use |
|--------|-----|-------------------|-------------|
| **gold** | `#D4A017` | `text-gold`, stat cards | Prescriptions KPI, EMR teleconsult events |
| **gold-light** | `#FFD54F` | — | District coverage “good” bar threshold |

---

## 6. Neutrals & surfaces

| Token | Hex | Tailwind examples | Typical use |
|--------|-----|-------------------|-------------|
| **grey-50** | `#FAFAFA` | `bg-grey-50` | Light fills |
| **grey-100** | `#F5F5F5` | `bg-grey-100` | Secondary surfaces |
| **grey-200** | `#EEEEEE` | `bg-grey-200`, `border-grey-200` | Borders, dividers, progress track |
| **grey-300** | `#E0E0E0` | `border-grey-300` | Input borders |
| **grey-400** | `#BDBDBD` | `text-grey-400` | Placeholders, muted labels |
| **grey-500** | `#9E9E9E` | `text-grey-500` | Subtitles, empty states |
| **grey-600** | `#757575` | `text-grey-600` | Body secondary text |
| **grey-700** | `#616161` | — | Deeper muted text |
| **grey-800** | `#424242` | `text-grey-800` | Strong secondary text |
| **grey-900** | `#212121` | `text-grey-900` | Main body text |

| Token | Hex | Tailwind examples | Typical use |
|--------|-----|-------------------|-------------|
| **bg-app** | `#F0F7FA` | `bg-bg-app` | App & landing page background (clinical tint) |
| **surface** | `#FFFFFF` | `bg-white`, `bg-surface` | Cards, modals, topbar |
| **surface-clinical** | `#F5F7FA` | `bg-surface-clinical` | Table headers, soft panels |
| **surface-muted** | `#ECEFF1` | via `colors.surfaceMuted` in TS | Placeholder panels, scan areas |
| **line** / **line-2** | `#EEEEEE` / `#F5F5F5` | `border-line` | Dividers |
| **muted** / **muted-2** | `#757575` / `#BDBDBD` | `text-muted` | Muted copy |
| **ink** | `#212121` | `text-ink` | Same as grey-900 |

---

## 7. Chart & analytics palette

From `chartColors` in `app/lib/theme.ts` (blues and teals only):

| Order | Hex | Name |
|-------|-----|------|
| 1 | `#1A3A6B` | primary |
| 2 | `#00897B` | accent |
| 3 | `#0277BD` | clinical |
| 4 | `#2952A3` | primary-light |
| 5 | `#01579B` | info |
| 6 | `#00695C` | accent-dark |

---

## 8. EMR timeline colors

| Event type | Hex | Color name |
|------------|-----|------------|
| Screening | `#1A3A6B` | primary |
| Prescription | `#00897B` | accent |
| Teleconsultation | `#D4A017` | gold |
| Referral | `#C62828` | error |

---

## 9. Button variants

Defined in `app/components/ui.tsx`. Main CTA uses **accent (teal)**.

| Variant | Typical use |
|---------|-------------|
| **primary** / **accent** | Submit, Register, Save, Join (teal `#00897B`) |
| **outline** | Secondary on light backgrounds (Staff Login, Cancel) |
| **ghost** | Text-style actions (“View all →”) |
| **danger** | Reject, Delete |
| **inverse** | White button on gradient banners |
| **onDark** | Light button on navy/colored banners |
| **outlineOnDark** | Login on navy navbar |

Focus ring: `ring-accent/30` (teal).

---

## 10. UI patterns (how colors combine)

| UI element | Colors used |
|------------|-------------|
| Landing navbar | `primary-dark` background, white text, **accent** CTA |
| Landing footer | `primary-dark` background, **accent** link hover |
| Sidebar | `primary-dark` background, white nav, **error** badge |
| Topbar | White surface, **primary** title, **error** notification dot |
| Primary button | **accent** → **accent-dark** hover |
| Page heroes | Gradient `primary-dark` → `primary` |
| Stat cards | Icon tint from `stat` / `colors.*` |
| Status badges | success / warning / error / info at ~10% opacity |

---

## 11. Source files

| File | Role |
|------|------|
| `app/globals.css` | All CSS variables and `@theme` for Tailwind v4 |
| `app/lib/theme.ts` | `colors`, `chartColors`, `stat`, `emrTypeColors`, layout helpers |
| `app/components/ui.tsx` | Buttons, badges, alerts wired to theme tokens |

---

## 12. Design intent

- **Navy (`primary`)** — government trust, structure, navigation
- **Teal (`accent`)** — health, wellness, main actions
- **Clinical blue** — data, analytics, secondary metrics
- **Green / orange / red** — status only (not large page backgrounds)
- **Cool grey + `#F0F7FA` app bg** — clean hospital-style UI

### Guidelines for new work

- Prefer Tailwind tokens: `bg-primary`, `text-accent`, `bg-bg-app`, etc.
- For inline styles: `import { colors } from '@/app/lib/theme'`
- Avoid new one-off hex values outside this palette

---

*Last updated from theme as of AP Vision Care web prototype.*
