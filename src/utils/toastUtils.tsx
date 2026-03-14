// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { toast } from "react-toastify";

// const successToastStyle = {
//   backgroundColor: "rgba(0, 164, 51, 0.1)",
//   color: "rgba(0, 113, 63, 0.87)",
//   padding: "12px",
//   borderRadius: "6px",
//   height: "44px",
//   fontSize: "14px",
//   fontWeight: "normal",
//   width: "fit-content",
//   minWidth: "200px",
//   maxWidth: "80vw",
//   whiteSpace: "nowrap",
// };

// const errorToastStyle = {
//   backgroundColor: "rgba(243, 0, 13, 0.08)",
//   color: "rgba(196, 0, 6, 0.83)",
//   padding: "12px",
//   borderRadius: "6px",
//   height: "44px",
//   fontSize: "14px",
//   fontWeight: "normal",
//   minWidth: "200px",
//   maxWidth: "80vw",
//   // whiteSpace: "nowrap",
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
//   const style =
//     type === "success"
//       ? successToastStyle
//       : type === "error"
//         ? errorToastStyle
//         : /* default */ successToastStyle;

//   toast[type](message, { style });
// };

// export const showErrorToast = (
//   message: string | string[] | Record<string, string[]>,
// ) => {
//   if (typeof message === "string") {
//     toast.error(message, {
//       style: errorToastStyle,
//     });
//   } else if (Array.isArray(message)) {
//     // Filter out empty messages
//     const validMessages = message.filter((msg) => msg && msg.trim() !== "");

//     if (validMessages.length === 0) {
//       toast.error("An unexpected error occurred", { style: errorToastStyle });
//       return;
//     }

//     toast.error(
//       <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
//         {validMessages.map((msg, i) => (
//           <span key={i}>{msg}</span>
//         ))}
//       </div>,
//       {
//         style: errorToastStyle,
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
//       toast.error("An unexpected error occurred", { style: errorToastStyle });
//       return;
//     }

//     toast.error(
//       <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
//         {errorMessages.map((msg, i) => (
//           <span key={i}>{msg}</span> // Changed from <p> to <span> for consistency
//         ))}
//       </div>,
//       {
//         style: errorToastStyle,
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
//     error?.response?.data?.error_description || // Add this common API error field
//     error?.response?.data?.message ||
//     error?.response?.data ||
//     error?.message || // Catch network errors, etc.
//     "An unexpected error occurred"
//   );
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import type { CSSProperties } from "react";

const baseToastStyle: CSSProperties = {
  padding: "12px 14px",
  borderRadius: "8px",
  minHeight: "52px",
  fontSize: "14px",
  fontWeight: 500,
  minWidth: "260px",
  maxWidth: "420px",
  width: "fit-content",
  boxShadow: "0 8px 24px rgba(16, 24, 40, 0.08)",
  display: "flex",
  alignItems: "center",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  lineHeight: "1.4",
};

const successToastStyle: CSSProperties = {
  ...baseToastStyle,
  backgroundColor: "#F0FDF4",
  color: "#166534",
  borderTop: "3px solid #22C55E",
};

const errorToastStyle: CSSProperties = {
  ...baseToastStyle,
  backgroundColor: "#FEF2F2",
  color: "#B42318",
  borderTop: "3px solid #F04438",
};

const warningToastStyle: CSSProperties = {
  ...baseToastStyle,
  backgroundColor: "#FFFAEB",
  color: "#B54708",
  borderTop: "3px solid #F79009",
};

const infoToastStyle: CSSProperties = {
  ...baseToastStyle,
  backgroundColor: "#EFF8FF",
  color: "#175CD3",
  borderTop: "3px solid #2E90FA",
};

const getToastStyle = (
  type: "success" | "error" | "info" | "warning",
): CSSProperties => {
  switch (type) {
    case "success":
      return successToastStyle;
    case "error":
      return errorToastStyle;
    case "warning":
      return warningToastStyle;
    case "info":
      return infoToastStyle;
    default:
      return successToastStyle;
  }
};

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    style: successToastStyle,
  });
};

// Optional: Generic toast with custom type
export const showToast = (
  message: string,
  type: "success" | "error" | "info" | "warning",
) => {
  toast[type](message, {
    style: getToastStyle(type),
  });
};

export const showErrorToast = (
  message: string | string[] | Record<string, string[]>,
) => {
  if (typeof message === "string") {
    toast.error(message, {
      style: errorToastStyle,
    });
  } else if (Array.isArray(message)) {
    const validMessages = message.filter((msg) => msg && msg.trim() !== "");

    if (validMessages.length === 0) {
      toast.error("An unexpected error occurred", {
        style: errorToastStyle,
      });
      return;
    }

    toast.error(
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {validMessages.map((msg, i) => (
          <span key={i}>{msg}</span>
        ))}
      </div>,
      {
        style: {
          ...errorToastStyle,
          alignItems: "flex-start",
        },
      },
    );
  } else if (typeof message === "object" && message !== null) {
    const errorMessages = Object.entries(message)
      .flatMap(([field, errors]) => {
        if (Array.isArray(errors)) {
          return errors.map((error) => `${field}: ${error}`);
        }
        return [`${field}: ${errors}`];
      })
      .filter((msg) => msg && msg.trim() !== "");

    if (errorMessages.length === 0) {
      toast.error("An unexpected error occurred", {
        style: errorToastStyle,
      });
      return;
    }

    toast.error(
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {errorMessages.map((msg, i) => (
          <span key={i}>{msg}</span>
        ))}
      </div>,
      {
        style: {
          ...errorToastStyle,
          alignItems: "flex-start",
        },
      },
    );
  }
};

// utils/errorUtils.ts
export const getApiErrors = (
  error: any,
): string | string[] | Record<string, string[]> => {
  return (
    error?.response?.data?.data?.message ||
    error?.response?.data?.errors ||
    error?.response?.data?.error_description ||
    error?.response?.data?.message ||
    error?.response?.data ||
    error?.message ||
    "An unexpected error occurred"
  );
};
