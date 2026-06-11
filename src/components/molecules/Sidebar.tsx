import Typography from "../forms/Typography";
import { Link, useLocation } from "react-router-dom";
import { sideBarItems } from "../../data";
import { useFetchProfile } from "@/hooks/apiHooks";
import DefaultAvatar from "./DefaultAvatar";
import { LogOutIcon } from "lucide-react";
import Modal from "../modals/Modal";
import { useState } from "react";
import { LogoutModal } from "../modals/LogoutModal";

const Sidebar = () => {
  const location = useLocation();

  const [logoutModal, setLogoutModal] = useState(false);

  const userString = localStorage.getItem("userObject");
  const userObject = userString ? JSON.parse(userString) : null;

  const { data: profileData } = useFetchProfile(userObject);

  const toggleLogoutModal = () => {
    setLogoutModal(!logoutModal);
  };

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
        onClick={() => toggleLogoutModal()}
      >
        <LogOutIcon color="#8D8E96" />
        <Typography variant="subtitle2" className="pl-4 text-grey_400">
          Logout
        </Typography>
      </div>

      <Modal show={logoutModal} toggleModal={toggleLogoutModal}>
        <div className="p-4">
          <LogoutModal toggleModal={toggleLogoutModal} />
        </div>
      </Modal>
    </div>
  );
};

export default Sidebar;
