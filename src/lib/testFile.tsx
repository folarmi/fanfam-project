// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   // Get the token from cookies or headers
//   const token = request.cookies.get("auth-token");

//   // Define the paths that should be protected
//   const protectedPaths = ["/dashboard", "/profile"];

//   // Check if the request URL matches a protected path
//   const isProtectedPath = protectedPaths.some((path) =>
//     request.nextUrl.pathname.startsWith(path)
//   );

//   // If the path is protected and there's no token, redirect to the login page
//   if (isProtectedPath && !token) {
//     console.log("no tokennn");
//     const loginUrl = new URL("/", request.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   // If the token is valid (you might want to add more validation logic here), allow the request to proceed
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"], // Adjust the paths as needed
// };

// Former code for PostCard.tsx
// <article
//   style={{ backgroundColor: bgColor }}
//   className="pt-4 mb-2 drop-shadow-4xl"
//   aria-label={`Post by ${profileName}`}
// >
//   {/* Header Section */}
//   <header className="flex items-start px-4 relative">
//     <img
//       src={avatar}
//       alt={`${profileName}'s avatar`}
//       className="w-10 h-10 rounded-full flex-shrink-0"
//       loading="lazy"
//     />

//     <div className="flex justify-between w-full items-start ml-2">
//       <section className="flex-1 min-w-0">
//         {/* Profile Info */}
//         <div className="flex items-center flex-wrap gap-x-1.5">
//           <Typography variant="titleTwo" className="font-semibold truncate">
//             {profileName}
//           </Typography>

//           <Typography
//             variant="p2"
//             className="hidden md:inline text-grey_500 truncate"
//           >
//             {handle}
//           </Typography>

//           <Typography
//             variant="p2"
//             className="text-grey_500 ml-auto md:ml-0"
//           >
//             {time}
//           </Typography>
//         </div>

//         {/* Mobile handle */}
//         <Typography
//           variant="p2"
//           className="md:hidden text-grey_500 truncate"
//         >
//           {handle}
//         </Typography>

//         {/* Content Paragraphs */}
//         {ifParagraph && (paragraphOne || paragraphTwo) && (
//           <div className="mt-2 space-y-2">
//             {paragraphOne && (
//               <p className="font-normal text-sm text-grey_30 leading-5">
//                 {paragraphOne}
//               </p>
//             )}
//             {paragraphTwo && (
//               <p className="font-normal text-sm text-grey_700 leading-5">
//                 {paragraphTwo}
//               </p>
//             )}
//           </div>
//         )}
//       </section>

//       {/* More Options Button */}
//       <button
//         onClick={toggleModal}
//         className="cursor-pointer ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
//         aria-label="More options"
//         aria-expanded={showModal}
//         aria-haspopup="true"
//       >
//         <img src={ashMore} alt="" className="w-5 h-5" />
//       </button>

//       {/* Modal */}
//       {showModal && TimeLineModal && (
//         <div
//           ref={modalRef}
//           className="absolute right-0 top-8 bg-modal-gradient shadow-triple w-[262px] rounded-2xl border-2 border-white z-50"
//           role="menu"
//           aria-label="Post options"
//         >
//           {TimeLineModal}
//         </div>
//       )}
//     </div>
//   </header>

//   {/* Media Section */}

//   {hasImages && (
//     <div className="w-full my-4">
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
//         {timeLineImage?.slice(0, 6).map((media, index) => {
//           const isImage = media.mediaType === "PHOTO";
//           const isVideo = media.mediaType === "VIDEO";
//           const isDocument = media.mediaType === "DOCUMENT";
//           const hasMore = timeLineImage.length > 6 && index === 5;

//           return (
//             <div
//               key={`${media?.mediaLink}-${index}`}
//               className={`relative overflow-hidden ${
//                 timeLineImage?.length === 1
//                   ? "col-span-2 md:col-span-3 aspect-video"
//                   : "aspect-square"
//               }`}
//             >
//               {/* Overlay for "+X more" on last item */}
//               {hasMore && (
//                 <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 cursor-pointer rounded">
//                   <span className="text-white text-2xl font-semibold">
//                     +{timeLineImage.length - 6} more
//                   </span>
//                 </div>
//               )}

//               {isImage && (
//                 <img
//                   src={media?.mediaLink}
//                   alt={`Post image ${index + 1} of ${
//                     timeLineImage?.length
//                   }`}
//                   className="w-full h-full object-cover rounded"
//                   loading="lazy"
//                 />
//               )}

//               {isVideo && (
//                 <video
//                   src={media?.mediaLink}
//                   controls
//                   className="w-full h-full object-cover rounded"
//                   preload="metadata"
//                 >
//                   Your browser does not support the video tag.
//                 </video>
//               )}

