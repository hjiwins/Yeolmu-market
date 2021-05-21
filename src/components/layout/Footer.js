import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>열무마켓© 2021 All rights reserved </p>
      <Link to="#">포트폴리오로 돌아가기</Link>
    </footer>
  );
}

export default Footer;
