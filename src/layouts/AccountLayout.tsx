// /* eslint-disable react-refresh/only-export-components */
// import { useState } from "react";
// import rightAshArrow from "../assets/icons/rightAshArrow.svg";
// import { Link, Outlet } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../lib/hook";
// import type { RootState } from "../lib/store";
// import { updateAccountShowOnMobile } from "../lib/features/mobileView/settingMobileViewSlice";
// import { subscriptionMenu, UserRole } from "../data";
// import Sidebar from "../components/molecules/Sidebar";
// import Typography from "../components/forms/Typography";
// import withAuth from "@/hoc/withAuth";

// const AccountLayout = () => {
//   const dispatch = useAppDispatch();
//   const [isActiveTab, setIsActiveTab] = useState("Add Card");
//   const { userObject } = useAppSelector((state: RootState) => state.auth);
//   const { showAccountOnMobile } = useAppSelector(
//     (state: RootState) => state.settingMobile,
//   );

//   const toggleView = () => {
//     if (window.innerWidth <= 425) {
//       dispatch(updateAccountShowOnMobile(true));
//     }
//   };

//   const filteredMenuItems = subscriptionMenu?.filter((item) => {
//     if (userObject.role === UserRole.creator) {
//       return item.isViewer === true || item.isViewer === false;
//     } else {
//       return item.isViewer === true || item.isViewer === undefined;
//     }
//   });

//   return (
//     <div className="mx-auto flex w-full max-w-[1440px]">
//       {/* Left Sidebar */}
//       <aside className="hidden md:block md:w-[280px] shrink-0">
//         <div className="sticky top-0 h-screen">
//           <Sidebar />
//         </div>
//       </aside>

//       {/* Account Nav Panel */}
//       <aside
//         className={`${
//           showAccountOnMobile ? "hidden" : "w-full"
//         } md:block md:w-[280px] shrink-0 border-r border-grey_10`}
//       >
//         <div className="sticky top-0 h-screen overflow-y-auto">
//           <div className="w-full bg-grey_20 py-3 px-4 h-14 border border-grey_20 shadow-custom-combined mb-2">
//             <Typography variant="subtitle1">My Account</Typography>
//           </div>

//           {filteredMenuItems?.map(({ id, name, path }) => (
// <Link
//   key={id}
//   to={path}
//   onClick={() => {
//     setIsActiveTab(name);
//     toggleView();
//   }}
//   className={`flex items-center justify-between cursor-pointer px-4 py-3 border-b border-grey_10 hover:bg-blue_200 ${
//     isActiveTab === name ? "bg-blue_200" : ""
//   }`}
// >
//   <Typography variant="p2" className="text-grey_800">
//     {name}
//   </Typography>
//   <img src={rightAshArrow} alt="" className="w-6 h-6" />
// </Link>
//           ))}
//         </div>
//       </aside>

//       {/* Main Content */}
//       {/* <main
//         className={`${
//           showAccountOnMobile ? "w-full" : "hidden md:block"
//         } min-w-0 flex-1`}
//       >
//         <Outlet />
//       </main> */}
//       <main
//         className={`${
//           showAccountOnMobile
//             ? "w-full"
//             : "hidden md:block md:w-[50%] md:pr-[88px]"
//         } min-w-0`}
//       >
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default withAuth(AccountLayout);

/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ArrowLeft, Menu } from "lucide-react";

import rightAshArrow from "../assets/icons/rightAshArrow.svg";
import { useAppDispatch, useAppSelector } from "../lib/hook";
import type { RootState } from "../lib/store";
import { updateAccountShowOnMobile } from "../lib/features/mobileView/settingMobileViewSlice";
import { subscriptionMenu, UserRole } from "../data";
import Sidebar from "../components/molecules/Sidebar";
import Typography from "../components/forms/Typography";
import withAuth from "@/hoc/withAuth";

