import { redirect } from "next/navigation";
import { getCurrentUserFromCookies } from "@/lib/auth";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function DashboardPage() {
  const user = await getCurrentUserFromCookies();

  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardShell
      user={{
        name: user.name,
        email: user.email,
      }}
    />
  );
}
