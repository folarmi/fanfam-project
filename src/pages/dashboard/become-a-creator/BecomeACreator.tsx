/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { CreatorHeaderText } from "@/components/atoms/CreatorHeaderText";
import CustomButton from "@/components/forms/CustomButton";
import Typography from "@/components/forms/Typography";
import RadioButton from "@/components/RadioButtonLabel";
import { becomeACreator } from "@/data";
import { Link } from "react-router-dom";
import creatorOne from "@/assets/icons/creatorOne.svg";
import { usePersonaVerification } from "@/hooks/usePersonaVerification";
import { useCustomMutation } from "@/hooks/apiCalls";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { showInlineToast } from "@/utils/toastUtils";

const BecomeACreator = () => {
  const queryClient = useQueryClient();
  const [inquiryId, setInquiryId] = useState<string | null>(null);

  const verifyCreatorMutation = useCustomMutation({
    endpoint: `profile/verify/${inquiryId}`,
    successMessage: () => "User Profile updated successfully",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: ["viewProfile"],
        exact: false,
      });
    },
  });

  const { open } = usePersonaVerification({
    templateId: import.meta.env.VITE_PERSONA_TEMPLATE_ID,
    environmentId: import.meta.env.VITE_PERSONA_ENVIRONMENT_ID,
    onComplete: (data) => {
      setInquiryId(data?.inquiryId);
      // setInquiryId("inq_2P9HD7sfvbt5KVdSpoUz7KKJhuto");
    },
    onCancel: () =>
      showInlineToast({
        type: "warning",
        title: "Verification cancelled",
      }),
    onError: (_error) =>
      showInlineToast({
        type: "error",
        title: "An error occurred",
      }),
  });

  useEffect(() => {
    if (inquiryId) {
      verifyCreatorMutation.mutate({});
    }
  }, [inquiryId]);

  return (
    <div className="mt-4">
      <CreatorHeaderText
        title="Monetize your contents"
        description=" Ready to start monetizing your contents become a creator now!"
        showBackButton={false}
      />

      <section className="border-t border-grey_10">
        <div
          className="flex items-center p-4 border border-grey_10 rounded-lg mt-4 mx-4 cursor-pointer"
          onClick={() => open()}
        >
          <img src={creatorOne} />

          <div className="ml-4">
            <Typography variant="subtitle2" className="">
              Verify Your Identity
            </Typography>
            <Typography variant="p3" className="">
              Upload an approved government ID to verify your identity
            </Typography>
          </div>

          <div className="flex-shrink-0 ml-auto">
            <RadioButton />
          </div>
        </div>
        {becomeACreator.map(({ id, image, subtitle, title, link }) => {
          return (
            <Link
              to={link}
              className="flex items-center p-4 border border-grey_10 rounded-lg mt-4 mx-4"
              key={id}
            >
              <img src={image} />

              <div className="ml-4">
                <Typography variant="subtitle2" className="">
                  {title}
                </Typography>
                <Typography variant="p3" className="">
                  {subtitle}
                </Typography>
              </div>

              <div className="flex-shrink-0 ml-auto">
                <RadioButton />
              </div>
            </Link>
          );
        })}
      </section>

      <div className="border-b border-grey_10">
        <CustomButton
          variant="primary"
          className="shadow-custom mb-4 mt-3 mx-4 w-[96%]"
        >
          Get Started
        </CustomButton>
      </div>
    </div>
  );
};

export { BecomeACreator };
