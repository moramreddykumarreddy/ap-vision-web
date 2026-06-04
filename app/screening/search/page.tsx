"use client";
import { colorAlpha, colors } from "@/app/lib/theme";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { AppShell } from "@/app/components/app-shell";
import {
  StatusBadge,
  Button,
  Input,
  Card,
  CardBody,
  fadeDelay,
} from "@/app/components/ui";
import Modal, { SuccessBanner } from "@/app/components/Modal";

const patients = [
  {
    id: "APV-001234",
    name: "Ramaiah Venkata",
    age: 58,
    gender: "M",
    village: "Nandyal",
    phone: "9876543210",
    lastVisit: "01 Jun 2025",
    diagnosis: "Presbyopia",
    status: "Active",
  },
  {
    id: "APV-001235",
    name: "Lakshmi Devi",
    age: 45,
    gender: "F",
    village: "Kurnool",
    phone: "9765432109",
    lastVisit: "28 May 2025",
    diagnosis: "Myopia",
    status: "Active",
  },
  {
    id: "APV-001236",
    name: "Suresh Kumar",
    age: 62,
    gender: "M",
    village: "Ongole",
    phone: "9654321098",
    lastVisit: "25 May 2025",
    diagnosis: "Cataract",
    status: "Referred",
  },
  {
    id: "APV-001237",
    name: "Padmavathi",
    age: 38,
    gender: "F",
    village: "Markapur",
    phone: "9543210987",
    lastVisit: "20 May 2025",
    diagnosis: "Astigmatism",
    status: "Active",
  },
  {
    id: "APV-001238",
    name: "Narasimha Rao",
    age: 71,
    gender: "M",
    village: "Darsi",
    phone: "9432109876",
    lastVisit: "18 May 2025",
    diagnosis: "Glaucoma",
    status: "Referred",
  },
];

