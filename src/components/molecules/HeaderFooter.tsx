/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-irregular-whitespace */
import headerFooter from "@assets/headerFooter.svg";
import HeaderText from "../atoms/HeaderText";
import StackedInput from "../forms/StackedInput";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import HeaderButton from "../atoms/HeaderButton";
import { useCustomMutation } from "@/hooks/apiCalls";
import logo from "@/assets/icons/fanNation.svg";

const HeaderFooter = () => {
  const { control, handleSubmit } = useForm();

  const joinWaitListMutation = useCustomMutation({
    endpoint: `waitlist/join`,
    successMessage: (data: any) => data?.message,
    // successMessage: (data: any) => console.log(data?.message),
    // errorMessage: (error: any) => error,
    onSuccessCallback: () => {},
  });

  const submitForm = (data: any) => {
    joinWaitListMutation.mutate(data);
  };

  return (
    <div className="w-full">
      <img src={headerFooter} className="w-full h-auto object-cover" />

      <div className="py-16 px-6 bg-primaryTwo flex flex-col justify-center items-center sm:px-8 md:px-10 lg:px-16">
        <HeaderText text="Be Among the First" />
        <p className="text-lg pt-2 max-w-[425px] text-center text-white_600">
          Join the waitlist and get exclusive early access when we launch. Plus,
          help shape the future of Fan Nation.
        </p>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="mt-8 w-full max-w-[460px] flex flex-col gap-y-5"
        >
          <StackedInput
            name="firstname"
            control={control}
            label="First Name"
            placeholder="Enter your First Name.."
            rules={{ required: "First name is required" }}
            borderRadius="xl"
            borderStyle="none"
          />
          <StackedInput
            name="lastname"
            control={control}
            label="Last Name"
            placeholder="Enter your Last Name.."
            borderRadius="xl"
            borderStyle="none"
          />
          <StackedInput
            name="email"
            control={control}
            label="Email Address"
            placeholder="Enter your email address.."
            rules={{ required: "Email is required" }}
            borderRadius="xl"
            borderStyle="none"
          />
          <StackedInput
            name="userType"
            control={control}
            label="What Best Describes you"
            placeholder="(creator, community, brand)"
            borderRadius="xl"
            borderStyle="none"
          />
          <StackedInput
            name="aspiration"
            control={control}
            label="What do you hope to achieve with FanFam"
            placeholder="e.g build a membership community for my audience..."
            // rules={{ required: "Full name is required" }}
            borderRadius="xl"
            borderStyle="none"
          />

          <HeaderButton
            className="w-full sm:w-auto"
            label="Get Early Access"
            bg="dark"
            disabled={joinWaitListMutation?.isPending}
            loading={joinWaitListMutation?.isPending}
            icon={<ArrowRight className="w-4 h-4" />}
          />

          <p className="text-white_600 font-medium text-xs text-center max-w-[408px] mx-auto">
            By joining, you agree to receive updates about Fan Nation. We
            respect your privacy and won't spam you.
          </p>
        </form>
      </div>

      <footer className="bg-white py-5 px-6 flex flex-col gap-y-4 items-center text-center sm:px-10 md:px-16 lg:px-20 lg:flex-row lg:justify-between lg:text-left">
        <img
          src={logo}
          alt="Fan Nation"
          className="h-10 md:h-12 w-auto object-contain"
        />
        <p className="font-normal text-sm text-grey_60">
          © 2026 Fan Nation. All rights reserved.
        </p>
        <div className="flex flex-col items-center gap-y-2 sm:flex-row sm:gap-x-6 lg:items-center">
          <p className="font-normal text-sm text-grey_60">Privacy</p>
          <p className="font-normal text-sm text-grey_60">Terms</p>
        </div>
      </footer>
    </div>
  );
};

export { HeaderFooter };
