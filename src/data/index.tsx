/* eslint-disable @typescript-eslint/no-explicit-any */
// import profile from "../assets/icons/profile.svg";
import defaultAvatar from "../assets/defaultAvatar.svg";
import defaultAvatarTwo from "../assets/icons/defaultAvatarTwo.svg";
import defaultAvatarThree from "../assets/icons/defaultAvatarThree.svg";
import defaultAvatarFour from "../assets/icons/defaultAvatarFour.svg";
import defaultAvatarFive from "../assets/icons/defaultAvatarFive.svg";
import gridOne from "../assets/gridOne.svg";
import gridTwo from "../assets/gridTwo.svg";
import gridThree from "../assets/gridThree.svg";
import gridFour from "../assets/gridFour.svg";
import gridFive from "../assets/gridFive.svg";
import gridSix from "../assets/gridSix.svg";
import timelineTwo from "../assets/timelineTwo.svg";
import audioFile from "../assets/icons/audioFile.svg";
import post from "../assets/icons/post.svg";
import story from "../assets/icons/story.svg";
import video from "../assets/icons/video.svg";
import sampleImageOne from "../assets/sampleImageOne.svg";
import sampleImageTwo from "../assets/sampleImageTwo.svg";
import SA from "../assets/icons/SA.svg";
import NIG from "../assets/icons/NIG.svg";
import GH from "../assets/icons/GH.svg";
import Home from "../components/svgs/Home";
import Notification from "../components/svgs/Notification";
// import Messages from "../components/svgs/Messages";
// import Collections from "../components/svgs/Collections";
// import Schedule from "../components/svgs/Schedule";
import MyAccount from "../components/svgs/MyAccount";
import Profile from "../components/svgs/Profile";
import all from "../assets/all.svg";
import africa from "../assets/africa.svg";
import asia from "../assets/asia.svg";
import europe from "../assets/europe.svg";
import northAmerica from "../assets/northAmerica.svg";
import oceania from "../assets/oceania.svg";
import southAmerica from "../assets/southAmerica.svg";
import algeria from "../assets/icons/algeria.svg";
import eastTimor from "../assets/icons/eastTimor.svg";
import biking from "../assets/biking.svg";
import skiDiving from "../assets/skiDiving.svg";
import dance from "../assets/dance.svg";
import party from "../assets/party.svg";
import foods from "../assets/foods.svg";
import tech from "../assets/tech.svg";
import travels from "../assets/travels.svg";
import music from "../assets/music.svg";
import sports from "../assets/sports.svg";
import happyEmoji from "../assets/icons/happyEmoji.svg";
import videoEmoji from "../assets/icons/videoEmoji.svg";
import blurEmoji from "../assets/icons/blurEmoji.svg";
import galleryEmoji from "../assets/icons/galleryEmoji.svg";
import { SettingsIcon } from "../components/svgs/Settings";
import type {
  Action,
  DisplayObject,
  FreeTrial,
  NotificationObject,
  PrivacyAndSafetyData,
  PromotionalCampaignType,
} from "@/lib/types";
import countryList from "react-select-country-list";
import { CreatorIcon } from "@/components/svgs/Creator";
import creatorOne from "@/assets/icons/creatorOne.svg";
import creatorTwo from "@/assets/icons/creatorTwo.svg";
import creatorThree from "@/assets/icons/creatorThree.svg";
import creatorFour from "@/assets/icons/creatorFour.svg";
import { convertToHumanReadableDate, getRemainingDays } from "@/utils/helper";
import { Link } from "react-router-dom";
// import CustomButton from "@/components/forms/CustomButton";
import BlueBorderedButton from "@/components/forms/BlueBorderedButton";
import landingIconOne from "@/assets/icons/landingIconOne.svg";
import landingIconTwo from "@/assets/icons/landingIconTwo.svg";
import Collections from "@/components/svgs/Collections";

export const landingPageMenu = [
  {
    id: 1,
    name: "The Problem",
    target: "audience",
  },
  {
    id: 2,
    name: "Early Access",
    target: "footer",
  },
];

export const ownYourAudience = [
  {
    id: 1,
    title: "You Don't Own Your Audience",
    body: "Your followers belong to the platform, not you. One algorithm change and your reach vanishes overnight.",
    icon: landingIconOne,
    bgColor: "#12141D",
    color: "#FFFFFF",
  },
  {
    id: 2,
    title: "Shallow Engagement",
    body: "Likes and views don't pay the bills. Algorithms reward virality, not meaningful fan relationships.",
    icon: landingIconTwo,
    bgColor: "#92CDFE",
    color: "#000000",
  },
  {
    id: 1,
    title: "Platform Dependency",
    body: "You're building on rented land. Changes to terms, monetization, or policies can destroy years of work.",
    icon: landingIconOne,
    bgColor: "#12141D",
    color: "#FFFFFF",
  },
];

export const meetFanFamData = [
  {
    id: 1,
    name: "Community First",
  },
  {
    id: 2,
    name: "Creator Owned",
  },
  {
    id: 3,
    name: "Fan Powered",
  },
  {
    id: 4,
    name: "Algorithm Free",
  },
];

export const builtForCreators = [
  {
    id: 1,
    title: "True Audience Ownership",
    body: "Your fans, your data, your rules. Export anytime, no lock-in. Build on your own terms.",
  },
  {
    id: 2,
    title: "Deep Fan Engagement",
    body: "Go beyond likes. Create meaningful interactions that turn casual followers into superfans.",
  },
  {
    id: 3,
    title: "Community-First Experiences",
    body: "Build spaces where fans connect with each other, not just with you. Foster belonging",
  },
  {
    id: 4,
    title: "Sustainable Monetization",
    body: "Multiple revenue streams designed for the long-term. Subscriptions, tips, exclusives, and more.",
  },
];

