# AP Vision Care Web — Brand Color Theme



Official palette only. All UI tokens resolve to these three colors (plus white for card surfaces via `color-mix`).



| Name | Hex | RGB |

|------|-----|-----|

| **Brand blue** | `#004990` | 0, 73, 144 |

| **Brand red** | `#e31b23` | 227, 27, 35 |

| **Brand gray** | `#6d6e71` | 109, 110, 113 |



---



## 1. Semantic mapping



| Role | Color | Tailwind examples |

|------|-------|-------------------|

| Navigation, links, success, info, charts (blue series) | Brand blue | `bg-primary`, `text-primary` |
| **Primary buttons** (Register, Next, Submit, Save) | Brand red | `bg-error` via `Button variant="primary"` |

| Errors, warnings, urgent, highlights (red series) | Brand red | `bg-error`, `text-error`, `bg-warning` |

| Body text, borders, muted labels, neutrals | Brand gray | `text-grey-600`, `border-grey-300` |



Soft backgrounds use `color-mix` with white (e.g. `bg-primary-container`, `bg-blue-soft`, `bg-red-soft`) — still derived from the three brand hex values only.



---



## 2. Chart & analytics palette



From `chartColors` in `app/lib/theme.ts`:



| Order | Hex | Brand |

|-------|-----|-------|

| 1 | `#004990` | blue |

| 2 | `#e31b23` | red |

| 3 | `#6d6e71` | gray |

| 4–6 | (repeat) | blue, red, gray |



---



## 3. EMR timeline colors



| Event type | Hex |

|------------|-----|

| Screening | `#004990` |

| Prescription | `#6d6e71` |

| Teleconsultation | `#6d6e71` |

| Referral | `#e31b23` |



---



## 4. Button variants



| Variant | Color |

|---------|-------|

| **primary** / **accent** | Brand red `#e31b23` (filled) |

| **danger** | Brand red outline (filled on hover) |

| **outline** / **ghost** | Blue border/text on white |

| Focus ring (primary) | `ring-error/30` |



---



## 5. Source files



| File | Role |

|------|------|

| `app/globals.css` | CSS variables and `@theme` for Tailwind v4 |

| `app/lib/theme.ts` | `brand`, `colors`, `chartColors`, `stat`, `emrTypeColors` |

| `app/components/ui.tsx` | Buttons, badges, alerts |



---



## 6. Guidelines



- Use Tailwind tokens: `bg-primary`, `text-error`, `text-grey-600`, etc.

- For inline styles: `import { colors, brand } from '@/app/lib/theme'`

- Do not add new hex values outside `#004990`, `#e31b23`, `#6d6e71` (white is allowed for surfaces only via `color-mix` or `bg-white`)



---



*Brand palette applied across AP Vision Care web.*

