// import React, { ButtonHTMLAttributes, ReactNode } from "react";

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?:
//     | "primary"
//     | "secondary"
//     | "success"
//     | "warning"
//     | "disabled"
//     | "error"
//     | string;
//   children: ReactNode;
//   loading?: boolean;
//   primaryButtonSize?: string;
//   disabled?: boolean;
// }

// const CustomButton: React.FC<ButtonProps> = ({
//   variant = "primary",
//   className = "",
//   children,
//   loading,
//   primaryButtonSize = "base",
//   disabled,
//   ...rest
// }) => {
//   let classes = "";

//   switch (variant) {
//     case "primary":
//       classes =
//         // "border border-blue_500 bg-primary-btn shadow-primary-btn text-white text-base py-2 px-4 ";
//         `border border-blue_500 bg-primary bg-gradient-to-r from-gradient-start to-gradient-end shadow-primary-btn text-white py-2 text-${primaryButtonSize}`;
//       break;
//     case "secondary":
//       classes =
//         "border border-grey_10 drop-shadow-7xl py-2 px-4 rounded bg-secondary-btn";
//       break;
//     case "primaryTwo":
//       classes =
//         "border border-blue_500 bg-primary bg-gradient-to-r from-gradient-start to-gradient-end shadow-primary-btn text-white text-base py-2";
//     case "disabled":
//       classes = "text-grey_100 font-medium py-2 px-4 rounded";
//       break;
//     case "error":
//       classes = `border border-red_300 bg-red_300 bg-gradient-to-r from-gradient-start to-gradient-end shadow-primary-btn text-white py-2 text-${primaryButtonSize}`;
//       break;
//     default:
//       classes = "bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded";
//       break;
//   }

//   // let disabledStyles = `bg-blue_400 border border-blue_400 shadow-disabled-button`;
//   const getDisabledStyles = (variant: string) => {
//     const color = variant === "error" ? "red_200" : "blue_400";
//     return `bg-${color} border border-${color} shadow-disabled-button`;
//   };

//   const disabledStyles = getDisabledStyles(variant);

//   // Concatenate the provided className with the generated classes
//   let mergedClassName = `${classes}  ${className} w-full whitespace-nowrap rounded-3xl font-medium text-base`;

//   if (disabled) {
//     mergedClassName += ` ${disabledStyles} cursor-not-allowed`;
//   }

//   if (loading) {
//     mergedClassName += " opacity-50 cursor-not-allowed";
//   }

//   return (
//     <button
//       disabled={loading || disabled}
//       className={mergedClassName}
//       {...rest}
//     >
//       {loading ? (
//         <div className="flex items-center justify-center">
//           <svg
//             className="animate-spin h-5 w-5 mr-3 text-white"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             ></circle>
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//             ></path>
//           </svg>
//           Loading...
//         </div>
//       ) : (
//         children
//       )}
//     </button>
//   );
// };

// export default CustomButton;

import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "disabled"
    | "error"
    | string;
  children: ReactNode;
  loading?: boolean;
  primaryButtonSize?: string;
  disabled?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  loading,
  primaryButtonSize = "base",
  disabled,
  ...rest
}) => {
  let baseClasses = "";
  let disabledClasses = "cursor-not-allowed opacity-50";

  switch (variant) {
    case "primary":
      baseClasses = `border border-blue_500 bg-primary bg-gradient-to-r from-gradient-start to-gradient-end shadow-primary-btn text-white py-2 text-${primaryButtonSize}`;
      break;
    case "secondary":
      baseClasses =
        "border border-grey_10 drop-shadow-7xl py-2 px-4 rounded bg-secondary-btn";
      break;
    case "primaryTwo":
      baseClasses =
        "border border-blue_500 bg-primary bg-gradient-to-r from-gradient-start to-gradient-end shadow-primary-btn text-white text-base py-2";
      break;
    case "disabled":
      baseClasses = "text-grey_100 font-medium py-2 px-4 rounded";
      break;
    case "error":
      baseClasses = `border border-red_300 bg-red_300 bg-gradient-to-r from-gradient-start to-gradient-end shadow-primary-btn text-white py-2 text-${primaryButtonSize}`;
      break;
    default:
      baseClasses =
        "bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded";
      break;
  }

  if (disabled) {
    disabledClasses += ` bg-${
      variant === "error" ? "red_200" : "blue_400"
    } border border-${
      variant === "error" ? "red_200" : "blue_400"
    } shadow-disabled-button`;
  }

  const mergedClassName = `${baseClasses} ${
    disabled ? disabledClasses : ""
  } ${className} whitespace-nowrap rounded-3xl font-medium text-base`;

  return (
    <button
      disabled={loading || disabled}
      className={mergedClassName}
      {...rest}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 mr-3 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default CustomButton;
