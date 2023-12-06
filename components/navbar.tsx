import Link from "next/link";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__wrapper}>
        <Link href="/">
          <div className={styles.navbar__left}>LOGO</div>
        </Link>
        <div className={styles.navbar__center}>Logistic Co.</div>
      </div>
    </div>
  );
};

export default Navbar;
