"use client";

import CustomButton from "@components/forms/CustomButton";
import CustomInput from "@components/forms/CustomInput";
import Typography from "@components/forms/Typography";
import AddBundle from "@components/modals/AddBundle";
import FreeTrialLink from "@components/modals/FreeTrialLink";
import Modal from "@components/modals/Modal";
import PromotionalCampaign from "@components/modals/PromotionalCampaign";
import Tag from "@components/molecules/Tag";
import {
  happyPeopleFeed,
  limitedOfferData,
  subBundles,
  subscriptionSettings,
} from "@/data";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SubscriptionHeader } from "./SubscriptionHeader";

const SubscriptionSettings = () => {
  const { control } = useForm();
  const [isPromotionalCampaign, setIsPromotionalCampaign] = useState(false);
  const [isFreeTrialLink, setIsFreeTrialLink] = useState(false);
  const [isPromotion, setIsPromotion] = useState(false);
  const [isFreeTrial, setIsFreeTrial] = useState(false);
  const [isBundleModal, setIsBundleModal] = useState(false);
  const [isBundleContent, setIsBundleContent] = useState(false);

  const toggleModal = (buttonText: string) => {
    if (buttonText === "Start promotion campaign")
      setIsPromotionalCampaign(!isPromotionalCampaign);
    else if (buttonText === "Create new free trial link")
      setIsFreeTrialLink(!isFreeTrialLink);
    else if (buttonText === "Add bundle") setIsBundleModal(!isBundleModal);
  };

  return (
    <div>
      <SubscriptionHeader text="Subscription Settings" />

      <section className="mt-4 ml-4 p-4 shadow-timeline-card-shadow">
        <CustomInput
          label="Price per month"
          name="phoneNumber"
          control={control}
          rules={{
            required: "Price per month is required",
          }}
        />

        <div className="flex items-center justify-between -mt-3">
          <Typography variant="p3" className="text-grey_500">
            Minimum $5 or free
          </Typography>

          <div className="flex items-center">
            <CustomButton
              //   onClick={toggleModal}
              variant="secondary"
              className="text-xs mr-4 w-[84px]"
            >
              Cancel
            </CustomButton>
            <CustomButton variant="primary" className="text-xs px-3 w-[84px]">
              Save
            </CustomButton>
          </div>
        </div>
      </section>

      <div className="ml-4">
        {subscriptionSettings?.map(({ id, buttonText, desc, name }) => {
          return (
            <div key={id} className="mt-6 p-4 shadow-timeline-card-shadow">
              <Typography variant="subtitle2" className="text-grey_800">
                {name}
              </Typography>
              <Typography variant="p2" className="text-grey_500 pb-[2px]">
                {desc}
              </Typography>
              <div className="flex ml-auto justify-end mt-2">
                <CustomButton
                  onClick={() => toggleModal(buttonText)}
                  variant="secondary"
                  className="text-xs w-fit cursor-pointer flex-shrink-0"
                >
                  {buttonText}
                </CustomButton>
              </div>

              {id === 1 && isPromotion && (
                <div className="">
                  <Typography variant="titleTwo" className="text-grey_800 py-4">
                    Limited offer for 7 days
                  </Typography>

                  <div className="flex items-center mb-4">
                    <Tag text="Free trial" />
                    <Tag text="New subscribers only" />
                  </div>

                  {limitedOfferData?.map(({ id, date, name }) => {
                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between border-b border-grey_10 py-2"
                      >
                        <Typography variant="p2" className="text-grey_500">
                          {name}
                        </Typography>
                        <Typography variant="p2" className="text-grey_800">
                          {date}
                        </Typography>
                      </div>
                    );
                  })}

                  <div className="flex items-center justify-end mt-8 ml-auto">
                    <CustomButton
                      //   onClick={toggleModal}
                      onClick={() => setIsPromotion(false)}
                      variant="secondary"
                      className="text-xs mr-4 w-fit"
                    >
                      Stop promotion
                    </CustomButton>
                    <CustomButton
                      variant="primary"
                      className="text-xs px-3 w-fit"
                    >
                      Copy link to profile
                    </CustomButton>
                  </div>
                </div>
              )}

              {id === 2 && isBundleContent && (
                <div className="mt-2">
                  {subBundles?.map(({ amount, duration, id }) => {
                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between border border-grey_100 px-4 py-6 rounded-2xl mb-4"
                      >
                        <div className="flex items-center">
                          <div className="flex flex-col md:flex-row md:items-center mr-6">
                            <Typography variant="p2" className="text-grey_500">
                              Amount:
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              className="text-grey_800 md:pl-2"
                            >
                              {amount}
                            </Typography>
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center">
                            <Typography variant="p2" className="text-grey_500">
                              Duration:
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              className="text-grey_800 md:pl-2"
                            >
                              {duration}
                            </Typography>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <CustomButton
                            variant="secondary"
                            className="text-xs mr-4 w-fit"
                          >
                            Edit Bundle
                          </CustomButton>

                          <CustomButton
                            variant="secondary"
                            className="text-xs mr-4 w-fit"
                            onClick={() => setIsBundleContent(false)}
                          >
                            Delete
                          </CustomButton>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {id === 3 && isFreeTrial && (
                <div className="">
                  <Typography variant="titleTwo" className="text-grey_800 py-4">
                    Happy people ( 2 days free trial )
                  </Typography>

                  <div className="flex items-center mb-4">
                    <Tag text="Free trial" />
                    <Tag text="New subscribers only" />
                  </div>

                  {happyPeopleFeed?.map(({ id, date, name }) => {
                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between border-b border-grey_10 py-2"
                      >
                        <Typography variant="p2" className="text-grey_500">
                          {name}
                        </Typography>
                        <Typography variant="p2" className="text-grey_800">
                          {date}
                        </Typography>
                      </div>
                    );
                  })}

                  <div className="flex items-center justify-end ml-auto my-8 w-1/3">
                    <CustomButton
                      onClick={() => setIsFreeTrial(false)}
                      variant="secondary"
                      className="text-xs mr-4 w-fit"
                      primaryButtonSize="xs"
                    >
                      Delete
                    </CustomButton>
                    <CustomButton
                      variant="primary"
                      className="text-xs px-3 w-fit"
                      primaryButtonSize="xs"
                    >
                      Copy link
                    </CustomButton>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Modal
        show={isPromotionalCampaign}
        toggleModal={() => toggleModal("Start promotion campaign")}
      >
        <PromotionalCampaign toggleModal={toggleModal} />
      </Modal>

      <Modal
        show={isFreeTrialLink}
        toggleModal={() => toggleModal("Create new free trial link")}
      >
        <FreeTrialLink toggleModal={toggleModal} />
      </Modal>

      <Modal show={isBundleModal} toggleModal={() => toggleModal("Add Bundle")}>
        <AddBundle toggleModal={toggleModal} />
      </Modal>
    </div>
  );
};

export { SubscriptionSettings };
