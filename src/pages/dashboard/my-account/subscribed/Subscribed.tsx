// import { useState } from "react";
import { SubscriptionHeader } from "../settings/SubscriptionHeader";
// import Tabs from "../../../../components/forms/Tabs";
import SubscribedCard from "../../../../components/cards/SubscribedCard";
import { useGetData } from "@/hooks/apiCalls";
import type { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hook";
import { Loader } from "@/components/molecules/Loader";
import type { SubscriberProfile } from "@/lib/types";
import { convertToHumanReadableDate } from "@/utils/helper";
import { UserRole } from "@/data";

const Subscribed = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const isCreator = userObject?.role === UserRole.creator;

  const {
    data: getCreatorSubscriptions,
    isLoading: getCreatorSubscriptionsIsLoading,
  } = useGetData({
    url: `subscriptions/creator/${userObject?.usid}/subscribers?page=0&size=20`,
    queryKey: ["GetSubscriptions"],
    enabled: isCreator,
  });

  const {
    data: getViewerSubscriptions,
    isLoading: getViewerSubscriptionsIsLoading,
  } = useGetData({
    url: `subscriptions?page=0&size=20&subscriberEmail=${userObject?.email}`,
    queryKey: ["GetSubscriptionsForViewer"],
    enabled: !isCreator,
  });
  console.log(getCreatorSubscriptions?.data?.content);
  const subscribersData = isCreator
    ? getCreatorSubscriptions
    : getViewerSubscriptions;

  // const [tabs] = useState([
  //   {
  //     id: 1,
  //     name: "All Creators",
  //   },
  //   {
  //     id: 2,
  //     name: "Active Subscriptions",
  //   },
  //   {
  //     id: 3,
  //     name: "Expired Subscriptions",
  //   },
  //   {
  //     id: 4,
  //     name: "Attention Required",
  //   },
  // ]);

  // const [isActiveTab, setIsActiveTab] = useState("All Creators");

  console.log(getCreatorSubscriptions);
  return (
    <>
      {getCreatorSubscriptionsIsLoading || getViewerSubscriptionsIsLoading ? (
        <Loader />
      ) : (
        <div className="px-7">
          <SubscriptionHeader />

          {/* <Tabs
            tabsArray={tabs}
            setIsActiveTab={setIsActiveTab}
            isActiveTab={isActiveTab}
          /> */}

          <div className="mt-6 flex flex-wrap gap-4">
            {subscribersData?.data?.content?.map((item: SubscriberProfile) => {
              return (
                <>
                  {userObject?.role === UserRole.viewer ? (
                    <SubscribedCard
                      img={item?.creator?.profilePic}
                      userName={item?.creator?.username || "N/A"}
                      tag={item?.creator?.displayName || "N/A"}
                      expiryStatus={`Expires ${convertToHumanReadableDate(
                        item?.endDate
                      )}`}
                      buttonText={
                        item?.fee ? `$${item.fee} per month` : "FOR FREE"
                      }
                      freeSub
                      key={item?.publicId}
                      profileName={item?.creator?.fullName || "Unknown User"}
                    />
                  ) : (
                    <SubscribedCard
                      img={item?.subscriber?.profilePic}
                      userName={item?.subscriber?.username || "N/A"}
                      tag={item?.subscriber?.displayName || "N/A"}
                      expiryStatus={`Expires ${convertToHumanReadableDate(
                        item?.endDate
                      )}`}
                      buttonText={
                        item?.fee ? `$${item.fee} per month` : "FOR FREE"
                      }
                      freeSub
                      key={item?.publicId}
                      profileName={item?.subscriber?.fullName || "Unknown User"}
                    />
                  )}
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export { Subscribed };

// A subscriber for a creator that is a creator

// {
//     "publicId": "180520V21E37118583726ZUV91191024KAWA7S119144174Y6JE1",
//     "endDate": "2026-01-04T19:14:41.037061",
//     "creator": {
//         "phoneNumber": "08176544345",
//         "usid": "fafam-20251115JY86aKbd0UhmbbPdbZY4b04ITbpehJBcLASL5RQL",
//         "email": "theCreator@mailinator.com",
//         "fullName": "ALEXANDER J SAMPLE",
//         "gender": "Male",
//         "location": "Lagos",
//         "profilePic": "http://res.cloudinary.com/dezb6qbwe/image/upload/c_fill,h_250,w_200/v1765289045/image_id_fafam-20251115JY86aKbd0UhmbbPdbZY4b04ITbpehJBcLASL5RQL",
//         "bio": "sbdjhfbsdf",
//         "username": "creator002",
//         "displayName": "TheCreator",
//         "coverImageUrl": "https://res.cloudinary.com/dezb6qbwe/image/upload/v1763493625/0778edc3-10c3-47c4-a321-c0d52a1ecf61fafam-20251115JY86aKbd0UhmbbPdbZY4b04ITbpehJBcLASL5RQL.jpg"
//     },
//     "subscriber": {
//         "phoneNumber": "+2347066543321",
//         "usid": "fafam-20251006cKeF2IOkkYBi3aVYieYlQWlE23JH0SV2BaRPW0fM",
//         "role": "CREATOR",
//         "email": "bloms@mailinator.com",
//         "residence": "Homeless",
//         "fullName": "ALEXANDER J SAMPLE",
//         "gender": "male",
//         "location": "NG",
//         "interest": "None for now",
//         "bio": "The code now uses a custom key to store and retrieve cache options in the request extras, which works with your version of dio_cache_interceptor. All the caching functionality remains intact!",
//         "username": "test_username",
//         "websiteUrl": "www.fanfam.com/user/test_username",
//         "displayName": "Andima Udoh",
//         "coverImageUrl": "https://dummyimage.com/375x200/E4F1FC/000000&text=cover+image",
//         "creatorProfile": {
//             "monthlyFee": 0,
//             "personaInquiryId": "inq_meFksaARnB1aqnTNsUvNeTtw57ht",
//             "verified": true,
//             "creatorBankInfo": {
//                 "country": "Angola",
//                 "bankName": "First Bank of Nigeria",
//                 "bankCode": "011",
//                 "accountNo": "0058241325",
//                 "accountName": "Alexander J Sample"
//             },
//             "subscriptions": [
//                 {
//                     "publicId": "234708K4AA0E1",
//                     "endDate": "2026-01-04T23:47:08.942072",
//                     "creator": {
//                         "phoneNumber": "+2347066543321",
//                         "usid": "fafam-20251006cKeF2IOkkYBi3aVYieYlQWlE23JH0SV2BaRPW0fM",
//                         "email": "bloms@mailinator.com",
//                         "fullName": "ALEXANDER J SAMPLE",
//                         "gender": "male",
//                         "location": "NG",
//                         "bio": "The code now uses a custom key to store and retrieve cache options in the request extras, which works with your version of dio_cache_interceptor. All the caching functionality remains intact!",
//                         "username": "test_username",
//                         "websiteUrl": "www.fanfam.com/user/test_username",
//                         "displayName": "Andima Udoh",
//                         "coverImageUrl": "https://dummyimage.com/375x200/E4F1FC/000000&text=cover+image"
//                     },
//                     "subscriber": {
//                         "phoneNumber": "+2349077654432",
//                         "usid": "fafam-20251006l33C1c23J9HKhH3eaOEIdOIM56pl2YDK9c0ISZhH",
//                         "role": "VIEWER",
//                         "email": "blomgram@mailinator.com",
//                         "residence": "Homeless",
//                         "fullName": "Andima King",
//                         "gender": "male",
//                         "location": "NG",
//                         "interest": "I am interested in you",
//                         "bio": "🧠 Root Cause\n\nThe crash happens inside -[GIDSignIn signInWithOptions:] — part of Google’s iOS SDK — meaning:\n\nThe Google Sign-In flow is being triggered without a valid iOS client configuration in your Firebase or Google Cloud project.",
//                         "username": "the",
//                         "websiteUrl": "www.fanfam.com/user/the",
//                         "displayName": "Andima King",
//                         "coverImageUrl": "http://res.cloudinary.com/dezb6qbwe/image/upload/v1761257413/ff132854-d43c-4107-95ee-9ae116e472dcfafam-20251006l33C1c23J9HKhH3eaOEIdOIM56pl2YDK9c0ISZhH.jpg"
//                     },
//                     "fee": 0
//                 },
//                 {
//                     "publicId": "234708K4AA0E111270654OB811",
//                     "endDate": "2026-01-05T11:27:06.28279",
//                     "creator": {
//                         "phoneNumber": "+2347066543321",
//                         "usid": "fafam-20251006cKeF2IOkkYBi3aVYieYlQWlE23JH0SV2BaRPW0fM",
//                         "email": "bloms@mailinator.com",
//                         "fullName": "ALEXANDER J SAMPLE",
//                         "gender": "male",
//                         "location": "NG",
//                         "bio": "The code now uses a custom key to store and retrieve cache options in the request extras, which works with your version of dio_cache_interceptor. All the caching functionality remains intact!",
//                         "username": "test_username",
//                         "websiteUrl": "www.fanfam.com/user/test_username",
//                         "displayName": "Andima Udoh",
//                         "coverImageUrl": "https://dummyimage.com/375x200/E4F1FC/000000&text=cover+image"
//                     },
//                     "subscriber": {
//                         "phoneNumber": "null",
//                         "usid": "fafam-20251031Yb9UegK9HW47BhfgUUnEVQ2bWRe15OhPpdbkMEaC",
//                         "role": "CREATOR",
//                         "email": "excessjunior@gmail.com",
//                         "residence": "moo",
//                         "fullName": "Micheal Ayo",
//                         "gender": "male",
//                         "location": "NG",
//                         "interest": "None",
//                         "bio": "All about the benjamins",
//                         "username": "alexxix",
//                         "websiteUrl": "www.fanfam.com/user/alexxix",
//                         "displayName": "Alexz",
//                         "coverImageUrl": "https://res.cloudinary.com/dezb6qbwe/image/upload/v1765020499/df6af795-aa31-4bea-9464-8a7b15b8055cfafam-20251031Yb9UegK9HW47BhfgUUnEVQ2bWRe15OhPpdbkMEaC.jpg",
//                         "creatorProfile": {
//                             "monthlyFee": 10,
//                             "personaInquiryId": "inq_RA83rLw9HppBeXpHc8mMupwb1SfN",
//                             "verified": true,
//                             "creatorBankInfo": {
//                                 "country": "Angola",
//                                 "bankName": "Omoluabi Mortgage Bank",
//                                 "bankCode": "990",
//                                 "accountNo": "1234567890",
//                                 "accountName": "Alexander J Sample"
//                             },
//                             "subscriptions": [
//                                 {
//                                     "publicId": "234708K4AA0E111270654OB811112723JD33UD11130506B4IB01",
//                                     "endDate": "2026-01-05T11:30:50.287424",
//                                     "creator": {
//                                         "phoneNumber": "null",
//                                         "usid": "fafam-20251031Yb9UegK9HW47BhfgUUnEVQ2bWRe15OhPpdbkMEaC",
//                                         "email": "excessjunior@gmail.com",
//                                         "fullName": "Micheal Ayo",
//                                         "gender": "male",
//                                         "location": "NG",
//                                         "profilePic": "https://res.cloudinary.com/dezb6qbwe/image/upload/v1765020499/482699bc-3f2a-4e11-916b-0cc0818a3803fafam-20251031Yb9UegK9HW47BhfgUUnEVQ2bWRe15OhPpdbkMEaC.jpg",
//                                         "bio": "All about the benjamins",
//                                         "username": "alexxix",
//                                         "websiteUrl": "www.fanfam.com/user/alexxix",
//                                         "displayName": "Alexz",
//                                         "coverImageUrl": "https://res.cloudinary.com/dezb6qbwe/image/upload/v1765020499/df6af795-aa31-4bea-9464-8a7b15b8055cfafam-20251031Yb9UegK9HW47BhfgUUnEVQ2bWRe15OhPpdbkMEaC.jpg"
//                                     },
//                                     "subscriber": {
//                                         "phoneNumber": "+2349077654432",
//                                         "usid": "fafam-20251006l33C1c23J9HKhH3eaOEIdOIM56pl2YDK9c0ISZhH",
//                                         "role": "VIEWER",
//                                         "email": "blomgram@mailinator.com",
//                                         "residence": "Homeless",
//                                         "fullName": "Andima King",
//                                         "gender": "male",
//                                         "location": "NG",
//                                         "interest": "I am interested in you",
//                                         "bio": "🧠 Root Cause\n\nThe crash happens inside -[GIDSignIn signInWithOptions:] — part of Google’s iOS SDK — meaning:\n\nThe Google Sign-In flow is being triggered without a valid iOS client configuration in your Firebase or Google Cloud project.",
//                                         "username": "the",
//                                         "websiteUrl": "www.fanfam.com/user/the",
//                                         "displayName": "Andima King",
//                                         "coverImageUrl": "http://res.cloudinary.com/dezb6qbwe/image/upload/v1761257413/ff132854-d43c-4107-95ee-9ae116e472dcfafam-20251006l33C1c23J9HKhH3eaOEIdOIM56pl2YDK9c0ISZhH.jpg"
//                                     },
//                                     "fee": 10
//                                 }
//                             ],
//                             "freeTrialLinks": [],
//                             "subscriptionBundles": [
//                                 {
//                                     "publicId": "173348S60P221173407HYEW291173439T3I51X1191118Q5Q5AW1191200EU44ZU1192420J7S9I51193043K823XV1203313186X4X12057469622NP1205746X27DA41205746CN9V8J120574650V8871210001YLWKOY12100109JPK001",
//                                     "createdDate": null,
//                                     "lastModifiedDate": "2025-11-21T21:00:10.718769",
//                                     "lastModifiedBy": null,
//                                     "amount": 25,
//                                     "durationInMonths": 3,
//                                     "startDate": null,
//                                     "endDate": "2026-02-21"
//                                 }
//                             ],
//                             "promotionCampaigns": []
//                         }
//                     },
//                     "fee": 0
//                 }
//             ],
//             "freeTrialLinks": [],
//             "subscriptionBundles": [
//                 {
//                     "publicId": "173348S60P221173407HYEW291173439T3I51X1191118Q5Q5AW1191200EU44ZU1192420J7S9I51193043K823XV1203313186X4X1",
//                     "createdDate": null,
//                     "lastModifiedDate": "2025-11-21T20:51:32.068162",
//                     "lastModifiedBy": null,
//                     "amount": 25,
//                     "durationInMonths": 3,
//                     "startDate": null,
//                     "endDate": "2025-11-24"
//                 }
//             ],
//             "promotionCampaigns": []
//         }
//     },
//     "fee": 800
// }

// Response for a viewer

// {
//     "publicId": "180520V21E37118583726ZUV91191024KAWA7S119144174Y6JE1193648P3K32B1195748HTV5021",
//     "endDate": "2026-01-04T19:57:48.586503",
//     "creator": {
//         "phoneNumber": "null",
//         "usid": "fafam-20251028dXedIgLFPoCVJGQmVHMO39F8HFLRUl1AoSUXU5c6",
//         "email": "andymaking@gmail.com",
//         "fullName": "Majek Fashek",
//         "gender": "male",
//         "location": "NG",
//         "profilePic": "https://res.cloudinary.com/dezb6qbwe/image/upload/v1764091247/b67b17fc-6eb2-49e3-a5bc-effef94405f7fafam-20251028dXedIgLFPoCVJGQmVHMO39F8HFLRUl1AoSUXU5c6.jpg",
//         "bio": "This is my bio, let me just write stuff",
//         "username": "myNames",
//         "websiteUrl": "www.fanfam.com/user/myNames",
//         "displayName": "Andima",
//         "coverImageUrl": "https://res.cloudinary.com/dezb6qbwe/image/upload/v1762550876/b7079762-c891-413c-b2b6-717ddca75ef5fafam-20251028dXedIgLFPoCVJGQmVHMO39F8HFLRUl1AoSUXU5c6.jpg"
//     },
//     "subscriber": {
//         "phoneNumber": "08184566783",
//         "usid": "fafam-20251204DIg0dnSbgIaLXgkpg1I87nhfhaIREE6dSgCTIWO6",
//         "role": "VIEWER",
//         "email": "subCreator@mailinator.com",
//         "residence": "sdfjskjfs",
//         "fullName": "Linda Stevens",
//         "gender": "Male",
//         "location": "Lagos",
//         "interest": "None",
//         "bio": "Prevailed sincerity behaviour to so do principle mr. As departure at no propriety zealously my. On dear rent if girl view. First on smart there he sense. Earnestly enjoyment her you resources. now again",
//         "username": "thisIsASubCreator",
//         "displayName": "Testing123"
//     },
//     "fee": 0
// }
