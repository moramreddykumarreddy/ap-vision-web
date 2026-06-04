import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Registration — AP Vision Care",
  description:
    "Register as a new beneficiary for Andhra Pradesh statewide digital vision care.",
  icons: {
    icon: [{ url: "/apvision.png", type: "image/png" }],
    apple: "/apvision.png",
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
