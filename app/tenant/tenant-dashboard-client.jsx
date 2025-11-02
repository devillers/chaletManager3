"use client";

import { useState } from "react";
import Alert from "../../components/Alert";
import { TextField } from "../../components/FormField";

export default function TenantDashboardClient({ initialRequests }) {
  const [requests, setRequests] = useState(initialRequests);
  const [form, setForm] = useState({ startDate: "", endDate: "", note: "" });
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleCreate(event) {
    event.preventDefault();
    setFeedback({ type: "", message: "" });
    setLoading(true);
    try {
      const response = await fetch("/api/tenant/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to create request");
      }
      setRequests((prev) => [...prev, data]);
      setForm({ startDate: "", endDate: "", note: "" });
      setFeedback({ type: "success", message: "Request saved" });
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    setLoading(true);
    setFeedback({ type: "", message: "" });
    try {
      const response = await fetch(`/api/tenant/requests?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Unable to delete");
      }
      setRequests((prev) => prev.filter((item) => item.id !== id));
      setFeedback({ type: "success", message: "Request removed" });
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-neutral-900">Rental preferences</h2>
        <p className="mt-2 text-sm text-neutral-600">
          Share your desired travel dates and any specific notes. Our team will review and match available chalets.
        </p>
        <form className="mt-6 grid gap-4 md:grid-cols-3" onSubmit={handleCreate}>
          <TextField
            id="startDate"
            type="date"
            label="Start date"
            value={form.startDate}
            onChange={(event) => updateField("startDate", event.target.value)}
            required
          />
          <TextField
            id="endDate"
            type="date"
            label="End date"
            value={form.endDate}
            onChange={(event) => updateField("endDate", event.target.value)}
            required
          />
          <TextField
            id="note"
            label="Additional notes"
            value={form.note}
            onChange={(event) => updateField("note", event.target.value)}
            placeholder="Number of guests, destination preferences..."
          />
          <button
            type="submit"
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-neutral-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "..." : "Add request"}
          </button>
        </form>
      </section>
      <Alert type={feedback.type} message={feedback.message} />
      <section>
        <h2 className="text-lg font-semibold text-neutral-900">My requests</h2>
        <div className="mt-4 space-y-3">
          {requests.length === 0 ? (
            <p className="text-sm text-neutral-600">No requests yet.</p>
          ) : (
            requests.map((request) => (
              <div
                key={request.id}
                className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-medium text-neutral-900">
                    {request.startDate} → {request.endDate}
                  </p>
                  {request.note ? <p className="text-neutral-600">{request.note}</p> : null}
                  <p className="text-xs uppercase tracking-wide text-neutral-500">{request.status}</p>
                </div>
                <button
                  type="button"
                  className="self-start rounded-md border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                  onClick={() => handleDelete(request.id)}
                  disabled={loading}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
