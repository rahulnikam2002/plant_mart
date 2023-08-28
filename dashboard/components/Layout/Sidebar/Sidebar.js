import { useRouter } from "next/router";
import styles from "@/styles/sidebar.module.css";
import { IconInput } from "@/components/Inputs/Inputs";
import { useEffect, useState } from "react";
import Link from "next/link";
const { AnimatePresence, motion } = require("framer-motion");

export const Sidebar = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(
    router.asPath.split("/")[1].toLocaleLowerCase().length === 0
      ? "dashboard"
      : router.asPath.split("/")[1].toLocaleLowerCase()
  );
  const [showDropIndex, setShowDropIndex] = useState(0);
  const [showDropDownMenu, setShowDropDownMenu] = useState(false);
  const [menuData, setMenuData] = useState(dashboardMenu);

  const searchForMenuItem = (menu, searchTerm) => {
    return menu.reduce((matches, menu) => {
      const isMatching = menu.menu
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      if (menu.subMenu && menu.subMenu.length > 0) {
        const isSubMenuMatching = searchForMenuItem(menu.subMenu, searchTerm);
        return isMatching || isSubMenuMatching.length > 0
          ? [...matches, menu]
          : matches;
      }
      return isMatching ? [...matches, menu] : matches;
    }, []);
  };

  console.log("useState before activeTab", activeTab);

  const handleSearchMenu = (e) => {
    const matchingItems = searchForMenuItem(dashboardMenu, e);
    setMenuData(matchingItems);
  };

  useEffect(() => {
    setActiveTab(
      router.asPath.split("/")[1].toLocaleLowerCase().length === 0
        ? "dashboard"
        : router.asPath.split("/")[1].toLocaleLowerCase()
    );
  }, []);

  return (
    router.asPath !== "/login" && (
      <div className={styles.main}>
        <div className={styles.header}>
          <p>Plant Mart</p>
        </div>
        <div className={styles.searchSection}>
          <IconInput
            background={"#1a1e3d"}
            noBorder={true}
            color="var(--whiteGrey)"
            placeholder="Search"
            leftIcon={<i className="fi fi-rr-search"></i>}
            onChange={handleSearchMenu}
          />
        </div>
        <div className={styles.menuItems}>
          {menuData &&
            menuData.map((menu, index) => (
              <div
                onClick={() => {
                  console.log(menu.menu?.toLowerCase());
                  setActiveTab(menu.menu?.toLowerCase());
                  setShowDropIndex(index);
                  setShowDropDownMenu((prev) => !prev);
                  !menu.subMenu && router.push(menu.link);
                }}
                key={index}
                className={[
                  styles.singleMenuItem,
                  menu.menu?.toLowerCase() === activeTab?.toLowerCase() &&
                    styles.activeMenu
                ].join(" ")}>
                <div className={styles.mainMenuItem}>
                  <div className={styles.menu}>
                    <div className={styles.leftIcon}>{menu.leftIcon}</div>
                    <p>{menu.menu}</p>
                  </div>
                  <div className={styles.rightIcon}>{menu.rightIcon}</div>
                </div>
                <AnimatePresence>
                  {menu.subMenu &&
                    showDropDownMenu &&
                    showDropIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        whileInView={{ height: "fit-content", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={styles.dropDownMenuItem}>
                        <div className={styles.subMenu}>
                          {menu.subMenu &&
                            menu.subMenu.map((subMenu) => (
                              <div className={styles.singleSubMenu}>
                                <Link href={subMenu.link}>
                                  {subMenu.menu}
                                  <i className="fi fi-rr-angle-small-right"></i>
                                </Link>
                              </div>
                            ))}
                        </div>
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            ))}
        </div>
      </div>
    )
  );
};

const dashboardMenu = [
  {
    menu: "Dashboard",
    link: "/",
    rightIcon: <i className="fi fi-rr-angle-small-right"></i>,
    leftIcon: <i className="fi fi-rr-house-chimney"></i>
  },
  {
    menu: "Sales",
    link: "/sales",
    rightIcon: <i className="fi fi-rr-angle-small-right"></i>,
    leftIcon: <i className="fi fi-br-basket-shopping-simple"></i>
  },
  {
    menu: "Products",
    link: "#",
    rightIcon: <i className="fi fi-rr-angle-small-right"></i>,
    leftIcon: <i className="fi fi-bs-box-open"></i>,
    subMenu: [
      {
        menu: "All Products",
        link: "/products",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      },
      {
        menu: "Add new Products",
        link: "/products",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      }
    ]
  },
  {
    menu: "Orders",
    link: "#",
    rightIcon: <i className="fi fi-rr-angle-small-right"></i>,
    leftIcon: <i className="fi fi-rs-truck-side"></i>,
    subMenu: [
      {
        menu: "All orders",
        link: "/orders",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      },
      {
        menu: "Manage orders",
        link: "/orders/manage",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      },
      {
        menu: "Add new orders",
        link: "/orders/new",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      },
      {
        menu: "Orders reports",
        link: "/orders/reports",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      }
    ]
  },
  {
    menu: "Categories",
    link: "#",
    rightIcon: <i className="fi fi-rr-angle-small-right"></i>,
    leftIcon: <i className="fi fi-br-bookmark"></i>,
    subMenu: [
      {
        menu: "All categories",
        link: "/categories",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      },
      {
        menu: "Add new categories",
        link: "/categories/new",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      }
    ]
  },
  {
    menu: "Customers",
    link: "#",
    rightIcon: <i className="fi fi-rr-angle-small-right"></i>,
    leftIcon: <i className="fi fi-rr-users"></i>,
    subMenu: [
      {
        menu: "All customers",
        link: "/categories",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      }
    ]
  },
  {
    menu: "Coupons",
    link: "#",
    rightIcon: <i className="fi fi-rr-angle-small-right"></i>,
    leftIcon: <i className="fi fi-rs-ticket"></i>,
    subMenu: [
      {
        menu: "All Coupons",
        link: "/categories",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      },
      {
        menu: "Add new Coupon",
        link: "/categories",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      }
    ]
  },
  {
    menu: "Settings",
    link: "#",
    rightIcon: <i className="fi fi-rr-angle-small-right"></i>,
    leftIcon: <i className="fi fi-rr-settings"></i>,
    subMenu: [
      {
        menu: "View settings",
        link: "/categories",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      },
      {
        menu: "Edit settings",
        link: "/categories",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      },
      {
        menu: "Manage roles",
        link: "/categories",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      },
      {
        menu: "Logout",
        link: "/categories",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      },
      {
        menu: "Add admin",
        link: "/categories",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      },
      {
        menu: "Manage admin",
        link: "/categories",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      }
    ]
  },
  {
    menu: "Analysis",
    link: "#",
    rightIcon: <i className="fi fi-rr-angle-small-right"></i>,
    leftIcon: <i className="fi fi-br-arrow-trend-up"></i>,
    subMenu: [
      {
        menu: "Analysis",
        link: "/categories",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      },
      {
        menu: "Customer analysis",
        link: "/categories",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      },
      {
        menu: "Product analysis",
        link: "/categories",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      },
      {
        menu: "Coupons analysis",
        link: "/categories",
        rightIcon: <i className="fi fi-sr-arrow-circle-right"></i>
      }
    ]
  }
];
