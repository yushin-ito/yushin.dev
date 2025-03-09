import { signIn } from "auth";

export const GET = async (req: Request) => {
  const searchParams = new URL(req.url).searchParams;

  return signIn("google", {
    redirectTo: searchParams.get("callbackUrl") || "",
  });
};