export const sideBarItems = [
  {
    id: 1,
    name: "Home",
    image: (isActive: boolean) => <Home active={isActive} />,
    link: "/dashboard",
    exact: true,
    roles: ["CREATOR", "VIEWER"],
  },
  {
    id: 2,
    name: "Notifications",
    image: (isActive: boolean) => <Notification active={isActive} />,
    link: "/dashboard/notifications",
    exact: false,
    roles: ["CREATOR", "VIEWER"],
  },
  // {
  //   id: 3,
  //   name: "Messages",
  //   image: (isActive: boolean) => <Messages active={isActive} />,
  //   link: "/dashboard/messages",
  //   roles: ["CREATOR", "VIEWER"],
  // },
  {
    id: 4,
    name: "Collections",
    image: (isActive: boolean) => <Collections active={isActive} />,
    link: "/dashboard/collections",
    roles: ["CREATOR", "VIEWER"],
  },
  // {
  //   id: 8,
  //   name: "Schedule",
  //   image: (isActive: boolean) => <Schedule active={isActive} />,
  //   link: "/dashboard/schedule",
  //   roles: ["CREATOR", "VIEWER"],
  // },
  {
    id: 5,
    name: "My Account",
    image: (isActive: boolean) => <MyAccount active={isActive} />,
    link: "/dashboard/account/settings",
    roles: ["CREATOR", "VIEWER"],
  },
  {
    id: 6,
    name: "Profile",
    image: (isActive: boolean) => <Profile active={isActive} />,
    link: "/dashboard/profile",
    roles: ["CREATOR", "VIEWER"],
  },
  {
    id: 7,
    name: "Settings",
    image: (isActive: boolean) => <SettingsIcon active={isActive} />,
    link: "/dashboard/settings/account",
    roles: ["CREATOR", "VIEWER"],
  },
  // {
  //   id: 10,
  //   name: "Bookmarks",
  //   image: (isActive: boolean) => (
  //     <Bookmark color={isActive ? "#2599F6" : "#8D8E96"} />
  //   ),
  //   link: "/dashboard/bookmarks",
  //   roles: ["CREATOR", "VIEWER"],
  // },
  {
    id: 9,
    name: "Become a Creator",
    image: (isActive: boolean) => <CreatorIcon active={isActive} />,
    link: "/dashboard/become-a-creator",
    roles: ["VIEWER"],
    // roles: ["CREATOR", "VIEWER"],
  },
];

export const UserRole = {
  creator: "CREATOR",
  viewer: "VIEWER",
};

export const commentOptions = [
  {
    id: 1,
    name: "Hide user’s post from feed",
  },
  {
    id: 2,
    name: "Add User to list",
  },
  {
    id: 3,
    name: "Block",
  },
  {
    id: 4,
    name: "Report",
  },
];

export const sortOptions = [
  {
    id: 1,
    name: "All time",
  },
  {
    id: 2,
    name: "Date",
  },
  {
    id: 3,
    name: "Latest post",
  },
  {
    id: 4,
    name: "Most liked",
  },
  {
    id: 5,
    name: "Highest tips",
  },
];

export const notificationSampleData = [
  {
    id: 1,
    photo: defaultAvatar,
    tag: "@yummychill54",
    time: "3 h ago",
    message: "Subscribed to your account",
    name: "Priscilia yummy",
  },
  {
    id: 2,
    photo: defaultAvatarTwo,
    tag: "@Timmy88",
    time: "3 h ago",
    message: "Subscribed to your account",
    name: "PetitTimmy",
  },
  {
    id: 3,
    photo: defaultAvatarThree,
    tag: "@investorchill",
    time: "6 h ago",
    message: "Commented on your post.",
    name: "mArk 🤪 SpecCer 🤪",
  },
  {
    id: 4,
    photo: defaultAvatarFour,
    tag: "@NickiCer",
    time: "6 h ago",
    message: "Commented on your post.",
    name: "SpenCer 🤪",
  },
  {
    id: 5,
    photo: defaultAvatarFive,
    tag: "@inCin25",
    time: "3 h ago",
    message: "Commented on your post.",
    name: "BellaCa",
  },
  {
    id: 6,
    photo: defaultAvatar,
    tag: "@Timmy88",
    time: "3 h ago",
    message: "Subscribed to your account",
    name: "PetitTimmy",
  },
  {
    id: 7,
    photo: defaultAvatar,
    tag: "@yummychill54",
    time: "3 h ago",
    message: "Subscribed to your account",
    name: "Priscilia yummy",
  },
  {
    id: 8,
    photo: defaultAvatarTwo,
    tag: "@Timmy88",
    time: "3 h ago",
    message: "Subscribed to your account",
    name: "PetitTimmy",
  },
  {
    id: 9,
    photo: defaultAvatarThree,
    tag: "@investorchill",
    time: "6 h ago",
    message: "Commented on your post.",
    name: "mArk 🤪 SpecCer 🤪",
  },
  {
    id: 10,
    photo: defaultAvatarFour,
    tag: "@NickiCer",
    time: "6 h ago",
    message: "Commented on your post.",
    name: "SpenCer 🤪",
  },
  {
    id: 11,
    photo: defaultAvatarFive,
    tag: "@inCin25",
    time: "3 h ago",
    message: "Commented on your post.",
    name: "BellaCa",
  },
  {
    id: 12,
    photo: defaultAvatar,
    tag: "@Timmy88",
    time: "3 h ago",
    message: "Subscribed to your account",
    name: "PetitTimmy",
  },
];

export const dummyCollectionData = [
  {
    id: 1,
    folderName: "Community",
    noOfUsers: "8 users",
    noOfPosts: "56 posts",
  },
  // {
  //   id: 2,
  //   folderName: "Following",
  //   noOfUsers: "5 users",
  //   noOfPosts: "56 posts",
  // },
  // {
  //   id: 3,
  //   folderName: "Restricted",
  //   noOfUsers: "8 users",
  //   noOfPosts: "56 posts",
  // },
  // {
  //   id: 4,
  //   folderName: "Blocked",
  //   noOfUsers: "8 users",
  //   noOfPosts: "56 posts",
  // },
  // {
  //   id: 5,
  //   folderName: "Friends",
  //   noOfUsers: "8 users",
  //   noOfPosts: "56 posts",
  // },
  // {
  //   id: 6,
  //   folderName: "My people",
  //   noOfUsers: "8 users",
  //   noOfPosts: "56 posts",
  // },
  // {
  //   id: 7,
  //   folderName: "Following",
  //   noOfUsers: "5 users",
  //   noOfPosts: "56 posts",
  // },
  // {
  //   id: 8,
  //   folderName: "Following",
  //   noOfUsers: "5 users",
  //   noOfPosts: "56 posts",
  // },
];

export const collectionsOptions = [
  {
    id: 1,
    name: "Add to another list",
  },
  {
    id: 2,
    name: "Remove from list",
  },
  {
    id: 3,
    name: "Block",
  },
  {
    id: 4,
    name: "Restrict",
  },
  {
    id: 5,
    name: "Report",
  },
];

export const userListCollectionsOptions = [
  {
    id: 1,
    name: "Subscription",
  },
  {
    id: 2,
    name: "Promotions",
  },
  {
    id: 3,
    name: "Tags",
  },
  {
    id: 4,
    name: "Comments",
  },
  {
    id: 5,
    name: "Mentions",
  },
];

