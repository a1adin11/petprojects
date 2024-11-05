
import Header from "../header/header";
import styles from "./layout.module.scss";

import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className={styles.root}>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
