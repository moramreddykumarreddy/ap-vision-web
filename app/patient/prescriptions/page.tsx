"use client";
import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { AppShell } from "@/app/components/app-shell";
import {
  StatusBadge,
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  fadeDelay,
} from "@/app/components/ui";
import Modal, { SuccessBanner, downloadFile } from "@/app/components/Modal";
import { usePatientSession } from "@/app/lib/use-patient-session";

export default function PrescriptionList() {
  const { patient, prescriptions } = usePatientSession();
  const [shareRx, setShareRx] = useState<(typeof prescriptions)[number] | null>(
    null,
  );
  const [copySuccess, setCopySuccess] = useState(false);

  const getRxText = (rx: (typeof prescriptions)[0]) => {
    return `==================================================
AP DIGITAL VISION PROGRAM - PRESCRIPTION
==================================================
Prescription ID: ${rx.id}
Date: ${rx.date}
Doctor: ${rx.doctor}
Diagnosis: ${rx.diagnosis}
Lens Type: ${rx.type}
Status: ${rx.status}

REFRACTION DETAILS:
Right Eye (OD) - Sphere: ${rx.odSphere} | Cylinder: ${rx.odCyl} | Axis: ${rx.odAxis}
Left Eye (OS)  - Sphere: ${rx.osSphere} | Cylinder: ${rx.osCyl} | Axis: ${rx.osAxis}
Add Power: ${rx.add}
==================================================`;
  };

  const handlePrint = (rx: (typeof prescriptions)[0]) => {
    downloadFile(`Print_${rx.id}.txt`, getRxText(rx));
  };

  const handleDownload = (rx: (typeof prescriptions)[0]) => {
    downloadFile(`Prescription_${rx.id}.pdf`, getRxText(rx));
  };

  const handleCopyLink = () => {
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1500);
  };

  return (
    <AppShell
      sidebar={
        <Sidebar role="patient" userName={patient.name} userSub="Patient" />
      }
      topbar={
        <Topbar
          title="My Prescriptions"
          subtitle={`${patient.name} • ${prescriptions.length} record(s)`}
        />
      }
    >
      {prescriptions.length === 0 ? (
        <Card>
          <CardBody className="py-10 text-center text-sm text-grey-500">
            No prescriptions on record yet.
          </CardBody>
        </Card>
      ) : (
        <div className="flex flex-col gap-3.5">
          {prescriptions.map((rx, i) => (
            <Card key={rx.id} className={`animate-fade-up ${fadeDelay(i + 1)}`}>
              <CardHeader>
                <div>
                  <div className="text-[15px] font-extrabold">
                    {rx.diagnosis}
                  </div>
                  <div className="text-[11px] text-grey-400">
                    {rx.id} • {rx.date} • {rx.doctor}
                  </div>
                </div>
                <StatusBadge label={rx.status} />
              </CardHeader>
              <CardBody>
                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {["Right Eye (OD)", "Left Eye (OS)"].map((eye) => (
                    <div
                      key={eye}
                      className="rounded-[10px] border border-grey-300 p-3.5"
                    >
                      <div className="mb-2.5 text-[11px] font-extrabold text-primary">
                        {eye}
                      </div>
                      {[
                        [
                          "Sphere",
                          eye.includes("OD") ? rx.odSphere : rx.osSphere,
                        ],
                        ["Cylinder", eye.includes("OD") ? rx.odCyl : rx.osCyl],
                        ["Axis", eye.includes("OD") ? rx.odAxis : rx.osAxis],
                        ["Add", rx.add],
                      ].map(([l, v]) => (
                        <div
                          key={l as string}
                          className="mb-1 flex justify-between text-xs"
                        >
                          <span className="text-grey-400">{l}</span>
                          <span className="font-bold">{v}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mb-3.5 text-xs text-grey-600">
                  Lens Type: <strong>{rx.type}</strong>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handlePrint(rx)}
                  >
                    🖨️ Print
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShareRx(rx)}
                  >
                    📱 Share
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(rx)}
                  >
                    💾 Download PDF
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
      {shareRx && (
        <Modal
          open={!!shareRx}
          onClose={() => setShareRx(null)}
          title="Share Prescription"
          subtitle={`Prescription ID: ${shareRx.id}`}
          actions={
            <Button variant="primary" onClick={() => setShareRx(null)}>
              Close
            </Button>
          }
        >
          <div className="flex flex-col gap-3.5">
            <div className="text-[13px] text-grey-800">
              Share the digital prescription link with a pharmacy or clinic:
            </div>
            <div className="flex gap-2">
              <Input
                readOnly
                value={`https://apvision.ap.gov.in/rx/share/${shareRx.id}`}
                className="bg-grey-50 text-grey-600"
              />
              <Button size="sm" variant="primary" onClick={handleCopyLink}>
                Copy
              </Button>
            </div>
            {copySuccess && (
              <SuccessBanner message="Prescription link copied to clipboard!" />
            )}
            <div className="mt-2.5 flex flex-col gap-2">
              <Button size="sm" variant="outline" full onClick={handleCopyLink}>
                💬 Share via WhatsApp
              </Button>
              <Button size="sm" variant="outline" full onClick={handleCopyLink}>
                ✉️ Share via Email
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </AppShell>
  );
}
