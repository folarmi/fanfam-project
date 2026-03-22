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
//   // const userObject = { role: UserRole.creator }; // Mocked userObject for demonstration
//   const { showAccountOnMobile } = useAppSelector(
//     (state: RootState) => state.settingMobile
//   );

//   const toggleView = () => {
//     if (window.innerWidth <= 425) {
//       dispatch(updateAccountShowOnMobile(true));
//     }
//   };

//   // Filter menu items for display
//   const filteredMenuItems = subscriptionMenu?.filter((item) => {
//     if (userObject.role === UserRole.creator) {
//       // Show items for creators: items meant for creators and shared items
//       return item.isViewer === true || item.isViewer === false;
//     } else {
//       // Show items for regular users: items explicitly for users and shared items
//       return item.isViewer === true || item.isViewer === undefined;
//     }
//   });

//   return (
//     <div className="flex justify-center">
//       <Sidebar />

//       <section
//         className={`${showAccountOnMobile ? "hidden" : "w-full md:w-[25%]"} `}
//       >
//         <div
//           className="w-full bg-grey_20 py-3 h-14 px-4 border
//      border-grey_20 shadow-custom-combined mb-2"
//         >
//           <Typography variant="subtitle1">My Account</Typography>
//         </div>

//         {filteredMenuItems?.map(({ id, name, path }) => {
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
//           showAccountOnMobile
//             ? "w-full"
//             : "hidden md:block md:w-[50%] md:pr-[88px]"
//         }`}
//       >
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default withAuth(AccountLayout);

/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import rightAshArrow from "../assets/icons/rightAshArrow.svg";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../lib/hook";
import type { RootState } from "../lib/store";
import { updateAccountShowOnMobile } from "../lib/features/mobileView/settingMobileViewSlice";
import { subscriptionMenu, UserRole } from "../data";
import Sidebar from "../components/molecules/Sidebar";
import Typography from "../components/forms/Typography";
import withAuth from "@/hoc/withAuth";

const AccountLayout = () => {
  const dispatch = useAppDispatch();
  const [isActiveTab, setIsActiveTab] = useState("Add Card");
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const { showAccountOnMobile } = useAppSelector(
    (state: RootState) => state.settingMobile,
  );

  const toggleView = () => {
    if (window.innerWidth <= 425) {
      dispatch(updateAccountShowOnMobile(true));
    }
  };

  const filteredMenuItems = subscriptionMenu?.filter((item) => {
    if (userObject.role === UserRole.creator) {
      return item.isViewer === true || item.isViewer === false;
    } else {
      return item.isViewer === true || item.isViewer === undefined;
    }
  });

  return (
    <div className="mx-auto flex w-full max-w-[1440px]">
      {/* Left Sidebar */}
      <aside className="hidden md:block md:w-[280px] shrink-0">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </aside>

      {/* Account Nav Panel */}
      <aside
        className={`${
          showAccountOnMobile ? "hidden" : "w-full"
        } md:block md:w-[280px] shrink-0 border-r border-grey_10`}
      >
        <div className="sticky top-0 h-screen overflow-y-auto">
          <div className="w-full bg-grey_20 py-3 px-4 h-14 border border-grey_20 shadow-custom-combined mb-2">
            <Typography variant="subtitle1">My Account</Typography>
          </div>

          {filteredMenuItems?.map(({ id, name, path }) => (
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
      {/* <main
        className={`${
          showAccountOnMobile ? "w-full" : "hidden md:block"
        } min-w-0 flex-1`}
      >
        <Outlet />
      </main> */}
      <main
        className={`${
          showAccountOnMobile
            ? "w-full"
            : "hidden md:block md:w-[50%] md:pr-[88px]"
        } min-w-0`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default withAuth(AccountLayout);
