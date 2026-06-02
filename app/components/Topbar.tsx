'use client';
interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="topbar-title">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="topbar-spacer" />
      <div className="topbar-actions">
        <div className="topbar-icon-btn" title="Notifications">
          🔔
          <div className="notif-dot" />
        </div>
        <div className="topbar-icon-btn" title="Search">🔍</div>
        <div className="topbar-user">
          <span>👤</span>
          <span>Profile</span>
        </div>
      </div>
    </header>
  );
}