export const notificationTabs = [
  {
    id: 1,
    name: "All",
  },
  {
    id: 2,
    name: "Promotions",
  },
  {
    id: 3,
    name: "Subscription",
  },
  {
    id: 4,
    name: "Tags",
  },
  {
    id: 5,
    name: "Comments",
  },
  {
    id: 6,
    name: "Mentions",
  },
];

export const sampleChatGroups = [
  {
    id: 1,
    groupName: "Newly subscribed users",
    noOfUsers: "8 users",
  },
  {
    id: 2,
    groupName: "$30 users",
    noOfUsers: "5 users",
  },
  {
    id: 3,
    groupName: "$50 users",
    noOfUsers: "8 users",
  },
];

export const images = [
  gridOne,
  timelineTwo,
  gridThree,
  gridFour,
  gridFive,
  gridSix,
  gridOne,
  gridTwo,
  gridThree,
  gridFour,
  gridFive,
  gridSix,
];

export const audioImages = [
  audioFile,
  audioFile,
  audioFile,
  audioFile,
  audioFile,
  audioFile,
  audioFile,
  audioFile,
  audioFile,
];

export const samplePollData = [
  {
    id: 1,
    name: "This is option 1 of the poll",
    percent: "70%",
  },
  {
    id: 2,
    name: "This is option 2 of the poll",
    percent: "30%",
  },
];

export const settingsModule = [
  {
    id: 1,
    name: "Account",
    path: "/dashboard/settings/account",
  },
  // {
  //   id: 2,
  //   name: "Collections",
  //   path: "/dashboard/settings/collections",
  // },
  // {
  //   id: 3,
  //   name: "Chat",
  //   path: "/dashboard/settings/chat",
  // },
  {
    id: 4,
    name: "Notifications",
    path: "/dashboard/settings/notifications",
  },
  // {
  //   id: 5,
  //   name: "Story",
  //   path: "/dashboard/settings/story",
  // },
  {
    id: 6,
    name: "Display",
    path: "/dashboard/settings/display",
  },
  // {
  //   id: 7,
  //   name: "QR Code",
  //   path: "/dashboard/settings/qr-code",
  // },
  {
    id: 8,
    name: "Privacy and safety",
    path: "/dashboard/settings/privacy",
  },
  // {
  //   id: 9,
  //   name: "Preferences",
  //   path: "/dashboard/settings/preferences",
  // },
];

export const accountSettingsModules = [
  {
    groupName: "Security",
    items: [
      {
        id: 1,
        name: "Password",
        path: "/dashboard/settings/account/change-password",
      },
      {
        id: 2,
        name: "Login sessions",
        path: "/dashboard/settings/account/login-sessions",
      },
      {
        id: 3,
        name: "Two factor authentication",
        path: "/dashboard/settings/account/two-factor",
      },
    ],
  },
  {
    groupName: "Linked accounts",
    items: [
      {
        id: 1,
        name: "TikTok",
        path: "/dashboard/settings/account/tiktok",
      },
      {
        id: 2,
        name: "X App",
        path: "/dashboard/settings/account/twitter",
      },
      {
        id: 3,
        name: "Facebook",
        path: "/dashboard/settings/account/facebook",
      },
      {
        id: 4,
        name: "Google",
        path: "/dashboard/settings/account/google",
      },
    ],
  },
  {
    groupName: "Account management",
    items: [
      {
        id: 1,
        name: "Delete account",
        path: "/dashboard/settings/account/delete-account",
      },
    ],
  },
];

export const sampleLoginSessions = [
  {
    id: 1,
    deviceName: "Chrome 126, Mac 10.15, Apple",
    ipAddress: "102.88.82.27 Nigeria",
    status: true,
    lastSeen: "",
  },
  {
    id: 2,
    deviceName: "Microsoft Edge 126, Windows 10",
    ipAddress: "102.88.82.27 United States",
    status: false,
    lastSeen: "7/25/24 5:43pm",
  },
  {
    id: 3,
    deviceName: "Microsoft Edge 126, Windows 10",
    ipAddress: "102.88.82.27 United States",
    status: false,
    lastSeen: "7/25/24 5:43pm",
  },
];

export const sampleTwoFactor = [
  { id: 1, name: "SMS", desc: "A one time code will be sent to your phone" },
  { id: 3, name: "Email", desc: "A one time code will be sent to your email" },
  { id: 2, name: "Face ID", desc: "Works only on your mobile phone" },
  {
    id: 4,
    name: "Authenticator App",
    desc: "Connect your account with your 2FA app",
  },
];

const notificationDescriptions: Record<string, { name: string; desc: string }> =
  {
    email: {
      name: "Email notification",
      desc: "Get emails to find out what’s going on when you’re not on Fanfam. You can turn them off anytime.",
    },
    inAppNotification: {
      name: "Push notifications",
      desc: "Get push notifications to find out what’s going on when you’re not on Fanfam. You can turn them off anytime.",
    },
    mentioned: {
      name: "Mentions",
      desc: "When ON you will be notified when a friend mentions you.",
    },
  };

export const buildNotificationSettings = (settings: NotificationObject) => {
  return Object.entries(settings).map(([key, value], index) => ({
    id: index + 1,
    key,
    name: notificationDescriptions[key]?.name ?? key,
    desc: notificationDescriptions[key]?.desc ?? "",
    value, // taken directly from the input object
  }));
};

export function transformDisplaySettings(settings: DisplayObject) {
  return [
    {
      groupName: "Language",
      items: [
        {
          id: 1,
          name: "English",
          value: settings.englishLanguage,
        },
        {
          id: 2,
          name: "French",
          value: settings.frenchLanguage,
        },
        {
          id: 3,
          name: "Spanish",
          value: settings.spanishLanguage,
        },
      ],
    },
    {
      groupName: "Theme",
      items: [
        {
          id: 1,
          name: "Light",
          value: settings.lightTheme,
        },
        {
          id: 2,
          name: "Dark",
          value: settings.darkTheme,
        },
        {
          id: 3,
          name: "System",
          value: settings.systemTheme,
        },
      ],
    },
  ];
}

export function extractDefaults(data: DisplayObject) {
  let theme = "Light";
  if (data.darkTheme) theme = "Dark";
  else if (data.systemTheme) theme = "System";

  let language = "English";
  if (data.frenchLanguage) language = "French";
  else if (data.spanishLanguage) language = "Spanish";

  return { Theme: theme, Language: language };
}

// utils/formDefaults.ts
export const buildFormDefaults = (data: Record<string, any>) => {
  const defaults: Record<string, boolean> = {};

  const traverse = (obj: Record<string, any>) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === "boolean") {
        defaults[key] = value;
      } else if (
        typeof value === "object" &&
        !Array.isArray(value) &&
        value !== null
      ) {
        traverse(value); // go deeper for nested objects
      }
    });
  };

  traverse(data);
  return defaults;
};

