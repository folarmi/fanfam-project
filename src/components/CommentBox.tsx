// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useRef, useState } from "react";
// import CustomButton from "./forms/CustomButton";
// import { useForm } from "react-hook-form";
// import { CustomTextArea } from "./forms/CustomTextArea";
// import { useCustomMutation } from "@/hooks/apiCalls";
// import type { RootState } from "@/lib/store";
// import { useAppSelector } from "@/lib/hook";
// import MediaUploadGrid from "./molecules/MediaUploadGrid";
// import { combineDateAndTimeToISO, getMediaType } from "@/utils/helperTwo";
// import { useUploadFiles } from "@/hooks/useUploadFiles";
// import { useQueryClient } from "@tanstack/react-query";
// import video from "@/assets/icons/video.svg";
// import Typography from "./forms/Typography";
// import { useNavigate } from "react-router-dom";
// import VoiceRecorderModal from "./modals/VoiceRecorderModal";
// import { DateTimePicker } from "./forms/DateTimePicker";
// import { showInlineToast } from "@/utils/toastUtils";
// import MediaPreviewGrid from "./MediaPreviewGrid";
// import Poll from "./molecules/Poll";

// type CommentBoxProp = {
//   ifPoll?: boolean;
//   ifRecord?: boolean;
//   endpoint?: string;
//   ifGoLive?: boolean;
//   ifSchedule?: boolean;
//   placeholder?: string;
//   commentId?: string;
//   onSuccess?: () => void;
// };

// const CommentBox = ({
//   ifRecord,
//   ifPoll,
//   ifSchedule,
//   endpoint = "contents",
//   commentId,
//   onSuccess,
//   placeholder = "Write a post…",
//   ifGoLive = false,
// }: CommentBoxProp) => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const {
//     handleSubmit,
//     control,
//     reset,
//     clearErrors,
//     trigger,
//     formState: { isSubmitted },
//   } = useForm();

//   const queuedFilesRef = useRef<File[]>([]);
//   const [isActive, setIsActive] = useState(false);
//   const { userObject } = useAppSelector((state: RootState) => state.auth);
//   const [queuedFiles, setQueuedFiles] = useState<File[]>([]);

//   const [isRecorderOpen, setIsRecorderOpen] = useState(false);
//   const [isPostToBeScheduled, setIsPostToBeScheduled] = useState(false);
//   const [isUserCreatingPoll, setIfUserIsCreatingPoll] = useState(false);

//   const handleSetIsCreatingPoll = (value: boolean) => {
//     setIfUserIsCreatingPoll?.(value);
//   };

//   const toggleSchedule = () => setIsPostToBeScheduled((prev) => !prev);

//   const {
//     uploadFiles,
//     isUploading,
//     reset: resetFiles,
//   } = useUploadFiles({
//     usid: userObject?.usid,
//     onSuccess: () => resetFiles(),
//     onError: (error) =>
//       showInlineToast({ type: "error", title: error?.message }),
//   });

//   const handleFocus = () => setIsActive(true);
//   const handleBlur = () => setIsActive(false);

//   const updateQueuedFiles = (files: File[]) => {
//     setQueuedFiles(files);
//     queuedFilesRef.current = files;
//   };

//   const handleFileUpload = (files: File[]) => {
//     const updated = [...queuedFilesRef.current, ...files];
//     updateQueuedFiles(updated);
//   };

//   const handleRemoveFile = (index: number) => {
//     const updated = queuedFilesRef.current.filter((_, i) => i !== index);
//     updateQueuedFiles(updated);
//   };

//   const handleRecordingComplete = (audioBlob: Blob) => {
//     const audioFile = new File([audioBlob], `voice-note-${Date.now()}.webm`, {
//       type: audioBlob.type,
//     });
//     setQueuedFiles((prev) => [...prev, audioFile]);
//     showInlineToast({
//       type: "success",
//       title: "Voice note added successfully",
//     });
//   };

//   const mutationEndpoint = commentId
//     ? `${endpoint}/${commentId}/replies`
//     : endpoint;

//   const submitForm = async (data: any) => {
//     if (!data.message?.trim() && queuedFiles.length === 0) {
//       showInlineToast({
//         type: "error",
//         title: commentId
//           ? "Reply message or media is required"
//           : "Post message or media is required",
//       });
//       return;
//     }

