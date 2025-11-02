"use client";

import { useMemo, useState } from "react";
import Alert from "../../components/Alert";

export default function AdminDashboardClient({ chalets, users, requests }) {
  const [items, setItems] = useState(chalets);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const owners = useMemo(() => users.filter((user) => user.role === "owner"), [users]);
  const tenants = useMemo(() => users.filter((user) => user.role === "tenant"), [users]);

  async function updateStatus(chaletId, status) {
    setLoading(true);
    setFeedback({ type: "", message: "" });
    try {
      const response = await fetch("/api/admin/chalet-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chaletId, status }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to update status");
      setItems((prev) => prev.map((item) => (item.id === chaletId ? data : item)));
      setFeedback({ type: "success", message: "Status updated" });
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">Chalet submissions</h2>
        <p className="text-sm text-neutral-600">Review, approve and publish chalet listings submitted by owners.</p>
        <Alert type={feedback.type} message={feedback.message} />
        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-sm text-neutral-600">No chalet submissions yet.</p>
          ) : (
            items.map((chalet) => (
              <div key={chalet.id} className="space-y-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-neutral-900">{chalet.title || "Untitled chalet"}</p>
                    <p className="text-sm text-neutral-600">Owner: {owners.find((owner) => owner.id === chalet.ownerId)?.email || "Unknown"}</p>
                    <p className="text-xs uppercase tracking-wide text-neutral-500">Status: {chalet.status}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-neutral-700 disabled:opacity-50"
                      onClick={() => updateStatus(chalet.id, "published")}
                      disabled={loading}
                    >
                      Publish
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 disabled:opacity-50"
                      onClick={() => updateStatus(chalet.id, "pending")}
                      disabled={loading}
                    >
                      Mark pending
                    </button>
                    <a
                      href={`/chalets/${chalet.slug}`}
                      className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100"
                    >
                      View page
                    </a>
                  </div>
                </div>
                {chalet.descriptionShort ? (
                  <p className="text-sm text-neutral-600">{chalet.descriptionShort}</p>
                ) : null}
                <div className="flex flex-wrap gap-2 text-xs text-neutral-500">
                  <span>Contract: {chalet.contractAccepted ? "accepted" : "awaiting"}</span>
                  {chalet.publishedAt ? <span>Published: {chalet.publishedAt}</span> : null}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">Owners</h2>
        <p className="text-sm text-neutral-600">Overview of partner owners and their registered chalets.</p>
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <table className="min-w-full divide-y divide-neutral-200 text-sm">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-neutral-700">Owner</th>
                <th className="px-4 py-3 text-left font-semibold text-neutral-700">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-neutral-700">Phone</th>
                <th className="px-4 py-3 text-left font-semibold text-neutral-700">Chalet status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white">
              {owners.map((owner) => {
                const chalet = items.find((item) => item.ownerId === owner.id);
                return (
                  <tr key={owner.id}>
                    <td className="px-4 py-3 text-neutral-800">
                      {owner.firstName} {owner.lastName}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">{owner.email}</td>
                    <td className="px-4 py-3 text-neutral-600">{owner.phone || "—"}</td>
                    <td className="px-4 py-3 text-neutral-600">{chalet ? chalet.status : "No chalet"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">Tenants & requests</h2>
        <p className="text-sm text-neutral-600">Monitor guest enquiries to match them with the perfect chalet.</p>
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <table className="min-w-full divide-y divide-neutral-200 text-sm">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-neutral-700">Tenant</th>
                <th className="px-4 py-3 text-left font-semibold text-neutral-700">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-neutral-700">Requests</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white">
              {tenants.map((tenant) => {
                const tenantRequests = requests.filter((request) => request.tenantId === tenant.id);
                return (
                  <tr key={tenant.id}>
                    <td className="px-4 py-3 text-neutral-800">
                      {tenant.firstName} {tenant.lastName}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">{tenant.email}</td>
                    <td className="px-4 py-3 text-neutral-600">
                      {tenantRequests.length === 0 ? (
                        <span>—</span>
                      ) : (
                        <ul className="space-y-1">
                          {tenantRequests.map((request) => (
                            <li key={request.id}>
                              {request.startDate} → {request.endDate} ({request.status})
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
