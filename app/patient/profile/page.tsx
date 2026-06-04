"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { AppShell } from "@/app/components/app-shell";
import {
  StatusBadge,
  Button,
  Input,
  FormGroup,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "@/app/components/ui";
import Modal, { SuccessBanner, downloadFile } from "@/app/components/Modal";
import { usePatientSession } from "@/app/lib/use-patient-session";

export default function PatientProfile() {
  const { patient } = usePatientSession();
  const [profile, setProfile] = useState({
    name: patient.name,
    dob: `${patient.age} years`,
    age: `${patient.age} years`,
    gender: patient.gender,
    mobile: patient.mobile,
    category: patient.category,
    occupation: patient.occupation,
    village: patient.village,
    mandal: patient.mandal,
    district: patient.district,
    state: "Andhra Pradesh",
    diagnosis: "Vision screening record",
    conditions: "As per camp assessment",
    lastScreening: "02 Jun 2025",
    lastCamp: "Vijayawada Urban Camp",
    abha: patient.abha,
  });

  useEffect(() => {
    setProfile({
      name: patient.name,
      dob: `${patient.age} years`,
      age: `${patient.age} years`,
      gender: patient.gender,
      mobile: patient.mobile,
      category: patient.category,
      occupation: patient.occupation,
      village: patient.village,
      mandal: patient.mandal,
      district: patient.district,
      state: "Andhra Pradesh",
      diagnosis: "Vision screening record",
      conditions: "As per camp assessment",
      lastScreening: "02 Jun 2025",
      lastCamp: "Vijayawada Urban Camp",
      abha: patient.abha,
    });
  }, [patient]);

  const [editOpen, setEditOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState(profile.name);
  const [dob, setDob] = useState(profile.dob);
  const [mobile, setMobile] = useState(profile.mobile);
  const [occupation, setOccupation] = useState(profile.occupation);
  const [village, setVillage] = useState(profile.village);
  const [mandal, setMandal] = useState(profile.mandal);

  const handleEditOpen = () => {
    setName(profile.name);
    setDob(profile.dob);
    setMobile(profile.mobile);
    setOccupation(profile.occupation);
    setVillage(profile.village);
    setMandal(profile.mandal);
    setSuccess(false);
    setEditOpen(true);
  };

  const handleSaveChanges = () => {
    if (!name.trim() || !mobile.trim()) return;
    setProfile((prev) => ({
      ...prev,
      name,
      dob,
      mobile,
      occupation,
      village,
      mandal,
    }));
    setSuccess(true);
    setTimeout(() => {
      setEditOpen(false);
      setSuccess(false);
    }, 1500);
  };

  const handleDownloadRecord = () => {
    downloadFile(
      `Health_Record_APV-001234.txt`,
      `Patient: ${profile.name}\nID: APV-001234\n...`,
    );
  };

  const row = (l: string, v: string) => (
    <div
      key={l}
      className="flex justify-between border-b border-grey-50 py-2 last:border-b-0"
    >
      <span className="text-xs text-grey-400">{l}</span>
      <span className="text-[13px] font-bold">{v}</span>
    </div>
  );

  return (
    <AppShell
      sidebar={
        <Sidebar role="patient" userName={profile.name} userSub="Patient" />
      }
      topbar={<Topbar title="My Profile" subtitle="APV-001234" />}
    >
      <div className="mx-auto max-w-[800px]">
        <Card className="mb-3">
          <CardBody className="px-8 py-8 text-center">
            <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-primary text-[32px] font-black text-white">
              {profile.name[0]}
            </div>
            <div className="text-[22px] font-black">{profile.name}</div>
            <div className="mt-1 text-[13px] text-grey-400">
              APV-001234 • Patient since 2024
            </div>
            <div className="mt-3 flex justify-center gap-2">
              <StatusBadge label="Active" />
              <span className="inline-flex rounded-full bg-info/10 px-2.5 py-0.5 text-[11px] font-semibold text-info">
                {profile.category}
              </span>
            </div>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardBody>
              {row("Full Name", profile.name)}
              {row("Date of Birth", profile.dob)}
              {row("Age", profile.age)}
              {row("Gender", profile.gender)}
              {row("Mobile", profile.mobile)}
              {row("Category", profile.category)}
              {row("Occupation", profile.occupation)}
            </CardBody>
          </Card>
          <div className="flex flex-col gap-5">
            <Card>
              <CardHeader>
                <CardTitle>Address</CardTitle>
              </CardHeader>
              <CardBody>
                {row("Village / Ward", profile.village)}
                {row("Mandal", profile.mandal)}
                {row("District", profile.district)}
                {row("State", profile.state)}
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Medical Summary</CardTitle>
              </CardHeader>
              <CardBody>
                {row("Diagnosis", profile.diagnosis)}
                {row("Known Conditions", profile.conditions)}
                {row("Last Screening", profile.lastScreening)}
                {row("Last Camp", profile.lastCamp)}
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="mt-5 flex gap-2.5">
          <Button variant="primary" onClick={handleEditOpen}>
            ✏️ Edit Profile
          </Button>
          <Button variant="outline" onClick={handleDownloadRecord}>
            📋 Download Record
          </Button>
        </div>

        <Modal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          title="Edit Personal Profile"
          subtitle="Update patient registration details"
          actions={
            <>
              <Button
                variant="outline"
                onClick={() => setEditOpen(false)}
                disabled={success}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveChanges}
                disabled={success}
              >
                Save Changes
              </Button>
            </>
          }
        >
          {success ? (
            <SuccessBanner message="Profile changes saved successfully!" />
          ) : (
            <div className="flex flex-col gap-3.5">
              <FormGroup label="Full Name">
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </FormGroup>
              <div className="grid grid-cols-2 gap-3">
                <FormGroup label="Date of Birth">
                  <Input value={dob} onChange={(e) => setDob(e.target.value)} />
                </FormGroup>
                <FormGroup label="Mobile No">
                  <Input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </FormGroup>
              </div>
              <FormGroup label="Occupation">
                <Input
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
              </FormGroup>
              <div className="grid grid-cols-2 gap-3">
                <FormGroup label="Village / Ward">
                  <Input
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label="Mandal">
                  <Input
                    value={mandal}
                    onChange={(e) => setMandal(e.target.value)}
                  />
                </FormGroup>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AppShell>
  );
}
