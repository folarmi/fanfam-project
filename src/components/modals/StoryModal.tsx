/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import closeIcon from "../../assets/icons/closeIcon.svg";
import crop from "../../assets/icons/crop.svg";
import textBlock from "../../assets/icons/textBlock.svg";
import more from "../../assets/icons/more.svg";
import undo from "../../assets/icons/undo.svg";
import redo from "../../assets/icons/redo.svg";
import sticker from "../../assets/icons/sticker.svg";

// import timelineImage from "../../assets/timelineImage.svg";
import Modal from "./Modal";
import EmojiModal from "./EmojiModal";
import { Emoji } from "emoji-picker-react";

const StoryModal = ({ toggleModal, uploadedFile }: any) => {
  const [emojiModal, setEmojiModal] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  useEffect(() => {
    if (uploadedFile) {
      // Create the object URL
      const objectUrl = URL.createObjectURL(uploadedFile);
      setImageURL(objectUrl);

      // Clean up the object URL when the component is unmounted or when uploadedFile changes
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [uploadedFile]);

  const toggleEmojiModal = () => {
    setEmojiModal(!emojiModal);
  };

  return (
    <div className="h-screen w-screen bg-black_400">
      <div className="flex items-center justify-between pt-4 mx-4">
        <div className="flex items-center gap-x-4">
          <img src={closeIcon} alt="closeIcon" onClick={toggleModal} />
          <img src={undo} alt="undo" />
          <img src={redo} alt="redo" />
        </div>

        <div className="flex items-center gap-x-4">
          <img src={sticker} alt="sticker" />
          <img src={crop} alt="crop" />
          <img src={textBlock} alt="textBlock" />
          <div className="cursor-pointer" onClick={toggleEmojiModal}>
            <img src={more} alt="more" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full h-full">
        {uploadedFile && imageURL && (
          <>
            <img
              src={imageURL}
              //   src={timelineImage}
              width={500}
              height={300}
              alt="uploadedFile"
              className="h-auto "
            />
            <p className="">
              My Favorite emoji is:
              <Emoji unified={selectedEmoji} size={25} />{" "}
            </p>
          </>
        )}
      </div>

      <Modal show={emojiModal} toggleModal={toggleEmojiModal}>
        <div className="p-4">
          <StoryModal
            toggleModal={toggleEmojiModal}
            uploadedFile={uploadedFile}
          />
        </div>
      </Modal>

      {emojiModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={toggleEmojiModal}
        >
          <div className="bg-white" onClick={(e) => e.stopPropagation()}>
            <EmojiModal
              toggleModal={toggleEmojiModal}
              setSelectedEmoji={setSelectedEmoji}
              selectedEmoji={selectedEmoji}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryModal;
