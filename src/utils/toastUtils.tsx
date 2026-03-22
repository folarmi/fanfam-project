/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import type { CSSProperties } from "react";

type ToastType = "success" | "error" | "info" | "warning";

const TOKENS: Record<
  ToastType,
  {
    background: string;
    borderTop: string;
    iconBg: string;
    titleColor: string;
    buttonBg: string;
    buttonColor: string;
  }
> = {
  error: {
    background: "#F8EFEF",
    borderTop: "#F1261B",
    iconBg: "#E31B12",
    titleColor: "#2E333B",
    buttonBg: "#E31B12",
    buttonColor: "#FFFFFF",
  },
  warning: {
    background: "#F8F1E8",
    borderTop: "#F59E0B",
    iconBg: "#E98A00",
    titleColor: "#2E333B",
    buttonBg: "#E98A00",
    buttonColor: "#FFFFFF",
  },
  info: {
    background: "#EEF4FA",
    borderTop: "#1D7ED8",
    iconBg: "#1D7ED8",
    titleColor: "#2E333B",
    buttonBg: "#1D7ED8",
    buttonColor: "#FFFFFF",
  },
  success: {
    background: "#EEF6EF",
    borderTop: "#2EAD3B",
    iconBg: "#2EAD3B",
    titleColor: "#2E333B",
    buttonBg: "#2EAD3B",
    buttonColor: "#FFFFFF",
  },
};

const toastShellStyle: CSSProperties = {
  padding: 0,
  margin: 0,
  background: "transparent",
  boxShadow: "none",
  borderRadius: 0,
  minHeight: "unset",
};

interface InlineAlertToastProps {
  type: ToastType;
  title: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

const AlertIcon = ({ type }: { type: ToastType }) => {
  const fill = TOKENS[type].iconBg;

  if (type === "success") {
    return (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="17" fill={fill} />
        <path
          d="M11.5 17.5L15.2 21.2L22.7 13.7"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "info") {
    return (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="17" fill={fill} />
        <path
          d="M17 15.2V22"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="17" cy="11.3" r="1.5" fill="white" />
      </svg>
    );
  }

  if (type === "warning") {
    return (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="17" fill={fill} />
        <path
          d="M17 10.7V17.8"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="17" cy="22.2" r="1.5" fill="white" />
      </svg>
    );
  }

  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <path
        d="M12.2 2.5H21.8L31.5 12.2V21.8L21.8 31.5H12.2L2.5 21.8V12.2L12.2 2.5Z"
        fill={fill}
      />
      <path
        d="M17 10.4V17.4"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <circle cx="17" cy="22.4" r="1.6" fill="white" />
    </svg>
  );
};

const InlineAlertToast = ({
  type,
  title,
  // actionLabel = "Primary",
  // onActionClick,
}: InlineAlertToastProps) => {
  const token = TOKENS[type];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "min(560px, calc(100vw - 24px))",
        minHeight: "30px",
        background: token.background,
        borderTop: `4px solid ${token.borderTop}`,
        borderRadius: "14px",
        boxShadow: "0 1px 2px rgba(16,24,40,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
        boxSizing: "border-box",
        fontFamily: "Inter, DM Sans, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          minWidth: 0,
          flex: 1,
        }}
      >
        <div style={{ lineHeight: 0, flexShrink: 0 }}>
          <AlertIcon type={type} />
        </div>

        <div
          style={{
            fontSize: "16px",
            lineHeight: "1.1",
            fontWeight: 500,
            color: token.titleColor,
            letterSpacing: "-0.02em",
            whiteSpace: "normal",
            // ✅ break long words/emails/urls
            wordBreak: "break-word",
            overflowWrap: "break-word",
            // ✅ prevent overflow issues in flex
            minWidth: 0,
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export const showInlineToast = ({
  type,
  title,
  actionLabel = "Primary",
  onActionClick,
}: InlineAlertToastProps) => {
  toast(
    <InlineAlertToast
      type={type}
      title={title}
      actionLabel={actionLabel}
      onActionClick={onActionClick}
    />,
    {
      style: toastShellStyle,
      autoClose: 5000,
      closeButton: false,
      icon: false,
    },
  );
};

export const showSuccessToast = (message: string) =>
  showInlineToast({
    type: "success",
    title: message,
  });

export const showToast = (
  message: string,
  type: ToastType,
  actionLabel = "Primary",
  onActionClick?: () => void,
) =>
  showInlineToast({
    type,
    title: message,
    actionLabel,
    onActionClick,
  });

export const showErrorToast = (
  message: string | string[] | Record<string, string[]>,
) => {
  const normalize = (msg: typeof message): string => {
    if (typeof msg === "string") return msg;

    if (Array.isArray(msg)) {
      return (
        msg.filter((item) => item && item.trim() !== "").join(", ") ||
        "An unexpected error occurred"
      );
    }

    return (
      Object.entries(msg)
        .flatMap(([field, errors]) =>
          Array.isArray(errors)
            ? errors.map((error) => `${field}: ${error}`)
            : [`${field}: ${errors}`],
        )
        .filter((item) => item && item.trim() !== "")
        .join(", ") || "An unexpected error occurred"
    );
  };

  showInlineToast({
    type: "error",
    title: normalize(message),
  });
};

export const getApiErrors = (
  error: any,
): string | string[] | Record<string, string[]> =>
  error?.response?.data?.data?.message ||
  error?.response?.data?.errors ||
  error?.response?.data?.error_description ||
  error?.response?.data?.message ||
  error?.response?.data ||
  error?.message ||
  "An unexpected error occurred";
