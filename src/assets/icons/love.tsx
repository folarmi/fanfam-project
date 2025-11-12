import type { IsReactionLiked } from "@/lib/types";

const Love = ({ isLiked }: IsReactionLiked) => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.62 21.3101C12.28 21.4201 11.72 21.4201 11.38 21.3101C8.48 20.3201 2 16.1901 2 9.19006C2 6.10006 4.49 3.60006 7.56 3.60006C9.38 3.60006 10.99 4.48006 12 5.84006C13.01 4.48006 14.63 3.60006 16.44 3.60006C19.51 3.60006 22 6.10006 22 9.19006C22 16.1901 15.52 20.3201 12.62 21.3101Z"
      stroke={isLiked ? "#2599F6" : "#8D8E96"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={isLiked ? "#2599F6" : "none"}
    />
  </svg>
);

export default Love;
