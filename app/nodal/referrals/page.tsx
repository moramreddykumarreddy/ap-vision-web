"use client";
import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { AppShell } from "@/app/components/app-shell";
import { Button, Card, CardBody, StatusBadge } from "@/app/components/ui";

type Ref = {
  id: string;
  patient: string;
  hospital: string;
  condition: string;
  priority: string;
  status: string;
};

const INIT: Ref[] = [
  {
    id: "REF-101",
    patient: "Lakshmi Devi",
    hospital: "Guntur Eye Hospital",
    condition: "Advanced Cataract",
    priority: "High",
    status: "Pending",
  },
  {
    id: "REF-102",
    patient: "Ramaiah Venkata",
    hospital: "Vijayawada Medical College",
    condition: "Suspected Glaucoma",
    priority: "Moderate",
    status: "Pending",
  },
];

export default function NodalReferralsPage() {
  const [refs, setRefs] = useState(INIT);

  return (
    <AppShell
      sidebar={
        <Sidebar
          role="nodal"
          userName="Ravi Shankar"
          userSub="Nodal Officer, Krishna"
        />
      }
      topbar={
        <Topbar
          title="Referral Verification"
          subtitle="Approve or reject referral requests"
        />
      }
    >
      <div className="flex flex-col gap-3">
        {refs.map((r) => (
          <Card key={r.id}>
            <CardBody>
              <div className="mb-2 flex items-center justify-between">
                <div className="text-sm font-extrabold">{r.patient}</div>
                <StatusBadge label={r.priority} />
              </div>
              <div className="text-xs text-grey-500">
                {r.hospital} • {r.condition}
              </div>
              {r.status === "Pending" && (
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    className="flex-1"
                    onClick={() =>
                      setRefs((p) =>
                        p.map((x) =>
                          x.id === r.id ? { ...x, status: "Approved" } : x,
                        ),
                      )
                    }
                  >
                    ✅ Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    className="flex-1"
                    onClick={() =>
                      setRefs((p) =>
                        p.map((x) =>
                          x.id === r.id ? { ...x, status: "Rejected" } : x,
                        ),
                      )
                    }
                  >
                    ❌ Reject
                  </Button>
                </div>
              )}
              {r.status !== "Pending" && (
                <div className="mt-2 text-xs font-bold text-grey-600">
                  Status: {r.status}
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
