import styles from "./Layout.module.css";

import Header from "./Header";
import Footer from "./Footer";

function Layout(props) {
  return (
    <div>
      <Header />
      <main className={styles.main}>{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;