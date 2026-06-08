import { Routes, Route } from "react-router-dom";
import {
  Signup,
  VerifyEmail,
  SignIn,
  ResetPassword,
  ForgotPassword,
  EmailSent,
  LiveStreaming,
  LandingPage,
} from "../pages";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  EditProfile,
  Home,
  Messages,
  Notifications,
  Profile,
  PromoteProfile,
  Schedule,
  Subscribed,
  SubscriptionSettings,
  Wallet,
  Statistics,
  Referrals,
  ProfileAds,
  AccountSettings,
  ChangePassword,
  LoginSessions,
  TwoFactor,
  TikTok,
  Twitter,
  Facebook,
  Google,
  DeleteAccount,
  CollectionSettings,
  ChatSettings,
  NotificationsSettings,
  StorySettings,
  Display,
  QRCode,
  Privacy,
  BlockIP,
  BlockCountry,
  Preferences,
  Collections,
  // BecomeACreator,
  // VerifyYourIdentity,
  // BankingInformation,
  // SetupProfile,
  // SetupStrategy,
  SinglePostDetails,
  UnsubscribedProfile,
  Bookmarks,
} from "../pages/dashboard";
import MessagesLayout from "../layouts/MessagesLayout";
import AccountLayout from "../layouts/AccountLayout";
import SettingLayout from "@/layouts/SettingsLayout";
// import BecomeACreatorLayout from "@/layouts/BecomeACreatorLayout";
// import KycComplete from "@/kyc/KycComplete";
import KycVerification from "@/kyc/Kycverification";
import { LandingPageTwo } from "@/pages/LandingPageTwo";
// import AuthGate from "@/hooks/AuthGate";

const RoutePage = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing-page" element={<LandingPageTwo />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/email-sent" element={<EmailSent />} />
      <Route path="/dashboard">
        <Route element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path=":id" element={<SinglePostDetails />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:email" element={<Profile />} />
          <Route path="profile/edit-profile" element={<EditProfile />} />
          <Route
            path="profile/:id/subscribe"
            element={<UnsubscribedProfile />}
          />
          <Route path="profile/promote" element={<PromoteProfile />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="become-a-creator" element={<KycVerification />} />
        </Route>

        <Route element={<MessagesLayout />}>
          <Route path="messages" element={<Messages />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="collections" element={<Collections />} />
        </Route>

        <Route element={<AccountLayout />}>
          <Route path="account/cards" element={<Subscribed />} />
          <Route path="account/subscribed" element={<Subscribed />} />
          <Route path="account/wallet" element={<Wallet />} />
          <Route path="account/settings" element={<SubscriptionSettings />} />
          <Route path="account/statistics" element={<Statistics />} />
          <Route path="account/referrals" element={<Referrals />} />
          <Route path="account/profile-ads" element={<ProfileAds />} />
        </Route>

        <Route element={<SettingLayout />}>
          <Route path="settings/account" element={<AccountSettings />} />
          <Route
            path="settings/account/change-password"
            element={<ChangePassword />}
          />
          <Route
            path="settings/account/login-sessions"
            element={<LoginSessions />}
          />
          <Route path="settings/account/two-factor" element={<TwoFactor />} />
          <Route path="settings/account/tiktok" element={<TikTok />} />
          <Route path="settings/account/twitter" element={<Twitter />} />
          <Route path="settings/account/facebook" element={<Facebook />} />
          <Route path="settings/account/google" element={<Google />} />
          <Route
            path="settings/account/delete-account"
            element={<DeleteAccount />}
          />
          <Route path="settings/collections" element={<CollectionSettings />} />
          <Route path="settings/chat" element={<ChatSettings />} />
          <Route
            path="settings/notifications"
            element={<NotificationsSettings />}
          />
          <Route path="settings/story" element={<StorySettings />} />
          <Route path="settings/display" element={<Display />} />
          <Route path="settings/qr-code" element={<QRCode />} />
          <Route path="settings/privacy" element={<Privacy />} />
          <Route path="settings/privacy/block-ip" element={<BlockIP />} />
          <Route
            path="settings/privacy/block-country"
            element={<BlockCountry />}
          />
          <Route path="settings/preferences" element={<Preferences />} />
        </Route>

        {/* <Route element={<BecomeACreatorLayout />}>
          <Route path="become-a-creator" element={<BecomeACreator />} />
          <Route
            path="become-a-creator/verify-identity"
            element={<VerifyYourIdentity />}
          />
          <Route
            path="become-a-creator/banking-information"
            element={<BankingInformation />}
          />
          <Route
            path="become-a-creator/setup-profile"
            element={<SetupProfile />}
          />
          <Route
            path="become-a-creator/monetization-strategy"
            element={<SetupStrategy />}
          />
        </Route> */}

        <Route path="livestreaming" element={<LiveStreaming />} />
        <Route
          path="livestreaming/:creatorId/:sessionId"
          element={<LiveStreaming />}
        />

        {/* <Route path="/kyc/success" element={<YourSuccessPage />} />
        <Route path="/kyc/failed" element={<YourFailedPage />} /> */}
      </Route>

      {/* <Route element={<ProtectedRoute />}></Route> */}
    </Routes>
  );
};

export { RoutePage };
