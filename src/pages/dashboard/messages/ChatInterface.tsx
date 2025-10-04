/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import defaultAvatar from "../../../assets/defaultAvatar.svg";
import verifyBlue from "../../../assets/icons/verifyBlue.svg";
import moreIcon from "../../../assets/icons/moreIcon.svg";
import realNotification from "../../../assets/icons/realNotification.svg";
import star from "../../../assets/icons/star.svg";
import pin from "../../../assets/icons/pin.svg";
// import searchIcon from "../../../assets/icons/searchIcon.svg";
import timelineImage from "../../../assets/timelineImage.svg";
import leftArrow from "../../../assets/icons/arrowLeft.svg";
import Typography from "../../../components/forms/Typography";
import CommentBox from "../../../components/CommentBox";
import ModalContent from "../../../components/modals/ModalContent";

const ChatInterface = ({ toggleMessageAndChatInterface }: any) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <section className="mt-8 w-full pl-4 md:pr-[88px]">
        <div className="flex items-center bg-white drop-shadow-4xl ">
          <img
            src={leftArrow}
            alt="leftArrow"
            className="cursor-pointer md:hidden"
            onClick={toggleMessageAndChatInterface}
          />

          <img src={defaultAvatar} alt="demo" className="w-10 h-10" />

          <div className="ml-2">
            <div className="flex items-center mb-1">
              <Typography variant="titleTwo" className="text-grey_900">
                Priscilia yummy
              </Typography>

              <img
                src={verifyBlue}
                alt="demo"
                className="ml-[4px] mr-2 h-4 w-4"
              />

              <Typography variant="p2" className="text-grey_400">
                @Timmy88
              </Typography>
              <div className="w-[2px] h-[2px] bg-grey_300 mx-[6px]"></div>
            </div>
          </div>

          <div className="ml-auto cursor-pointer" onClick={toggleModal}>
            <img src={moreIcon} alt="demo" className="w-6 h-6" />
          </div>

          {showModal && (
            <div className="flex flex-col absolute left-[75%] bottom-[77%] bg-modal-gradient shadow-triple w-[262px] rounded-2xl border-2 border-white z-50">
              <ModalContent
                content={[
                  {
                    id: 1,
                    name: "Pin message",
                  },
                  {
                    id: 2,
                    name: "Mute message",
                  },
                  {
                    id: 3,
                    name: "Delete user",
                  },
                ]}
              />
            </div>
          )}
        </div>

        <div className="flex items-center mt-3 border-b border-grey_10 pb-6">
          <div className="flex gap-x-4 items-center">
            <Typography variant="p2" className="pl-10">
              3h ago
            </Typography>

            <img src={star} alt="demo" className="w-5 h-5" />
            <img src={realNotification} alt="demo" className="w-5 h-5" />
            <img src={pin} alt="demo" className="w-5 h-5" />

            <Typography variant="subtitle2" className="text-primary">
              Gallery
            </Typography>
          </div>

          <div className="hidden md:flex ml-auto">
            <div className="relative w-[212px] ">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 bg-white border border-grey_60 rounded shadow-chat-interface focus:outline-none"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.66658 14.5002C3.89992 14.5002 0.833252 11.4335 0.833252 7.66683C0.833252 3.90016 3.89992 0.833496 7.66658 0.833496C11.4333 0.833496 14.4999 3.90016 14.4999 7.66683C14.4999 11.4335 11.4333 14.5002 7.66658 14.5002ZM7.66658 1.8335C4.44659 1.8335 1.83325 4.4535 1.83325 7.66683C1.83325 10.8802 4.44659 13.5002 7.66658 13.5002C10.8866 13.5002 13.4999 10.8802 13.4999 7.66683C13.4999 4.4535 10.8866 1.8335 7.66658 1.8335Z"
                    fill="#6F7076"
                  />
                  <path
                    d="M14.6666 15.1666C14.54 15.1666 14.4133 15.12 14.3133 15.02L12.98 13.6866C12.7866 13.4933 12.7866 13.1733 12.98 12.98C13.1733 12.7866 13.4933 12.7866 13.6866 12.98L15.02 14.3133C15.2133 14.5066 15.2133 14.8266 15.02 15.02C14.92 15.12 14.7933 15.1666 14.6666 15.1666Z"
                    fill="#292D32"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <section className="my-3 chat-section">
          <Typography variant="p3" className="text-center text-grey_300">
            May 18
          </Typography>

          <section className="">
            <div className="flex items-center">
              <img
                src={defaultAvatar}
                alt="defaultAvatar"
                className="h-8 w-8"
              />
              <div className="bg-blue_100 p-2 w-full ml-4">
                <Typography className="text-grey_700" variant="p2">
                  Hey! Jones, how are you doing
                </Typography>
              </div>
            </div>

            <img src={timelineImage} alt="timelineImage" className="mt-3 " />

            <div className="flex items-center mt-6">
              <div className="bg-green_10 p-2 w-full mr-4">
                <Typography className="text-grey_700" variant="p2">
                  Hello
                </Typography>
              </div>

              <img
                src={defaultAvatar}
                alt="defaultAvatar"
                className="h-8 w-8"
              />
            </div>

            <div className="flex items-center mt-6">
              <img
                src={defaultAvatar}
                alt="defaultAvatar"
                className="h-8 w-8 mr-4"
              />
              <div className="">
                <img src={timelineImage} alt="timelineImage" className="mt-3" />
                <div className="bg-blue_100 p-2 w-full">
                  <Typography className="text-grey_700" variant="p2">
                    Check out this!
                  </Typography>
                </div>
              </div>
            </div>

            <div className="flex items-center mt-6">
              <div className="bg-green_10 p-2 w-1/2 mr-4 ml-auto">
                <Typography className="text-grey_700" variant="p2">
                  Hello
                </Typography>
                <Typography className="text-grey_700" variant="p2">
                  How are you doing today
                </Typography>
              </div>

              <img
                src={defaultAvatar}
                alt="defaultAvatar"
                className="h-8 w-8"
              />
            </div>
          </section>
        </section>
      </section>

      <div className="w-full mt-7">
        <CommentBox ifPoll={false} ifRecord={false} />
      </div>
    </>
  );
};

export { ChatInterface };
