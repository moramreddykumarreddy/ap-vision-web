'use client';
import { useEffect } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  width?: number;
}

export default function Modal({ open, onClose, title, subtitle, children, actions, width = 580 }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(13,35,71,0.55)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
        animation: 'fadeIn .15s ease both',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: 18,
          width: '100%', maxWidth: width,
          maxHeight: '90vh',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 24px 80px rgba(13,35,71,0.25)',
          animation: 'fadeUp .2s ease both',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '18px 22px 14px',
          borderBottom: '1px solid #EEEEEE',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#0D2347', fontFamily: "'Space Grotesk', sans-serif" }}>{title}</div>
            {subtitle && <div style={{ fontSize: 11, color: '#9E9E9E', marginTop: 2 }}>{subtitle}</div>}
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#F5F5F5', border: 'none', borderRadius: '50%',
              width: 30, height: 30, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, color: '#616161', flexShrink: 0,
              transition: 'background .15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#E0E0E0')}
            onMouseLeave={e => (e.currentTarget.style.background = '#F5F5F5')}
          >✕</button>
        </div>

        {/* Body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '18px 22px' }}>
          {children}
        </div>

        {/* Footer */}
        {actions && (
          <div style={{
            padding: '14px 22px',
            borderTop: '1px solid #EEEEEE',
            display: 'flex', gap: 10, justifyContent: 'flex-end',
            flexShrink: 0,
          }}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Reusable detail row ───────────────────────────── */
export function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F5F5F5' }}>
      <span style={{ fontSize: 12, color: '#9E9E9E' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: '#212121', textAlign: 'right', maxWidth: '60%' }}>{value}</span>
    </div>
  );
}

/* ── Roster table ──────────────────────────────────── */
export function RosterTable({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr>
            {columns.map(c => (
              <th key={c} style={{ background: '#F5F7FA', padding: '8px 12px', textAlign: 'left', fontWeight: 700, fontSize: 10, color: '#757575', textTransform: 'uppercase', letterSpacing: 0.5, borderBottom: '2px solid #E0E0E0' }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: '9px 12px', borderBottom: '1px solid #F0F0F0', fontWeight: j === 0 ? 700 : 400, color: '#212121' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Success banner ────────────────────────────────── */
export function SuccessBanner({ message }: { message: string }) {
  return (
    <div style={{ background: 'rgba(46,125,50,0.08)', border: '1.5px solid rgba(46,125,50,0.25)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 24 }}>✅</span>
      <span style={{ fontSize: 14, fontWeight: 700, color: '#2E7D32' }}>{message}</span>
    </div>
  );
}

/* ── Download helper ───────────────────────────────── */
export function downloadFile(filename: string, content: string, type = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
