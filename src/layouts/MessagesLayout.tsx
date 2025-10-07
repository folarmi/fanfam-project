/* eslint-disable react-refresh/only-export-components */
import withAuth from "@/hoc/withAuth";
import Sidebar from "../components/molecules/Sidebar";
// import withAuth from "../hoc/withAuth";
import { Outlet } from "react-router-dom";

const MessagesLayout = () => {
  return (
    <div className="flex justify-center">
      <Sidebar />
      <main className="w-full md:w-[75%]">
        <Outlet />
      </main>
    </div>
  );
};

export default withAuth(MessagesLayout);