export const subscriptionSettings = [
  {
    id: 1,
    name: "Profile  promotion campaign",
    desc: "Offer a free trial or a discounted subscription on your profile for a limited number or already expired subscription",
    buttonText: "Start promotion campaign",
  },
  {
    id: 2,
    name: "Subscription bundles",
    desc: "Offer several months of subscription as a discounted bundle",
    buttonText: "Add bundle",
  },
  {
    id: 3,
    name: "Trial links",
    desc: "Create and share separate links with free trial subscription",
    buttonText: "Create new free trial link",
  },
];

export const getPromotionalCampaignData = (
  campaign: PromotionalCampaignType,
) => [
  {
    id: 1,
    name: "Started",
    date: "July 31",
  },
  {
    id: 2,
    name: "End",
    date: convertToHumanReadableDate(campaign.endDate),
  },
  {
    id: 3,
    name: "Days left",
    date: getRemainingDays(campaign.endDate),
  },
  {
    id: 4,
    name: "Claims count",
    date: "5",
  },
];

export const getFreeTrialData = (freeTrial: FreeTrial) => [
  {
    id: 2,
    name: "Link expires",
    value: convertToHumanReadableDate(freeTrial.endDate),
  },
  {
    id: 3,
    name: "Offer limit",
    value: freeTrial.limitSize,
  },
  {
    id: 4,
    name: "Duration",
    value: freeTrial.duration,
  },
];

const labels = {
  profile: {
    activityStatus: "Show activity status",
    fansCountOnProfile: "Show fans count on profile",
    mediaCountOnYourProfile: "Show media count on your profile",
    friendsList: "Public friends list",
    password: "Password",
  },
  discoverability: {
    optOutOfSuggestion: "Opt out of suggestions",
  },
  post: {
    posts: "Enable posts",
    allowCommentsFromSubscribers:
      "Allow comments only from subscribers who spent $1 or more",
    postTipsSum: "Show post tips sum",
  },
  watermark: {
    pictures: "Pictures",
    videos: "Videos",
  },
};

const groupDisplayNames: Record<keyof PrivacyAndSafetyData, string> = {
  profile: "Profile",
  discoverability: "Discoverability",
  post: "Posts",
  watermark: "Watermarks",
  safety: "Safety",
  drmVideoProtection: "DRM Video Protection",
};

export const buildPrivacyAndSafetyItems = (data: PrivacyAndSafetyData) => {
  // Filter only the keys we care about (boolean or object of booleans)
  return (Object?.keys(data) as (keyof PrivacyAndSafetyData)[])
    ?.filter((section) => typeof data[section] === "object")
    ?.map((section) => ({
      groupName: groupDisplayNames[section],
      items: Object.entries(data[section] as Record<string, any>)
        ?.filter(([, value]) => typeof value === "boolean")
        ?.map(([key, value], index) => ({
          id: index + 1,
          key,
          name: (labels as Partial<Record<string, any>>)[section]?.[key] ?? key,
          isOn: value,
        })),
    }));
};

export const privacyAndSafetyItems = [
  {
    groupName: "Profile",
    items: [
      {
        id: 1,
        name: "Show activity status",
        isOn: true,
      },
      {
        id: 2,
        name: "Show activity status",
        isOn: false,
      },
      {
        id: 3,
        name: "Show media count on your profile",
        isOn: true,
      },
      {
        id: 4,
        name: "Public friends lst",
        isOn: true,
      },
      {
        id: 5,
        name: "Password",
        isOn: true,
      },
    ],
  },
  {
    groupName: "Discoverability",
    items: [
      {
        id: 1,
        name: "Opt out of suggestions",
        isOn: false,
      },
    ],
  },
  {
    groupName: "Water marks",
    items: [
      {
        id: 1,
        name: "Pictures",
        isOn: false,
      },
      {
        id: 2,
        name: "Videos",
        isOn: false,
      },
    ],
  },
  {
    groupName: "Posts",
    items: [
      {
        id: 1,
        name: "Enable comments",
        isOn: true,
      },
      {
        id: 2,
        name: "Allow comments only from subscribers who spent $1 or more",
        isOn: false,
      },
      {
        id: 3,
        name: "Show post tips sum",
        isOn: true,
      },
    ],
  },
];

export const privacyAndSafety = [
  {
    id: 1,
    name: "Blocked by country",
    path: "/dashboard/settings/privacy/block-country",
  },
  {
    id: 2,
    name: "Blocked by IP address",
    path: "/dashboard/settings/privacy/block-ip",
  },
];

export const subscriptionMenu = [
  // {
  //   id: 9,
  //   name: "Subscribed",
  //   path: "/dashboard/account/subscribed",
  //   isViewer: true,
  // },
  // {
  //   id: 1,
  //   name: "Cards",
  //   path: "/dashboard/account/cards",
  //   isViewer: true,
  // },
  // {
  //   id: 6,
  //   name: "Wallet",
  //   path: "/dashboard/account/wallet",
  //   isViewer: true,
  // },
  {
    id: 2,
    name: "Subscriptions Settings",
    path: "/dashboard/account/settings",
    isViewer: false,
  },
  // {
  //   id: 3,
  //   name: "Returned Payments",
  //   path: "",
  //   isViewer: false,
  // },
  // {
  //   id: 4,
  //   name: "Statistics",
  //   path: "/dashboard/account/statistics",
  //   isViewer: false,
  // },
  // {
  //   id: 5,
  //   name: "Statements",
  //   path: "",
  //   isViewer: false,
  // },
  // {
  //   id: 7,
  //   name: "Referrals",
  //   path: "/dashboard/account/referrals",
  //   isViewer: true,
  // },
  // {
  //   id: 8,
  //   name: "Profile Ads",
  //   path: "/dashboard/account/profile-ads",
  //   isViewer: false,
  // },
];

export const earningsSampleData = [
  { id: 1, earningsType: "Total", amount: "$0.00", net: "$0.00" },
  { id: 2, earningsType: "Subscriptions", amount: "$0.00", net: "$0.00" },
  { id: 3, earningsType: "Tips", amount: "$0.00", net: "$0.00" },
  { id: 4, earningsType: "Stream Tips", amount: "$0.00", net: "$0.00" },
  { id: 5, earningsType: "Posts", amount: "$0.00", net: "$0.00" },
  { id: 6, earningsType: "Messages", amount: "$0.00", net: "$0.00" },
  { id: 7, earningsType: "Streams", amount: "$0.00", net: "$0.00" },
  { id: 8, earningsType: "Referrals", amount: "$0.00", net: "$0.00" },
];

