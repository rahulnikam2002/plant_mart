import Router, { useRouter } from "next/router";
import { Sidebar } from "./Sidebar/Sidebar";
import styles from "@/styles/layout.module.css";
import { useState } from "react";
import Image from "next/image";

const Layout = ({ children }) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    console.log("as path", router.pathname);

    Router.onRouteChangeStart = (url) => {
        console.log("Page change started");
        setIsLoading(true);
    };

    Router.onRouteChangeComplete = (url) => {
        console.log("Page change compleeted");
        setIsLoading(false);
    };

    console.log(isLoading);
    return (
        <div
            style={isSideBarOpen ? { gridTemplateColumns: "18% 82%" } : { gridTemplateColumns: "2% 98%" }}
            className={[styles.main, router.pathname === "/login" && styles.fullPage].join(" ")}>
            {router.pathname !== "/login" && <div className={styles.sidebar}>{isSideBarOpen && <Sidebar />}</div>}
            <div className={[styles.pages].join(" ")}>
                {router.pathname !== "/login" && (
                    <p
                        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                        style={isSideBarOpen ? { left: "17%" } : { left: "0%", top: "10px", margin: "10px" }}
                        className={styles.sideBarToggle}>
                        {isSideBarOpen ? <i className="fi fi-br-angle-left"></i> : <i className="fi fi-br-angle-right"></i>}
                    </p>
                )}

                {isLoading === true ? (
                    <div className={styles.loader}>
                        <Image
                            src={"/loading_animation.gif"}
                            width={100}
                            height={100}
                        />
                    </div>
                ) : (
                    <div
                        style={{ height: "100vh", overflow: "auto" }}
                        className={styles.rightMain}>
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Layout;
