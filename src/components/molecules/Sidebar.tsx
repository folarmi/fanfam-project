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
