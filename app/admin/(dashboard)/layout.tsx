import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userEmail: string | null = null;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userEmail = user?.email ?? null;
  } catch (err) {
    console.error("Admin layout session check failed:", err);
  }

  if (!userEmail) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-edgeline-black">
      <AdminSidebar />
      <div className="flex-1">
        <AdminTopBar email={userEmail} />
        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
