// /* eslint-disable react-refresh/only-export-components */
// import { useEffect, useState } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import { Menu } from "lucide-react";

// import Sidebar from "../components/molecules/Sidebar";
// import VerticalCarousel from "../components/VerticalCarousel";
// import Typography from "../components/forms/Typography";
// import withAuth from "@/hoc/withAuth";

// const DashboardLayout = () => {
//   const [isUserSubscribed] = useState(false);
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

//   const location = useLocation();

//   const openMobileSidebar = () => {
//     setIsMobileSidebarOpen(true);
//   };

//   const closeMobileSidebar = () => {
//     setIsMobileSidebarOpen(false);
//   };

//   useEffect(() => {
//     closeMobileSidebar();
//   }, [location.pathname]);

//   useEffect(() => {
//     document.body.style.overflow = isMobileSidebarOpen ? "hidden" : "";

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isMobileSidebarOpen]);

//   return (
//     <div className="min-h-screen w-full bg-white">
//       {/* Mobile sidebar */}
//       <div
//         className={`fixed inset-0 z-[9999] md:hidden ${
//           isMobileSidebarOpen ? "pointer-events-auto" : "pointer-events-none"
//         }`}
//         aria-hidden={!isMobileSidebarOpen}
//       >
//         {/* Backdrop */}
//         <button
//           type="button"
//           aria-label="Close navigation menu"
//           onClick={closeMobileSidebar}
//           className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
//             isMobileSidebarOpen ? "opacity-100" : "opacity-0"
//           }`}
//         />

//         {/* Drawer */}
//         <aside
//           className={`absolute inset-y-0 left-0 w-[85%] max-w-[320px] bg-white shadow-xl transition-transform duration-300 ease-in-out ${
//             isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <Sidebar isMobile onClose={closeMobileSidebar} />
//         </aside>
//       </div>

//       {/* Desktop and tablet layout */}
//       <div
//         className="
//           mx-auto
//           min-h-screen
//           w-full
//           max-w-[1440px]
//           md:grid
//           md:grid-cols-[280px_minmax(0,1fr)]
//           xl:grid-cols-[280px_minmax(0,1fr)_360px]
//         "
//       >
//         {/* Desktop sidebar */}
//         <aside className="hidden w-[280px] md:block">
//           <div className="sticky top-0 h-screen">
//             <Sidebar />
//           </div>
//         </aside>

//         {/* Main content */}
//         <div className="min-w-0">
//           {/* Mobile header */}
//           <header className="sticky top-0 z-40 flex h-16 items-center border-b border-grey_10 bg-white px-4 md:hidden">
//             <button
//               type="button"
//               onClick={openMobileSidebar}
//               aria-label="Open navigation menu"
//               aria-expanded={isMobileSidebarOpen}
//               className="flex h-10 w-10 items-center justify-center rounded-lg text-grey_700 transition-colors hover:bg-grey_50"
//             >
//               <Menu size={24} />
//             </button>
//           </header>

//           <main className="min-w-0">
//             <Outlet />
//           </main>
//         </div>

//         {/* Right suggestions panel */}
//         <aside className="hidden w-[360px] border-l border-grey_10 px-6 xl:block">
//           <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-20">
//             <div className="min-h-0 flex-1 overflow-y-auto pr-1">
//               <VerticalCarousel />
//             </div>

//             <div
//               className={`mt-6 flex flex-wrap items-center justify-between gap-2 ${
//                 !isUserSubscribed ? "pb-10" : "pb-6"
//               }`}
//             >
//               <Typography variant="labelOne" className="text-grey_400">
//                 Terms of service
//               </Typography>

//               <div className="h-[2px] w-[2px] rounded-full bg-grey_300" />

//               <Typography variant="labelOne" className="text-grey_400">
//                 Privacy
//               </Typography>

//               <div className="h-[2px] w-[2px] rounded-full bg-grey_300" />

//               <Typography variant="labelOne" className="text-grey_400">
//                 Cookie notice
//               </Typography>
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default withAuth(DashboardLayout);

/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

import Sidebar from "../components/molecules/Sidebar";
import VerticalCarousel from "../components/VerticalCarousel";
import Typography from "../components/forms/Typography";
import withAuth from "@/hoc/withAuth";

const DashboardLayout = () => {
  const [isUserSubscribed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const location = useLocation();

  const openMobileSidebar = () => {
    setIsMobileSidebarOpen(true);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  useEffect(() => {
    closeMobileSidebar();
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileSidebarOpen]);

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-[9999] md:hidden ${
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

      {/* Desktop and tablet layout */}
      <div
        className="
          mx-auto
          min-h-screen
          w-full
          max-w-[1440px]
          md:grid
          md:grid-cols-[280px_minmax(0,1fr)]
          xl:grid-cols-[280px_minmax(0,1fr)_360px]
        "
      >
        {/* Desktop sidebar */}
        <aside className="hidden w-[280px] md:block">
          <div className="sticky top-0 h-screen">
            <Sidebar />
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0">
          {/* Mobile header */}
          <header className="sticky top-0 z-40 flex h-16 items-center border-b border-grey_10 bg-white px-4 md:hidden">
            <button
              type="button"
              onClick={openMobileSidebar}
              aria-label="Open navigation menu"
              aria-expanded={isMobileSidebarOpen}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-grey_700 transition-colors hover:bg-grey_50"
            >
              <Menu size={24} />
            </button>
          </header>

          <main className="min-w-0">
            <Outlet />
          </main>
        </div>

        {/* Desktop suggestions panel */}
        <aside className="hidden w-[360px] border-l border-grey_10 px-6 xl:block">
          <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-20">
            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              <VerticalCarousel />
            </div>

            <div
              className={`mt-6 flex flex-wrap items-center justify-between gap-2 ${
                !isUserSubscribed ? "pb-10" : "pb-6"
              }`}
            >
              <Typography variant="labelOne" className="text-grey_400">
                Terms of service
              </Typography>

              <div className="h-[2px] w-[2px] rounded-full bg-grey_300" />

              <Typography variant="labelOne" className="text-grey_400">
                Privacy
              </Typography>

              <div className="h-[2px] w-[2px] rounded-full bg-grey_300" />

              <Typography variant="labelOne" className="text-grey_400">
                Cookie notice
              </Typography>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default withAuth(DashboardLayout);
