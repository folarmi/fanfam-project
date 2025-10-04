/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../lib/hook";
import type { RootState } from "../../../lib/store";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCustomMutation } from "../../../hooks/apiCalls";
import { updateProfileObject } from "../../../lib/features/profile/profileSlice";
import SearchInput from "../../../components/SearchInput";
import IconAndNumber from "../../../components/IconAndNumber";
import Pictures from "../../../assets/icons/pictures";
import Videos from "../../../assets/icons/videos";
import Live from "../../../assets/icons/live";
import ProfileLike from "../../../assets/icons/profileLike";
import Typography from "../../../components/forms/Typography";
import CircleChat from "../../../assets/icons/circleChat";
import CirclePay from "../../../assets/icons/circlePay";
import AmountInput from "../../../components/forms/AmountInput";
import PaymentMethod from "../../../components/PaymentMethod";
import CustomInput from "../../../components/forms/CustomInput";
import CustomButton from "../../../components/forms/CustomButton";
import { commentOptions, UserRole } from "../../../data";
import BlueBorderedButton from "../../../components/forms/BlueBorderedButton";
import ModalContent from "../../../components/modals/ModalContent";
import SubscriptionButton from "../../../components/molecules/SubscriptionButton";
import Modal from "../../../components/modals/Modal";
import AddUserToListModal from "../../../components/modals/AddUserToListModal";
import Post from "../../../components/Post";
import Replies from "../../../components/Replies";
import Media from "../../../components/Media";
import GiftSubscription from "../../../components/modals/GiftSubscription";
import suggestTwo from "../../../assets/suggestTwo.svg";
import location from "../../../assets/icons/location.svg";
import circleStar from "../../../assets/icons/circleStar.svg";
import moreIcon from "../../../assets/icons/moreIcon.svg";
import blueVerifiedTick from "../../../assets/blueVerifiedTick.svg";
import copy from "../../../assets/copy.svg";
import defaultAvatar from "../../../assets/defaultAvatar.svg";
import verifyBlue from "../../../assets/icons/verifyBlue.svg";
import blueGift from "../../../assets/icons/blueGift.svg";

