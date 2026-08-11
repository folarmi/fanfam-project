import Typography from "../forms/Typography";
import { Link, useLocation } from "react-router-dom";
import { sideBarItems } from "../../data";
import { useFetchProfile } from "@/hooks/apiHooks";
import DefaultAvatar from "./DefaultAvatar";
import { LogOutIcon, X } from "lucide-react";
import Modal from "../modals/Modal";
import { useState } from "react";
import { LogoutModal } from "../modals/LogoutModal";
import { isEmail } from "@/utils/helper";

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isMobile = false, onClose }: SidebarProps) => {
  const location = useLocation();
  const [logoutModal, setLogoutModal] = useState(false);

  const userString = localStorage.getItem("userObject");

  let userObject = null;

  try {
    userObject = userString ? JSON.parse(userString) : null;
  } catch {
    userObject = null;
  }

  const { data: profileData } = useFetchProfile(userObject);

  const toggleLogoutModal = () => {
    setLogoutModal((previousValue) => !previousValue);
  };

  const handleNavigation = () => {
    if (isMobile) {
      onClose?.();
    }
  };

  return (
    <div
      className={`h-full flex-col overflow-y-auto border-r border-grey_10 bg-white px-6 ${
        isMobile ? "flex w-full" : "hidden w-[280px] md:flex"
      }`}
    >
      {/* Mobile close button */}
      {isMobile && (
        <div className="flex justify-end pt-5">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-grey_500 transition-colors hover:bg-grey_50"
          >
            <X size={24} />
          </button>
        </div>
      )}

      {/* User Avatar */}
      <div className={`${isMobile ? "mb-6 mt-2" : "my-6"} flex items-center`}>
        {!profileData?.data?.coverImageUrl ? (
          <DefaultAvatar
            fullName={
              profileData?.data?.fullName || profileData?.data?.email || "User"
            }
          />
        ) : (
          <img
            src={profileData.data.coverImageUrl}
            alt={`${profileData?.data?.fullName || "User"} profile`}
            className="h-12 w-12 rounded-full object-cover"
          />
        )}

        <div className="ml-3 min-w-0 flex-1">
          <Typography
            variant="titleTwo"
            className="truncate whitespace-nowrap text-grey_900"
          >
            {profileData?.data?.fullName || "John Doe"}
          </Typography>

          {!isEmail(profileData?.data?.username) && (
            <Typography variant="p2" className="truncate text-grey_400">
              {profileData?.data?.username}
            </Typography>
          )}
        </div>
      </div>

      {/* Navigation items */}
      <nav className="flex-1">
        {sideBarItems
          ?.filter((item) => item?.roles.includes(userObject?.role))
          ?.map(({ id, name, image, link, exact }) => {
            const isActive = exact
              ? location.pathname === link
              : location.pathname === link ||
                location.pathname.startsWith(`${link}/`);

            return (
              <Link
                key={id}
                to={link}
                onClick={handleNavigation}
                className={`mb-2 flex w-full items-center rounded-lg px-4 py-3 transition-colors ${
                  isActive ? "bg-blue_100" : "hover:bg-grey_50"
                }`}
              >
                {typeof image === "function" ? image(isActive) : image}

                <Typography
                  variant="subtitle2"
                  className={`pl-4 ${
                    isActive ? "text-blue_600" : "text-grey_400"
                  }`}
                >
                  {name}
                </Typography>
              </Link>
            );
          })}
      </nav>

      {/* Logout */}
      <button
        type="button"
        className="mb-6 flex w-full items-center rounded-lg px-4 py-3 text-left transition-colors hover:bg-grey_50"
        onClick={toggleLogoutModal}
      >
        <LogOutIcon color="#8D8E96" />

        <Typography variant="subtitle2" className="pl-4 text-grey_400">
          Logout
        </Typography>
      </button>

      <Modal show={logoutModal} toggleModal={toggleLogoutModal}>
        <div className="p-4">
          <LogoutModal toggleModal={toggleLogoutModal} />
        </div>
      </Modal>
    </div>
  );
};

export default Sidebar;
