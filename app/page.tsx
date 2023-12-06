"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  if (!data) redirect("/api/auth/signin?callbackUrl=/");
  return (
    <div>
      {data && <h1>{data?.user?.email}</h1>}
      {!data && <Button>Signin</Button>}
    </div>
  );
}
