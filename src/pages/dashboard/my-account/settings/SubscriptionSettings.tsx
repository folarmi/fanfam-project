/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomButton from "@components/forms/CustomButton";
import CustomInput from "@components/forms/CustomInput";
import Typography from "@components/forms/Typography";
import BundleForm from "@/components/modals/BundleForm";
import FreeTrialLink from "@components/modals/FreeTrialLink";
import Modal from "@components/modals/Modal";
import PromotionalCampaign from "@components/modals/PromotionalCampaign";
import Tag from "@components/molecules/Tag";
import {
  getHappyPeopleFeed,
  limitedOfferData,
  subscriptionSettings,
} from "@/data";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SubscriptionHeader } from "./SubscriptionHeader";
import { useCustomMutation } from "@/hooks/apiCalls";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import { Loader } from "@/components/molecules/Loader";
import { useFetchProfile } from "@/hooks/apiHooks";
import {
  EMPTY_BUNDLE,
  type FreeTrial,
  type SubscriptionBundle,
} from "@/lib/types";
import { ConfirmDeletion } from "@/components/modals/ConfirmDeletion";

type Prop = {
  showHeader?: boolean;
};

const SubscriptionSettings = ({ showHeader = true }: Prop) => {
  const { control, handleSubmit } = useForm();
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const { data, isLoading, refetch } = useFetchProfile(userObject);

  const subscriptionAmountMutation = useCustomMutation({
    endpoint: `subscriptions/amount`,
    useQueryParams: true,
    successMessage: () => "Subscription Amount updated successfully",
    onSuccessCallback: () => {},
  });

  const [isPromotionalCampaign, setIsPromotionalCampaign] = useState(false);
  const [isFreeTrialLink, setIsFreeTrialLink] = useState(false);
  const [isPromotion, setIsPromotion] = useState(false);
  const [isBundleModal, setIsBundleModal] = useState(false);
  const [deleteFreeTrialLink, setDeleteFreeTrialLink] = useState(false);
  const [deleteSubBundle, setDeleteSubBundle] = useState(false);
  const [selectedFreeTrialLink, setSelectedFreeTrialLink] = useState("");
  const [selectedBundle, setSelectedBundle] =
    useState<SubscriptionBundle>(EMPTY_BUNDLE);

  const toggleModal = (buttonText: string) => {
    if (buttonText === "Start promotion campaign")
      setIsPromotionalCampaign(!isPromotionalCampaign);
    else if (buttonText === "Create new free trial link")
      setIsFreeTrialLink(!isFreeTrialLink);
    else if (buttonText === "Add bundle") setIsBundleModal(!isBundleModal);
  };

  const toggleDeleteFreeTrial = () => {
    setDeleteFreeTrialLink(!deleteFreeTrialLink);
  };

  const toggleDeleteSubBundle = () => {
    setDeleteSubBundle(!deleteSubBundle);
  };

  const submitAmount = (data: any) => {
    subscriptionAmountMutation.mutate({
      params: {
        amount: data?.amount,
      },
    });
  };

  const deleteFreeTrialLinkMutation = useCustomMutation({
    endpoint: `subscriptions/freetrial/${selectedFreeTrialLink}`,
    method: "delete",
    successMessage: () => "Free Trial Link deleted successfully",
    onSuccessCallback: () => {
      refetch();
    },
  });

  const deleteBundleMutation = useCustomMutation({
    endpoint: `subscriptions/bundle/${selectedBundle.publicId}`,
    method: "delete",
    successMessage: () => "Bundle deleted successfully",
    onSuccessCallback: () => {
      refetch();
    },
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {showHeader && <SubscriptionHeader text="Subscription Settings" />}

          <form
            onSubmit={handleSubmit(submitAmount)}
            className="mt-4 ml-4 p-4 shadow-timeline-card-shadow"
          >
            <CustomInput
              label="Price per month"
              name="amount"
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
                <CustomButton
                  loading={subscriptionAmountMutation.isPending}
                  disabled={subscriptionAmountMutation.isPending}
                  variant="primary"
                  className="text-xs px-3 w-[84px]"
                >
                  Save
                </CustomButton>
              </div>
            </div>
          </form>

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
                      onClick={() => {
                        if (id === 2) setSelectedBundle(EMPTY_BUNDLE);
                        toggleModal(buttonText);
                      }}
                      variant="secondary"
                      className="text-xs w-fit cursor-pointer flex-shrink-0"
                    >
                      {buttonText}
                    </CustomButton>
                  </div>

                  {id === 1 && isPromotion && (
                    <div className="">
                      <Typography
                        variant="titleTwo"
                        className="text-grey_800 py-4"
                      >
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

                  <div className="mt-2">
                    {id === 2 &&
                      data?.data?.creatorProfile?.subscriptionBundles?.map(
                        (item: SubscriptionBundle) => {
                          return (
                            <div
                              key={id}
                              className="flex items-center justify-between border border-grey_100 px-4 py-6 rounded-2xl mb-4"
                            >
                              <div className="flex items-center">
                                <div className="flex flex-col md:flex-row md:items-center mr-6">
                                  <Typography
                                    variant="p2"
                                    className="text-grey_500"
                                  >
                                    Amount:
                                  </Typography>
                                  <Typography
                                    variant="subtitle2"
                                    className="text-grey_800 md:pl-2"
                                  >
                                    {item.amount}
                                  </Typography>
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center">
                                  <Typography
                                    variant="p2"
                                    className="text-grey_500"
                                  >
                                    Duration:
                                  </Typography>
                                  <Typography
                                    variant="subtitle2"
                                    className="text-grey_800 md:pl-2"
                                  >
                                    {item.durationInMonths || 0}
                                  </Typography>
                                </div>
                              </div>

                              <div className="flex items-center">
                                <CustomButton
                                  variant="secondary"
                                  className="text-xs mr-4 w-fit"
                                  onClick={() => {
                                    setSelectedBundle(item);
                                    toggleModal("Add bundle");
                                  }}
                                >
                                  Edit Bundle
                                </CustomButton>

                                <CustomButton
                                  variant="secondary"
                                  className="text-xs mr-4 w-fit"
                                  onClick={() => {
                                    toggleDeleteSubBundle();
                                    setSelectedBundle(item);
                                  }}
                                >
                                  Delete
                                </CustomButton>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </div>

                  {id === 3 &&
                    data?.data?.creatorProfile?.freeTrialLinks?.map(
                      (item: FreeTrial) => {
                        return (
                          <div className="">
                            <Typography
                              variant="titleTwo"
                              className="text-grey_800 py-4"
                            >
                              {item.name} {""}
                              {`(${item.duration} days free trial)`}
                            </Typography>

                            {getHappyPeopleFeed(item)?.map(
                              ({ id, name, value }) => (
                                <div
                                  key={id}
                                  className="flex items-center justify-between border-b border-grey_10 py-2"
                                >
                                  <Typography
                                    variant="p2"
                                    className="text-grey_500"
                                  >
                                    {name}
                                  </Typography>

                                  <Typography
                                    variant="p2"
                                    className="text-grey_800"
                                  >
                                    {value}
                                  </Typography>
                                </div>
                              )
                            )}

                            <div className="flex items-center justify-end ml-auto my-8 w-1/3">
                              <CustomButton
                                onClick={() => {
                                  toggleDeleteFreeTrial();
                                  setSelectedFreeTrialLink(item?.publicId);
                                }}
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
                        );
                      }
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

          <Modal
            show={isBundleModal}
            toggleModal={() => toggleModal("Add Bundle")}
          >
            <BundleForm
              mode={selectedBundle?.publicId === "" ? "add" : "edit"}
              toggleModal={() => toggleModal("Add bundle")}
              bundleData={selectedBundle}
            />
          </Modal>

          <Modal show={deleteFreeTrialLink} toggleModal={toggleDeleteFreeTrial}>
            <div className="p-4">
              <ConfirmDeletion
                toggleModal={toggleDeleteFreeTrial}
                message=" Are you sure you want to delete this free trial link?"
                title="Delete Free trial link"
                deleteFn={deleteFreeTrialLinkMutation.mutate}
                isDeleting={deleteFreeTrialLinkMutation.isPending}
              />
            </div>
          </Modal>

          <Modal show={deleteSubBundle} toggleModal={toggleDeleteSubBundle}>
            <div className="p-4">
              <ConfirmDeletion
                toggleModal={toggleDeleteSubBundle}
                message=" Are you sure you want to delete this bundle?"
                title="Delete Subscription Bundle"
                deleteFn={deleteBundleMutation.mutate}
                isDeleting={deleteBundleMutation.isPending}
              />
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export { SubscriptionSettings };
