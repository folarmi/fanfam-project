/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { Outlet } from "react-router-dom";
// import api from "../lib/axios";
// import { toast } from "react-toastify";
import Sidebar from "../components/molecules/Sidebar";
import VerticalCarousel from "../components/VerticalCarousel";
import { UserRole } from "../data";
import Typography from "../components/forms/Typography";
import { useAppSelector } from "../lib/hook";
// import { useMutation } from "@tanstack/react-query";
import type { RootState } from "../lib/store";
import withAuth from "@/hoc/withAuth";

const DashboardLayout = () => {
  // const navigate = useNavigate();
  const [isUserSubscribed] = useState(true);
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  // const logOutMutation = useMutation({
  //   mutationFn: async () => {
  //     const response = await api.post("auth/logout");
  //     return response;
  //   },
  //   onSuccess: (data) => {
  //     if (data?.status === 200) {
  //       navigate("/");
  //       localStorage.clear();
  //     }
  //   },
  //   onError: (error: any) => {
  //     toast.error(error?.response?.data?.data?.message);
  //   },
  // });

  return (
    <div className="flex justify-center">
      <Sidebar />
      <main className="w-full md:w-[50%]">
        {" "}
        <Outlet />{" "}
      </main>

      <div className="hidden md:block w-[25%] px-8 mt-20">
        {isUserSubscribed && (
          <div className="">
            {userObject.role !== UserRole.creator && (
              <p className="font-medium text-sm text-grey_800">SUGGESTIONS</p>
            )}
            <VerticalCarousel />
          </div>
        )}

        <div
          className={`flex items-center justify-between mt-3 ${
            !isUserSubscribed ? "h-[674px]" : ""
          }`}
        >
          <Typography variant="labelOne" className="text-grey_400">
            Terms of service
          </Typography>
          <div className="bg-grey_300 w-[2px] h-[2px]"></div>
          <Typography variant="labelOne" className="text-grey_400">
            Privacy
          </Typography>
          <div className="bg-grey_300 w-[2px] h-[2px]"></div>
          <Typography variant="labelOne" className="text-grey_400">
            Cookie notice
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default withAuth(DashboardLayout);