//               {isDocument && (
//                 <a
//                   href={media?.mediaLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all border border-gray-200 rounded"
//                 >
//                   {/* Icon based on file extension */}
//                   {getFileIcon(media?.mediaLink)}
//                   <span className="text-sm font-medium text-gray-700 text-center px-2 mt-2 line-clamp-2">
//                     {getFileName(media?.mediaLink)}
//                   </span>
//                   <span className="text-xs text-gray-500 mt-1 flex items-center gap-1">
//                     <svg
//                       className="w-3 h-3"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                       />
//                     </svg>
//                     Download
//                   </span>
//                 </a>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   )}

//   {/* Action Icons */}
//   {ifIcon && (
//     <footer className="flex items-center py-4 ml-16">
//       {reactionsData?.map(({ type, icon: Icon, number }) => (
//         <IconAndNumber
//           key={type}
//           publicid={publicId}
//           reactionType={type}
//           Icon={Icon}
//           number={number}
//         />
//       ))}
//     </footer>
//   )}
// </article>

// {
//     "data": {
//         "content": [
//             {
//                 "publicId": "1QEUDJ03111324",
//                 "createdBy": "theCreator@mailinator.com",
//                 "lastModifiedBy": "userFive@mailinator.com",
//                 "createdDate": "2025-11-21T11:13:24.668904",
//                 "lastModifiedDate": "2025-11-21T17:27:35.030732",
//                 "creator": "theCreator@mailinator.com",
//                 "message": "Second Post",
//                 "mediaFiles": [],
//                 "comments": [
//                     {
//                         "publicId": "1Y042J1D173249",
//                         "createdBy": "theCreator@mailinator.com",
//                         "lastModifiedBy": "theCreator@mailinator.com",
//                         "createdDate": "2025-11-21T17:32:49.510304",
//                         "lastModifiedDate": "2025-11-21T17:32:49.510304",
//                         "message": "This is a response",
//                         "replies": [],
//                         "reactions": []
//                     }
//                 ],
//                 "reactions": [
//                     {
//                         "publicId": "1603EAJ4173235",
//                         "createdBy": "theCreator@mailinator.com",
//                         "lastModifiedBy": "theCreator@mailinator.com",
//                         "createdDate": "2025-11-21T17:32:35.637131",
//                         "lastModifiedDate": "2025-11-21T17:32:35.637131",
//                         "type": "LIKE"
//                     }
//                 ],
//                 "viewers": [
//                     "theCreator@mailinator.com",
//                     "userFive@mailinator.com"
//                 ],
//                 "meta": {
//                     "reactionCount": 1,
//                     "commentCount": 1,
//                     "viewCount": 2
//                 }
//             },
//             {
//                 "publicId": "1VOV65G0104721",
//                 "createdBy": "theCreator@mailinator.com",
//                 "lastModifiedBy": "userFive@mailinator.com",
//                 "createdDate": "2025-11-21T10:47:21.113915",
//                 "lastModifiedDate": "2025-11-21T17:27:38.862024",
//                 "creator": "theCreator@mailinator.com",
//                 "message": "THis is a test post",
//                 "mediaFiles": [],
//                 "comments": [
//                     {
//                         "publicId": "1Q774EG5110242",
//                         "createdBy": "theCreator@mailinator.com",
//                         "lastModifiedBy": "theCreator@mailinator.com",
//                         "createdDate": "2025-11-21T11:02:42.14686",
//                         "lastModifiedDate": "2025-11-21T11:02:42.14686",
//                         "message": "This is a reply",
//                         "replies": [],
//                         "reactions": []
//                     },
//                     {
//                         "publicId": "10LA1MB5110322",
//                         "createdBy": "theCreator@mailinator.com",
//                         "lastModifiedBy": "theCreator@mailinator.com",
//                         "createdDate": "2025-11-21T11:03:22.176876",
//                         "lastModifiedDate": "2025-11-21T11:03:22.176876",
//                         "message": "THis is the second level reply",
//                         "replies": [],
//                         "reactions": []
//                     },
//                     {
//                         "publicId": "1KPAW6F3110539",
//                         "createdBy": "theCreator@mailinator.com",
//                         "lastModifiedBy": "theCreator@mailinator.com",
//                         "createdDate": "2025-11-21T11:05:39.018704",
//                         "lastModifiedDate": "2025-11-21T11:05:39.018704",
//                         "message": "This is a third level comment",
//                         "replies": [],
//                         "reactions": []
//                     },
//                     {
//                         "publicId": "1PPLPAAG110713",
//                         "createdBy": "theCreator@mailinator.com",
//                         "lastModifiedBy": "theCreator@mailinator.com",
//                         "createdDate": "2025-11-21T11:07:13.133033",
//                         "lastModifiedDate": "2025-11-21T11:07:13.133033",
//                         "message": "Fourth level",
//                         "replies": [],
//                         "reactions": []
//                     }
//                 ],
//                 "reactions": [
//                     {
//                         "publicId": "16933ION173510",
//                         "createdBy": "theCreator@mailinator.com",
//                         "lastModifiedBy": "theCreator@mailinator.com",
//                         "createdDate": "2025-11-21T17:35:10.722451",
//                         "lastModifiedDate": "2025-11-21T17:35:22.021753",
//                         "type": "DISLIKE"
//                     }
//                 ],
//                 "viewers": [
//                     "theCreator@mailinator.com",
//                     "userFive@mailinator.com"
//                 ],
//                 "meta": {
//                     "reactionCount": 1,
//                     "commentCount": 4,
//                     "viewCount": 2
//                 }
//             }
//         ],
//         "pageable": {
//             "pageNumber": 0,
//             "pageSize": 20,
//             "sort": {
//                 "sorted": true,
//                 "empty": false,
//                 "unsorted": false
//             },
//             "offset": 0,
//             "paged": true,
//             "unpaged": false
//         },
//         "last": true,
//         "totalPages": 1,
//         "totalElements": 2,
//         "size": 20,
//         "number": 0,
//         "sort": {
//             "sorted": true,
//             "empty": false,
//             "unsorted": false
//         },
//         "first": true,
//         "numberOfElements": 2,
//         "empty": false
//     },
//     "message": "Operation completed successfully",
//     "success": true,
//     "timestamp": "2025-11-23T05:50:53.374113798"
// }

