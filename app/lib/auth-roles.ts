export const AUTH_ROLES = [
  {
    id: "admin",
    icon: "👑",
    title: "Super Admin",
    desc: "State-level administration",
    href: "/admin/dashboard",
  },
  {
    id: "nodal",
    icon: "🏢",
    title: "Nodal Officer",
    desc: "District management",
    href: "/nodal/dashboard",
  },
  {
    id: "screening",
    icon: "🔬",
    title: "Screening Team",
    desc: "Camp & patient screening",
    href: "/screening/dashboard",
  },
  {
    id: "tele",
    icon: "👁️",
    title: "Tele-Ophthalmologist",
    desc: "Remote consultations",
    href: "/tele/dashboard",
  },
  {
    id: "patient",
    icon: "🧑‍⚕️",
    title: "Patient",
    desc: "My health records",
    href: "/patient/dashboard",
  },
] as const;

export type AuthRoleId = (typeof AUTH_ROLES)[number]["id"];

export function getRoleById(id: string | null) {
  return AUTH_ROLES.find((r) => r.id === id);
}
