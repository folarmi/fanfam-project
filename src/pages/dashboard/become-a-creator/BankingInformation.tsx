import { CreatorHeaderText } from "@/components/atoms/CreatorHeaderText";
import CustomButton from "@/components/forms/CustomButton";
import CustomInput from "@/components/forms/CustomInput";
import CustomSelect from "@/components/forms/CustomSelect";
import { banks, getAllCountryOptionsWithNames } from "@/data";
import { useCustomMutation } from "@/hooks/apiCalls";
import type { BankingInfo } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const BankingInformation = () => {
  const { control, handleSubmit } = useForm<BankingInfo>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const countryOptions = useMemo(() => getAllCountryOptionsWithNames(), []);

  const creatorBankInfoMutation = useCustomMutation({
    endpoint: "profile/creator-bank-info",
    method: "put",
    successMessage: () => "User Profile updated successfully",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: ["viewProfile"],
        exact: false,
      });
      navigate(-1);
    },
  });

  const onSubmit = (data: BankingInfo) => {
    creatorBankInfoMutation.mutate(data);
  };

  return (
    <div className="mt-4">
      <div className="mx-4">
        <CreatorHeaderText
          title="Complete Banking Information"
          description="Complete your banking information"
        />
      </div>

      <section className="border-t border-b border-grey_10">
        <form
          className="mx-4 mt-4 flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomSelect
            name="country"
            options={countryOptions}
            control={control}
            label="Country"
            ifLabel
            rules={{ required: "Country is required" }}
          />
          <CustomSelect
            name="bankName"
            options={banks}
            control={control}
            label="Bank Name"
            ifLabel
            rules={{ required: "Bank name is required" }}
          />

          <CustomInput
            label="Bank Code"
            name="bankCode"
            control={control}
            placeholder="345"
            rules={{ required: "Bank Code is required" }}
          />
          <CustomInput
            label="Account Number"
            name="accountNo"
            control={control}
            placeholder="2000211109"
            rules={{ required: "Account number is required" }}
          />
          <CustomInput
            label="Account name"
            name="accountName"
            control={control}
            placeholder="Cynthia Ofore"
            rules={{ required: "Account name is required" }}
          />

          <CustomButton
            disabled={creatorBankInfoMutation.isPending}
            loading={creatorBankInfoMutation.isPending}
            variant="primary"
            className="shadow-custom mb-4 mt-3 mx-4 w-[96%]"
          >
            Save
          </CustomButton>
        </form>
      </section>
    </div>
  );
};

export { BankingInformation };
