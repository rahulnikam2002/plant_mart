import { useRouter } from "next/router";
import { Sidebar } from "./Sidebar/Sidebar";
import styles from "@/styles/layout.module.css";
import { useState } from "react";

const Layout = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const router = useRouter();
  return (
    <div
      style={
        isSideBarOpen
          ? { gridTemplateColumns: "18% 82%" }
          : { gridTemplateColumns: "2% 98%" }
      }
      className={[
        styles.main,
        router.asPath === "/login" && styles.fullPage
      ].join(" ")}>
      {router.asPath !== "/login" && (
        <div className={styles.sidebar}>{isSideBarOpen && <Sidebar />}</div>
      )}
      <div className={[styles.pages].join(" ")}>
        {router.asPath !== "/login" && (
          <p
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            style={
              isSideBarOpen
                ? { left: "17%" }
                : { left: "0%", top: "10px", margin: "10px" }
            }
            className={styles.sideBarToggle}>
            {isSideBarOpen ? (
              <i className="fi fi-br-angle-left"></i>
            ) : (
              <i className="fi fi-br-angle-right"></i>
            )}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

export default Layout;