export const sampleStreakData = [
  {
    id: 1,
    name: "New Post",
    image: post,
  },
  {
    id: 2,
    name: "Add to Story",
    image: story,
  },
  {
    id: 3,
    name: "Reply your followers",
    image: post,
  },
  {
    id: 4,
    name: "Go Live",
    image: video,
  },
];

export const engagementSummary = [
  {
    id: 1,
    name: "Posts",
    extra: 1,
  },
  {
    id: 2,
    name: "Posts View",
    extra: 0,
  },
  {
    id: 3,
    name: "Post Earnings",
    extra: "$0.00",
  },
];

export const sampleEngagementTableData = [
  {
    id: 1,
    date: "Aug 13 2024, 8:14 pm",
    views: 0,
    tips: "$0.00",
    price: "$0.00",
    purchases: "$0.00",
    image: sampleImageTwo,
    text: "Hi there",
    statsLink: "#",
    imageNo: 0,
  },
  {
    id: 2,
    date: "Aug 12 2024, 6:12 pm",
    views: 0,
    tips: "$0.00",
    price: "$0.00",
    purchases: "$0.00",
    image: sampleImageOne,
    text: "Hi there",
    statsLink: "#",
    imageNo: 2,
  },
];

export const engagementMessagesSummary = [
  {
    id: 1,
    name: "Messages",
    extra: "1",
  },
  {
    id: 2,
    name: "Top Messages",
    extra: "0",
  },
  {
    id: 3,
    name: "Message Earnings",
    extra: "$0.00",
  },
];

export const engagementMessagesStories = [
  {
    id: 1,
    name: "Stories",
    extra: 0,
  },
  {
    id: 2,
    name: "Likes",
    extra: 0,
  },
  {
    id: 3,
    name: "View",
    extra: 0,
  },
  {
    id: 4,
    name: "Stories Tips",
    extra: "$0.00",
  },
];

export const statHeader = [
  {
    id: 1,
    name: "Date",
  },
  {
    id: 2,
    name: "Views",
  },
  {
    id: 3,
    name: "Tips",
  },
  {
    id: 4,
    name: "Price",
  },
  {
    id: 5,
    name: "Purchases",
  },
];

export const statHeaderTwo = [
  {
    id: 1,
    name: "Date",
  },
  {
    id: 2,
    name: "Viewers",
  },
  {
    id: 4,
    name: "Likes",
  },
  {
    id: 5,
    name: "Comments",
  },
  {
    id: 3,
    name: "Tips",
  },
];

export const reachStatHeader = [
  {
    id: 1,
    name: "Statistics",
  },
  {
    id: 2,
    name: "Guests",
  },
  {
    id: 3,
    name: "Users",
  },
  {
    id: 4,
    name: "Total",
  },
];

export const reachStatHeaderTwo = [
  {
    id: 1,
    name: "Country",
  },
  {
    id: 2,
    name: "Guests",
  },
  {
    id: 3,
    name: "Users",
  },
  {
    id: 4,
    name: "Total",
  },
];

export const reachPromotionHeader = [
  {
    id: 1,
    name: "Start Date",
  },
  {
    id: 2,
    name: "End Date",
  },
  {
    id: 3,
    name: "Offer Limit",
  },
  {
    id: 4,
    name: "Claimed",
  },
];

export const fanSubHeader = [
  {
    id: 1,
    name: "Name",
  },
  {
    id: 2,
    name: "Price",
  },
  {
    id: 3,
    name: "New Subscribers",
  },
];

export const storiesData = [
  {
    id: 1,
    name: "New Post",
    image: post,
  },
  {
    id: 2,
    name: "Add to Story",
    image: story,
  },
  {
    id: 3,
    name: "Reply your followers",
    image: post,
  },
  {
    id: 4,
    name: "Go Live",
    image: video,
  },
];

export const storyStatSample = [
  {
    id: 1,
    name: "Viewers",
    num: 0,
    bgColor: "#131314",
  },
  {
    id: 2,
    name: "Likes",
    num: 0,
    bgColor: "#1775C1",
  },
  {
    id: 3,
    name: "Comments",
    num: 0,
    bgColor: "#29AF1D",
  },
  {
    id: 4,
    name: "Tips",
    num: "0($0.00)",
    bgColor: "#E20C0C",
  },
];

export const reachProfileSummary = [
  {
    id: 1,
    name: "Profile Visitors",
    extra: 0,
  },
  {
    id: 2,
    name: "New Subs/Renews",
    extra: "0 / 0",
  },
  {
    id: 3,
    name: "Subscription Earnings",
    extra: "$0.00",
  },
];

export const reachPromotionsSummary = [
  {
    id: 1,
    name: "Mass Offers",
    extra: 0,
  },
  {
    id: 2,
    name: "Claims",
    extra: 0,
  },
  {
    id: 3,
    name: "Subscription Earnings",
    extra: "$0.00",
  },
];

export const fanPromotionsSummary = [
  {
    id: 1,
    name: "Subscribers",
    extra: 2,
  },
  {
    id: 2,
    name: "New Subs/Renews",
    extra: 0,
  },
  {
    id: 3,
    name: "Subscription Earnings",
    extra: "$0.00",
  },
  {
    id: 4,
    name: "Top Fan",
    extra: "None Yet",
  },
];

export const sampleReachStat = [
  {
    id: 1,
    title: "Profile Visitors",
    guests: 0,
    users: 0,
    total: "$0.00",
  },
  {
    id: 2,
    title: "View Duration",
    guests: "0h:00m",
    users: "0h:00m",
    total: "0h:00m",
  },
];

export const topCountriesData = [
  {
    id: 1,
    country: "South Africa",
    image: SA,
    guests: 0,
    users: 0,
    total: 0,
  },
  {
    id: 2,
    country: "Nigeria",
    image: NIG,
    guests: 0,
    users: 0,
    total: 0,
  },
  {
    id: 3,
    country: "Ghana",
    image: GH,
    guests: 0,
    users: 0,
    total: 0,
  },
];

export const walletSampleData = [
  {
    id: 1,
    name: "Make wallet primary method for rebills",
  },
  {
    id: 2,
    name: "Auto Recharge",
  },
];

export const subscribedTabs = [
  {
    id: 1,
    name: "All Creators",
  },
  {
    id: 2,
    name: "All Creators",
  },
];

export const subOptions = [
  {
    id: 1,
    name: "Full access to this user's content",
  },
  {
    id: 2,
    name: "Direct message with this user",
  },
  {
    id: 3,
    name: "Cancel your subscription at any time",
  },
];