const Profile = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const { profileDetails } = useAppSelector(
    (state: RootState) => state.profile
  );
  const { control } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const [tabs] = useState([
    {
      id: 1,
      name: "Post",
    },
    {
      id: 2,
      name: "Media",
    },
    {
      id: 3,
      name: "Replies",
    },
    {
      id: 4,
      name: "Likes",
    },
  ]);
  const [isActiveTab, setIsActiveTab] = useState("Post");
  const [commentModal, setCommentModal] = useState(false);
  const [linkToProfileModal, setLinkToProfileModal] = useState(false);
  const [subscription] = useState(false);
  const [tipModal, setTipModal] = useState(false);
  const [addUserToList, setAddUserToList] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getUserProfileUserMutation = useCustomMutation({
    endpoint: `/profile/view`,
    successMessage: (data: any) => data?.message,
    errorMessage: (error: any) => error,
    onSuccessCallback: (data) => {
      dispatch(updateProfileObject(data?.data));
    },
  });

  useEffect(() => {
    getUserProfileUserMutation.mutate({
      email: userObject.email,
      role: userObject.role,
      usid: userObject.usid,
    });
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleCommentModal = () => {
    setCommentModal(!commentModal);
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleLinkToProfile = () => {
    setLinkToProfileModal(!linkToProfileModal);
  };

  const toggleAddUserToList = () => {
    setAddUserToList(!addUserToList);
  };

  const toggleTipModal = () => {
    setTipModal(!tipModal);
  };

  const getModalValue = (name: string) => {
    if (name === "Add User to list") {
      setCommentModal(false);
      setAddUserToList(!addUserToList);
    }
  };

  return (
    // {getUserProfileUserMutation.isPending ? "" : <>
    //   </>}
    <>
      {!getUserProfileUserMutation.isPending ? (
        <p>Loading....</p>
      ) : (
        <div>
          <SearchInput ifBlur={false} />
          <div className="w-full relative">
            <img src={suggestTwo} alt="demo" className="w-full" />
            <div className="flex items-center absolute top-3 pl-4">
              <IconAndNumber
                Icon={Pictures}
                number={24}
                numberColor="#ffffff"
                className="cursor-pointer"
              />
              <IconAndNumber Icon={Videos} number={56} numberColor="#ffffff" />
              <IconAndNumber Icon={Live} number={16} numberColor="#ffffff" />
              <IconAndNumber
                Icon={ProfileLike}
                number={847}
                numberColor="#ffffff"
              />
            </div>

            <section className="px-4 bg-grey_20 drop-shadow-4xl mb-2">
              <div className="relative flex items-center">
                <div className="absolute -top-8">
                  <img
                    src={profileDetails?.profilePic}
                    alt="profilePicture"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                </div>
                <div className="w-full mt-6 flex items-center justify-between">
                  {/* <div className="flex items-center ml-28">
                <Image src={location} alt="location" />
                <Typography className="text-grey_400 pl-1" variant="p3">
                  Nigeria
                </Typography>
              </div> */}

                  <div className="flex items-center gap-x-4 justify-between w-full">
                    <div className="hidden md:flex items-center ml-28">
                      <img src={location} alt="location" />
                      <Typography className="text-grey_400 pl-1" variant="p3">
                        Nigeria
                      </Typography>
                    </div>

                    <div className="cursor-pointer">
                      <CircleChat className="cursor-pointer hover:fill-blue_200" />
                    </div>

                    <div className="cursor-pointer" onClick={toggleTipModal}>
                      <CirclePay className="cursor-pointer hover:fill-blue_200" />
                    </div>

                    {tipModal && (
                      <div className="flex flex-col absolute left-[55%] top-[100%] bg-modal-gradient shadow-triple w-[368px] rounded-2xl border-2 border-white z-50 p-6">
                        <Typography
                          variant="titleOne"
                          className="text-grey_800"
                        >
                          Send Tip
                        </Typography>
                        <div className="flex my-6">
                          <img
                            src={defaultAvatar}
                            alt="demo"
                            className="w-10 h-10"
                          />

                          {/* ml-28 */}
                          <div className="ml-3">
                            <div className="flex items-center mb-1">
                              <Typography
                                variant="titleTwo"
                                className="text-grey_900"
                              >
                                Priscilia yummy
                              </Typography>

                              <img
                                src={verifyBlue}
                                alt="demo"
                                className="ml-[1px] h-4 w-4"
                              />
                            </div>

                            <Typography variant="p2" className="text-grey_400">
                              @yummychill54
                            </Typography>
                          </div>
                        </div>

                        <AmountInput />
                        <PaymentMethod />
                        <CustomInput
                          name="Folder"
                          control={control}
                          label="Message(Optional)"
                        />

                        <div className="flex items-center ml-[141px]">
                          <CustomButton
                            variant="secondary"
                            className="text-xs mr-6 w-[84px]"
                          >
                            Cancel
                          </CustomButton>
                          <CustomButton
                            variant="primary"
                            className="text-xs px-3 w-[84px]"
                          >
                            Send Tip
                          </CustomButton>
                        </div>
                      </div>
                    )}

                    <div className="hidden md:block">
                      <img src={circleStar} alt="circleStar" />
                    </div>

                    {userObject.role !== UserRole.creator && (
                      <>
                        <div
                          className={`flex items-center gap-x-2 border border-blue_500 rounded-3xl py-2 px-3 drop-shadow-6xl bg-subscribe-gradient shadow-inner-white `}
                        >
                          <img src={blueGift} alt="gift" />
                          <Typography
                            variant="subtitle3"
                            className="text-blue_500"
                          >
                            Gift Subscription
                          </Typography>
                        </div>

                        <CustomButton
                          variant="primary"
                          primaryButtonSize="xs px-3"
                        >
                          Subscribe
                        </CustomButton>
                      </>
                    )}

                    {userObject.role === UserRole.creator && (
                      <>
                        {" "}
                        <Link to="/dashboard/profile/promote">
                          <CustomButton
                            variant="primary"
                            primaryButtonSize="xs px-3"
                          >
                            Promote Profile
                          </CustomButton>
                        </Link>
                        <BlueBorderedButton
                          onClick={() =>
                            navigate("/dashboard/profile/edit-profile")
                          }
                          text="Edit Profile"
                        />
                      </>
                    )}

                    <div className="relative">
                      <img
                        src={moreIcon}
                        alt="horizontalMore"
                        className="cursor-pointer"
                        onClick={toggleCommentModal}
                        loading="lazy"
                      />
                      {commentModal && (
                        <div className="mt-5 flex flex-col absolute right-[95%] top-[100%] bg-modal-gradient shadow-triple w-[262px] rounded-2xl border-2 border-white z-50">
                          <div className="flex items-center justify-between py-2 hover:bg-blue_200 hover:rounded-lg cursor-pointer px-6">
                            <Typography variant="p2" className="text-grey_700">
                              Copy link to profile
                            </Typography>
                            <img src={copy} alt="copy" />
                          </div>
                          <ModalContent
                            content={commentOptions}
                            onClick={getModalValue}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <section className="mt-6">
                <div className="md:hidden flex items-center ">
                  <img src={location} alt="location" />
                  <Typography className="text-grey_400 pl-1" variant="p3">
                    Nigeria
                  </Typography>
                </div>
                <div className="flex items-center">
                  <Typography
                    variant="titleTwo"
                    className="text-grey_800 font-bold pr-1"
                  >
                    Priscilia yummy
                  </Typography>
                  <img src={blueVerifiedTick} alt="verify" />
                </div>

                <Typography variant="p2" className="text-grey_800 pt-[2px]">
                  @yummychill54
                </Typography>

                <Typography variant="p2" className="text-grey_700 py-4">
                  Lorem ipsum dolor sit amet consectetur. Amet dolor arcu
                  praesent mi. Nulla sed cursus quis mas sa nato que at adip
                  iscing{" "}
                  {isExpanded && (
                    <>
                      <span>
                        {" "}
                        .... Duis lacinia ligula sit amet lacus egestas, non
                        cursus magna vestibulum. Sed malesuada, eros ut blandit
                        vehicula, nisi sapien volutpat turpis, non fermentum
                        lectus ligula sit amet odio. Suspendisse potenti. Nullam
                        aliquet tincidunt erat, ut condimentum ligula luctus eu.
                        Nam vitae turpis non urna fermentum volutpat sit amet a
                        odio. Sed auctor, ex nec blandit aliquam, nisl nunc
                        dignissim lorem, sed efficitur orci justo ut justo.{" "}
                      </span>
                    </>
                  )}
                  {isActiveTab === "Replies" && (
                    <span
                      onClick={toggleReadMore}
                      className="font-medium text-sm text-blue_500 cursor-pointer"
                    >
                      read {isExpanded ? "less" : "more"}
                    </span>
                  )}
                </Typography>
              </section>
            </section>

            {subscription && (
              <div className="bg-white drop-shadow-4xl mb-2 py-2">
                <section className="border-b border-grey_10 pb-4 px-4">
                  <Typography variant="subtitle2">
                    Current subscription
                  </Typography>
                  <Typography variant="p3" className="pb-2 pt-3 text-grey_500">
                    Ends: 10 June 2024
                  </Typography>

                  <SubscriptionButton textOne="RENEW" textTwo="$15 per month" />
                </section>

                <section className="pt-4 px-4">
                  <Typography variant="subtitle2" className="pb-4">
                    Subscription bundles
                  </Typography>

                  <SubscriptionButton
                    textOne="1 month"
                    textTwo="$15"
                    className="mb-4"
                  />
                  <SubscriptionButton
                    textOne="2 months"
                    textTwo="$100"
                    className="mb-4"
                  />
                  <SubscriptionButton
                    textOne="12 months"
                    textTwo="$150"
                    className="mb-2"
                  />
                </section>
              </div>
            )}

            <div className="flex items-center justify-between bg-grey_20 border-b border-grey_40 mt-2">
              {tabs.map(({ id, name }) => {
                return (
                  <div
                    key={id}
                    className="cursor-pointer"
                    onClick={() => setIsActiveTab(name)}
                  >
                    <Typography
                      variant="subtitle3"
                      className={`px-12 pt-3 pb-1 ${
                        isActiveTab === name
                          ? "text-grey_800 border-b-2 border-grey_800"
                          : "text-grey_500"
                      }`}
                    >
                      {name}
                    </Typography>
                  </div>
                );
              })}
            </div>

            {
              <Modal show={addUserToList} toggleModal={toggleAddUserToList}>
                <AddUserToListModal toggleModal={toggleAddUserToList} />
              </Modal>
            }

            {isActiveTab === "Post" && <Post />}
            {isActiveTab === "Replies" && <Replies />}
            {isActiveTab === "Media" && <Media />}
          </div>

          {showModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-40"
              onClick={toggleModal}
            >
              <div className="" onClick={(e) => e.stopPropagation()}>
                <GiftSubscription toggleModal={toggleModal} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export { Profile };
