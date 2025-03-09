import { signOut } from "@/auth";

export const GET = async (req: Request) => {
  const searchParams = new URL(req.url).searchParams;

  return signOut({
    redirectTo: searchParams.get("callbackUrl") || "",
  });
};
