"use client";

import Link from "next/link";
import Container from "../Container/Container";

import styles from "./Header.module.css";

import clsx from "clsx";
import { usePathname } from "next/navigation";

import AuthNavigation from "../AuthNavigation/AuthNavigation";
import { buildLinkClassName } from "@/lib/buildLinkClassName/buildLinkClassName";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Container className={styles.box}>
        <Link href="/" className={styles.logo}>
          APP LOGO
        </Link>
        <nav>
          <ul className={styles.list}>
            <li>
              <Link
                className={clsx(styles.link, pathname === "/" && styles.active)}
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={buildLinkClassName({ pathname, slug: "/notes" })}
                href="/notes/filter/All"
              >
                Tags Menu
              </Link>
            </li>
            <AuthNavigation />
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
