import clsx from "clsx";
import styles from "./link.module.css";

export const buildLinkClassName = ({
  pathname,
  slug,
  className,
}: {
  pathname: string;
  slug: string;
  className?: string;
}) => {
  return clsx(
    styles.link,
    pathname.startsWith(slug) && styles.active,
    className
  );
};
