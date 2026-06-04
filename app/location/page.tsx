"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BrandLogo } from "@/app/components/BrandLogo";
import { Button } from "@/app/components/ui";

const DISTRICTS = [
  "Krishna",
  "Guntur",
  "East Godavari",
  "West Godavari",
  "Visakhapatnam",
  "Kurnool",
];
const MANDALS: Record<string, string[]> = {
  Krishna: ["Vijayawada Urban", "Machilipatnam", "Nuzvid", "Gudivada"],
  Guntur: ["Guntur Urban", "Tenali", "Narasaraopet"],
  "East Godavari": ["Kakinada", "Rajahmundry"],
  "West Godavari": ["Eluru", "Bhimavaram"],
  Visakhapatnam: ["Visakhapatnam Urban", "Anakapalle"],
  Kurnool: ["Kurnool Urban", "Nandyal"],
};

function LocationContent() {
  const router = useRouter();
  const params = useSearchParams();
  const role = params.get("role") ?? "";
  const route = params.get("route") ?? "/login";
  const [district, setDistrict] = useState("Krishna");
  const mandals = MANDALS[district] ?? ["Other"];
  const [mandal, setMandal] = useState(mandals[0]);

  const handleContinue = () => {
    sessionStorage.setItem(
      "apvision_location",
      JSON.stringify({ district, mandal }),
    );
    router.push(decodeURIComponent(route));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-dark to-primary p-6">
      <div className="w-full max-w-md animate-fade-up rounded-xl bg-white p-8 shadow-xl">
        <BrandLogo size="lg" className="mx-auto mb-5 object-center" />
        <h1 className="text-xl font-black text-primary">
          {role === "nodal"
            ? "Select District Location"
            : "Select Assigned Location"}
        </h1>
        <p className="mt-1 text-xs text-grey-500">
          Choose your working location to continue
        </p>
        <div className="mt-6 space-y-4">
          <label className="block text-xs font-bold text-grey-600">
            District
            <select
              className="mt-1 w-full rounded-lg border border-grey-300 px-3 py-2.5 text-sm"
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                setMandal((MANDALS[e.target.value] ?? ["Other"])[0]);
              }}
            >
              {DISTRICTS.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-bold text-grey-600">
            Mandal
            <select
              className="mt-1 w-full rounded-lg border border-grey-300 px-3 py-2.5 text-sm"
              value={mandal}
              onChange={(e) => setMandal(e.target.value)}
            >
              {(MANDALS[district] ?? ["Other"]).map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>
        </div>
        <Button
          variant="primary"
          size="lg"
          full
          className="mt-6"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default function LocationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <LocationContent />
    </Suspense>
  );
}
