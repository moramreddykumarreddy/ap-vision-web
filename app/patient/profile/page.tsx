'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatusBadge } from '@/app/components/ui';
import Modal, { DetailRow, SuccessBanner, downloadFile } from '@/app/components/Modal';

export default function PatientProfile() {
  // State for profile information
  const [profile, setProfile] = useState({
    name: 'Ramaiah Venkata',
    dob: '15 March 1967',
    age: '58 years',
    gender: 'Male',
    mobile: '9876543210',
    category: 'BPL',
    occupation: 'Farmer',
    village: 'Patamata',
    mandal: 'Vijayawada',
    district: 'Krishna',
    state: 'Andhra Pradesh',
    diagnosis: 'Presbyopia',
    conditions: 'Diabetes Mellitus',
    lastScreening: '02 Jun 2025',
    lastCamp: 'Vijayawada Urban Camp',
  });

  // Modal State
  const [editOpen, setEditOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
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
    setProfile(prev => ({
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
    const content = `==================================================
AP DIGITAL VISION PROGRAM - PATIENT CLINICAL RECORD
==================================================
Patient ID: APV-001234
Full Name: ${profile.name}
Date of Birth: ${profile.dob}
Age/Gender: ${profile.age} / ${profile.gender}
Mobile No: ${profile.mobile}
Category: ${profile.category}
Occupation: ${profile.occupation}

ADDRESS DETAILS:
Village/Ward: ${profile.village}
Mandal: ${profile.mandal}
District: ${profile.district}
State: ${profile.state}

MEDICAL HISTORY SUMMARY:
Primary Diagnosis: ${profile.diagnosis}
Known Systemic Conditions: ${profile.conditions}
Last Screened On: ${profile.lastScreening}
Screened At Camp: ${profile.lastCamp}

Report generated on: ${new Date().toLocaleDateString('en-IN')}
==================================================`;
    downloadFile(`Health_Record_APV-001234.txt`, content);
  };

  return (
    <div className="app-layout">
      <Sidebar role="patient" userName={profile.name} userSub="Patient" />
      <div className="main-content">
        <Topbar title="My Profile" subtitle="APV-001234" />
        <main className="page-body" style={{ maxWidth: 800 }}>
          <div className="card mb-20">
            <div className="card-body" style={{ textAlign: 'center', padding: 32 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#1A3A6B', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 900, margin: '0 auto 16px' }}>
                {profile.name[0]}
              </div>
              <div style={{ fontSize: 22, fontWeight: 900 }}>{profile.name}</div>
              <div style={{ fontSize: 13, color: '#9E9E9E', marginTop: 4 }}>APV-001234 • Patient since 2024</div>
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center', gap: 8 }}>
                <StatusBadge label="Active" />
                <span className="badge badge-info">{profile.category}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div className="card">
              <div className="card-header"><h3>Personal Information</h3></div>
              <div className="card-body">
                {[
                  { l: 'Full Name', v: profile.name },
                  { l: 'Date of Birth', v: profile.dob },
                  { l: 'Age', v: profile.age },
                  { l: 'Gender', v: profile.gender },
                  { l: 'Mobile', v: profile.mobile },
                  { l: 'Category', v: profile.category },
                  { l: 'Occupation', v: profile.occupation },
                ].map(item => (
                  <div key={item.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F5F5F5' }}>
                    <span style={{ fontSize: 12, color: '#9E9E9E' }}>{item.l}</span>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{item.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="card mb-16">
                <div className="card-header"><h3>Address</h3></div>
                <div className="card-body">
                  {[
                    { l: 'Village / Ward', v: profile.village },
                    { l: 'Mandal', v: profile.mandal },
                    { l: 'District', v: profile.district },
                    { l: 'State', v: profile.state },
                  ].map(item => (
                    <div key={item.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F5F5F5' }}>
                      <span style={{ fontSize: 12, color: '#9E9E9E' }}>{item.l}</span>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{item.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <div className="card-header"><h3>Medical Summary</h3></div>
                <div className="card-body">
                  {[
                    { l: 'Diagnosis', v: profile.diagnosis },
                    { l: 'Known Conditions', v: profile.conditions },
                    { l: 'Last Screening', v: profile.lastScreening },
                    { l: 'Last Camp', v: profile.lastCamp },
                  ].map(item => (
                    <div key={item.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F5F5F5' }}>
                      <span style={{ fontSize: 12, color: '#9E9E9E' }}>{item.l}</span>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{item.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
            <button className="btn btn-primary" onClick={handleEditOpen}>✏️ Edit Profile</button>
            <button className="btn btn-outline" onClick={handleDownloadRecord}>📋 Download Record</button>
          </div>

          {/* Edit Profile Modal */}
          <Modal
            open={editOpen}
            onClose={() => setEditOpen(false)}
            title="Edit Personal Profile"
            subtitle="Update patient registration details"
            actions={
              <>
                <button className="btn btn-outline" onClick={() => setEditOpen(false)} disabled={success}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSaveChanges} disabled={success}>Save Changes</button>
              </>
            }
          >
            {success ? (
              <SuccessBanner message="Profile changes saved successfully!" />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#0D2347' }}>Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13 }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#0D2347' }}>Date of Birth</label>
                    <input
                      type="text"
                      value={dob}
                      onChange={e => setDob(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13 }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#0D2347' }}>Mobile No</label>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={e => setMobile(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13 }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#0D2347' }}>Occupation</label>
                  <input
                    type="text"
                    value={occupation}
                    onChange={e => setOccupation(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13 }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#0D2347' }}>Village / Ward</label>
                    <input
                      type="text"
                      value={village}
                      onChange={e => setVillage(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13 }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#0D2347' }}>Mandal</label>
                    <input
                      type="text"
                      value={mandal}
                      onChange={e => setMandal(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13 }}
                    />
                  </div>
                </div>
              </div>
            )}
          </Modal>
        </main>
      </div>
    </div>
  );
}

