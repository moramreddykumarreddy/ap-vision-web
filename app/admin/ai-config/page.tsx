"use client";
import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { AppShell } from "@/app/components/app-shell";
import { Button, Card, CardBody, SectionHeader } from "@/app/components/ui";

export default function AiConfigPage() {
  const [models, setModels] = useState({
    cataract: true,
    glaucoma: true,
    dr: true,
    hotspot: true,
    forecast: false,
  });
  const [threshold, setThreshold] = useState(65);

  return (
    <AppShell
      sidebar={
        <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      }
      topbar={
        <Topbar
          title="AI Model Configuration"
          subtitle="Enable models and set alert thresholds"
        />
      }
    >
      <SectionHeader title="AI Models" />
      <Card className="mt-3">
        <CardBody className="space-y-3">
          {Object.entries({
            cataract: "Cataract Risk Model",
            glaucoma: "Glaucoma Risk Model",
            dr: "Diabetic Retinopathy Model",
            hotspot: "Disease Hotspot Detection",
            forecast: "Spectacle Demand Forecasting",
          }).map(([k, label]) => (
            <label
              key={k}
              className="flex items-center justify-between text-sm"
            >
              <span className="font-semibold">{label}</span>
              <input
                type="checkbox"
                checked={models[k as keyof typeof models]}
                onChange={(e) =>
                  setModels((m) => ({ ...m, [k]: e.target.checked }))
                }
              />
            </label>
          ))}
          <div>
            <div className="mb-1 text-sm font-semibold">
              High-Risk Alert Threshold: {threshold}%
            </div>
            <input
              type="range"
              min={40}
              max={90}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <Button
            variant="primary"
            onClick={() => alert("AI configuration saved")}
          >
            Save Configuration
          </Button>
        </CardBody>
      </Card>
    </AppShell>
  );
}
