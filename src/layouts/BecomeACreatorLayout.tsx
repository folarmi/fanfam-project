/* eslint-disable react-refresh/only-export-components */
import withAuth from "@/hoc/withAuth";
import Sidebar from "../components/molecules/Sidebar";
// import withAuth from "../hoc/withAuth";
import { Outlet } from "react-router-dom";
import Typography from "@/components/forms/Typography";

const BecomeACreatorLayout = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <main className="w-full md:w-[50%] border-r border-grey_10">
        <div className="border-b border-grey_20 py-[18px] px-4">
          <Typography variant="subtitle1">Become a Creator</Typography>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default withAuth(BecomeACreatorLayout);
