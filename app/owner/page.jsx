import DashboardLayout from "../../components/DashboardLayout";
import { auth } from "../../lib/auth";
import { connectToDatabase } from "../../lib/db/connect";
import { serializeChalet } from "../../lib/serializers/chalet";
import Chalet from "../../models/Chalet";
import User from "../../models/User";
import OwnerDashboardClient from "./owner-dashboard-client";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function OwnerDashboardPage() {
  const session = await auth();
  if (!session || session.user.role !== "owner") {
    redirect("/fr/signin");
  }

  await connectToDatabase();
  const [chaletDoc, ownerDoc] = await Promise.all([
    Chalet.findOne({ owner: session.user.id }),
    User.findById(session.user.id).select("firstName lastName email phone role"),
  ]);

  const chalet = chaletDoc ? serializeChalet(chaletDoc) : null;
  const owner = ownerDoc
    ? {
        id: ownerDoc._id.toString(),
        firstName: ownerDoc.firstName,
        lastName: ownerDoc.lastName,
        email: ownerDoc.email,
        phone: ownerDoc.phone || "",
        role: ownerDoc.role,
      }
    : null;

  return (
    <DashboardLayout
      lang="fr"
      role="owner"
      title="Owner workspace"
      description="Update your chalet listing, sign the partnership contract and follow publication status."
      links={[]}
    >
      <OwnerDashboardClient ownerId={session.user.id} chalet={chalet} owner={owner} />
    </DashboardLayout>
  );
}
