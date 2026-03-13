// /* eslint-disable @typescript-eslint/no-explicit-any */
// import Typography from "../forms/Typography";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useCustomMutation } from "../../hooks/apiCalls";
// import { sideBarItems } from "../../data";
// import { useDispatch } from "react-redux";
// import { logout } from "@/lib/features/auth/authSlice";
// import { useFetchProfile } from "@/hooks/apiHooks";
// import DefaultAvatar from "./DefaultAvatar";
// import { LogOutIcon } from "lucide-react";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const userString = localStorage.getItem("userObject");
//   const userObject = userString ? JSON.parse(userString) : null;
//   const { data: profileData } = useFetchProfile(userObject);

//   const handleLogout = () => {
//     navigate("/login");
//     localStorage.removeItem("token");
//     localStorage.removeItem("refreshToken");
//     dispatch(logout());
//     localStorage.clear();
//   };

//   const logOutMutation = useCustomMutation({
//     endpoint: "auth/logout",
//     successMessage: (data: any) => data?.data?.message,
//     errorMessage: (error: any) => error,
//     onSuccessCallback: handleLogout,
//     onError: handleLogout,
//   });

//   return (
//     <div className="hidden md:flex flex-col h-screen pr-12 pl-[109px] border-r border-grey_10">
//       {/* User Avatar */}
//       {
//         <div className="flex items-center my-6 bg-white">
//           {!profileData?.data?.coverImageUrl ? (
//             <DefaultAvatar
//               fullName={profileData?.data?.fullName || profileData?.data?.email}
//             />
//           ) : (
//             <img
//               src={profileData?.data?.coverImageUrl}
//               alt="defaultAvatar"
//               className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
//             />
//           )}

//           <div className="ml-3">
//             <div className="flex items-center mb-1">
//               <Typography
//                 variant="titleTwo"
//                 className="text-grey_900 whitespace-nowrap"
//               >
//                 {profileData?.data?.displayName || "John Doe"}
//               </Typography>

//               {/* {isCreator && (
//                 <img src={verifyBlue} alt="demo" className=" h-4 w-4" />
//               )} */}
//             </div>
//             <Typography variant="p2" className="text-grey_400">
//               {profileData?.data?.username || "John Doe"}
//             </Typography>
//           </div>
//         </div>
//       }

//       <div className="w-[25%]">
//         {sideBarItems
//           ?.filter((item) => item?.roles.includes(userObject?.role))
//           ?.map(({ id, name, image, link }) => {
//             return (
//               <Link
//                 className={`w-[236px] flex items-center mb-2 py-2 pl-4 rounded-lg ${
//                   location?.pathname === link ? " bg-blue_100" : ""
//                 }`}
//                 to={link}
//                 key={id}
//               >
//                 <div className="flex items-center">
//                   {typeof image === "function"
//                     ? image(location?.pathname === link)
//                     : image}
//                   <Typography
//                     variant="subtitle2"
//                     className="text-grey_400 pl-4"
//                   >
//                     {name}
//                   </Typography>
//                 </div>
//               </Link>
//             );
//           })}
//       </div>

//       <div
//         className="flex items-center py-2 pl-4 cursor-pointer"
//         onClick={() => logOutMutation.mutate({})}
//       >
//         <LogOutIcon />
//         <Typography variant="subtitle2" className="text-grey_400 pl-4">
//           Logout
//         </Typography>
//       </div>

//       {/* <div className="drop-shadow-5xl shadow-post-button w-[221px]">
//         <CustomButton className="mt-6 w-full">Post</CustomButton>
//       </div> */}
//     </div>
//   );
// };

// export default Sidebar;

/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "../forms/Typography";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCustomMutation } from "../../hooks/apiCalls";
import { sideBarItems } from "../../data";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/features/auth/authSlice";
import { useFetchProfile } from "@/hooks/apiHooks";
import DefaultAvatar from "./DefaultAvatar";
import { LogOutIcon } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userString = localStorage.getItem("userObject");
  const userObject = userString ? JSON.parse(userString) : null;

  const { data: profileData } = useFetchProfile(userObject);

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    dispatch(logout());
    localStorage.clear();
  };

  const logOutMutation = useCustomMutation({
    endpoint: "auth/logout",
    successMessage: (data: any) => data?.data?.message,
    errorMessage: (error: any) => error,
    onSuccessCallback: handleLogout,
    onError: handleLogout,
  });

  return (
    <div className="hidden h-screen flex-col overflow-y-auto border-r border-grey_10 bg-white px-6 md:flex">
      {/* User Avatar */}
      <div className="my-6 flex items-center bg-white">
        {!profileData?.data?.coverImageUrl ? (
          <DefaultAvatar
            fullName={profileData?.data?.fullName || profileData?.data?.email}
          />
        ) : (
          <img
            src={profileData?.data?.coverImageUrl}
            alt="defaultAvatar"
            className="h-10 w-10 rounded-full object-cover md:h-12 md:w-12"
          />
        )}

        <div className="ml-3 min-w-0">
          <div className="mb-1 flex items-center">
            <Typography
              variant="titleTwo"
              className="truncate whitespace-nowrap text-grey_900"
            >
              {profileData?.data?.fullName || "John Doe"}
            </Typography>
          </div>

          <Typography variant="p2" className="truncate text-grey_400">
            {profileData?.data?.username || "John Doe"}
          </Typography>
        </div>
      </div>

      {/* Nav Items */}
      <div className="">
        {sideBarItems
          ?.filter((item) => item?.roles.includes(userObject?.role))
          ?.map(({ id, name, image, link }) => {
            const isActive = location.pathname === link;

            return (
              <Link
                key={id}
                to={link}
                className={`mb-2 flex w-full items-center rounded-lg py-2 pl-4 ${
                  isActive ? "bg-blue_100" : ""
                }`}
              >
                <div className="flex items-center">
                  {typeof image === "function" ? image(isActive) : image}

                  <Typography
                    variant="subtitle2"
                    className="pl-4 text-grey_400"
                  >
                    {name}
                  </Typography>
                </div>
              </Link>
            );
          })}
      </div>

      {/* Logout */}
      <div
        className="flex cursor-pointer items-center py-2 pl-4"
        onClick={() => logOutMutation.mutate({})}
      >
        <LogOutIcon color="#8D8E96" />
        <Typography variant="subtitle2" className="pl-4 text-grey_400">
          Logout
        </Typography>
      </div>
    </div>
  );
};

export default Sidebar;
