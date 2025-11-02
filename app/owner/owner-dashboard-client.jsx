"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import Alert from "../../components/Alert";
import { CheckboxField, TextField } from "../../components/FormField";
import PhotoUploader from "../../components/PhotoUploader";

const emptyChalet = {
  title: "",
  descriptionShort: "",
  descriptionLong: "",
  address: "",
  registrationNumber: "",
  fiscalAddress: "",
  icalUrl: "",
  heroUrl: "",
  photos: [],
  rooms: [],
};

export default function OwnerDashboardClient({ ownerId, owner, chalet }) {
  const [profile, setProfile] = useState({
    firstName: owner?.firstName || "",
    lastName: owner?.lastName || "",
    phone: owner?.phone || "",
    email: owner?.email || "",
  });
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  const [chaletData, setChaletData] = useState(chalet || emptyChalet);
  const [chaletMessage, setChaletMessage] = useState("");
  const [chaletError, setChaletError] = useState("");
  const [chaletLoading, setChaletLoading] = useState(false);

  const contractStatus = useMemo(() => {
    if (!chaletData || !chaletData.id) return "draft";
    if (!chaletData.contractAccepted) return "pending-contract";
    if (chaletData.status === "published") return "published";
    if (chaletData.status === "pending") return "waiting-approval";
    return "draft";
  }, [chaletData]);

  function updateProfile(field, value) {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }

  function updateChalet(field, value) {
    setChaletData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleProfileSubmit(event) {
    event.preventDefault();
    setProfileError("");
    setProfileMessage("");
    setProfileLoading(true);
    try {
      const response = await fetch("/api/owner/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerId, profile }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to update profile");
      setProfileMessage("Profile saved");
    } catch (error) {
      setProfileError(error.message);
    } finally {
      setProfileLoading(false);
    }
  }

  async function handleChaletSubmit(event) {
    event.preventDefault();
    setChaletError("");
    setChaletMessage("");
    setChaletLoading(true);
    try {
      const response = await fetch("/api/owner/chalet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerId, chalet: chaletData }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save chalet");
      setChaletData(data);
      setChaletMessage("Chalet details saved");
    } catch (error) {
      setChaletError(error.message);
    } finally {
      setChaletLoading(false);
    }
  }

  async function handleContractAccept() {
    setChaletError("");
    setChaletMessage("");
    setChaletLoading(true);
    try {
      const response = await fetch("/api/owner/contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to record acceptance");
      setChaletData(data);
      setChaletMessage("Contract accepted");
    } catch (error) {
      setChaletError(error.message);
    } finally {
      setChaletLoading(false);
    }
  }

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">Owner profile</h2>
        <p className="text-sm text-neutral-600">
          Keep your contact information up to date. These details feed the partnership contract and communication with the Chalet Manager team.
        </p>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleProfileSubmit}>
          <TextField
            id="firstName"
            label="First name"
            value={profile.firstName}
            onChange={(event) => updateProfile("firstName", event.target.value)}
            required
          />
          <TextField
            id="lastName"
            label="Last name"
            value={profile.lastName}
            onChange={(event) => updateProfile("lastName", event.target.value)}
            required
          />
          <TextField
            id="email"
            label="Email"
            value={profile.email}
            onChange={(event) => updateProfile("email", event.target.value)}
            type="email"
            required
          />
          <TextField
            id="phone"
            label="Phone"
            value={profile.phone}
            onChange={(event) => updateProfile("phone", event.target.value)}
          />
          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-neutral-700 disabled:opacity-50"
              disabled={profileLoading}
            >
              {profileLoading ? "Saving..." : "Save profile"}
            </button>
            <Alert type="success" message={profileMessage} />
            <Alert type="error" message={profileError} />
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">Chalet listing</h2>
        <p className="text-sm text-neutral-600">
          Complete every section to generate a public-ready chalet page. You can update these details at any time before publication.
        </p>
        <form className="space-y-6" onSubmit={handleChaletSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              id="title"
              label="Chalet title"
              value={chaletData.title}
              onChange={(event) => updateChalet("title", event.target.value)}
              required
            />
            <TextField
              id="registrationNumber"
              label="Registration number"
              value={chaletData.registrationNumber}
              onChange={(event) => updateChalet("registrationNumber", event.target.value)}
              placeholder="Optional"
            />
            <TextField
              id="address"
              label="Property address"
              value={chaletData.address}
              onChange={(event) => updateChalet("address", event.target.value)}
              required
            />
            <TextField
              id="fiscalAddress"
              label="Fiscal address"
              value={chaletData.fiscalAddress}
              onChange={(event) => updateChalet("fiscalAddress", event.target.value)}
            />
          </div>
          <TextField
            id="descriptionShort"
            label="Short description"
            value={chaletData.descriptionShort}
            onChange={(event) => updateChalet("descriptionShort", event.target.value)}
            required
          />
          <label className="flex flex-col gap-1 text-sm text-neutral-700">
            <span className="font-medium text-neutral-800">Full description</span>
            <textarea
              id="descriptionLong"
              value={chaletData.descriptionLong}
              onChange={(event) => updateChalet("descriptionLong", event.target.value)}
              rows={6}
              className="rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none"
              required
            />
          </label>
          <TextField
            id="icalUrl"
            label="iCal calendar URL"
            value={chaletData.icalUrl}
            onChange={(event) => updateChalet("icalUrl", event.target.value)}
            placeholder="https://"
          />
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-neutral-900">Hero photo</h3>
            {chaletData.heroUrl ? (
              <img
                src={chaletData.heroUrl}
                alt="Hero"
                className="h-48 w-full rounded-lg object-cover"
              />
            ) : null}
            <PhotoUploader onUploaded={(url) => updateChalet("heroUrl", url)} />
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-neutral-900">Gallery</h3>
            <PhotoUploader
              onUploaded={(url) =>
                setChaletData((prev) => ({
                  ...prev,
                  photos: [...(prev.photos || []), { url, roomName: "", roomDescription: "", isHero: false }],
                }))
              }
            />
            <div className="grid gap-4 md:grid-cols-2">
              {(chaletData.photos || []).map((photo, index) => (
                <div key={photo.url} className="space-y-2 rounded-lg border border-neutral-200 p-3">
                  <img src={photo.url} alt={photo.roomName || "Chalet photo"} className="h-32 w-full rounded-md object-cover" />
                  <TextField
                    id={`room-${index}`}
                    label="Room name"
                    value={photo.roomName || ""}
                    onChange={(event) =>
                      setChaletData((prev) => {
                        const nextPhotos = [...(prev.photos || [])];
                        nextPhotos[index] = { ...nextPhotos[index], roomName: event.target.value };
                        return { ...prev, photos: nextPhotos };
                      })
                    }
                  />
                  <label className="flex flex-col gap-1 text-sm text-neutral-700">
                    <span className="font-medium text-neutral-800">Room description</span>
                    <textarea
                      value={photo.roomDescription || ""}
                      onChange={(event) =>
                        setChaletData((prev) => {
                          const nextPhotos = [...(prev.photos || [])];
                          nextPhotos[index] = { ...nextPhotos[index], roomDescription: event.target.value };
                          return { ...prev, photos: nextPhotos };
                        })
                      }
                      rows={3}
                      className="rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none"
                    />
                  </label>
                  <CheckboxField
                    id={`hero-${index}`}
                    label="Set as hero"
                    checked={photo.url === chaletData.heroUrl || photo.isHero}
                    onChange={(event) =>
                      setChaletData((prev) => {
                        const nextPhotos = (prev.photos || []).map((item, photoIndex) => ({
                          ...item,
                          isHero: photoIndex === index ? event.target.checked : false,
                        }));
                        const newHero = event.target.checked ? photo.url : prev.heroUrl;
                        return { ...prev, photos: nextPhotos, heroUrl: newHero };
                      })
                    }
                  />
                  <button
                    type="button"
                    className="text-xs font-semibold text-rose-600 hover:underline"
                    onClick={() =>
                      setChaletData((prev) => ({
                        ...prev,
                        photos: (prev.photos || []).filter((_, photoIndex) => photoIndex !== index),
                      }))
                    }
                  >
                    Remove photo
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-neutral-700 disabled:opacity-50"
              disabled={chaletLoading}
            >
              {chaletLoading ? "Saving..." : "Save chalet"}
            </button>
            <Alert type="success" message={chaletMessage} />
            <Alert type="error" message={chaletError} />
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">Publication status</h2>
        <p className="text-sm text-neutral-600">
          Follow the publication workflow. Once your contract is accepted, the super admin will review and publish your chalet.
        </p>
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
          <p className="text-sm font-semibold text-neutral-900">Status: {contractStatus}</p>
          {chaletData?.contractAccepted ? (
            <p className="mt-2 text-sm text-neutral-600">
              Contract accepted on {chaletData.contractAcceptedAt}
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              <p className="text-sm text-neutral-600">
                Review the partnership agreement carefully. By accepting, you agree to the Chalet Manager terms of collaboration.
              </p>
              <button
                type="button"
                className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-neutral-700"
                onClick={handleContractAccept}
                disabled={chaletLoading || !chaletData?.id}
              >
                Accept contract
              </button>
            </div>
          )}
          {chaletData?.status === "published" ? (
            <a
              href={`/chalets/${chaletData.slug}`}
              className="mt-4 inline-block text-sm font-semibold text-neutral-900 hover:underline"
            >
              View public page
            </a>
          ) : null}
        </div>
      </section>
    </div>
  );
}
