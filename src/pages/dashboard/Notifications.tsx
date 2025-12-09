import { useState } from "react";
import SearchInput from "../../components/SearchInput";
// import { notificationTabs } from "../../data";
import Typography from "../../components/forms/Typography";
import Modal from "../../components/modals/Modal";
import RearrangeNotificationCategories from "../../components/modals/RearrangeNotificationCategories";
// import block from "../../assets/icons/block.svg";
import defaultAvatar from "../../assets/defaultAvatar.svg";
import { Loader } from "@/components/molecules/Loader";
import type { NotificationType } from "@/lib/types";
import { convertToHumanReadableDate } from "@/utils/helper";
import { useNotifications } from "@/context/NotificationsContext";

const Notifications = () => {
  const [showRearrangeModal, setShowRearrangeModal] = useState(false);
  const {
    notifications: notificationsData,
    isLoading: getNotificationsIsLoading,
  } = useNotifications();

  const toggleRearrangeModal = () => {
    setShowRearrangeModal(!showRearrangeModal);
  };

  // const [isActiveTab, setIsActiveTab] = useState("All");
  return (
    <>
      {getNotificationsIsLoading ? (
        <Loader />
      ) : (
        <div>
          <SearchInput ifBlur={false} />

          <section className="bg-grey_20 drop-shadow-4xl p-4">
            {/* <div className="flex items-center overflow-x-scroll">
              {notificationTabs?.map(({ id, name }) => {
                return (
                  <div
                    key={id}
                    onClick={() => setIsActiveTab(name)}
                    className={`cursor-pointer py-2 px-4 rounded-3xl mr-[14px] drop-shadow-3xl ${
                      isActiveTab === name
                        ? "bg-blue_200 text-black"
                        : "bg-white text-grey_400"
                    }`}
                  >
                    <Typography variant="p1">{name}</Typography>
                  </div>
                );
              })}
              <img
                src={block}
                alt="block"
                className="w-6 h-6 cursor-pointer"
                onClick={toggleRearrangeModal}
              />
            </div> */}

            <div className="">
              {notificationsData?.map(
                ({ message, createdAt, from }: NotificationType) => {
                  return (
                    <div
                      key={createdAt}
                      className="flex py-4 border-b border-grey_10"
                    >
                      <img
                        src={defaultAvatar}
                        alt="demo"
                        className="w-10 h-10"
                      />

                      <div className="ml-3">
                        <div className="flex items-center mb-1">
                          <Typography
                            variant="titleTwo"
                            className="text-grey_900"
                          >
                            {from}
                          </Typography>

                          <div className="w-[2px] h-[2px] bg-grey_300 mx-[6px]"></div>
                          <Typography variant="p2" className="text-grey_400">
                            {convertToHumanReadableDate(createdAt)}
                          </Typography>
                        </div>

                        <Typography
                          variant="titleTwo"
                          className="pt-[2px] text-grey_700 font-normal"
                        >
                          {message}
                        </Typography>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </section>

          {showRearrangeModal && (
            <Modal show={showRearrangeModal} toggleModal={toggleRearrangeModal}>
              <RearrangeNotificationCategories
                toggleModal={toggleRearrangeModal}
              />
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export { Notifications };
