// /* eslint-disable react-refresh/only-export-components */
// import { settingsModule } from "@/data";
// import { useState } from "react";
// import Typography from "@components/forms/Typography";
// import rightAshArrow from "@/assets/icons/rightAshArrow.svg";
// import Sidebar from "@components/molecules/Sidebar";
// import { useAppSelector } from "@/lib/hook";
// import { useDispatch } from "react-redux";
// import { updateShowOnMobile } from "@/lib/features/mobileView/settingMobileViewSlice";
// import type { RootState } from "@/lib/store";
// import { Link, Outlet } from "react-router-dom";
// import withAuth from "@/hoc/withAuth";

// const SettingLayout = () => {
//   const dispatch = useDispatch();
//   const [isActiveTab, setIsActiveTab] = useState("Account");
//   const { showOnMobile } = useAppSelector(
//     (state: RootState) => state.settingMobile,
//   );

//   const toggleView = () => {
//     if (window.innerWidth <= 425) {
//       dispatch(updateShowOnMobile(true));
//     }
//   };

//   return (
//     <div className="mx-auto flex w-full max-w-[1440px]">
//       {/* Left Sidebar — mirrors dashboard */}
//       <aside className="hidden md:block md:w-[280px] shrink-0">
//         <div className="sticky top-0 h-screen">
//           <Sidebar />
//         </div>
//       </aside>

//       {/* Settings Nav Panel */}
//       <aside
//         className={`${
//           showOnMobile ? "hidden" : "w-full"
//         } md:block md:w-[280px] shrink-0 border-r border-grey_10`}
//       >
//         <div className="sticky top-0 h-screen overflow-y-auto">
//           <div className="w-full bg-grey_20 py-3 px-4 h-14 border border-grey_20 shadow-custom-combined mb-2">
//             <Typography variant="subtitle1">Settings</Typography>
//           </div>

//           {settingsModule?.map(({ id, name, path }) => (
//             <Link
//               key={id}
//               to={path}
//               onClick={() => {
//                 setIsActiveTab(name);
//                 toggleView();
//               }}
//               className={`flex items-center justify-between cursor-pointer px-4 py-3 border-b border-grey_10 hover:bg-blue_200 ${
//                 isActiveTab === name ? "bg-blue_200" : ""
//               }`}
//             >
//               <Typography variant="p2" className="text-grey_800">
//                 {name}
//               </Typography>
//               <img src={rightAshArrow} alt="" className="w-6 h-6" />
//             </Link>
//           ))}
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main
//         className={`${
//           showOnMobile ? "w-full" : "hidden md:block"
//         } min-w-0 md:w-[50%]`}
//       >
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default withAuth(SettingLayout);

/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { ArrowLeft, Menu } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { settingsModule } from "@/data";
import Typography from "@components/forms/Typography";
import rightAshArrow from "@/assets/icons/rightAshArrow.svg";
import Sidebar from "@components/molecules/Sidebar";
import { useAppSelector } from "@/lib/hook";
import { updateShowOnMobile } from "@/lib/features/mobileView/settingMobileViewSlice";
import type { RootState } from "@/lib/store";
import withAuth from "@/hoc/withAuth";

const SettingLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const { showOnMobile } = useAppSelector(
    (state: RootState) => state.settingMobile,
  );

  const openMobileSidebar = () => {
    setIsMobileSidebarOpen(true);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const openSettingsPage = () => {
    dispatch(updateShowOnMobile(true));
  };

  const returnToSettingsMenu = () => {
    dispatch(updateShowOnMobile(false));
  };

  useEffect(() => {
    document.body.style.overflow = isMobileSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileSidebarOpen]);

  const activeSetting = settingsModule.find(
    (item) =>
      location.pathname === item.path ||
      location.pathname.startsWith(`${item.path}/`),
  );

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Mobile main sidebar */}
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

      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex h-16 items-center border-b border-grey_10 bg-white px-4 md:hidden">
        {showOnMobile ? (
          <button
            type="button"
            onClick={returnToSettingsMenu}
            aria-label="Return to settings menu"
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
          {showOnMobile ? activeSetting?.name || "Settings" : "Settings"}
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

        {/* Settings navigation panel */}
        <aside
          className={`shrink-0 border-r border-grey_10 bg-white ${
            showOnMobile ? "hidden" : "block w-full"
          } md:block md:w-[280px]`}
        >
          <div className="h-full md:sticky md:top-0 md:h-screen md:overflow-y-auto">
            <div className="hidden h-14 w-full items-center border-b border-grey_20 bg-grey_20 px-4 shadow-custom-combined md:flex">
              <Typography variant="subtitle1">Settings</Typography>
            </div>

            <nav className="w-full">
              {settingsModule?.map(({ id, name, path }) => {
                const isActive =
                  location.pathname === path ||
                  location.pathname.startsWith(`${path}/`);

                return (
                  <Link
                    key={id}
                    to={path}
                    onClick={openSettingsPage}
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

        {/* Settings content */}
        <main
          className={`min-w-0 bg-white ${
            showOnMobile ? "block w-full" : "hidden"
          } md:block md:w-full`}
        >
          <div className="mx-auto w-full max-w-[900px] md:px-8 md:py-6 lg:px-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default withAuth(SettingLayout);