export const testCreators = [
  {
    phoneNumber: "+2347066543321",
    usid: "fafam-20251006cKeF2IOkkYBi3aVYieYlQWlE23JH0SV2BaRPW0fM",
    role: "CREATOR",
    email: "bloms@mailinator.com",
    residence: "Homeless",
    fullName: "ALEXANDER J SAMPLEsssss",
    gender: "male",
    location: "NG",
    interest: "None for now",
    bio: "The code now uses a custom key to store and retrieve cache options in the request extras, which works with your version of dio_cache_interceptor. All the caching functionality remains intact!",
    username: "test_username",
    websiteUrl: "www.fanfam.com/user/test_username",
    displayName: "Andima Udoh",
    coverImageUrl:
      "https://dummyimage.com/375x200/E4F1FC/000000&text=cover+image",
    creatorProfile: {
      monthlyFee: 0,
      personaInquiryId: "inq_meFksaARnB1aqnTNsUvNeTtw57ht",
      verified: true,
      creatorBankInfo: {
        country: "Angola",
        bankName: "First Bank of Nigeria",
        bankCode: "011",
        accountNo: "0058241325",
        accountName: "Alexander J Sample",
      },
      freeTrialLinks: [],
      subscriptionBundles: [
        {
          publicId:
            "173348S60P221173407HYEW291173439T3I51X1191118Q5Q5AW1191200EU44ZU1192420J7S9I51193043K823XV1203313186X4X1",
          createdDate: null,
          lastModifiedDate: "2025-11-21T20:51:32.068162",
          lastModifiedBy: null,
          amount: 25,
          durationInMonths: 3,
          startDate: null,
          endDate: "2025-11-24",
        },
      ],
      promotionCampaigns: [],
    },
  },
  {
    phoneNumber: "08176544345",
    usid: "fafam-20251115JY86aKbd0UhmbbPdbZY4b04ITbpehJBcLASL5RQL",
    role: "CREATOR",
    email: "theCreator@mailinator.com",
    residence: "ksfjsbfs",
    fullName: "ALEXANDER J SAMPLE",
    gender: "Male",
    location: "Lagos",
    interest: "Blanditiis consectet",
    bio: "sbdjhfbsdf",
    username: "creator002",
    displayName: "TheCreator",
    coverImageUrl:
      "https://res.cloudinary.com/dezb6qbwe/image/upload/v1763493625/0778edc3-10c3-47c4-a321-c0d52a1ecf61fafam-20251115JY86aKbd0UhmbbPdbZY4b04ITbpehJBcLASL5RQL.jpg",
    creatorProfile: {
      monthlyFee: 800,
      personaInquiryId: "inq_2P9HD7sfvbt5KVdSpoUz7KKJhuto",
      verified: true,
      creatorBankInfo: {
        country: "Nigeria",
        bankName: "First Bank of Nigeria Limited",
        bankCode: "098",
        accountNo: "1234567890",
        accountName: "Test User",
      },
      freeTrialLinks: [
        {
          publicId: "201038TAW0U21201457RXZ23Z1202958O79D171",
          createdDate: null,
          lastModifiedDate: "2025-11-20T20:29:58.566577",
          lastModifiedBy: null,
          name: "Test two",
          limitSize: 25,
          endDate: "2025-11-18",
          duration: 14,
        },
      ],
      subscriptionBundles: [
        {
          publicId:
            "201038TAW0U21201457RXZ23Z1202958O79D1712031206UL4821213022UYPQOY1",
          createdDate: null,
          lastModifiedDate: "2025-11-20T21:30:22.420443",
          lastModifiedBy: null,
          amount: 600000,
          durationInMonths: 10,
          startDate: null,
          endDate: "2026-09-20",
        },
      ],
      promotionCampaigns: [
        {
          publicId: "125537W126B41",
          createdDate: null,
          lastModifiedDate: "2025-11-23T05:47:32.984046",
          lastModifiedBy: null,
          name: "testName",
          limitSize: 10,
          endDate: "2025-12-23",
          duration: 30,
          message: null,
          qualifier: "EXPIRED_SUBSCRIBERS",
          type: "FIRST_MONTH_DISCOUNT",
        },
        {
          publicId: "173348S60P221",
          createdDate: null,
          lastModifiedDate: "2025-11-23T05:48:13.253361",
          lastModifiedBy: null,
          name: "testName",
          limitSize: 50,
          endDate: "2025-12-23",
          duration: 14,
          message: null,
          qualifier: "NEW_SUBSCRIBERS",
          type: "FIRST_MONTH_DISCOUNT",
        },
        {
          publicId:
            "201038TAW0U21201457RXZ23Z1202958O79D1712031206UL4821213022UYPQOY121345214CXXD1080458Q8Y75C11124456HY34P1",
          createdDate: null,
          lastModifiedDate: "2025-11-23T05:48:18.980767",
          lastModifiedBy: null,
          name: "testName",
          limitSize: 5,
          endDate: "2025-12-23",
          duration: 14,
          message: null,
          qualifier: "NEW_SUBSCRIBERS",
          type: "FIRST_MONTH_DISCOUNT",
        },
      ],
    },
  },
  {
    phoneNumber: "+2347044018811",
    usid: "fafam-20251003N5O4ULgYi2NcRhgLdLp9MgTGC4TLU89ndOAac2A7",
    role: "CREATOR",
    email: "damisco005@gmail.com",
    residence: "lagos, nigeria",
    fullName: "ALEXANDER J SAMPLE",
    gender: "Male",
    location: "lagos, nigeria",
    interest: "money",
    bio: "software engineer",
    username: "codam",
    displayName: "codam",
    creatorProfile: {
      monthlyFee: 200,
      personaInquiryId: "inq_R18vhnPdyPJrtuJtmuANZKjgYfP9",
      verified: true,
      freeTrialLinks: [],
      subscriptionBundles: [],
      promotionCampaigns: [],
    },
  },
  {
    phoneNumber: "null",
    usid: "fafam-20251031Yb9UegK9HW47BhfgUUnEVQ2bWRe15OhPpdbkMEaC",
    role: "CREATOR",
    email: "excessjunior@gmail.com",
    residence: "moo",
    fullName: "Micheal Ayo",
    gender: "male",
    location: "NG",
    interest: "None",
    bio: "All about the benjamins",
    username: "alexxix",
    websiteUrl: "www.fanfam.com/user/alexxix",
    displayName: "Alexz",
    coverImageUrl:
      "https://res.cloudinary.com/dezb6qbwe/image/upload/v1765020499/df6af795-aa31-4bea-9464-8a7b15b8055cfafam-20251031Yb9UegK9HW47BhfgUUnEVQ2bWRe15OhPpdbkMEaC.jpg",
    creatorProfile: {
      monthlyFee: 10,
      personaInquiryId: "inq_RA83rLw9HppBeXpHc8mMupwb1SfN",
      verified: true,
      creatorBankInfo: {
        country: "Angola",
        bankName: "Omoluabi Mortgage Bank",
        bankCode: "990",
        accountNo: "1234567890",
        accountName: "Alexander J Sample",
      },
      freeTrialLinks: [],
      subscriptionBundles: [
        {
          publicId:
            "173348S60P221173407HYEW291173439T3I51X1191118Q5Q5AW1191200EU44ZU1192420J7S9I51193043K823XV1203313186X4X12057469622NP1205746X27DA41205746CN9V8J120574650V8871210001YLWKOY12100109JPK001",
          createdDate: null,
          lastModifiedDate: "2025-11-21T21:00:10.718769",
          lastModifiedBy: null,
          amount: 25,
          durationInMonths: 3,
          startDate: null,
          endDate: "2026-02-21",
        },
      ],
      promotionCampaigns: [],
    },
  },
  {
    phoneNumber: "null",
    usid: "fafam-20251028dXedIgLFPoCVJGQmVHMO39F8HFLRUl1AoSUXU5c6",
    role: "CREATOR",
    email: "andymaking@gmail.com",
    residence: "I stay where I stay",
    fullName: "Majek Fashek",
    gender: "male",
    location: "NG",
    interest: "Omoo",
    bio: "This is my bio, let me just write stuff",
    username: "myNames",
    websiteUrl: "www.fanfam.com/user/myNames",
    displayName: "Andima",
    coverImageUrl:
      "https://res.cloudinary.com/dezb6qbwe/image/upload/v1762550876/b7079762-c891-413c-b2b6-717ddca75ef5fafam-20251028dXedIgLFPoCVJGQmVHMO39F8HFLRUl1AoSUXU5c6.jpg",
    creatorProfile: {
      monthlyFee: 0,
      personaInquiryId: "inq_zh1tkxd2TY3oeW8fhxo4dirPafdn",
      verified: true,
      freeTrialLinks: [],
      subscriptionBundles: [],
      promotionCampaigns: [],
    },
  },
  {
    phoneNumber: "+2347066543321",
    usid: "fafam-20251006cKeF2IOkkYBi3aVYieYlQWlE23JH0SV2BaRPW0fM",
    role: "CREATOR",
    email: "bloms@mailinator.com",
    residence: "Homeless",
    fullName: "ALEXANDER J SAMPLE",
    gender: "male",
    location: "NG",
    interest: "None for now",
    bio: "The code now uses a custom key to store and retrieve cache options in the request extras, which works with your version of dio_cache_interceptor. All the caching functionality remains intact!",
    username: "test_username",
    websiteUrl: "www.fanfam.com/user/test_username",
    displayName: "Andima Udoh",
    coverImageUrl:
      "https://dummyimage.com/375x200/E4F1FC/000000&text=cover+image",
    creatorProfile: {
      monthlyFee: 0,
      personaInquiryId: "inq_meFksaARnB1aqnTNsUvNeTtw57ht",
      verified: true,
      creatorBankInfo: {
        country: "Angola",
        bankName: "First Bank of Nigeria",
        bankCode: "011",
        accountNo: "0058241325",
        accountName: "Alexander J Sample",
      },
      freeTrialLinks: [],
      subscriptionBundles: [
        {
          publicId:
            "173348S60P221173407HYEW291173439T3I51X1191118Q5Q5AW1191200EU44ZU1192420J7S9I51193043K823XV1203313186X4X1",
          createdDate: null,
          lastModifiedDate: "2025-11-21T20:51:32.068162",
          lastModifiedBy: null,
          amount: 25,
          durationInMonths: 3,
          startDate: null,
          endDate: "2025-11-24",
        },
      ],
      promotionCampaigns: [],
    },
  },
  {
    phoneNumber: "08176544345",
    usid: "fafam-20251115JY86aKbd0UhmbbPdbZY4b04ITbpehJBcLASL5RQL",
    role: "CREATOR",
    email: "theCreator@mailinator.com",
    residence: "ksfjsbfs",
    fullName: "ALEXANDER J SAMPLE",
    gender: "Male",
    location: "Lagos",
    interest: "Blanditiis consectet",
    bio: "sbdjhfbsdf",
    username: "creator002",
    displayName: "TheCreator",
    coverImageUrl:
      "https://res.cloudinary.com/dezb6qbwe/image/upload/v1763493625/0778edc3-10c3-47c4-a321-c0d52a1ecf61fafam-20251115JY86aKbd0UhmbbPdbZY4b04ITbpehJBcLASL5RQL.jpg",
    creatorProfile: {
      monthlyFee: 800,
      personaInquiryId: "inq_2P9HD7sfvbt5KVdSpoUz7KKJhuto",
      verified: true,
      creatorBankInfo: {
        country: "Nigeria",
        bankName: "First Bank of Nigeria Limited",
        bankCode: "098",
        accountNo: "1234567890",
        accountName: "Test User",
      },
      freeTrialLinks: [
        {
          publicId: "201038TAW0U21201457RXZ23Z1202958O79D171",
          createdDate: null,
          lastModifiedDate: "2025-11-20T20:29:58.566577",
          lastModifiedBy: null,
          name: "Test two",
          limitSize: 25,
          endDate: "2025-11-18",
          duration: 14,
        },
      ],
      subscriptionBundles: [
        {
          publicId:
            "201038TAW0U21201457RXZ23Z1202958O79D1712031206UL4821213022UYPQOY1",
          createdDate: null,
          lastModifiedDate: "2025-11-20T21:30:22.420443",
          lastModifiedBy: null,
          amount: 600000,
          durationInMonths: 10,
          startDate: null,
          endDate: "2026-09-20",
        },
      ],
      promotionCampaigns: [
        {
          publicId: "125537W126B41",
          createdDate: null,
          lastModifiedDate: "2025-11-23T05:47:32.984046",
          lastModifiedBy: null,
          name: "testName",
          limitSize: 10,
          endDate: "2025-12-23",
          duration: 30,
          message: null,
          qualifier: "EXPIRED_SUBSCRIBERS",
          type: "FIRST_MONTH_DISCOUNT",
        },
        {
          publicId: "173348S60P221",
          createdDate: null,
          lastModifiedDate: "2025-11-23T05:48:13.253361",
          lastModifiedBy: null,
          name: "testName",
          limitSize: 50,
          endDate: "2025-12-23",
          duration: 14,
          message: null,
          qualifier: "NEW_SUBSCRIBERS",
          type: "FIRST_MONTH_DISCOUNT",
        },
        {
          publicId:
            "201038TAW0U21201457RXZ23Z1202958O79D1712031206UL4821213022UYPQOY121345214CXXD1080458Q8Y75C11124456HY34P1",
          createdDate: null,
          lastModifiedDate: "2025-11-23T05:48:18.980767",
          lastModifiedBy: null,
          name: "testName",
          limitSize: 5,
          endDate: "2025-12-23",
          duration: 14,
          message: null,
          qualifier: "NEW_SUBSCRIBERS",
          type: "FIRST_MONTH_DISCOUNT",
        },
      ],
    },
  },
  {
    phoneNumber: "+2347044018811",
    usid: "fafam-20251003N5O4ULgYi2NcRhgLdLp9MgTGC4TLU89ndOAac2A7",
    role: "CREATOR",
    email: "damisco005@gmail.com",
    residence: "lagos, nigeria",
    fullName: "ALEXANDER J SAMPLE",
    gender: "Male",
    location: "lagos, nigeria",
    interest: "money",
    bio: "software engineer",
    username: "codam",
    displayName: "codam",
    creatorProfile: {
      monthlyFee: 200,
      personaInquiryId: "inq_R18vhnPdyPJrtuJtmuANZKjgYfP9",
      verified: true,
      freeTrialLinks: [],
      subscriptionBundles: [],
      promotionCampaigns: [],
    },
  },
  {
    phoneNumber: "null",
    usid: "fafam-20251031Yb9UegK9HW47BhfgUUnEVQ2bWRe15OhPpdbkMEaC",
    role: "CREATOR",
    email: "excessjunior@gmail.com",
    residence: "moo",
    fullName: "Micheal Ayo",
    gender: "male",
    location: "NG",
    interest: "None",
    bio: "All about the benjamins",
    username: "alexxix",
    websiteUrl: "www.fanfam.com/user/alexxix",
    displayName: "Alexz",
    coverImageUrl:
      "https://res.cloudinary.com/dezb6qbwe/image/upload/v1765020499/df6af795-aa31-4bea-9464-8a7b15b8055cfafam-20251031Yb9UegK9HW47BhfgUUnEVQ2bWRe15OhPpdbkMEaC.jpg",
    creatorProfile: {
      monthlyFee: 10,
      personaInquiryId: "inq_RA83rLw9HppBeXpHc8mMupwb1SfN",
      verified: true,
      creatorBankInfo: {
        country: "Angola",
        bankName: "Omoluabi Mortgage Bank",
        bankCode: "990",
        accountNo: "1234567890",
        accountName: "Alexander J Sample",
      },
      freeTrialLinks: [],
      subscriptionBundles: [
        {
          publicId:
            "173348S60P221173407HYEW291173439T3I51X1191118Q5Q5AW1191200EU44ZU1192420J7S9I51193043K823XV1203313186X4X12057469622NP1205746X27DA41205746CN9V8J120574650V8871210001YLWKOY12100109JPK001",
          createdDate: null,
          lastModifiedDate: "2025-11-21T21:00:10.718769",
          lastModifiedBy: null,
          amount: 25,
          durationInMonths: 3,
          startDate: null,
          endDate: "2026-02-21",
        },
      ],
      promotionCampaigns: [],
    },
  },
  {
    phoneNumber: "null",
    usid: "fafam-20251028dXedIgLFPoCVJGQmVHMO39F8HFLRUl1AoSUXU5c6",
    role: "CREATOR",
    email: "andymaking@gmail.com",
    residence: "I stay where I stay",
    fullName: "Majek Fashek",
    gender: "male",
    location: "NG",
    interest: "Omoo",
    bio: "This is my bio, let me just write stuff",
    username: "myNames",
    websiteUrl: "www.fanfam.com/user/myNames",
    displayName: "Andima",
    coverImageUrl:
      "https://res.cloudinary.com/dezb6qbwe/image/upload/v1762550876/b7079762-c891-413c-b2b6-717ddca75ef5fafam-20251028dXedIgLFPoCVJGQmVHMO39F8HFLRUl1AoSUXU5c6.jpg",
    creatorProfile: {
      monthlyFee: 0,
      personaInquiryId: "inq_zh1tkxd2TY3oeW8fhxo4dirPafdn",
      verified: true,
      freeTrialLinks: [],
      subscriptionBundles: [],
      promotionCampaigns: [],
    },
  },
  {
    phoneNumber: "+2347066543321",
    usid: "fafam-20251006cKeF2IOkkYBi3aVYieYlQWlE23JH0SV2BaRPW0fM",
    role: "CREATOR",
    email: "bloms@mailinator.com",
    residence: "Homeless",
    fullName: "ALEXANDER J SAMPLE",
    gender: "male",
    location: "NG",
    interest: "None for now",
    bio: "The code now uses a custom key to store and retrieve cache options in the request extras, which works with your version of dio_cache_interceptor. All the caching functionality remains intact!",
    username: "test_username",
    websiteUrl: "www.fanfam.com/user/test_username",
    displayName: "Andima Udoh",
    coverImageUrl:
      "https://dummyimage.com/375x200/E4F1FC/000000&text=cover+image",
    creatorProfile: {
      monthlyFee: 0,
      personaInquiryId: "inq_meFksaARnB1aqnTNsUvNeTtw57ht",
      verified: true,
      creatorBankInfo: {
        country: "Angola",
        bankName: "First Bank of Nigeria",
        bankCode: "011",
        accountNo: "0058241325",
        accountName: "Alexander J Sample",
      },
      freeTrialLinks: [],
      subscriptionBundles: [
        {
          publicId:
            "173348S60P221173407HYEW291173439T3I51X1191118Q5Q5AW1191200EU44ZU1192420J7S9I51193043K823XV1203313186X4X1",
          createdDate: null,
          lastModifiedDate: "2025-11-21T20:51:32.068162",
          lastModifiedBy: null,
          amount: 25,
          durationInMonths: 3,
          startDate: null,
          endDate: "2025-11-24",
        },
      ],
      promotionCampaigns: [],
    },
  },
  {
    phoneNumber: "08176544345",
    usid: "fafam-20251115JY86aKbd0UhmbbPdbZY4b04ITbpehJBcLASL5RQL",
    role: "CREATOR",
    email: "theCreator@mailinator.com",
    residence: "ksfjsbfs",
    fullName: "ALEXANDER J SAMPLE",
    gender: "Male",
    location: "Lagos",
    interest: "Blanditiis consectet",
    bio: "sbdjhfbsdf",
    username: "creator002",
    displayName: "TheCreator",
    coverImageUrl:
      "https://res.cloudinary.com/dezb6qbwe/image/upload/v1763493625/0778edc3-10c3-47c4-a321-c0d52a1ecf61fafam-20251115JY86aKbd0UhmbbPdbZY4b04ITbpehJBcLASL5RQL.jpg",
    creatorProfile: {
      monthlyFee: 800,
      personaInquiryId: "inq_2P9HD7sfvbt5KVdSpoUz7KKJhuto",
      verified: true,
      creatorBankInfo: {
        country: "Nigeria",
        bankName: "First Bank of Nigeria Limited",
        bankCode: "098",
        accountNo: "1234567890",
        accountName: "Test User",
      },
      freeTrialLinks: [
        {
          publicId: "201038TAW0U21201457RXZ23Z1202958O79D171",
          createdDate: null,
          lastModifiedDate: "2025-11-20T20:29:58.566577",
          lastModifiedBy: null,
          name: "Test two",
          limitSize: 25,
          endDate: "2025-11-18",
          duration: 14,
        },
      ],
      subscriptionBundles: [
        {
          publicId:
            "201038TAW0U21201457RXZ23Z1202958O79D1712031206UL4821213022UYPQOY1",
          createdDate: null,
          lastModifiedDate: "2025-11-20T21:30:22.420443",
          lastModifiedBy: null,
          amount: 600000,
          durationInMonths: 10,
          startDate: null,
          endDate: "2026-09-20",
        },
      ],
      promotionCampaigns: [
        {
          publicId: "125537W126B41",
          createdDate: null,
          lastModifiedDate: "2025-11-23T05:47:32.984046",
          lastModifiedBy: null,
          name: "testName",
          limitSize: 10,
          endDate: "2025-12-23",
          duration: 30,
          message: null,
          qualifier: "EXPIRED_SUBSCRIBERS",
          type: "FIRST_MONTH_DISCOUNT",
        },
        {
          publicId: "173348S60P221",
          createdDate: null,
          lastModifiedDate: "2025-11-23T05:48:13.253361",
          lastModifiedBy: null,
          name: "testName",
          limitSize: 50,
          endDate: "2025-12-23",
          duration: 14,
          message: null,
          qualifier: "NEW_SUBSCRIBERS",
          type: "FIRST_MONTH_DISCOUNT",
        },
        {
          publicId:
            "201038TAW0U21201457RXZ23Z1202958O79D1712031206UL4821213022UYPQOY121345214CXXD1080458Q8Y75C11124456HY34P1",
          createdDate: null,
          lastModifiedDate: "2025-11-23T05:48:18.980767",
          lastModifiedBy: null,
          name: "testName",
          limitSize: 5,
          endDate: "2025-12-23",
          duration: 14,
          message: null,
          qualifier: "NEW_SUBSCRIBERS",
          type: "FIRST_MONTH_DISCOUNT",
        },
      ],
    },
  },
  {
    phoneNumber: "+2347044018811",
    usid: "fafam-20251003N5O4ULgYi2NcRhgLdLp9MgTGC4TLU89ndOAac2A7",
    role: "CREATOR",
    email: "damisco005@gmail.com",
    residence: "lagos, nigeria",
    fullName: "ALEXANDER J SAMPLE",
    gender: "Male",
    location: "lagos, nigeria",
    interest: "money",
    bio: "software engineer",
    username: "codam",
    displayName: "codam",
    creatorProfile: {
      monthlyFee: 200,
      personaInquiryId: "inq_R18vhnPdyPJrtuJtmuANZKjgYfP9",
      verified: true,
      freeTrialLinks: [],
      subscriptionBundles: [],
      promotionCampaigns: [],
    },
  },
  {
    phoneNumber: "null",
    usid: "fafam-20251031Yb9UegK9HW47BhfgUUnEVQ2bWRe15OhPpdbkMEaC",
    role: "CREATOR",
    email: "excessjunior@gmail.com",
    residence: "moo",
    fullName: "Micheal Ayo",
    gender: "male",
    location: "NG",
    interest: "None",
    bio: "All about the benjamins",
    username: "alexxix",
    websiteUrl: "www.fanfam.com/user/alexxix",
    displayName: "Alexz",
    coverImageUrl:
      "https://res.cloudinary.com/dezb6qbwe/image/upload/v1765020499/df6af795-aa31-4bea-9464-8a7b15b8055cfafam-20251031Yb9UegK9HW47BhfgUUnEVQ2bWRe15OhPpdbkMEaC.jpg",
    creatorProfile: {
      monthlyFee: 10,
      personaInquiryId: "inq_RA83rLw9HppBeXpHc8mMupwb1SfN",
      verified: true,
      creatorBankInfo: {
        country: "Angola",
        bankName: "Omoluabi Mortgage Bank",
        bankCode: "990",
        accountNo: "1234567890",
        accountName: "Alexander J Sample",
      },
      freeTrialLinks: [],
      subscriptionBundles: [
        {
          publicId:
            "173348S60P221173407HYEW291173439T3I51X1191118Q5Q5AW1191200EU44ZU1192420J7S9I51193043K823XV1203313186X4X12057469622NP1205746X27DA41205746CN9V8J120574650V8871210001YLWKOY12100109JPK001",
          createdDate: null,
          lastModifiedDate: "2025-11-21T21:00:10.718769",
          lastModifiedBy: null,
          amount: 25,
          durationInMonths: 3,
          startDate: null,
          endDate: "2026-02-21",
        },
      ],
      promotionCampaigns: [],
    },
  },
  {
    phoneNumber: "null",
    usid: "fafam-20251028dXedIgLFPoCVJGQmVHMO39F8HFLRUl1AoSUXU5c6",
    role: "CREATOR",
    email: "andymaking@gmail.com",
    residence: "I stay where I stay",
    fullName: "Majek Fashek",
    gender: "male",
    location: "NG",
    interest: "Omoo",
    bio: "This is my bio, let me just write stuff",
    username: "myNames",
    websiteUrl: "www.fanfam.com/user/myNames",
    displayName: "Andima",
    coverImageUrl:
      "https://res.cloudinary.com/dezb6qbwe/image/upload/v1762550876/b7079762-c891-413c-b2b6-717ddca75ef5fafam-20251028dXedIgLFPoCVJGQmVHMO39F8HFLRUl1AoSUXU5c6.jpg",
    creatorProfile: {
      monthlyFee: 0,
      personaInquiryId: "inq_zh1tkxd2TY3oeW8fhxo4dirPafdn",
      verified: true,
      freeTrialLinks: [],
      subscriptionBundles: [],
      promotionCampaigns: [],
    },
  },
];

// {creatorId: 'fafam-20251115JY86aKbd0UhmbbPdbZY4b04ITbpehJBcLASL5RQL'}
// Subscribed to: fafam-20251115JY86aKbd0UhmbbPdbZY4b04ITbpehJBcLASL5RQL