export const scheduledPostsAndMessages = [
  {
    id: 1,
    date: "Aug 15, 1:26 pm",
    text: "Hi fan family! promo coming up",
    type: "Post",
  },
  {
    id: 2,
    date: "Aug 15, 1:26 pm",
    text: "Hi fan family! promo coming up",
    type: "Message",
  },
  {
    id: 3,
    date: "Aug 15, 1:26 pm",
    text: "Hi fan family! promo coming up",
    type: "Message",
  },
];

export const scheduleMessages = [
  {
    id: 1,
    name: "Edit scheduled message",
  },
  {
    id: 2,
    name: "Send message right now",
  },
  {
    id: 3,
    name: "Send message right now",
  },
];

export const schedulePosts = [
  {
    id: 4,
    name: "Edit post",
  },
  {
    id: 5,
    name: "Publish now",
  },
  {
    id: 6,
    name: "Delete post",
  },
];

export const giftSubOptions = [
  {
    id: 1,
    name: "Subscription",
    ans: "2 Months ($34)",
  },
  {
    id: 2,
    name: "Name of Receiver",
    ans: "",
  },
  {
    id: 3,
    name: "Email Address to send Gift",
    ans: "daaveyjohn1234@gmail.com",
  },
];

export const profileAdsTabs = [
  {
    id: 1,
    name: "Get to 200 Viewers",
    date: "12 July - 19 July",
    price: "$70",
    status: "Active",
  },
  {
    id: 2,
    name: "Get to 200 Viewers",
    date: "12 July - 19 July",
    price: "$70",
    status: "Inactive",
  },
];

export const referralInfo = [
  {
    id: 1,
    name: "Total Referrals",
    num: "2 Referrals",
  },
  {
    id: 2,
    name: "Pending Earnings",
    num: "$23.00",
  },
];

export const referralHistoryTableHeader = [
  {
    id: 1,
    name: "Referred User",
  },
  {
    id: 2,
    name: "Date",
  },
  {
    id: 3,
    name: "Reward",
  },
  {
    id: 4,
    name: "Status",
  },
];

export const referralHistorySampleData = [
  {
    id: 1,
    name: "John Doe",
    date: "23 July 2024",
    reward: "$23.00",
    status: "Pending",
  },
  {
    id: 2,
    name: "Mavis Inyang",
    date: "23 July 2024",
    reward: "$23.00",
    status: "Rewarded",
  },
];

export const transactionHistorySampleData = [
  {
    id: 1,
    title: "@2 Months Subscription",
    content: "@yummychill54 paid $24 for your contents ",
  },
  {
    id: 2,
    title: "@2 Months Subscription",
    content: "@yummychill54 paid $24 for your contents ",
  },
  {
    id: 3,
    title: "@2 Months Subscription",
    content: "@yummychill54 paid $24 for your contents ",
  },
];

export const thirdColumnSampleData = [
  {
    id: 1,
    photo: defaultAvatar,
    tag: "@yummychill54",
    message: "Subscribed to your account",
    name: "Priscilia yummy",
    time: "Now",
  },
  {
    id: 2,
    photo: defaultAvatarTwo,
    tag: "@Timmy88",
    message: "Subscribed to your account",
    name: "PetitTimmy",
    time: "2 mins ago",
  },
  {
    id: 3,
    photo: defaultAvatarThree,
    tag: "@investorchill",
    message: "Commented on your post.",
    name: "mArk 🤪 SpecCer 🤪",
    time: "3 h ago",
  },
];

export const continents = [
  {
    id: 1,
    name: "All",
    image: all,
  },
  {
    id: 3,
    name: "Asia",
    image: asia,
  },
  {
    id: 2,
    name: "Africa",
    image: africa,
  },
  {
    id: 6,
    name: "Oceania",
    image: oceania,
  },
  {
    id: 5,
    name: "North America",
    image: northAmerica,
  },
  {
    id: 4,
    name: "Europe",
    image: europe,
  },
  {
    id: 7,
    name: "South America",
    image: southAmerica,
  },
  {
    id: 8,
    name: "South America",
    image: southAmerica,
  },
];

export const countriesSample = [
  {
    id: 1,
    name: "Algeria",
    image: algeria,
  },
  {
    id: 2,
    name: "East Timor",
    image: eastTimor,
  },
];

export const interestData = [
  {
    id: 1,
    image: biking,
  },
  {
    id: 2,
    image: skiDiving,
  },
  {
    id: 3,
    image: dance,
  },
  {
    id: 4,
    image: party,
  },
  {
    id: 5,
    image: foods,
  },
  {
    id: 6,
    image: tech,
  },
  {
    id: 7,
    image: travels,
  },
  {
    id: 8,
    image: music,
  },
  {
    id: 9,
    image: sports,
  },
];

export const emojiData = [
  {
    id: 1,
    img: happyEmoji,
    name: "Emoji",
  },
  {
    id: 4,
    img: videoEmoji,
    name: "Giphy",
  },
  {
    id: 2,
    img: galleryEmoji,
    name: "Photo",
  },
  {
    id: 3,
    img: blurEmoji,
    name: "Blur",
  },
];

export const twoFAInstructions = [
  {
    id: 1,
    text: "Copy your 2FA key and paste it into your 2FA app.",
  },
  {
    id: 2,
    text: "Enter the generated code from your 2FA app in the field below.",
  },
];

export const pendingWithdrawalsTableHeader = [
  {
    id: 1,
    name: "Pending Withdrawals",
  },
  {
    id: 2,
    name: "Total",
  },
];

export const pendingWithdrawalsSampleData = [
  {
    id: 1,
    date: "12 July 2024 at 12:04pm",
    desc: "$300.00 withdrawal request ",
    status: "Pending",
  },
];

export const transactionHistoryTableHeader = [
  {
    id: 1,
    name: "Date and Time",
  },
  {
    id: 2,
    name: "Description",
  },
  {
    id: 3,
    name: "Amount",
  },
  {
    id: 4,
    name: "Fee",
  },
];

export const transactionHistoryData = [
  {
    id: 1,
    dateAndTime: "12 July 2024 at 12:04pm",
    desc: "Subscription payment from Daniels Jacays",
    amount: "+$300.00",
    fee: "$5.00",
  },
  {
    id: 2,
    dateAndTime: "12 July 2024 at 12:04pm",
    desc: "Subscription payment from Daniels Jacays",
    amount: "+$300.00",
    fee: "$5.00",
  },
];

export const getAllCountryOptions = () => {
  return countryList().getData();
};