//     if (queuedFiles.length > 0) {
//       try {
//         const mediaLinks = await uploadFiles(queuedFiles);
//         createContentMutation.mutate({
//           ...data,
//           message: data.message || "",
//           mediaFiles: mediaLinks,
//           mentions: [],
//           mediaType: getMediaType(queuedFiles),
//         });
//         setQueuedFiles([]);
//       } catch (error) {
//         console.error("Upload failed:", error);
//       }
//     } else {
//       const { eventDate, eventTime, ...rest } = data;
//       const payload = {
//         ...rest,
//         mediaFiles: [],
//         mentions: [],
//         scheduledFor:
//           isPostToBeScheduled && eventDate && eventTime
//             ? combineDateAndTimeToISO(eventDate, eventTime)
//             : null,
//       };
//       createContentMutation.mutate(payload);
//     }
//   };

//   const createContentMutation = useCustomMutation({
//     endpoint: mutationEndpoint,
//     onSuccessCallback: () => {
//       reset();
//       resetFiles();
//       queryClient.invalidateQueries({
//         queryKey: ["GetContents"],
//         exact: false,
//       });
//       onSuccess?.();
//     },
//     successMessage: () =>
//       commentId ? "Reply added successfully" : "Post added successfully",
//     onError: () => {},
//   });

//   useEffect(() => {
//     if (!isSubmitted) return;
//     if (queuedFiles.length > 0) clearErrors("message");
//     else trigger("message");
//   }, [queuedFiles.length, clearErrors, trigger]);

//   const isPostable = isActive || queuedFiles.length > 0;

//   if (isUserCreatingPoll) {
//     return <Poll setIfUserIsCreatingPoll={handleSetIsCreatingPoll} />;
//   }

//   return (
//     <form onSubmit={handleSubmit(submitForm)} className="mt-4">
//       <CustomTextArea
//         placeholder={placeholder}
//         name="message"
//         control={control}
//         rules={{
//           validate: (value: string) => {
//             if (!value?.trim() && queuedFilesRef.current.length === 0) {
//               return commentId
//                 ? "Reply message or media is required"
//                 : "Post message or media is required";
//             }
//             return true;
//           },
//         }}
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         rows={commentId ? 3 : 5}
//       />

//       <MediaPreviewGrid files={queuedFiles} onRemove={handleRemoveFile} />

//       {/* Toolbar row */}
//       <div className="flex items-center justify-between mt-3 p-4">
//         <MediaUploadGrid
//           handleFileUpload={handleFileUpload}
//           handleRemoveFile={handleRemoveFile}
//           isActive={isActive}
//           ifPoll={ifPoll}
//           ifRecord={ifRecord}
//           ifSchedule={ifSchedule}
//           setIfUserIsCreatingPoll={setIfUserIsCreatingPoll}
//           toggleSchedule={toggleSchedule}
//           onRecordClick={() => setIsRecorderOpen(true)}
//         />

//         {!isPostToBeScheduled && (
//           <div className="flex items-center gap-3">
//             <CustomButton
//               variant={isPostable ? "primary" : "disabled"}
//               className="bg-grey_90 px-6 rounded-full"
//               disabled={createContentMutation.isPending || isUploading}
//               loading={createContentMutation.isPending || isUploading}
//             >
//               {commentId ? "Reply" : "Post"}
//             </CustomButton>

//             {ifGoLive && (
//               <div
//                 className="border border-blue_1000 py-2 px-4 flex items-center rounded-3xl cursor-pointer"
//                 onClick={() => navigate("livestreaming")}
//               >
//                 <img src={video} alt="video" className="mr-1 w-4 h-4" />
//                 <Typography variant="subtitle3" className="text-blue_20">
//                   Go Live
//                 </Typography>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {isPostToBeScheduled && (
//         <div className="mx-4 mb-4 flex items-center justify-between border border-grey_50 rounded-md p-4">
//           <DateTimePicker
//             control={control}
//             dateName="eventDate"
//             timeName="eventTime"
//             label=""
//           />
//           <CustomButton
//             className="bg-grey_90 px-6 rounded-full"
//             disabled={createContentMutation.isPending || isUploading}
//             loading={createContentMutation.isPending || isUploading}
//           >
//             Schedule Post
//           </CustomButton>
//         </div>
//       )}