const AccountLayout = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const { showAccountOnMobile } = useAppSelector(
    (state: RootState) => state.settingMobile,
  );

  const filteredMenuItems = subscriptionMenu?.filter((item) => {
    if (userObject?.role === UserRole.creator) {
      return item.isViewer === true || item.isViewer === false;
    }

    return item.isViewer === true || item.isViewer === undefined;
  });

  const openMobileSidebar = () => {
    setIsMobileSidebarOpen(true);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const openAccountPage = () => {
    dispatch(updateAccountShowOnMobile(true));
  };

  const returnToAccountMenu = () => {
    dispatch(updateAccountShowOnMobile(false));
  };

  useEffect(() => {
    document.body.style.overflow = isMobileSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileSidebarOpen]);

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Mobile main sidebar drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          isMobileSidebarOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMobileSidebarOpen}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMobileSidebar}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isMobileSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer */}
        <aside
          className={`absolute inset-y-0 left-0 w-[85%] max-w-[320px] bg-white shadow-xl transition-transform duration-300 ease-in-out ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar isMobile onClose={closeMobileSidebar} />
        </aside>
      </div>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex h-16 items-center border-b border-grey_10 bg-white px-4 md:hidden">
        {showAccountOnMobile ? (
          <button
            type="button"
            onClick={returnToAccountMenu}
            aria-label="Return to account menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-grey_700 transition-colors hover:bg-grey_50"
          >
            <ArrowLeft size={22} />
          </button>
        ) : (
          <button
            type="button"
            onClick={openMobileSidebar}
            aria-label="Open navigation menu"
            aria-expanded={isMobileSidebarOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-grey_700 transition-colors hover:bg-grey_50"
          >
            <Menu size={24} />
          </button>
        )}

        <Typography variant="titleTwo" className="ml-3 truncate text-grey_900">
          My Account
        </Typography>
      </header>

      <div
        className="
          mx-auto
          min-h-[calc(100vh-64px)]
          w-full
          max-w-[1440px]
          md:grid
          md:min-h-screen
          md:grid-cols-[280px_280px_minmax(0,1fr)]
        "
      >
        {/* Desktop main sidebar */}
        <aside className="hidden w-[280px] md:block">
          <div className="sticky top-0 h-screen">
            <Sidebar />
          </div>
        </aside>

        {/* Account menu */}
        <aside
          className={`shrink-0 border-r border-grey_10 bg-white ${
            showAccountOnMobile ? "hidden" : "block w-full"
          } md:block md:w-[280px]`}
        >
          <div className="h-full md:sticky md:top-0 md:h-screen md:overflow-y-auto">
            <div className="hidden h-14 w-full items-center border-b border-grey_20 bg-grey_20 px-4 shadow-custom-combined md:flex">
              <Typography variant="subtitle1">My Account</Typography>
            </div>

            <nav className="w-full">
              {filteredMenuItems?.map(({ id, name, path }) => {
                const isActive =
                  location.pathname === path ||
                  location.pathname.startsWith(`${path}/`);

                return (
                  <Link
                    key={id}
                    to={path}
                    onClick={openAccountPage}
                    className={`flex min-h-14 cursor-pointer items-center justify-between border-b border-grey_10 px-4 py-3 transition-colors ${
                      isActive ? "bg-blue_200" : "hover:bg-blue_100"
                    }`}
                  >
                    <Typography
                      variant="p2"
                      className={
                        isActive ? "font-medium text-blue_600" : "text-grey_800"
                      }
                    >
                      {name}
                    </Typography>

                    <img
                      src={rightAshArrow}
                      alt=""
                      aria-hidden="true"
                      className="h-6 w-6"
                    />
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Account page content */}
        <main
          className={`min-w-0 bg-white ${
            showAccountOnMobile ? "block w-full" : "hidden"
          } md:block md:w-full`}
        >
          <div className="mx-auto w-full max-w-[900px] px-4 py-6 sm:px-6 md:px-8 lg:px-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default withAuth(AccountLayout);
