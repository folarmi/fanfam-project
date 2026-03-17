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
//     <div className="flex md:justify-center">
//       <Sidebar />

//       <section className={`${showOnMobile ? "hidden" : "w-full md:w-[25%]"} `}>
//         <div
//           className="w-full bg-grey_20 py-3 px-4 h-14 border
//      border-grey_20 shadow-custom-combined mb-2"
//         >
//           <Typography variant="subtitle1">Settings</Typography>
//         </div>

//         {settingsModule?.map(({ id, name, path }) => {
//           return (
//             <Link
//               key={id}
//               to={path}
//               onClick={() => setIsActiveTab(name)}
//               className={`flex items-center justify-between cursor-pointer px-4 py-3 border-b border-grey_10 hover:bg-blue_200 ${
//                 isActiveTab === name ? "bg-blue_200" : ""
//               }`}
//             >
//               <div onClick={toggleView}>
//                 <Typography variant="p2" className="text-grey_800">
//                   {name}
//                 </Typography>
//               </div>

//               <img
//                 src={rightAshArrow}
//                 alt="rightAshArrow"
//                 className="w-6 h-6"
//               />
//             </Link>
//           );
//         })}
//       </section>

//       <main
//         className={`${
//           showOnMobile ? "w-full" : "hidden md:block md:w-[50%] md:pr-[88px]"
//         }`}
//       >
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default withAuth(SettingLayout);

/* eslint-disable react-refresh/only-export-components */
import { settingsModule } from "@/data";
import { useState } from "react";
import Typography from "@components/forms/Typography";
import rightAshArrow from "@/assets/icons/rightAshArrow.svg";
import Sidebar from "@components/molecules/Sidebar";
import { useAppSelector } from "@/lib/hook";
import { useDispatch } from "react-redux";
import { updateShowOnMobile } from "@/lib/features/mobileView/settingMobileViewSlice";
import type { RootState } from "@/lib/store";
import { Link, Outlet } from "react-router-dom";
import withAuth from "@/hoc/withAuth";

const SettingLayout = () => {
  const dispatch = useDispatch();
  const [isActiveTab, setIsActiveTab] = useState("Account");
  const { showOnMobile } = useAppSelector(
    (state: RootState) => state.settingMobile,
  );

  const toggleView = () => {
    if (window.innerWidth <= 425) {
      dispatch(updateShowOnMobile(true));
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[1440px]">
      {/* Left Sidebar — mirrors dashboard */}
      <aside className="hidden md:block md:w-[280px] shrink-0">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </aside>

      {/* Settings Nav Panel */}
      <aside
        className={`${
          showOnMobile ? "hidden" : "w-full"
        } md:block md:w-[280px] shrink-0 border-r border-grey_10`}
      >
        <div className="sticky top-0 h-screen overflow-y-auto">
          <div className="w-full bg-grey_20 py-3 px-4 h-14 border border-grey_20 shadow-custom-combined mb-2">
            <Typography variant="subtitle1">Settings</Typography>
          </div>

          {settingsModule?.map(({ id, name, path }) => (
            <Link
              key={id}
              to={path}
              onClick={() => {
                setIsActiveTab(name);
                toggleView();
              }}
              className={`flex items-center justify-between cursor-pointer px-4 py-3 border-b border-grey_10 hover:bg-blue_200 ${
                isActiveTab === name ? "bg-blue_200" : ""
              }`}
            >
              <Typography variant="p2" className="text-grey_800">
                {name}
              </Typography>
              <img src={rightAshArrow} alt="" className="w-6 h-6" />
            </Link>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`${
          showOnMobile ? "w-full" : "hidden md:block"
        } min-w-0 flex-1`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default withAuth(SettingLayout);