//       <VoiceRecorderModal
//         isOpen={isRecorderOpen}
//         onClose={() => setIsRecorderOpen(false)}
//         onRecordingComplete={handleRecordingComplete}
//       />
//     </form>
//   );
// };

// export default CommentBox;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import CustomButton from "./forms/CustomButton";
import { useForm } from "react-hook-form";
import { CustomTextArea } from "./forms/CustomTextArea";
import { useCustomMutation } from "@/hooks/apiCalls";
import type { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hook";
import MediaUploadGrid from "./molecules/MediaUploadGrid";
import { combineDateAndTimeToISO, getMediaType } from "@/utils/helperTwo";
import { useUploadFiles } from "@/hooks/useUploadFiles";
import { useQueryClient } from "@tanstack/react-query";
import video from "@/assets/icons/video.svg";
import Typography from "./forms/Typography";
import { useNavigate } from "react-router-dom";
import VoiceRecorderModal from "./modals/VoiceRecorderModal";
import { DateTimePicker } from "./forms/DateTimePicker";
import { showInlineToast } from "@/utils/toastUtils";
import MediaPreviewGrid from "./MediaPreviewGrid";
import Poll from "./molecules/Poll";
import { useGetData } from "@/hooks/apiCalls"; // ← your existing hook

// ─── Types ─────────────────────────────────────────────────────────────────

type MentionUser = {
  usid: string;
  email: string;
  username: string;
  displayName: string;
  fullName: string;
  profileImageUrl?: string;
};

// Shape returned by both endpoints
// type SubscriptionRecord = {
//   publicId: string;
//   creator: MentionUser & Record<string, any>;
//   subscriber: MentionUser & Record<string, any>;
// };

type DropdownPosition = { top: number; left: number };

type CommentBoxProp = {
  ifPoll?: boolean;
  ifRecord?: boolean;
  endpoint?: string;
  ifGoLive?: boolean;
  ifSchedule?: boolean;
  placeholder?: string;
  commentId?: string;
  onSuccess?: () => void;
  isCreator?: boolean; // pass this in so the creator endpoint can be conditionally enabled
};

// ─── useMentionUsers ────────────────────────────────────────────────────────
// Fetches both lists, merges & deduplicates them into one flat MentionUser[]

function useMentionUsers() {
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  // People who subscribed TO the creator (you are the creator)
  const { data: creatorSubscriptionsData, isLoading: loadingCreator } =
    useGetData({
      url: `subscriptions/creator/${userObject?.usid}/subscribers?page=0&size=20`,
      queryKey: ["GetSubscriptions"],
      enabled: !!userObject?.usid,
    });

  // People the current user subscribes TO (you are the viewer/subscriber)
  const { data: viewerSubscriptionsData, isLoading: loadingViewer } =
    useGetData({
      url: `subscriptions?page=0&size=20&subscriberEmail=${userObject?.email}`,
      queryKey: ["GetSubscriptionsForViewer"],
    });

  const mentionableUsers = useMemo<MentionUser[]>(() => {
    const seen = new Set<string>();
    const result: MentionUser[] = [];
    const add = (u: any) => {
      if (!u?.usid || seen.has(u.usid)) return;
      if (u.usid === userObject?.usid) return;
      seen.add(u.usid);
      result.push({
        usid: u.usid,
        email: u.email,
        username: u.username,
        displayName: u.displayName,
        fullName: u.fullName,
        profileImageUrl: u.profileImageUrl,
      });
    };

    // // Safely extract an array regardless of response shape
    // const toArray = (data: any): any[] => {
    //   if (!data) return [];
    //   if (Array.isArray(data)) return data;
    //   if (Array.isArray(data?.content)) return data.content;
    //   // Some APIs nest under data.data
    //   if (Array.isArray(data?.data)) return data.data;
    //   if (Array.isArray(data?.data?.content)) return data.data.content;
    //   return [];
    // };

    // 1. Fix toArray — the order of checks matters
    const toArray = (data: any): any[] => {
      if (!data) return [];
      if (Array.isArray(data)) return data; // plain array
      if (Array.isArray(data?.data?.content)) return data.data.content; // { data: { content: [] } } ← check this BEFORE data.data
      if (Array.isArray(data?.data)) return data.data; // { data: [] }
      if (Array.isArray(data?.content)) return data.content; // { content: [] }
      return [];
    };

    toArray(creatorSubscriptionsData).forEach((s) => add(s.subscriber));
    toArray(viewerSubscriptionsData).forEach((s) => add(s.creator));

    return result;
  }, [creatorSubscriptionsData, viewerSubscriptionsData, userObject?.usid]);

  return {
    mentionableUsers,
    isLoading: loadingCreator || loadingViewer,
  };
}

// ─── useMentions ────────────────────────────────────────────────────────────
// Handles all @ detection, filtering, keyboard nav, and insertion logic

function useMentions(
  textareaRef: React.RefObject<HTMLTextAreaElement | null>,
  mentionableUsers: MentionUser[],
) {
  const [mentionQuery, setMentionQuery] = useState<string | null>(null);
  const [mentionStart, setMentionStart] = useState(0);
  const [selectedMentions, setSelectedMentions] = useState<MentionUser[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [dropdownPos, setDropdownPos] = useState<DropdownPosition>({
    top: 0,
    left: 0,
  });

  // Client-side filter against the merged list
  const filteredUsers = useMemo<MentionUser[]>(() => {
    if (mentionQuery === null) return [];
    if (!mentionQuery.trim()) return mentionableUsers.slice(0, 8);
    const q = mentionQuery.toLowerCase();
    return mentionableUsers
      .filter(
        (u) =>
          u.username?.toLowerCase().includes(q) ||
          u.displayName?.toLowerCase().includes(q) ||
          u.fullName?.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [mentionQuery, mentionableUsers]);

  /**
   * Given the textarea and current cursor position, compute the pixel
   * coordinates of the @ symbol so the dropdown can float next to it.
   */
  const computeDropdownPosition = useCallback(
    (textarea: HTMLTextAreaElement, atIndex: number): DropdownPosition => {
      // We use a hidden mirror div that clones the textarea's styles
      // to measure exactly where the @ character sits in pixel space.
      const mirror = document.createElement("div");
      const style = window.getComputedStyle(textarea);

      // Copy every relevant style property onto the mirror
      [
        "boxSizing",
        "width",
        "height",
        "overflowX",
        "overflowY",
        "borderTopWidth",
        "borderRightWidth",
        "borderBottomWidth",
        "borderLeftWidth",
        "paddingTop",
        "paddingRight",
        "paddingBottom",
        "paddingLeft",
        "fontStyle",
        "fontVariant",
        "fontWeight",
        "fontStretch",
        "fontSize",
        "fontSizeAdjust",
        "lineHeight",
        "fontFamily",
        "textAlign",
        "textTransform",
        "textIndent",
        "textDecoration",
        "letterSpacing",
        "wordSpacing",
        "tabSize",
      ].forEach((prop) => {
        (mirror.style as any)[prop] = (style as any)[prop];
      });

      mirror.style.position = "absolute";
      mirror.style.visibility = "hidden";
      mirror.style.whiteSpace = "pre-wrap";
      mirror.style.wordWrap = "break-word";
      document.body.appendChild(mirror);

      // Text up to the @ sign, then a marker span
      const textBefore = textarea.value.slice(0, atIndex);
      mirror.textContent = textBefore;
      const span = document.createElement("span");
      span.textContent = "@";
      mirror.appendChild(span);

      const mirrorRect = mirror.getBoundingClientRect();
      const spanRect = span.getBoundingClientRect();
      const textareaRect = textarea.getBoundingClientRect();

      document.body.removeChild(mirror);

      // Position relative to the textarea's own bounding box
      const top =
        spanRect.top -
        mirrorRect.top +
        parseInt(style.paddingTop) -
        textarea.scrollTop +
        textareaRect.top;
      const left =
        spanRect.left -
        mirrorRect.left +
        parseInt(style.paddingLeft) +
        textareaRect.left;

      return { top, left };
    },
    [],
  );

  // const handleTextareaChange = useCallback(
  //   (value: string, cursorPos: number) => {
  //     const textBeforeCursor = value.slice(0, cursorPos);
  //     const match = textBeforeCursor.match(/@(\w*)$/);

  //     if (match) {
  //       setMentionQuery(match[1]);
  //       const atIndex = cursorPos - match[0].length;
  //       setMentionStart(atIndex);
  //       setHighlightedIndex(0);

  //       // Measure position on next frame so DOM has settled
  //       requestAnimationFrame(() => {
  //         const textarea = textareaRef.current;
  //         if (textarea) {
  //           setDropdownPos(computeDropdownPosition(textarea, atIndex));
  //         }
  //       });
  //     } else {
  //       setMentionQuery(null);
  //     }
  //   },
  //   [computeDropdownPosition, textareaRef],
  // );

  const handleTextareaChange = useCallback(
    (value: string, cursorPos: number) => {
      // console.log("🔍 handleTextareaChange called", { value, cursorPos });

      const textBeforeCursor = value.slice(0, cursorPos);
      const match = textBeforeCursor.match(/@(\w*)$/);
      // console.log("🔍 match result", { textBeforeCursor, match });

      if (match) {
        setMentionQuery(match[1]);
        const atIndex = cursorPos - match[0].length;
        setMentionStart(atIndex);
        setHighlightedIndex(0);
        requestAnimationFrame(() => {
          const textarea = textareaRef.current;
          // console.log("🔍 textarea ref", textarea);
          if (textarea) {
            setDropdownPos(computeDropdownPosition(textarea, atIndex));
          }
        });
      } else {
        setMentionQuery(null);
      }
    },
    [computeDropdownPosition, textareaRef],
  );

  const pickMention = useCallback(
    (
      user: MentionUser,
      currentValue: string,
      onChange: (v: string) => void,
    ) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const cursorPos = textarea.selectionStart ?? currentValue.length;
      const before = currentValue.slice(0, mentionStart);
      const after = currentValue.slice(cursorPos);
      const inserted = `@${user.username} `;

      onChange(before + inserted + after);

      const newCursor = mentionStart + inserted.length;
      requestAnimationFrame(() => {
        textarea.focus();
        textarea.setSelectionRange(newCursor, newCursor);
      });

      setSelectedMentions((prev) =>
        prev.find((m) => m.usid === user.usid) ? prev : [...prev, user],
      );
      setMentionQuery(null);
    },
    [mentionStart, textareaRef],
  );

  const handleKeyDown = useCallback(
    (
      e: React.KeyboardEvent,
      currentValue: string,
      onChange: (v: string) => void,
    ) => {
      if (mentionQuery === null || filteredUsers.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((i) => (i + 1) % filteredUsers.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex(
          (i) => (i - 1 + filteredUsers.length) % filteredUsers.length,
        );
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        pickMention(filteredUsers[highlightedIndex], currentValue, onChange);
      } else if (e.key === "Escape") {
        setMentionQuery(null);
      }
    },
    [mentionQuery, filteredUsers, highlightedIndex, pickMention],
  );

  return {
    mentionQuery,
    filteredUsers,
    highlightedIndex,
    dropdownPos,
    selectedMentions,
    handleTextareaChange,
    handleKeyDown,
    pickMention,
    closeMentionDropdown: () => setMentionQuery(null),
    mentionIds: selectedMentions.map((m) => m?.email),
  };
}

// ─── MentionDropdown ────────────────────────────────────────────────────────

type MentionDropdownProps = {
  candidates: MentionUser[];
  isLoading: boolean;
  highlightedIndex: number;
  position: DropdownPosition;
  onSelect: (user: MentionUser) => void;
  onClose: () => void;
};

function MentionDropdown({
  candidates,
  isLoading,
  highlightedIndex,
  position,
  onSelect,
  onClose,
}: MentionDropdownProps) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = listRef.current?.children[highlightedIndex] as HTMLElement;
    el?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex]);

  return (
    <>
      {/* Backdrop to catch outside clicks */}
      <div className="fixed inset-0 z-10" onMouseDown={onClose} />

      <ul
        ref={listRef}
        role="listbox"
        style={{
          position: "fixed",
          top: position.top + 24, // 24px below the @ character
          left: position.left,
          zIndex: 50,
          minWidth: "220px",
          maxWidth: "300px",
        }}
        className="max-h-52 overflow-y-auto rounded-xl border border-grey_50 bg-white shadow-xl"
      >
        {isLoading && (
          <li className="px-4 py-3 text-sm text-grey_400">Loading…</li>
        )}

        {!isLoading && candidates.length === 0 && (
          <li className="px-4 py-3 text-sm text-grey_400">No users found</li>
        )}

        {candidates.map((user, i) => (
          <li
            key={user.usid}
            role="option"
            aria-selected={i === highlightedIndex}
            onMouseDown={(e) => {
              e.preventDefault(); // prevent textarea blur before insertion
              onSelect(user);
            }}
            className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors ${
              i === highlightedIndex ? "bg-blue_50" : "hover:bg-grey_10"
            }`}
          >
            {user.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt={user.displayName}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue_200 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-blue_1000 uppercase">
                  {user.displayName?.[0] ?? "?"}
                </span>
              </div>
            )}

            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-grey_900 truncate">
                {user.displayName}
              </span>
              <span className="text-xs text-grey_400 truncate">
                @{user.username}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

// ─── CommentBox ─────────────────────────────────────────────────────────────

const CommentBox = ({
  ifRecord,
  ifPoll,
  ifSchedule,
  endpoint = "contents",
  commentId,
  onSuccess,
  placeholder = "Write a post…",
  ifGoLive = false,
}: CommentBoxProp) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    handleSubmit,
    control,
    reset,
    clearErrors,
    trigger,
    watch,
    setValue,
    formState: { isSubmitted },
  } = useForm();

  const messageValue: string = watch("message") ?? "";

  const queuedFilesRef = useRef<File[]>([]);
  const [isActive, setIsActive] = useState(false);
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const [queuedFiles, setQueuedFiles] = useState<File[]>([]);
  const [isRecorderOpen, setIsRecorderOpen] = useState(false);
  const [isPostToBeScheduled, setIsPostToBeScheduled] = useState(false);
  const [isUserCreatingPoll, setIfUserIsCreatingPoll] = useState(false);

  // ── Fetch & merge mentionable users ───────────────────────────────────────
  const { mentionableUsers, isLoading: isMentionUsersLoading } =
    useMentionUsers();

  // ── Mention interaction logic ──────────────────────────────────────────────
  const {
    mentionQuery,
    filteredUsers,
    highlightedIndex,
    dropdownPos,
    handleTextareaChange,
    handleKeyDown,
    pickMention,
    closeMentionDropdown,
    mentionIds,
  } = useMentions(textareaRef, mentionableUsers);

  const handleSetIsCreatingPoll = (value: boolean) =>
    setIfUserIsCreatingPoll(value);
  const toggleSchedule = () => setIsPostToBeScheduled((prev) => !prev);

  const {
    uploadFiles,
    isUploading,
    reset: resetFiles,
  } = useUploadFiles({
    usid: userObject?.usid,
    onSuccess: () => resetFiles(),
    onError: (error) =>
      showInlineToast({ type: "error", title: error?.message }),
  });

  const handleFocus = () => setIsActive(true);
  const handleBlur = () => setIsActive(false);

  const updateQueuedFiles = (files: File[]) => {
    setQueuedFiles(files);
    queuedFilesRef.current = files;
  };

  const handleFileUpload = (files: File[]) => {
    const updated = [...queuedFilesRef.current, ...files];
    updateQueuedFiles(updated);
  };

  const handleRemoveFile = (index: number) => {
    const updated = queuedFilesRef.current.filter((_, i) => i !== index);
    updateQueuedFiles(updated);
  };

  const handleRecordingComplete = (audioBlob: Blob) => {
    const audioFile = new File([audioBlob], `voice-note-${Date.now()}.webm`, {
      type: audioBlob.type,
    });
    setQueuedFiles((prev) => [...prev, audioFile]);
    showInlineToast({
      type: "success",
      title: "Voice note added successfully",
    });
  };

  const mutationEndpoint = commentId
    ? `${endpoint}/${commentId}/replies`
    : endpoint;

  const submitForm = async (data: any) => {
    if (!data.message?.trim() && queuedFiles.length === 0) {
      showInlineToast({
        type: "error",
        title: commentId
          ? "Reply message or media is required"
          : "Post message or media is required",
      });
      return;
    }

    const basePayload = {
      ...data,
      mentions: mentionIds, // ← array of usid strings
    };

    if (queuedFiles.length > 0) {
      try {
        const mediaLinks = await uploadFiles(queuedFiles);
        createContentMutation.mutate({
          ...basePayload,
          message: data.message || "",
          mediaFiles: mediaLinks,
          mediaType: getMediaType(queuedFiles),
        });
        setQueuedFiles([]);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    } else {
      const { eventDate, eventTime, ...rest } = basePayload;
      createContentMutation.mutate({
        ...rest,
        mediaFiles: [],
        scheduledFor:
          isPostToBeScheduled && eventDate && eventTime
            ? combineDateAndTimeToISO(eventDate, eventTime)
            : null,
      });
    }
  };

  const createContentMutation = useCustomMutation({
    endpoint: mutationEndpoint,
    onSuccessCallback: () => {
      reset();
      resetFiles();
      queryClient.invalidateQueries({
        queryKey: ["GetContents"],
        exact: false,
      });
      onSuccess?.();
    },
    successMessage: () =>
      commentId ? "Reply added successfully" : "Post added successfully",
    onError: () => {},
  });

  useEffect(() => {
    if (!isSubmitted) return;
    if (queuedFiles.length > 0) clearErrors("message");
    else trigger("message");
  }, [queuedFiles.length, clearErrors, trigger]);

  const isPostable = isActive || queuedFiles.length > 0;

  if (isUserCreatingPoll) {
    return <Poll setIfUserIsCreatingPoll={handleSetIsCreatingPoll} />;
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} className="mt-4">
      <CustomTextArea
        placeholder={placeholder}
        name="message"
        control={control}
        textareaRef={textareaRef} // ← wire ref (see note below)
        rules={{
          validate: (value: string) => {
            if (!value?.trim() && queuedFilesRef.current.length === 0) {
              return commentId
                ? "Reply message or media is required"
                : "Post message or media is required";
            }
            return true;
          },
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        rows={commentId ? 3 : 5}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setValue("message", e.target.value, { shouldValidate: isSubmitted });
          handleTextareaChange(e.target.value, e.target.selectionStart ?? 0);
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) =>
          handleKeyDown(e, messageValue, (v) =>
            setValue("message", v, { shouldValidate: false }),
          )
        }
      />

      {/* Floating mention dropdown — rendered at fixed coords near the @ */}
      {mentionQuery !== null && (
        <MentionDropdown
          candidates={filteredUsers}
          isLoading={isMentionUsersLoading}
          highlightedIndex={highlightedIndex}
          position={dropdownPos}
          onSelect={(user) =>
            pickMention(user, messageValue, (v) =>
              setValue("message", v, { shouldValidate: false }),
            )
          }
          onClose={closeMentionDropdown}
        />
      )}

      <MediaPreviewGrid files={queuedFiles} onRemove={handleRemoveFile} />

      {/* Toolbar */}
      <div className="flex items-center justify-between mt-3 p-4">
        <MediaUploadGrid
          handleFileUpload={handleFileUpload}
          handleRemoveFile={handleRemoveFile}
          isActive={isActive}
          ifPoll={ifPoll}
          ifRecord={ifRecord}
          ifSchedule={ifSchedule}
          setIfUserIsCreatingPoll={setIfUserIsCreatingPoll}
          toggleSchedule={toggleSchedule}
          onRecordClick={() => setIsRecorderOpen(true)}
        />

        {!isPostToBeScheduled && (
          <div className="flex items-center gap-3">
            <CustomButton
              variant={isPostable ? "primary" : "disabled"}
              className="bg-grey_90 px-6 rounded-full"
              disabled={createContentMutation.isPending || isUploading}
              loading={createContentMutation.isPending || isUploading}
            >
              {commentId ? "Reply" : "Post"}
            </CustomButton>

            {ifGoLive && (
              <div
                className="border border-blue_1000 py-2 px-4 flex items-center rounded-3xl cursor-pointer"
                onClick={() => navigate("livestreaming")}
              >
                <img src={video} alt="video" className="mr-1 w-4 h-4" />
                <Typography variant="subtitle3" className="text-blue_20">
                  Go Live
                </Typography>
              </div>
            )}
          </div>
        )}
      </div>

      {isPostToBeScheduled && (
        <div className="mx-4 mb-4 flex items-center justify-between border border-grey_50 rounded-md p-4">
          <DateTimePicker
            control={control}
            dateName="eventDate"
            timeName="eventTime"
            label=""
          />
          <CustomButton
            className="bg-grey_90 px-6 rounded-full"
            disabled={createContentMutation.isPending || isUploading}
            loading={createContentMutation.isPending || isUploading}
          >
            Schedule Post
          </CustomButton>
        </div>
      )}

      <VoiceRecorderModal
        isOpen={isRecorderOpen}
        onClose={() => setIsRecorderOpen(false)}
        onRecordingComplete={handleRecordingComplete}
      />
    </form>
  );
};

export default CommentBox;
