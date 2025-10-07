import { Routes, Route } from "react-router-dom";
import {
  Signup,
  VerifyEmail,
  SignIn,
  ResetPassword,
  ForgotPassword,
  EmailSent,
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
} from "../pages/dashboard";
import MessagesLayout from "../layouts/MessagesLayout";
import AccountLayout from "../layouts/AccountLayout";
import SettingLayout from "@/layouts/SettingsLayout";

const RoutePage = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/email-sent" element={<EmailSent />} />
      <Route path="/dashboard">
        <Route element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit-profile" element={<EditProfile />} />
          <Route path="promote-profile" element={<PromoteProfile />} />
          <Route path="notifications" element={<Notifications />} />
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
      </Route>

      {/* <Route element={<ProtectedRoute />}></Route> */}
    </Routes>
  );
};

export { RoutePage };
