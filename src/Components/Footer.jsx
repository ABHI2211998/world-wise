import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &cppy;{new Date().getFullYear()} Worldwise Inc
      </p>
    </footer>
  );
}

export default Footer;
