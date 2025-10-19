import Container from "../Container/Container";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.box}>
        My App | {new Date().getFullYear()}
      </Container>
    </footer>
  );
};

export default Footer;
