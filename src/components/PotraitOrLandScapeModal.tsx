/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "./forms/Typography";
import ashMore from "../assets/icons/ashMore.svg";
import defaultAvatar from "../assets/defaultAvatar.svg";
import blueVerifiedTick from "../assets/blueVerifiedTick.svg";

import IconAndNumber from "./IconAndNumber";
import Like from "../assets/icons/like";
import Comment from "../assets/icons/comment";
import Pay from "../assets/icons/pay";
import CommentBox from "./CommentBox";

const PotraitOrLandScapeModal = ({
  potraitOrLandScapeModal,
  toggleProtraitModal,
  img,
}: any) => {
  return (
    <>
      {potraitOrLandScapeModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={toggleProtraitModal}
        ></div>
      )}

      <div className="fixed inset-0 bg-white flex justify-center z-50 mx-24 h-[600px] mt-8 overflow-hidden">
        <div className="relative w-1/2 h-full">
          {/* <img src={whiteCloseCircle} alt="whiteCloseCircle" /> */}
          <div className="h-full w-full">
            <img
              src={img}
              alt="Overlay"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlay and backdrop-filter */}
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center">
            <div className="mx-8 w-3/4">
              <img
                src={img}
                alt="Overlay"
                className="w-full h-full max-h-[600px] object-cover"
              />
            </div>
          </div>
        </div>

        <section className="bg-grey_20 w-1/2 flex flex-col items-start px-4 pt-[14px]">
          <div className="flex items-start">
            <img src={defaultAvatar} alt="default avatar" />
            <div className="flex justify-between w-full items-start">
              <section className="ml-2">
                <section className="flex items-center">
                  <Typography variant="titleTwo" className="pr-1">
                    Priscilia yummy
                  </Typography>
                  <img src={blueVerifiedTick} alt="default avatar" />
                  <Typography variant="p2" className="px-[6px] text-grey_500">
                    @yummychill54 .
                  </Typography>
                  <Typography variant="p2" className="text-grey_500">
                    3 h ago
                  </Typography>
                </section>

                <>
                  <p className="pt-[2px] font-normal text-sm text-grey_30 leading-5 pb-4">
                    Lorem ipsum dolor sit amet consectetur. Amet dolor arcu
                    praesent mi. Nulla sed cursus quis mas sa nato que at adip
                    iscing. Phar etra justo pretium sollic itudin digni ssim non
                    solli citudin sit pellentesque ipsum. Molestie dui tempus
                    nec maecenas eget justo dictum a.
                  </p>
                  <p className="font-normal text-sm text-grey_700 leading-5">
                    Lorem ipsum dolor sit amet consectetur. Amet dolor arcu
                    praesent mi. Nulla sed cursus quis mas sa nato que at adip
                    iscing. Phar etra justo pretium sollic itudin digni ssim non
                    solli citudin sit pellentesque ipsum. Molestie dui tempus
                    nec maecenas eget justo dictum a.
                  </p>
                </>
              </section>
              <img
                src={ashMore}
                alt="default avatar"
                // onClick={toggleModal}
                className="cursor-pointer"
              />

              {/* {showMoreModal && (
            <div className="flex flex-col absolute left-[62%] bottom-[78%] bg-modal-gradient shadow-triple w-[262px] rounded-2xl border-2 border-white z-50">
              <div className="flex items-center justify-between py-2 hover:bg-blue_200 hover:rounded-lg cursor-pointer px-6">
                <Typography variant="p2" className="text-grey_700">
                  Copy link to post
                </Typography>
                <img src={copy} alt="copy" />
              </div>
              <Typography
                variant="p2"
                className="text-grey_700 py-2 hover:bg-blue_200 hover:rounded-lg cursor-pointer px-6"
              >
                Add Bookmark
              </Typography>
              <Typography
                variant="p2"
                className="text-grey_700 py-2 hover:bg-blue_200 hover:rounded-lg cursor-pointer px-6"
              >
                Repost
              </Typography>
            </div>
          )} */}
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <IconAndNumber Icon={Like} number={52} />
            <IconAndNumber Icon={Comment} number={24} />
            <IconAndNumber Icon={Pay} />
          </div>

          <div className="w-full mt-3">
            <CommentBox ifPoll={false} ifRecord={false} />
          </div>
        </section>
      </div>
    </>
  );
};

export default PotraitOrLandScapeModal;
