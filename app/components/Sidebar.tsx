'use client';
import { usePathname, useRouter } from 'next/navigation';

interface NavItem {
  icon: string;
  label: string;
  href: string;
  badge?: number;
}

interface SidebarProps {
  role: 'admin' | 'screening' | 'nodal' | 'tele' | 'vendor' | 'patient';
  userName: string;
  userSub: string;
}

const navConfig: Record<string, NavItem[]> = {
  admin: [
    { icon: '📊', label: 'Dashboard', href: '/admin/dashboard' },
    { icon: '🗺️', label: 'State Analytics', href: '/admin/analytics/state' },
    { icon: '📍', label: 'District View', href: '/admin/analytics/district' },
    { icon: '🤖', label: 'AI Risk Analytics', href: '/admin/analytics/ai' },
    { icon: '🥗', label: 'Nutrition Risk', href: '/admin/analytics/nutrition' },
    { icon: '🏫', label: 'School Vision', href: '/admin/analytics/school' },
    { icon: '👴', label: 'Elderly Care', href: '/admin/analytics/elderly' },
    { icon: '⚖️', label: 'Decision Support', href: '/admin/analytics/decision' },
    { icon: '📋', label: 'EMR Timeline', href: '/admin/emr' },
    { icon: '📁', label: 'Documents', href: '/admin/documents' },
    { icon: '🏥', label: 'Referrals', href: '/admin/referrals' },
    { icon: '📄', label: 'Reports', href: '/admin/reports' },
  ],
  screening: [
    { icon: '🏠', label: 'Dashboard', href: '/screening/dashboard' },
    { icon: '⛺', label: 'Camp Management', href: '/screening/camps' },
    { icon: '🔍', label: 'Patient Search', href: '/screening/search' },
    { icon: '👤', label: 'Register Patient', href: '/screening/register' },
  ],
  nodal: [
    { icon: '🏠', label: 'Dashboard', href: '/nodal/dashboard' },
    { icon: '👥', label: 'Team Management', href: '/nodal/teams' },
    { icon: '✅', label: 'Approvals', href: '/nodal/approvals', badge: 3 },
    { icon: '🛒', label: 'Vendor Monitor', href: '/nodal/vendors' },
  ],
  tele: [
    { icon: '🏠', label: 'Dashboard', href: '/tele/dashboard' },
    { icon: '📅', label: 'Consultation List', href: '/tele/consultations' },
    { icon: '📹', label: 'Video Consultation', href: '/tele/video' },
  ],
  vendor: [
    { icon: '🏠', label: 'Dashboard', href: '/vendor/dashboard' },
    { icon: '📦', label: 'Order Details', href: '/vendor/order/ORD-001' },
    { icon: '✅', label: 'Delivery Verify', href: '/vendor/delivery' },
  ],
  patient: [
    { icon: '🏠', label: 'Dashboard', href: '/patient/dashboard' },
    { icon: '👤', label: 'My Profile', href: '/patient/profile' },
    { icon: '💊', label: 'Prescriptions', href: '/patient/prescriptions' },
    { icon: '👓', label: 'Spectacles', href: '/patient/spectacles' },
    { icon: '🏥', label: 'Referrals', href: '/patient/referrals' },
    { icon: '📹', label: 'Teleconsultation', href: '/patient/teleconsultation' },
  ],
};

const roleLabels: Record<string, string> = {
  admin: 'Super Admin',
  screening: 'Screening Team',
  nodal: 'Nodal Officer',
  tele: 'Tele-Ophthalmologist',
  vendor: 'Vendor',
  patient: 'Patient',
};

export default function Sidebar({ role, userName, userSub }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const nav = navConfig[role] ?? [];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <img
          src="/apvision.png"
          alt="AP Vision Care"
          style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'contain', background: 'white', padding: 2, flexShrink: 0 }}
        />
        <div className="sidebar-logo-text">
          <h2>AP Vision Care</h2>
          <p>Govt. of Andhra Pradesh</p>
        </div>
      </div>

      {/* Role label */}
      <div className="sidebar-section-label">{roleLabels[role]}</div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {nav.map((item) => (
          <div
            key={item.href}
            className={`sidebar-item${pathname === item.href || pathname.startsWith(item.href + '/') ? ' active' : ''}`}
            onClick={() => router.push(item.href)}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.badge ? <span className="badge">{item.badge}</span> : null}
          </div>
        ))}
      </nav>

      {/* Bottom user */}
      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{userName[0]}</div>
          <div className="sidebar-user-info">
            <h4>{userName}</h4>
            <p>{userSub}</p>
          </div>
        </div>
        <div
          className="sidebar-item"
          style={{ marginTop: 4 }}
          onClick={() => router.push('/role-selection')}
        >
          <span className="icon">🚪</span>
          <span>Switch Role / Logout</span>
        </div>
      </div>
    </aside>
  );
}
