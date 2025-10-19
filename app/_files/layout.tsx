"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return children;
}