export default function PatientSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [qrScanning, setQrScanning] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const results = searched
    ? (() => {
        const filtered = patients.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.id.toLowerCase().includes(query.toLowerCase()) ||
            p.phone.includes(query),
        );
        return filtered.length > 0 ? filtered : patients;
      })()
    : [];

  const handleSimulateScan = (patientId: string) => {
    setQrScanning(true);
    setTimeout(() => {
      setQrScanning(false);
      const pat = patients.find((p) => p.id === patientId);
      setSuccessMsg(`QR Code scanned! Found: ${pat?.name}`);
      setTimeout(() => {
        setQuery(patientId);
        setSearched(true);
        setQrOpen(false);
        setSuccessMsg("");
      }, 1500);
    }, 1500);
  };

  return (
    <AppShell
      sidebar={
        <Sidebar
          role="screening"
          userName="Dr. Srinivasa Rao"
          userSub="Team Lead"
        />
      }
      topbar={
        <Topbar
          title="Patient Search"
          subtitle="Find patients by name, ID, or phone"
        />
      }
    >
      {/* Search bar */}
      <div className="mb-6 flex gap-2.5">
        <Input
          id="patient-search-input"
          className="flex-1"
          placeholder="Search by name, APV ID, or phone number..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setSearched(true)}
        />
        <Button variant="primary" onClick={() => setSearched(true)}>
          🔍 Search
        </Button>
        <Button variant="outline" onClick={() => setQrOpen(true)}>
          📷 Scan QR
        </Button>
      </div>

      {!searched && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 0",
            color: colors.grey500,
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>
            Search for a Patient
          </div>
          <div style={{ fontSize: 13, marginTop: 4 }}>
            Enter name, APV ID, or phone number above
          </div>
          <Button
            variant="primary"
            className="mt-5"
            onClick={() => router.push("/screening/register")}
          >
            + Register New Patient
          </Button>
        </div>
      )}

      {searched && results.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 0",
            color: colors.grey500,
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>😕</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>No exact match</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>
            Showing all demo patients below
          </div>
        </div>
      )}

      {searched && results.length === 0 && query === "" && (
        <div>
          {patients.map((p, i) => (
            <PatientCard key={p.id} patient={p} index={i} router={router} />
          ))}
        </div>
      )}

      {searched &&
        results.map((p, i) => (
          <PatientCard key={p.id} patient={p} index={i} router={router} />
        ))}

      {/* Show all when not searched */}
      {!searched && (
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: colors.grey500,
              marginBottom: 12,
            }}
          >
            Recent Patients
          </div>
          {patients.map((p, i) => (
            <PatientCard key={p.id} patient={p} index={i} router={router} />
          ))}
        </div>
      )}

      {/* Scan QR Modal */}
      <Modal
        open={qrOpen}
        onClose={() => setQrOpen(false)}
        title="Scan Patient QR Code"
        subtitle="Place the patient's QR code in front of the camera"
        actions={
          <Button
            variant="outline"
            onClick={() => setQrOpen(false)}
            disabled={qrScanning || !!successMsg}
          >
            Cancel
          </Button>
        }
      >
        {successMsg ? (
          <SuccessBanner message={successMsg} />
        ) : qrScanning ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div
              className="size-8 animate-spin rounded-full border-2 border-grey-200 border-t-primary"
              style={{ margin: "0 auto 16px" }}
            />
            <div
              style={{ fontSize: 14, fontWeight: 700, color: colors.primary }}
            >
              Reading QR Code...
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 18,
            }}
          >
            {/* Visual Camera Scan Area */}
            <div
              style={{
                width: 220,
                height: 220,
                border: "3px dashed ${colors.primary}",
                borderRadius: 16,
                position: "relative",
                background: colors.surfaceMuted,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: colors.errorLight,
                  boxShadow: `0 0 8px ${colors.errorLight}`,
                  animation: "scanLine 2.5s linear infinite",
                }}
              />
              <span style={{ fontSize: 48 }}>📷</span>
            </div>
            <div
              style={{
                fontSize: 12,
                color: colors.grey600,
                textAlign: "center",
              }}
            >
              Simulate scanning by selecting a patient's QR code card below:
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                width: "100%",
              }}
            >
              {patients.slice(0, 3).map((p) => (
                <Button
                  key={p.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSimulateScan(p.id)}
                  className="flex justify-between px-3.5 py-2.5"
                >
                  <span>🪪 {p.name}</span>
                  <span style={{ opacity: 0.7 }}>{p.id}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <style jsx global>{`
        @keyframes scanLine {
          0% {
            top: 0%;
          }
          50% {
            top: 100%;
          }
          100% {
            top: 0%;
          }
        }
      `}</style>
    </AppShell>
  );
}

function PatientCard({
  patient: p,
  index: i,
  router,
}: {
  patient: (typeof patients)[0];
  index: number;
  router: ReturnType<typeof useRouter>;
}) {
  return (
    <Card
      className={`mb-3 animate-fade-up cursor-pointer ${fadeDelay(i + 1)}`}
      onClick={() => router.push("/admin/emr")}
    >
      <CardBody>
        <div className="flex items-center gap-2">
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: colorAlpha(colors.primary, "20"),
              color: colors.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {p.name[0]}
          </div>
          <div style={{ flex: 1 }}>
            <div className="flex items-center gap-8 mb-4">
              <span style={{ fontSize: 14, fontWeight: 800 }}>{p.name}</span>
              <span style={{ fontSize: 11, color: colors.grey500 }}>
                {p.age}y • {p.gender}
              </span>
              <StatusBadge label={p.status} />
            </div>
            <div style={{ fontSize: 11, color: colors.grey500 }}>
              📋 {p.id} • 📍 {p.village} • 📞 {p.phone}
            </div>
            <div style={{ fontSize: 11, color: colors.grey600, marginTop: 2 }}>
              Last visit: {p.lastVisit} • {p.diagnosis}
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <Button
              size="sm"
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                router.push("/admin/emr");
              }}
            >
              View EMR
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                router.push("/screening/register");
              }}
            >
              Register
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
