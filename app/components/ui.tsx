'use client';

/* ── StatCard ──────────────────────────────────────── */
interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  color: string;
  subtitle?: string;
  onClick?: () => void;
  delay?: number;
}

export function StatCard({ title, value, icon, color, subtitle, onClick, delay = 0 }: StatCardProps) {
  return (
    <div
      className="stat-card animate-fade-up"
      style={{ animationDelay: `${delay}s`, cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <div className="stat-card-icon" style={{ background: color + '18', color }}>
        {icon}
      </div>
      <h4>{title}</h4>
      <div className="value" style={{ color }}>{value}</div>
      {subtitle && <div className="subtitle">{subtitle}</div>}
    </div>
  );
}

/* ── SectionHeader ─────────────────────────────────── */
interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, actionLabel, onAction }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <h3>{title}</h3>
      {actionLabel && (
        <button className="view-all-btn" onClick={onAction}>{actionLabel} →</button>
      )}
    </div>
  );
}

/* ── Badge ─────────────────────────────────────────── */
interface BadgeProps {
  label: string;
  type?: 'success' | 'warning' | 'error' | 'info' | 'grey';
}

const statusMap: Record<string, BadgeProps['type']> = {
  active: 'success', completed: 'success', delivered: 'success', approved: 'success',
  pending: 'warning', scheduled: 'warning', 'in progress': 'warning',
  cancelled: 'error', rejected: 'error', urgent: 'error',
  default: 'grey',
};

export function StatusBadge({ label }: { label: string }) {
  const type = statusMap[label.toLowerCase()] ?? 'grey';
  return <span className={`badge badge-${type}`}>{label}</span>;
}

/* ── BannerCard ────────────────────────────────────── */
interface KPI { value: string; label: string; }
interface BannerCardProps {
  title: string;
  subtitle?: string;
  kpis?: KPI[];
  gradient?: string;
  badge?: string;
  onBadgeClick?: () => void;
  extra?: React.ReactNode;
}

export function BannerCard({ title, subtitle, kpis, gradient, badge, onBadgeClick, extra }: BannerCardProps) {
  return (
    <div className="banner-card animate-fade-up" style={gradient ? { background: gradient } : {}}>
      <div className="flex items-center justify-between">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {badge && (
          <span
            className="badge"
            style={{ background: 'rgba(255,255,255,.2)', color: 'white', cursor: 'pointer', fontSize: 12, padding: '5px 14px' }}
            onClick={onBadgeClick}
          >
            {badge}
          </span>
        )}
      </div>
      {kpis && (
        <div className="banner-kpis mt-16">
          {kpis.map((k, i) => (
            <div key={i} className="banner-kpi">
              <div className="banner-kpi-value">{k.value}</div>
              <div className="banner-kpi-label">{k.label}</div>
            </div>
          ))}
        </div>
      )}
      {extra}
    </div>
  );
}

/* ── ListItem ──────────────────────────────────────── */
interface ListItemProps {
  avatar: string;
  avatarBg?: string;
  avatarColor?: string;
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode;
  delay?: number;
}

export function ListItem({ avatar, avatarBg, avatarColor, title, subtitle, trailing, delay = 0 }: ListItemProps) {
  return (
    <div className="list-item animate-fade-up" style={{ animationDelay: `${delay}s` }}>
      <div className="list-avatar" style={{ background: avatarBg ?? '#E3F2FD', color: avatarColor ?? '#1A3A6B' }}>
        {avatar}
      </div>
      <div className="list-item-body">
        <h4>{title}</h4>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {trailing && <div>{trailing}</div>}
    </div>
  );
}

/* ── AlertBanner ───────────────────────────────────── */
interface AlertProps {
  icon: string;
  title: string;
  message: string;
  type: 'warning' | 'success' | 'info';
  action?: { label: string; onClick: () => void };
}

export function AlertBanner({ icon, title, message, type, action }: AlertProps) {
  return (
    <div className={`alert-banner alert-${type}`}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 13 }}>{title}</div>
        <div style={{ fontSize: 12, opacity: 0.8 }}>{message}</div>
      </div>
      {action && (
        <button className="btn btn-sm btn-outline" onClick={action.onClick}>{action.label}</button>
      )}
    </div>
  );
}

/* ── ProgressBar ───────────────────────────────────── */
export function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

/* ── Quick Action Btn ──────────────────────────────── */
interface QuickActionProps {
  icon: string;
  label: string;
  color: string;
  onClick?: () => void;
}
export function QuickActionBtn({ icon, label, color, onClick }: QuickActionProps) {
  return (
    <button
      className="quick-action-btn"
      onClick={onClick}
      style={{ background: color + '10', borderColor: color + '25' }}
    >
      <span className="quick-action-icon">{icon}</span>
      <span className="quick-action-label" style={{ color }}>{label}</span>
    </button>
  );
}

/* ── Card ──────────────────────────────────────────── */
export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div className="card" style={style}>{children}</div>;
}

/* ── FormGroup ─────────────────────────────────────── */
interface FormGroupProps {
  label: string;
  children: React.ReactNode;
}
export function FormGroup({ label, children }: FormGroupProps) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {children}
    </div>
  );
}

/* ── Rank Badge ────────────────────────────────────── */
export function RankBadge({ rank }: { rank: number }) {
  const bg = rank === 1 ? '#D4A017' : rank === 2 ? '#9E9E9E' : rank === 3 ? '#CD7F32' : '#EEEEEE';
  const color = rank <= 3 ? 'white' : '#666';
  return (
    <div style={{
      width: 32, height: 32, borderRadius: '50%',
      background: bg, color, display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontWeight: 900, fontSize: 14,
    }}>
      {rank}
    </div>
  );
}
