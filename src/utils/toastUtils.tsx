/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { toast } from "react-toastify";
// import type { CSSProperties } from "react";

// const baseToastStyle: CSSProperties = {
//   padding: "12px 14px",
//   borderRadius: "8px",
//   minHeight: "52px",
//   fontSize: "14px",
//   fontWeight: 500,
//   minWidth: "260px",
//   maxWidth: "420px",
//   width: "fit-content",
//   boxShadow: "0 8px 24px rgba(16, 24, 40, 0.08)",
//   display: "flex",
//   alignItems: "center",
//   whiteSpace: "pre-wrap",
//   wordBreak: "break-word",
//   lineHeight: "1.4",
// };

// const successToastStyle: CSSProperties = {
//   ...baseToastStyle,
//   backgroundColor: "#F0FDF4",
//   color: "#166534",
//   borderTop: "3px solid #22C55E",
// };

// const errorToastStyle: CSSProperties = {
//   ...baseToastStyle,
//   backgroundColor: "#FEF2F2",
//   color: "#B42318",
//   borderTop: "3px solid #F04438",
// };

// const warningToastStyle: CSSProperties = {
//   ...baseToastStyle,
//   backgroundColor: "#FFFAEB",
//   color: "#B54708",
//   borderTop: "3px solid #F79009",
// };

// const infoToastStyle: CSSProperties = {
//   ...baseToastStyle,
//   backgroundColor: "#EFF8FF",
//   color: "#175CD3",
//   borderTop: "3px solid #2E90FA",
// };

// const getToastStyle = (
//   type: "success" | "error" | "info" | "warning",
// ): CSSProperties => {
//   switch (type) {
//     case "success":
//       return successToastStyle;
//     case "error":
//       return errorToastStyle;
//     case "warning":
//       return warningToastStyle;
//     case "info":
//       return infoToastStyle;
//     default:
//       return successToastStyle;
//   }
// };

// export const showSuccessToast = (message: string) => {
//   toast.success(message, {
//     style: successToastStyle,
//   });
// };

// // Optional: Generic toast with custom type
// export const showToast = (
//   message: string,
//   type: "success" | "error" | "info" | "warning",
// ) => {
//   toast[type](message, {
//     style: getToastStyle(type),
//   });
// };

// export const showErrorToast = (
//   message: string | string[] | Record<string, string[]>,
// ) => {
//   if (typeof message === "string") {
//     toast.error(message, {
//       style: errorToastStyle,
//     });
//   } else if (Array.isArray(message)) {
//     const validMessages = message.filter((msg) => msg && msg.trim() !== "");

//     if (validMessages.length === 0) {
//       toast.error("An unexpected error occurred", {
//         style: errorToastStyle,
//       });
//       return;
//     }

//     toast.error(
//       <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
//         {validMessages.map((msg, i) => (
//           <span key={i}>{msg}</span>
//         ))}
//       </div>,
//       {
//         style: {
//           ...errorToastStyle,
//           alignItems: "flex-start",
//         },
//       },
//     );
//   } else if (typeof message === "object" && message !== null) {
//     const errorMessages = Object.entries(message)
//       .flatMap(([field, errors]) => {
//         if (Array.isArray(errors)) {
//           return errors.map((error) => `${field}: ${error}`);
//         }
//         return [`${field}: ${errors}`];
//       })
//       .filter((msg) => msg && msg.trim() !== "");

//     if (errorMessages.length === 0) {
//       toast.error("An unexpected error occurred", {
//         style: errorToastStyle,
//       });
//       return;
//     }

//     toast.error(
//       <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
//         {errorMessages.map((msg, i) => (
//           <span key={i}>{msg}</span>
//         ))}
//       </div>,
//       {
//         style: {
//           ...errorToastStyle,
//           alignItems: "flex-start",
//         },
//       },
//     );
//   }
// };

// // utils/errorUtils.ts
// export const getApiErrors = (
//   error: any,
// ): string | string[] | Record<string, string[]> => {
//   return (
//     error?.response?.data?.data?.message ||
//     error?.response?.data?.errors ||
//     error?.response?.data?.error_description ||
//     error?.response?.data?.message ||
//     error?.response?.data ||
//     error?.message ||
//     "An unexpected error occurred"
//   );
// };

