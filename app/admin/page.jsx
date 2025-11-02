import DashboardLayout from "../../components/DashboardLayout";
import { auth } from "../../lib/auth";
import { connectToDatabase } from "../../lib/db/connect";
import { serializeChalet } from "../../lib/serializers/chalet";
import Chalet from "../../models/Chalet";
import RentalRequest from "../../models/RentalRequest";
import User from "../../models/User";
import AdminDashboardClient from "./admin-dashboard-client";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    redirect("/fr/signin");
  }

  await connectToDatabase();
  const [chaletDocs, userDocs, requestDocs] = await Promise.all([
    Chalet.find().sort({ createdAt: -1 }),
    User.find().sort({ createdAt: -1 }).select("firstName lastName email phone role"),
    RentalRequest.find().sort({ createdAt: -1 }),
  ]);

  const chalets = chaletDocs.map(serializeChalet);
  const users = userDocs.map((user) => ({
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || "",
    role: user.role,
  }));
  const requests = requestDocs.map((request) => ({
    id: request._id.toString(),
    tenantId:
      typeof request.tenant === "string"
        ? request.tenant
        : request.tenant?.toString?.() || "",
    startDate: request.startDate.toISOString(),
    endDate: request.endDate.toISOString(),
    status: "open",
  }));

  return (
    <DashboardLayout
      lang="fr"
      role="admin"
      title="Super admin control center"
      description="Publish chalet listings, follow tenant enquiries and support the Chalet Manager community."
      links={[]}
    >
      <AdminDashboardClient chalets={chalets} users={users} requests={requests} />
    </DashboardLayout>
  );
}