export const getAllCountryOptionsWithNames = () => {
  const countries = countryList().getData();
  return countries.map((country) => ({
    value: country.label,
    label: country.label,
  }));
};

export const genderOptions = [
  {
    label: "Female",
    value: "Female",
  },
  {
    label: "Male",
    value: "Male",
  },
];

export const becomeACreator = [
  {
    id: 2,
    title: "Complete Banking Information",
    subtitle: "Complete your banking information",
    image: creatorTwo,
    link: "/dashboard/become-a-creator/banking-information",
  },
  {
    id: 3,
    title: "Setup your Profile",
    subtitle: "Complete your Account Setup",
    image: creatorThree,
    link: "/dashboard/become-a-creator/setup-profile",
  },
  {
    id: 4,
    title: "Setup your strategy",
    subtitle: "Setup your monetization strategy",
    image: creatorFour,
    link: "/dashboard/become-a-creator/monetization-strategy",
  },
];

export const verifyData = [
  {
    id: 1,
    title: "Upload ID",
    subtitle: "Upload an approved government ID to verify your identity",
    image: creatorOne,
    buttonText: "Upload",
  },
  {
    id: 2,
    title: "Facial Verification",
    subtitle: "Complete your facial verification",
    image: creatorTwo,
    buttonText: "Get Started",
  },
];

export const banks = [
  { label: "Access Bank Plc", value: "Access Bank Plc" },
  { label: "Fidelity Bank Plc", value: "Fidelity Bank Plc" },
  {
    label: "First Bank of Nigeria Limited",
    value: "First Bank of Nigeria Limited",
  },
  {
    label: "First City Monument Bank Plc",
    value: "First City Monument Bank Plc",
  },
  { label: "Guaranty Trust Bank Plc", value: "Guaranty Trust Bank Plc" },
  { label: "United Bank for Africa Plc", value: "United Bank for Africa Plc" },
  { label: "Zenith Bank Plc", value: "Zenith Bank Plc" },
  { label: "Ecobank Nigeria Plc", value: "Ecobank Nigeria Plc" },
  { label: "Stanbic IBTC Bank Plc", value: "Stanbic IBTC Bank Plc" },
  { label: "Sterling Bank Plc", value: "Sterling Bank Plc" },
  { label: "Wema Bank Plc", value: "Wema Bank Plc" },
  { label: "Keystone Bank Limited", value: "Keystone Bank Limited" },
  { label: "Polaris Bank Plc", value: "Polaris Bank Plc" },
  { label: "Providus Bank Plc", value: "Providus Bank Plc" },
  { label: "Titan Trust Bank Limited", value: "Titan Trust Bank Limited" },
  { label: "Unity Bank Plc", value: "Unity Bank Plc" },
  { label: "SunTrust Bank Limited", value: "SunTrust Bank Limited" },
  { label: "Globus Bank Limited", value: "Globus Bank Limited" },
  { label: "Premium Trust Bank", value: "Premium Trust Bank" },
  { label: "Signature Bank Limited", value: "Signature Bank Limited" },
  {
    label: "Standard Chartered Bank Nigeria Ltd",
    value: "Standard Chartered Bank Nigeria Ltd",
  },
  { label: "Jaiz Bank Plc", value: "Jaiz Bank Plc" },
  { label: "Lotus Bank Ltd", value: "Lotus Bank Ltd" },
  { label: "Citibank Nigeria Limited", value: "Citibank Nigeria Limited" },
  {
    label: "Heritage Banking Company Ltd",
    value: "Heritage Banking Company Ltd",
  },
  { label: "Optimus Bank", value: "Optimus Bank" },
  { label: "Parallex Bank Ltd", value: "Parallex Bank Ltd" },
  { label: "SunTrust Bank Nigeria Ltd", value: "SunTrust Bank Nigeria Ltd" },
  { label: "Taj Bank", value: "Taj Bank" },
  { label: "TajBank", value: "TajBank" },
  { label: "Nova Merchant Bank Ltd", value: "Nova Merchant Bank Ltd" },
  {
    label: "IDAHOSA Savings & Loans Ltd",
    value: "IDAHOSA Savings & Loans Ltd",
  },
  {
    label: "African Development Bank (Nigeria Branch)",
    value: "African Development Bank (Nigeria Branch)",
  },
  { label: "FSDH Merchant Bank Ltd", value: "FSDH Merchant Bank Ltd" },
  { label: "Stanbic IBTC Plc", value: "Stanbic IBTC Plc" },
  { label: "ALAT by Wema", value: "ALAT by Wema" },
  { label: "FBNQuest Merchant Bank", value: "FBNQuest Merchant Bank" },
  { label: "FCMB Bank Plc", value: "FCMB Bank Plc" },
  { label: "FCMB Capital Markets Ltd", value: "FCMB Capital Markets Ltd" },
  { label: "Rand Merchant Bank Nigeria", value: "Rand Merchant Bank Nigeria" },
  {
    label: "Nigerian International Bank",
    value: "Nigerian International Bank",
  },
  { label: "Union Bank of Nigeria Plc", value: "Union Bank of Nigeria Plc" },
  { label: "Ecobank Nigeria Limited", value: "Ecobank Nigeria Limited" },
  { label: "Stanbic Bank Nigeria Ltd", value: "Stanbic Bank Nigeria Ltd" },
  { label: "Standard Bank Plc", value: "Standard Bank Plc" },
  {
    label: "United Bank for Africa Holdings",
    value: "United Bank for Africa Holdings",
  },
  { label: "First Bank Nigeria Ltd", value: "First Bank Nigeria Ltd" },
  { label: "Diamond Bank Ltd", value: "Diamond Bank Ltd" },
  { label: "Wema Bank Ltd", value: "Wema Bank Ltd" },
  { label: "Unity Bank Ltd", value: "Unity Bank Ltd" },
  { label: "Heritage Bank Ltd", value: "Heritage Bank Ltd" },
  { label: "Keystone Bank Ltd", value: "Keystone Bank Ltd" },
  { label: "FinBank Nigeria", value: "FinBank Nigeria" },
  { label: "Intercontinental Bank Plc", value: "Intercontinental Bank Plc" },
  { label: "Spring Bank Plc", value: "Spring Bank Plc" },
  { label: "Skye Bank Plc", value: "Skye Bank Plc" },
  { label: "Bank PHB Ltd", value: "Bank PHB Ltd" },
  {
    label: "Oceanic Bank International Plc",
    value: "Oceanic Bank International Plc",
  },
  { label: "Nigeria Arab Bank Plc", value: "Nigeria Arab Bank Plc" },
  {
    label: "Societe Generale Bank Nigeria Ltd",
    value: "Societe Generale Bank Nigeria Ltd",
  },
  { label: "Stanbic IBTC Holdings Plc", value: "Stanbic IBTC Holdings Plc" },
  {
    label: "Chapel Hill Denham Management Ltd",
    value: "Chapel Hill Denham Management Ltd",
  },
  { label: "UBA Capital Plc", value: "UBA Capital Plc" },
  { label: "Access Bank Limited", value: "Access Bank Limited" },
  { label: "Zenith Bank Nigeria Ltd", value: "Zenith Bank Nigeria Ltd" },
  { label: "GTBank Nigeria Ltd", value: "GTBank Nigeria Ltd" },
  { label: "FidFund Managers Ltd", value: "FidFund Managers Ltd" },
  { label: "Meristem Securities Ltd", value: "Meristem Securities Ltd" },
  { label: "Wema Capital Ltd", value: "Wema Capital Ltd" },
  {
    label: "Courteville Business Solutions Plc",
    value: "Courteville Business Solutions Plc",
  },
  { label: "ARM Securities Ltd", value: "ARM Securities Ltd" },
  {
    label: "Parallex Microfinance Bank Ltd",
    value: "Parallex Microfinance Bank Ltd",
  },
  {
    label: "Accion Microfinance Bank Nigeria Ltd",
    value: "Accion Microfinance Bank Nigeria Ltd",
  },
  {
    label: "FinaTrust Savings & Loans Ltd",
    value: "FinaTrust Savings & Loans Ltd",
  },
  {
    label: "Cashcraft Microfinance Bank Ltd",
    value: "Cashcraft Microfinance Bank Ltd",
  },
  {
    label: "Credible Microfinance Bank Ltd",
    value: "Credible Microfinance Bank Ltd",
  },
  {
    label: "Orange Microfinance Bank Ltd",
    value: "Orange Microfinance Bank Ltd",
  },
  {
    label: "Minna Electricity Distribution Company Plc",
    value: "Minna Electricity Distribution Company Plc",
  },
  { label: "Gateway Mortgage Bank Ltd", value: "Gateway Mortgage Bank Ltd" },
  { label: "FSDH Asset Management Ltd", value: "FSDH Asset Management Ltd" },
  {
    label: "Coronation Merchant Bank Ltd",
    value: "Coronation Merchant Bank Ltd",
  },
  {
    label: "Standard Chartered Bank Plc (Nigeria Branch)",
    value: "Standard Chartered Bank Plc (Nigeria Branch)",
  },
  { label: "TajBank (Nigeria)", value: "TajBank (Nigeria)" },
  {
    label: "Prestige Capital Markets Ltd",
    value: "Prestige Capital Markets Ltd",
  },
  { label: "AFEX Derivatives Ltd", value: "AFEX Derivatives Ltd" },
];

