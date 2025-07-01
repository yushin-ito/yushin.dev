import { forbidden, unauthorized } from "next/navigation";
import { Role } from "@prisma/client";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import SettingsForm from "@/components/settings-form";

const SettingsPage = async () => {
  const session = await auth();

  if (!session?.user) {
    unauthorized();
  }

  if (session.user.role !== Role.ADMIN) {
    forbidden();
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      image: true,
      name: true,
      email: true,
    },
  });

  if (!user) {
    unauthorized();
  }

  return <SettingsForm user={user} />;
};

export default SettingsPage;
