import { redirect } from "next/navigation";

/** Role selection is combined with login at /login */
export default function RoleSelectionPage() {
  redirect("/login");
}
