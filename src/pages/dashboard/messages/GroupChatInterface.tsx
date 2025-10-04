/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import defaultAvatar from "../../../assets/defaultAvatar.svg";
import moreIcon from "../../../assets/icons/moreIcon.svg";
// import searchIcon from "../../../assets/icons/searchIcon.svg";
import timelineImage from "../../../assets/timelineImage.svg";
import Typography from "../../../components/forms/Typography";
import CommentBox from "../../../components/CommentBox";
import { audioImages, images } from "../../../data";

const GroupChatInterface = ({
  selectedChatGroup,
  isEmpty,
  areParticipantSelected,
}: any) => {
  // const [showModal, setShowModal] = useState(false);

  const [generalTabs] = useState([
    {
      id: 1,
      name: "Media",
    },
    {
      id: 2,
      name: "User list",
    },
  ]);
  const [mediaTabs] = useState([
    {
      id: 1,
      name: "All",
      number: "",
    },
    {
      id: 2,
      name: "Photos",
      number: "25",
    },
    {
      id: 3,
      name: "Videos",
      number: "36",
    },
    {
      id: 4,
      name: "Audio",
      number: "8",
    },
  ]);
  const [isActiveTab, setIsActiveTab] = useState("");
  const [isActiveMediaTab, setIsActiveMediaTab] = useState("All");

  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };

  return (
    <>
      {areParticipantSelected && (
        <section className="mt-8 w-full pl-4 pr-[88px]">
          <div className="flex justify-between">
            <Typography variant="titleOne" className="text-grey_900">
              $30 users
            </Typography>

            <img src={moreIcon} alt="demo" className="w-6 h-6" />
          </div>

          <div className="flex items-center mt-4 border-b border-grey_10 pb-4">
            <Typography variant="p2" className="text-grey_500 py-2 pr-4">
              3 h ago
            </Typography>

            <div className="flex items-center justify-between">
              {generalTabs.map(({ id, name }) => {
                return (
                  <div
                    key={id}
                    onClick={() => setIsActiveTab(name)}
                    className={`cursor-pointer py-2 px-4 rounded-3xl mr-[14px] drop-shadow-3xl whitespace-nowrap ${
                      isActiveTab === name
                        ? "bg-blue_200 text-blue_500"
                        : "bg-grey_20 text-grey_400"
                    }`}
                  >
                    <Typography variant="p2">{name}</Typography>
                  </div>
                );
              })}
            </div>

            <div className="flex ml-auto">
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

          {isActiveTab !== "Media" && (
            <div>
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

                  <img
                    src={timelineImage}
                    alt="timelineImage"
                    className="mt-3"
                  />

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
                      <img
                        src={timelineImage}
                        alt="timelineImage"
                        className="mt-3"
                      />
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

              <div className="w-full mt-7">
                <CommentBox ifPoll={false} ifRecord={false} />
              </div>
            </div>
          )}

          {isActiveTab === "Media" && (
            <>
              <div className="flex items-center mb-4">
                {mediaTabs.map(({ id, name, number }) => {
                  return (
                    <div
                      onClick={() => setIsActiveMediaTab(name)}
                      className={`flex items-center cursor-pointer px-[14px] py-[7px] rounded-3xl hover:bg-blue_200 ${
                        isActiveMediaTab === name ? "bg-blue_200" : "bg-white"
                      }`}
                      key={id}
                    >
                      <Typography
                        variant="p2"
                        className={`pr-1 ${
                          isActiveMediaTab === name
                            ? "text-blue_500"
                            : "text-grey_400"
                        }`}
                      >
                        {name}
                      </Typography>
                      {number && (
                        <Typography
                          className={`${
                            isActiveMediaTab === name
                              ? "text-blue_500"
                              : "text-grey_400"
                          }`}
                          variant="subtitle2"
                        >
                          {number}
                        </Typography>
                      )}
                    </div>
                  );
                })}
              </div>
              {isActiveMediaTab !== "Audio" && (
                <>
                  {" "}
                  <div className="flex items-center flex-wrap gap-[1px] cursor-pointer">
                    {images.map((src, index) => (
                      <div
                        className="w-[165px] h-[210px] overflow-hidden"
                        key={index}
                        // onClick={() => toggleProtraitModal(src)}
                      >
                        <img
                          src={src}
                          alt={`Gallery ${index}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {isActiveMediaTab === "Audio" && (
                <div className="grid grid-cols-1 md:grid-cols-3">
                  {audioImages.map((src, index) => (
                    <div
                      key={index}
                      className="bg-grey_500 h-[209px] flex items-center justify-center mr-[2px] mb-[2px]"
                    >
                      <img
                        src={src}
                        alt={`Gallery ${index}`}
                        className=""
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      )}

      {isEmpty && (
        <div className="flex items-center justify-center h-full">
          <Typography variant="subtitle3" className="text-grey_400  pt-[317px]">
            No chats yet. Select a group to get started
          </Typography>
        </div>
      )}

      {selectedChatGroup !== "" && (
        <div
          className="flex flex-col items-center justify-center h-full"
          // onClick={toggleShowList}
        >
          <Typography variant="subtitle3" className="text-grey_400">
            You do not have any chats in this group yet
          </Typography>
        </div>
      )}
    </>
  );
};

export { GroupChatInterface };
