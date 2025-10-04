/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "../forms/Typography";
import CustomButton from "../forms/CustomButton";
import verifyBlue from "../../assets/icons/verifyBlue.svg";
import defaultAvatar from "../../assets/defaultAvatar.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCustomMutation } from "../../hooks/apiCalls";
import type { RootState } from "../../lib/store";
import { useAppSelector } from "../../lib/hook";
import { sideBarItems } from "../../data";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCreator } = useAppSelector((state: RootState) => state.auth);

  const logOutMutation = useCustomMutation({
    endpoint: "auth/logout",
    successMessage: (data: any) => data?.data?.message,
    errorMessage: (error: any) => error,
    onSuccessCallback: () => {
      navigate("/");
      localStorage.clear();
    },
  });

  return (
    <div className="hidden md:flex flex-col h-screen pr-12 pl-[109px] border-r border-grey_10">
      {/* User Avatar */}
      {
        <div className="flex items-center my-6 bg-white">
          <img src={defaultAvatar} alt="defaultAvatar" className="" />
          <div className="ml-3">
            <div className="flex items-center mb-1">
              <Typography
                variant="titleTwo"
                className="text-grey_900 whitespace-nowrap"
              >
                Priscilia yummy
              </Typography>

              {isCreator && (
                <img src={verifyBlue} alt="demo" className=" h-4 w-4" />
              )}
            </div>
            <Typography variant="p2" className="text-grey_400">
              @yummychill54
            </Typography>
          </div>
        </div>
      }

      <div className="w-[25%]">
        {sideBarItems.map(({ id, name, image, link }) => {
          return (
            <Link
              className={`w-[236px] flex items-center mb-2 py-2 pl-4 rounded-lg ${
                location?.pathname === link ? " bg-blue_100" : ""
              }`}
              to={link}
              key={id}
            >
              <div className="flex items-center">
                {/* <Image src={image} alt="icon" className="" /> */}
                {image}
                <Typography variant="subtitle2" className="text-grey_400 pl-4">
                  {name}
                </Typography>
              </div>
            </Link>
          );
        })}
      </div>

      <div
        className="flex items-center py-2 pl-4 cursor-pointer"
        onClick={() => logOutMutation.mutate({})}
      >
        {/* <Image src={image} alt="icon" className="" /> */}
        ff
        <Typography variant="subtitle2" className="text-grey_400 pl-4">
          Logout
        </Typography>
      </div>

      <div className="drop-shadow-5xl shadow-post-button w-[221px]">
        <CustomButton className="mt-6 w-full">Post</CustomButton>
      </div>
    </div>
  );
};

export default Sidebar;
