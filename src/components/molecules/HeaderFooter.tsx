import headerFooter from "@assets/headerFooter.svg";
import HeaderText from "../atoms/HeaderText";
import StackedInput from "../forms/StackedInput";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import HeaderButton from "../atoms/HeaderButton";

const HeaderFooter = () => {
  const { control } = useForm();
  return (
    <div className=" ">
      <img src={headerFooter} />

      <div className="py-[101px] bg-primaryTwo flex flex-col justify-center items-center">
        <HeaderText text="Be Among the First" />
        <p className="text-lg pt-2 max-w-[420px] text-center text-white_600">
          Join the waitlist and get exclusive early access when we launch. Plus,
          help shape the future of FanFam.
        </p>

        <form className="mt-[30px] w-1/4 flex flex-col gap-y-5">
          <StackedInput
            name="fullName"
            control={control}
            label="Full Name"
            placeholder="Enter your Full Name.."
            rules={{ required: "Full name is required" }}
            borderRadius="xl"
            borderStyle="none"
          />
          <StackedInput
            name="fullName"
            control={control}
            label="Email Address"
            placeholder="Enter your email address.."
            rules={{ required: "Full name is required" }}
            borderRadius="xl"
            borderStyle="none"
          />
          <StackedInput
            name="fullName"
            control={control}
            label="What Best Describes you"
            placeholder="Select one (creator, community, brand)"
            rules={{ required: "Full name is required" }}
            borderRadius="xl"
            borderStyle="none"
          />
          <StackedInput
            name="fullName"
            control={control}
            label="What do you hope to achieve with FanFam"
            placeholder="e.g build a membership community for my audience..."
            rules={{ required: "Full name is required" }}
            borderRadius="xl"
            borderStyle="none"
          />

          <HeaderButton
            label="Get Early Access"
            className="bg-red-900"
            icon={<ArrowRight className="w-4 h-4" />}
          />
        </form>
      </div>
    </div>
  );
};

export { HeaderFooter };
