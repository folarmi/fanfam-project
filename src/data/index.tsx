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
import Messages from "../components/svgs/Messages";
import Collections from "../components/svgs/Collections";
import Schedule from "../components/svgs/Schedule";
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
import type { DisplayObject } from "@/lib/types";
// import { UserRoleType } from "../lib/types";

export const sideBarItems = [
  {
    id: 1,
    name: "Home",
    image: <Home />,
    link: "/dashboard",
  },
  {
    id: 2,
    name: "Notifications",
    image: <Notification />,
    link: "/dashboard/notifications",
  },
  {
    id: 3,
    name: "Messages",
    image: <Messages />,
    link: "/dashboard/messages",
  },
  {
    id: 4,
    name: "Collections",
    image: <Collections />,
    link: "/dashboard/collections",
  },
  {
    id: 8,
    name: "Schedule",
    image: <Schedule />,
    link: "/dashboard/schedule",
  },
  {
    id: 5,
    name: "My Account",
    image: <MyAccount />,
    link: "/dashboard/account/cards",
  },
  {
    id: 6,
    name: "Profile",
    image: <Profile />,
    link: "/dashboard/profile",
  },
  {
    id: 7,
    name: "Settings",
    image: <SettingsIcon />,
    link: "/dashboard/settings/account",
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
    folderName: "Fans",
    noOfUsers: "8 users",
    noOfPosts: "56 posts",
  },
  {
    id: 2,
    folderName: "Following",
    noOfUsers: "5 users",
    noOfPosts: "56 posts",
  },
  {
    id: 3,
    folderName: "Restricted",
    noOfUsers: "8 users",
    noOfPosts: "56 posts",
  },
  {
    id: 4,
    folderName: "Blocked",
    noOfUsers: "8 users",
    noOfPosts: "56 posts",
  },
  {
    id: 5,
    folderName: "Friends",
    noOfUsers: "8 users",
    noOfPosts: "56 posts",
  },
  {
    id: 6,
    folderName: "My people",
    noOfUsers: "8 users",
    noOfPosts: "56 posts",
  },
  {
    id: 7,
    folderName: "Following",
    noOfUsers: "5 users",
    noOfPosts: "56 posts",
  },
  {
    id: 8,
    folderName: "Following",
    noOfUsers: "5 users",
    noOfPosts: "56 posts",
  },
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
  {
    id: 2,
    name: "Collections",
    path: "/dashboard/settings/collections",
  },
  {
    id: 3,
    name: "Chat",
    path: "/dashboard/settings/chat",
  },
  {
    id: 4,
    name: "Notifications",
    path: "/dashboard/settings/notifications",
  },
  {
    id: 5,
    name: "Story",
    path: "/dashboard/settings/story",
  },
  {
    id: 6,
    name: "Display",
    path: "/dashboard/settings/display",
  },
  {
    id: 7,
    name: "QR Code",
    path: "/dashboard/settings/qr-code",
  },
  {
    id: 8,
    name: "Privacy and safety",
    path: "/dashboard/settings/privacy",
  },
  {
    id: 9,
    name: "Preferences",
    path: "/dashboard/settings/preferences",
  },
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

export const notificationsSettings = [
  {
    id: 1,
    name: "Push notifications",
    desc: "Get push notifications to find out what’s going on when you’re not on OnlyFans. You can turn them off anytime.",
  },
  {
    id: 2,
    name: "Mentions",
    desc: "When OFF you will be notified when a friend mentions you",
  },
  {
    id: 3,
    name: "Email notification",
    desc: "Get emails to find out what’s going on when you’re not on OnlyFans. You can turn them off anytime.",
  },
];

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

export const limitedOfferData = [
  {
    id: 1,
    name: "Started",
    date: "July 31",
  },
  {
    id: 2,
    name: "End",
    date: "August 4",
  },
  {
    id: 3,
    name: "Days left",
    date: "2",
  },
  {
    id: 4,
    name: "Claims count",
    date: "5",
  },
];

export const happyPeopleFeed = [
  {
    id: 1,
    name: "Link created",
    date: "July 31",
  },
  {
    id: 2,
    name: "Link expires",
    date: "August 4",
  },
  {
    id: 3,
    name: "Offer limit",
    date: "August 4",
  },
  {
    id: 4,
    name: "Claims count",
    date: "5",
  },
];

export const subBundles = [
  {
    id: 1,
    amount: "$15",
    duration: "1 month",
  },
  {
    id: 2,
    amount: "$100",
    duration: "6 months",
  },
];

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
  {
    id: 9,
    name: "Subscribed",
    path: "/dashboard/account/subscribed",
    isCreator: undefined,
  },
  {
    id: 1,
    name: "Cards",
    path: "/dashboard/account/cards",
    isCreator: false,
  },
  {
    id: 6,
    name: "Wallet",
    path: "/dashboard/account/wallet",
    isCreator: false,
  },
  {
    id: 2,
    name: "Subscriptions Settings",
    path: "/dashboard/account/settings",
    isCreator: true,
  },
  {
    id: 3,
    name: "Returned Payments",
    path: "",
    isCreator: true,
  },
  {
    id: 4,
    name: "Statistics",
    path: "/dashboard/account/statistics",
    isCreator: true,
  },
  {
    id: 5,
    name: "Statements",
    path: "",
    isCreator: true,
  },
  {
    id: 7,
    name: "Referrals",
    path: "/dashboard/account/referrals",
    isCreator: false,
  },
  {
    id: 8,
    name: "Profile Ads",
    path: "/dashboard/account/profile-ads",
    isCreator: true,
  },
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
