/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCustomMutation } from "@/hooks/apiCalls";
import { logout } from "@/lib/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type Prop = {
  toggleModal: () => void;
};

const LogoutModal = ({ toggleModal }: Prop) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.clear();

    dispatch(logout());
    navigate("/login");
  };

  const logOutMutation = useCustomMutation({
    endpoint: "auth/logout",
    successMessage: (data: any) => data?.data?.message,
    errorMessage: (error: any) => error,
    onSuccessCallback: handleLogout,
    onError: handleLogout,
  });

  const isLoading = logOutMutation.isPending || logOutMutation.isPending;

  return (
    <div
      className="w-[calc(100vw-32px)] max-w-[482px] rounded-[18px] bg-white px-6 py-7 shadow-xl md:px-7"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="mb-2 text-xl font-semibold leading-tight text-[#2F3033]">
        Are you logging out?
      </h2>

      <p className="max-w-[390px] text-base leading-6 text-[#5F6067]">
        You are about to log out of your account, you can always log back in
        anytime using your email and your password.
      </p>

      <div className="mt-7 flex items-center justify-end gap-5">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => logOutMutation.mutate({})}
          className="rounded-full border border-[#E5E7EB] bg-[#F8F8F8] px-4 py-2 text-sm font-medium text-[#2F3033] transition hover:bg-[#EFEFEF] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Logging out..." : "Yes Logout."}
        </button>

        <button
          type="button"
          disabled={isLoading}
          onClick={toggleModal}
          className="rounded-full bg-[#2599F6] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(37,153,246,0.35)] transition hover:bg-[#1A80D8] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Stay logged In.
        </button>
      </div>
    </div>
  );
};

export { LogoutModal };
