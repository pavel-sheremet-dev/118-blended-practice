import clsx from "clsx";
import styles from "./Container.module.css";

interface ContainerProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = ({ children, className, ...rest }: ContainerProps) => {
  return (
    <div className={clsx(styles.container, className)} {...rest}>
      {children}
    </div>
  );
};

export default Container;
