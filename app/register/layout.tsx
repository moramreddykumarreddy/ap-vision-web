import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Registration — AP Vision Care",
  description:
    "Register as a new beneficiary for Andhra Pradesh statewide digital vision care.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
