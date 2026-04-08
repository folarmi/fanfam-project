// import { useNavigate } from "react-router-dom";

// export type MentionUser = {
//   username: string;
//   email: string;
//   name?: string;
//   avatar?: string;
// };

// type Props = {
//   message?: string;
//   mentionsMap?: Record<string, MentionUser>;
// };

// const tokenRegex = /(@[a-zA-Z0-9._]+|https?:\/\/[^\s]+|www\.[^\s]+)/g;
// const urlRegex = /^(https?:\/\/[^\s]+|www\.[^\s]+)$/i;

// const MentionLinkText = ({ message = "", mentionsMap = {} }: Props) => {
//   const navigate = useNavigate();

//   if (!message) return null;

//   const parts = message.split(tokenRegex);

//   return (
//     <>
//       {parts.map((part, index) => {
//         if (!part) return null;

//         if (part.startsWith("@")) {
//           const username = part.slice(1).toLowerCase();
//           const mentionedUser = mentionsMap[username];

//           if (!mentionedUser?.email) {
//             return <span key={`${part}-${index}`}>{part}</span>;
//           }

//           return (
//             <span
//               key={`${part}-${index}`}
//               className="text-blue-600 font-medium cursor-pointer hover:underline"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 navigate(
//                   `/dashboard/profile/${encodeURIComponent(mentionedUser.email)}`,
//                 );
//               }}
//             >
//               {part}
//             </span>
//           );
//         }

//         if (urlRegex.test(part)) {
//           const href = part.startsWith("http") ? part : `https://${part}`;

//           return (
//             <a
//               key={`${part}-${index}`}
//               href={href}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 underline break-all"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {part}
//             </a>
//           );
//         }

//         return <span key={`${part}-${index}`}>{part}</span>;
//       })}
//     </>
//   );
// };

// export default MentionLinkText;

import { useNavigate } from "react-router-dom";

export type MentionUser = {
  username: string;
  email: string;
  name?: string;
  avatar?: string;
};

type Props = {
  message?: string;
  mentionsMap?: Record<string, MentionUser>;
};

// support both @username and @{username}
const tokenRegex =
  /(@\{[a-zA-Z0-9._]+\}|@[a-zA-Z0-9._]+|https?:\/\/[^\s]+|www\.[^\s]+)/g;

const urlRegex = /^(https?:\/\/[^\s]+|www\.[^\s]+)$/i;

const MentionLinkText = ({ message = "", mentionsMap = {} }: Props) => {
  const navigate = useNavigate();

  if (!message) return null;

  const parts = message.split(tokenRegex);

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;

        // HANDLE MENTIONS
        if (part.startsWith("@")) {
          let username = "";

          // case: @{username}
          if (part.startsWith("@{") && part.endsWith("}")) {
            username = part.slice(2, -1); // remove @{ }
          } else {
            // case: @username
            username = part.slice(1);
          }

          const normalized = username.toLowerCase();
          const mentionedUser = mentionsMap[normalized];

          if (!mentionedUser?.email) {
            // fallback display without @
            return <span key={`${part}-${index}`}>{username}</span>;
          }

          return (
            <span
              key={`${part}-${index}`}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                navigate(
                  `/dashboard/profile/${encodeURIComponent(mentionedUser.email)}`,
                );
              }}
            >
              {username} {/* 🔥 removed @ here */}
            </span>
          );
        }

        // HANDLE LINKS
        if (urlRegex.test(part)) {
          const href = part.startsWith("http") ? part : `https://${part}`;

          return (
            <a
              key={`${part}-${index}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
              onClick={(e) => e.stopPropagation()}
            >
              {part}
            </a>
          );
        }

        return <span key={`${part}-${index}`}>{part}</span>;
      })}
    </>
  );
};

export default MentionLinkText;
