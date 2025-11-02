"use client";

import { useState } from "react";
import Alert from "./Alert";

export default function PhotoUploader({ onUploaded }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }
      onUploaded?.(data.url);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <Alert type="error" message={error} />
      <label className="flex cursor-pointer items-center justify-center rounded-md border border-dashed border-neutral-300 px-4 py-6 text-sm text-neutral-600 hover:border-neutral-500">
        {loading ? "Uploading..." : "Upload photo"}
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      </label>
    </div>
  );
}
