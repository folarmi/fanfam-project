import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/molecules/Sidebar";
import VerticalCarousel from "../components/VerticalCarousel";
import Typography from "../components/forms/Typography";
import withAuth from "@/hoc/withAuth";

const DashboardLayout = () => {
  const [isUserSubscribed] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-[1440px]">
      {/* Left Sidebar */}
      <aside className="hidden md:block md:w-[280px] shrink-0">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>

      {/* Right Suggestions Panel */}
      <aside className="hidden md:block md:w-[360px] shrink-0 px-8">
        <div className="sticky top-0 h-screen overflow-y-auto pt-20">
          <p className="mb-4 text-sm font-medium text-grey_800">SUGGESTIONS</p>

          <div className="max-h-[calc(100vh-140px)] overflow-y-auto pr-1">
            <VerticalCarousel />
          </div>

          <div
            className={`mt-6 flex items-center justify-between ${
              !isUserSubscribed ? "pb-10" : ""
            }`}
          >
            <Typography variant="labelOne" className="text-grey_400">
              Terms of service
            </Typography>

            <div className="h-[2px] w-[2px] rounded-full bg-grey_300" />

            <Typography variant="labelOne" className="text-grey_400">
              Privacy
            </Typography>

            <div className="h-[2px] w-[2px] rounded-full bg-grey_300" />

            <Typography variant="labelOne" className="text-grey_400">
              Cookie notice
            </Typography>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default withAuth(DashboardLayout);
