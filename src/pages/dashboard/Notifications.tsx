import { useState } from "react";
import SearchInput from "../../components/SearchInput";
import { notificationSampleData, notificationTabs } from "../../data";
import Typography from "../../components/forms/Typography";
import Modal from "../../components/modals/Modal";
import RearrangeNotificationCategories from "../../components/modals/RearrangeNotificationCategories";
import block from "../../assets/icons/block.svg";
import verifyBlue from "../../assets/icons/verifyBlue.svg";
import { useGetData } from "@/hooks/apiCalls";
import { Loader } from "@/components/molecules/Loader";
import type { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hook";

const Notifications = () => {
  const [showRearrangeModal, setShowRearrangeModal] = useState(false);
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const { data, isLoading: getNotificationsIsLoading } = useGetData({
    url: `notifications?email=${userObject?.email}`,
    queryKey: ["GetNotificationsByEmail"],
  });

  const toggleRearrangeModal = () => {
    setShowRearrangeModal(!showRearrangeModal);
  };
  console.log(data);
  const [isActiveTab, setIsActiveTab] = useState("All");
  return (
    <>
      {getNotificationsIsLoading ? (
        <Loader />
      ) : (
        <div>
          <SearchInput ifBlur={false} />

          <section className="bg-grey_20 drop-shadow-4xl p-4">
            <div className="flex items-center overflow-x-scroll">
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
            </div>

            <div className="">
              {notificationSampleData.map(
                ({ id, name, message, photo, tag, time }) => {
                  return (
                    <div key={id} className="flex py-4 border-b border-grey_10">
                      <img src={photo} alt="demo" className="w-10 h-10" />

                      <div className="ml-3">
                        <div className="flex items-center mb-1">
                          <Typography
                            variant="titleTwo"
                            className="text-grey_900"
                          >
                            {name}
                          </Typography>

                          <img
                            src={verifyBlue}
                            alt="demo"
                            className="ml-[1px] h-4 w-4"
                          />

                          <Typography
                            variant="p2"
                            className="text-grey_400 pl-2"
                          >
                            {tag}
                          </Typography>
                          <div className="w-[2px] h-[2px] bg-grey_300 mx-[6px]"></div>
                          <Typography variant="p2" className="text-grey_400">
                            {time}
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

// {
//     "endDate": "2026-01-02T11:59:00.29544",
//     "creatorProfile": {
//         "monthlyFee": 800,
//         "personaInquiryId": "inq_2P9HD7sfvbt5KVdSpoUz7KKJhuto",
//         "verified": true,
//         "creatorBankInfo": {
//             "country": "Nigeria",
//             "bankName": "First Bank of Nigeria Limited",
//             "bankCode": "098",
//             "accountNo": "1234567890",
//             "accountName": "Test User"
//         },
//         "freeTrialLinks": [
//             {
//                 "publicId": "201038TAW0U21201457RXZ23Z1202958O79D171",
//                 "createdDate": null,
//                 "lastModifiedDate": "2025-11-20T20:29:58.566577",
//                 "lastModifiedBy": null,
//                 "name": "Test two",
//                 "limitSize": 25,
//                 "endDate": "2025-11-18",
//                 "duration": 14
//             }
//         ],
//         "subscriptionBundles": [
//             {
//                 "publicId": "201038TAW0U21201457RXZ23Z1202958O79D1712031206UL4821213022UYPQOY1",
//                 "createdDate": null,
//                 "lastModifiedDate": "2025-11-20T21:30:22.420443",
//                 "lastModifiedBy": null,
//                 "amount": 600000,
//                 "durationInMonths": 10,
//                 "startDate": null,
//                 "endDate": "2026-09-20"
//             }
//         ],
//         "promotionCampaigns": [
//             {
//                 "publicId": "125537W126B41",
//                 "createdDate": null,
//                 "lastModifiedDate": "2025-11-23T05:47:32.984046",
//                 "lastModifiedBy": null,
//                 "name": "testName",
//                 "limitSize": 10,
//                 "endDate": "2025-12-23",
//                 "duration": 30,
//                 "message": null,
//                 "qualifier": "EXPIRED_SUBSCRIBERS",
//                 "type": "FIRST_MONTH_DISCOUNT"
//             },
//             {
//                 "publicId": "173348S60P221",
//                 "createdDate": null,
//                 "lastModifiedDate": "2025-11-23T05:48:13.253361",
//                 "lastModifiedBy": null,
//                 "name": "testName",
//                 "limitSize": 50,
//                 "endDate": "2025-12-23",
//                 "duration": 14,
//                 "message": null,
//                 "qualifier": "NEW_SUBSCRIBERS",
//                 "type": "FIRST_MONTH_DISCOUNT"
//             },
//             {
//                 "publicId": "201038TAW0U21201457RXZ23Z1202958O79D1712031206UL4821213022UYPQOY121345214CXXD1080458Q8Y75C11124456HY34P1",
//                 "createdDate": null,
//                 "lastModifiedDate": "2025-11-23T05:48:18.980767",
//                 "lastModifiedBy": null,
//                 "name": "testName",
//                 "limitSize": 5,
//                 "endDate": "2025-12-23",
//                 "duration": 14,
//                 "message": null,
//                 "qualifier": "NEW_SUBSCRIBERS",
//                 "type": "FIRST_MONTH_DISCOUNT"
//             }
//         ]
//     },
// "subscriber": {
//     "phoneNumber": "+2348179866543",
//     "usid": "fafam-202510139Mp2hLCg6N4Vg3YKD9ZeNSLUJPlk74iNYonZifJT",
//     "role": "VIEWER",
//     "email": "userFive@mailinator.com",
//     "residence": null,
//     "fullName": null,
//     "gender": null,
//     "location": null,
//     "profilePic": null,
//     "interest": null,
//     "bio": null,
//     "username": null,
//     "websiteUrl": null,
//     "displayName": null,
//     "coverImageUrl": null,
//     "creatorProfile": null
// },
//     "fee": 800
// }
