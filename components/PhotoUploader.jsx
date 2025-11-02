"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Alert from "./Alert";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/heic"];

export default function PhotoUploader({ onUploaded }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const acceptedExtensions = useMemo(() => ALLOWED_TYPES.map((type) => type.split("/")[1]).filter(Boolean), []);

  function resetInput(target) {
    if (target) {
      target.value = "";
    }
  }

  function validateFile(file) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only JPG, PNG, WebP, AVIF or HEIC images are allowed.");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("Image is too large (max 10MB).");
      return false;
    }
    return true;
  }

  async function handleUpload(event) {
    const target = event.target;
    const file = target.files?.[0];
    if (!file) return;

    setError("");

    if (!validateFile(file)) {
      resetInput(target);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }
      return objectUrl;
    });

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
      setPreview("");
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setLoading(false);
      resetInput(target);
    }
  }

  return (
    <div className="space-y-2">
      <Alert type="error" message={error} />
      {preview ? (
        <div className="overflow-hidden rounded-lg border border-neutral-200">
          <Image
            src={preview}
            alt="Preview"
            width={320}
            height={200}
            className="h-40 w-full object-cover"
            unoptimized
          />
        </div>
      ) : null}
      <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-neutral-300 px-4 py-6 text-sm text-neutral-600 hover:border-neutral-500">
        {loading ? "Uploading..." : "Upload photo"}
        <span className="text-xs text-neutral-400">Accepted: {acceptedExtensions.join(", ")}</span>
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={loading} />
      </label>
    </div>
  );
}
