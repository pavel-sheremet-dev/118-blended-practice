import Container from "../Container/Container";

import styles from "./Section.module.css";

const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={styles.section}>
      <Container>{children}</Container>
    </section>
  );
};

export default Section;
