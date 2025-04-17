import { ReactNode } from "react";
import { forbidden, unauthorized } from "next/navigation";

import { auth } from "@/auth";
import Sidebar from "@/components/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await auth();

  if (!session?.user) {
    unauthorized();
  }

  if (session.user?.role !== "ADMIN") {
    forbidden();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 bg-background"></header>
      <div className="grid flex-1 md:grid-cols-[240px_1fr]">
        <aside className="hidden w-[240px] md:block">
          <Sidebar />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