export const sampleMonths = [
  {
    label: 1,
    value: 1,
  },
  {
    label: 2,
    value: 2,
  },
  {
    label: 3,
    value: 3,
  },
  {
    label: 4,
    value: 4,
  },
  {
    label: 5,
    value: 5,
  },
  {
    label: 6,
    value: 6,
  },
  {
    label: 7,
    value: 7,
  },
  {
    label: 8,
    value: 8,
  },
  {
    label: 9,
    value: 9,
  },
  {
    label: 10,
    value: 10,
  },
];

export const subscribersLimit = [
  { label: "1 subscriber", value: 1 },
  { label: "5 subscribers", value: 5 },
  { label: "10 subscribers", value: 10 },
  { label: "25 subscribers", value: 25 },
  { label: "50 subscribers", value: 50 },
  { label: "100 subscribers", value: 100 },
  { label: "250 subscribers", value: 250 },
  { label: "500 subscribers", value: 500 },
  { label: "1k subscribers", value: 1000 },
  { label: "5k subscribers", value: 5000 },
  { label: "10k subscribers", value: 10000 },
  { label: "50k subscribers", value: 50000 },
  { label: "100k subscribers", value: 100000 },
];

export const numberOfDays = [
  { label: "1 day", value: 1 },
  { label: "3 days", value: 3 },
  { label: "7 days", value: 7 },
  { label: "14 days", value: 14 },
  { label: "21 days", value: 21 },
  { label: "30 days", value: 30 },
  { label: "60 days", value: 60 },
  { label: "90 days", value: 90 },
  { label: "180 days", value: 180 },
  { label: "365 days", value: 365 },
];

export const qualifiers = [
  {
    id: 1,
    name: "Both new and expired",
  },
  {
    id: 2,
    name: "New subscribers only",
  },
  {
    id: 3,
    name: "Expired subscribers only",
  },
];

export const promotionType = [
  {
    id: 1,
    name: "Free trial",
  },
  {
    id: 2,
    name: "First month discount",
  },
];

export const actions: Action[] = [
  // {
  //   type: "chat",
  //   component: (
  //     <div className="cursor-pointer">
  //       <CircleChat className="cursor-pointer hover:fill-blue_200" />
  //     </div>
  //   ),
  // },
  // {
  //   type: "tip",
  //   component: <CirclePay className="cursor-pointer hover:fill-blue_200" />,
  // },
  // {
  //   type: "promote",
  //   component: (
  //     <Link to="/dashboard/profile/promote">
  //       <CustomButton variant="primary" primaryButtonSize="xs px-3">
  //         Promote Profile
  //       </CustomButton>
  //     </Link>
  //   ),
  // },
  {
    type: "edit",
    component: (
      <Link to="/dashboard/profile/edit-profile">
        <BlueBorderedButton text="Edit Profile" />
      </Link>
    ),
  },
];

export const pollDaysOptions = [
  { value: 0, label: "0 days" },
  { value: 1, label: "1 day" },
  { value: 2, label: "2 days" },
  { value: 3, label: "3 days" },
  { value: 4, label: "4 days" },
  { value: 5, label: "5 days" },
  { value: 6, label: "6 days" },
  { value: 7, label: "7 days" },
];
export const pollHoursOptions = [
  { value: 0, label: "0 hrs" },
  { value: 1, label: "1 hr" },
  { value: 2, label: "2 hrs" },
  { value: 3, label: "3 hrs" },
  { value: 6, label: "6 hrs" },
  { value: 12, label: "12 hrs" },
  { value: 18, label: "18 hrs" },
  { value: 23, label: "23 hrs" },
];
export const pollMinutesOptions = [
  { value: 0, label: "0 min" },
  { value: 15, label: "15 min" },
  { value: 30, label: "30 min" },
  { value: 45, label: "45 min" },
];

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
