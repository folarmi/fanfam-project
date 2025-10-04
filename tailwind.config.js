/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90deg, #B0ADAD4D 30%, #08080880 50%)",
        "modal-gradient": "linear-gradient(90deg, #E4F1FC 0%, #FFFFFF 100%)",
        "subscribe-gradient": "linear-gradient(to bottom, #ffffff, #f0f0f0)",
        "create-folder":
          "linear-gradient(to bottom, rgba(228, 241, 252, 1), rgba(255, 255, 255, 1))",
        "secondary-btn":
          "linear-gradient(to bottom, rgba(45, 54, 44, 0), rgba(45, 54, 44, 0.1), rgba(255, 255, 255, 1))",
        "primary-btn":
          "linear-gradient(to bottom, rgba(37, 153, 246, 1), rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0))",
        "overlay-bg":
          "linear-gradient(to right, rgba(1, 26, 39, 0.28), rgba(1, 26, 39, 0.25), rgba(1, 26, 39, 0.37))",
        "my-gradient":
          "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0))",
      },
      colors: {
        primary: "#2599F6",
        grey_10: "#ECEEFB",
        grey_20: "#FAFAFA",
        grey_30: "#707072",
        grey_40: "#E7E8F1",
        grey_50: "#E0E2EE",
        grey_60: "#F7F8FD",
        grey_100: "#D3D5E0",
        grey_200: "#BDBFC9",
        grey_300: "#A5A7AF",
        grey_400: "#8D8E96",
        grey_500: "#6F7076",
        grey_600: "#58595E",
        grey_700: "#414245",
        grey_800: "#2A2A2D",
        grey_900: "#131314",
        grey_90: "#F3F4FC",
        grey_80: "#D9D9D9",
        grey_70: "#c4c4c4",
        gray_100: "#101510",
        blue_100: "#F7FAFC",
        blue_200: "#E4F1FC",
        blue_300: "#E0E2EE80",
        blue_400: "#C1E1FA",
        blue_500: "#2599F6",
        blue_600: "#2599F6",
        blue_900: "#011220",
        blue_10: "#A7D4FC",
        green_10: "#F5FBF5",
        green_50: "#EFFAED",
        green_100: "#1CF417",
        green_600: "#29AF1D",
        red_100: "#FC0404",
        red_200: "#FFD1D1",
        red_300: "#F50000",
        red_400: "#E20C0C",
        black_400: "#131314",
        orange_100: "#F69625",
        slate_100: "#F9F9FB",
        slate_600: "#D9D9E0",
        slate_1100: "#60646C",
        bloomTextHeading: "#1C2024",
      },
      boxShadow: {
        custom: "0px 2px 1px 0px #00000040",
        auth: "0px 4px 4px 0px #B7B5B540",
        "header-md":
          "inset 0px 4px 4px 0px #ECEEFB, inset 0px 2px 1px 0px #FFFFFF29, 0px 4px 4px 0px #ECEEFB",
        triple:
          "3px 3px 5px 0px rgba(224, 226, 238, 0.5), 0px 0px 0px 1px rgba(239, 245, 239, 0.5), -3px -1px 5px 0px rgba(224, 226, 238, 0.5)",
        "inner-white": "inset 0px 2px 0px 0px #FFFFFF29",
        "create-folder":
          "0px 1px 20px 0px rgba(18, 34, 16, 0.1), 1px 0px 20px 0px rgba(18, 34, 16, 0.1)",
        "primary-btn":
          "0px 1px 1px 0px rgba(1, 18, 32, 0.2), inset 0px 2px 0px 0px rgba(255, 255, 255, 0.16)",
        "custom-inner": "inset 0px 2px 0px 0px #ffffff29",
        "custom-outer": "0px 2px 5px 0px rgba(0, 0, 0, 0.2)",
        "search-input":
          "inset 0 1px 3px rgba(236, 238, 251, 1), inset 0 1px 2px rgba(255, 255, 255, 0.25)",
        "chat-interface": "inset 0px 4px 4px 0px rgba(236, 238, 251, 1)",
        "custom-combined":
          "0px 4px 4px 0px rgba(236, 238, 251, 1), inset 0px -4px 1px 0px rgba(255, 255, 255, 0.25)",
        "disabled-button":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "timeline-card-shadow": "0px 4px 4px 0px rgba(236, 238, 251, 1)",
        "custom-double":
          "0px 4px 10px rgba(0, 0, 0, 0.25), 0px 0px 5px rgba(255, 255, 255, 1)",
      },
      dropShadow: {
        "3xl": "0 4px 4px 0 rgba(183, 181, 181, 0.25)",
        "4xl": "0 4px 4px 0 rgba(236, 238, 251, 1)",
        "5xl": "0px 1px 1px 0px rgba(1, 18, 32, 0.2)",
        "6xl": "0px 0.5px 1px 0px rgba(1, 18, 32, 0.2)",
        "7xl": "0px 0.5px 1px 0px rgba(19, 19, 20, 0.2)",
      },
    },
  },
  plugins: [],
};
