import DashboardLayout from "../../components/DashboardLayout";
import { auth } from "../../lib/auth";
import { connectToDatabase } from "../../lib/db/connect";
import RentalRequest from "../../models/RentalRequest";
import TenantDashboardClient from "./tenant-dashboard-client";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

function serializeRequest(doc) {
  return {
    id: doc._id.toString(),
    startDate: doc.startDate.toISOString(),
    endDate: doc.endDate.toISOString(),
    note: doc.notes || "",
    guests: doc.guests || 1,
    createdAt: doc.createdAt.toISOString(),
  };
}

export default async function TenantDashboardPage() {
  const session = await auth();
  if (!session || session.user.role !== "tenant") {
    redirect("/fr/signin");
  }

  await connectToDatabase();
  const requests = await RentalRequest.find({ tenant: session.user.id }).sort({ createdAt: -1 });
  const serialized = requests.map(serializeRequest);

  return (
    <DashboardLayout
      lang="fr"
      role="tenant"
      title="Tenant dashboard"
      description="Manage your rental preferences and keep your profile up to date."
      links={[]}
    >
      <TenantDashboardClient initialRequests={serialized} />
    </DashboardLayout>
  );
}
