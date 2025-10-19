"use client";
// import { logout } from "@/lib/api/clientApi";
// import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";
import { buildLinkClassName } from "@/lib/buildLinkClassName/buildLinkClassName";

import styles from "./AuthNavigation.module.css";
import { logoutUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthNavigation() {
  const pathname = usePathname();
  // логаут
  // очистка стану аутентифікації
  // перенаправлення

  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const onLogout = async () => {
    await logoutUser();
    clearIsAuthenticated();
    router.push("/sign-in");
  };

  if (isAuthenticated)
    return (
      <>
        <li>
          <Link
            className={buildLinkClassName({ pathname, slug: "/profile" })}
            href="/profile"
          >
            Profile
          </Link>
        </li>
        <li className={styles.userMenu}>
          {user && <p>{user.email}</p>}
          <button className={styles.logoutBtn} onClick={onLogout}>
            Logout
          </button>
        </li>
      </>
    );

  return (
    <>
      <li>
        <Link
          className={buildLinkClassName({ pathname, slug: "/sign-in" })}
          href="/sign-in"
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          className={buildLinkClassName({ pathname, slug: "/sign-up" })}
          href="/sign-up"
        >
          Sign up
        </Link>
      </li>
    </>
  );
}