import { toast } from "react-toastify";
import type { CSSProperties } from "react";

// ── Icons (octagon stop-sign style matching the screenshot) ───────────────
const icons = {
  error: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M7.172 2h5.656L17 6.172v5.656L12.828 16H7.172L3 11.828V6.172L7.172 2z"
        fill="#F04438"
      />
      <path
        d="M10 6.5v3.5M10 13h.01"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" fill="#F79009" />
      <path
        d="M10 6.5v3.5M10 13h.01"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  info: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" fill="#2E90FA" />
      <path
        d="M10 13.5v-3.5M10 7h.01"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  success: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" fill="#22C55E" />
      <path
        d="M6.5 10.5l2.5 2.5 4.5-5"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

// ── Color tokens ───────────────────────────────────────────────────────────
const tokens = {
  error: { border: "#D21C1C", titleColor: "#1a1a1a", bg: "#FEE9E7" },
  warning: { border: "#F79009", titleColor: "#1a1a1a", bg: "#FEF3C7" },
  info: { border: "#2E90FA", titleColor: "#1a1a1a", bg: "#E0F0FF" },
  success: { border: "#22C55E", titleColor: "#1a1a1a", bg: "#DCFCE7" },
};

type ToastType = "success" | "error" | "info" | "warning";

const containerStyle = (type: ToastType): CSSProperties => ({
  background: tokens[type].bg,
  // borderRadius: "10px",
  borderTop: `4px solid ${tokens[type].border}`,
  boxShadow: "0 4px 16px rgba(16,24,40,0.10), 0 1px 4px rgba(16,24,40,0.06)",
  padding: "14px 16px",
  minWidth: "260px",
  maxWidth: "420px",
  fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
});

interface ExpandedProps {
  type: ToastType;
  title: string;
  description?: string;
}

const ExpandedContent = ({ type, title, description }: ExpandedProps) => {
  const t = tokens[type];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ flexShrink: 0, lineHeight: 0 }}>{icons[type]}</span>
        <span
          style={{ fontSize: "14px", fontWeight: 700, color: t.titleColor }}
        >
          {title}
        </span>
      </div>
      {description && (
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "#555",
            lineHeight: "1.5",
            paddingLeft: "30px",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};

interface InlineProps {
  type: ToastType;
  title: string;
}

const InlineContent = ({ type, title }: InlineProps) => {
  const t = tokens[type];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ flexShrink: 0, lineHeight: 0 }}>{icons[type]}</span>
      <span style={{ fontSize: "14px", fontWeight: 700, color: t.titleColor }}>
        {title}
      </span>
    </div>
  );
};

// ── Public API ─────────────────────────────────────────────────────────────

export const showAlertToast = (options: ExpandedProps) => {
  toast(<ExpandedContent {...options} />, {
    style: containerStyle(options.type),
    autoClose: 6000,
  });
};

export const showInlineToast = (options: InlineProps) => {
  toast(<InlineContent {...options} />, {
    style: containerStyle(options.type),
    autoClose: 5000,
  });
};

export const showSuccessToast = (message: string) =>
  showInlineToast({ type: "success", title: message });

export const showToast = (message: string, type: ToastType) =>
  showInlineToast({ type, title: message });

export const showErrorToast = (
  message: string | string[] | Record<string, string[]>,
) => {
  const normalize = (msg: typeof message): string => {
    if (typeof msg === "string") return msg;
    if (Array.isArray(msg))
      return msg.filter(Boolean).join("\n") || "An unexpected error occurred";
    return (
      Object.entries(msg)
        .flatMap(([f, errs]) =>
          Array.isArray(errs)
            ? errs.map((e) => `${f}: ${e}`)
            : [`${f}: ${errs}`],
        )
        .filter(Boolean)
        .join("\n") || "An unexpected error occurred"
    );
  };
  showInlineToast({ type: "error", title: normalize(message) });
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
