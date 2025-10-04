/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Typography from "../forms/Typography";
import CustomButton from "../forms/CustomButton";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { emojiData } from "../../data";

const EmojiModal = ({ toggleModal, setSelectedEmoji, selectedEmoji }: any) => {
  const [emojiDisplay, setEmojiDisplay] = useState(false);

  const getSelectedCategory = (name: string) => {
    console.log(name);
    setEmojiDisplay(true);
  };

  return (
    <>
      {emojiDisplay ? (
        <div>
          <EmojiPicker
            onEmojiClick={(emoji: any) => {
              console.log("jhsdvchjdscbhj", emoji);
              setSelectedEmoji(emoji?.unified);
            }}
          />
          <Emoji unified={selectedEmoji} size={25} />
        </div>
      ) : (
        <div
          className="p-6 rounded-2xl overflow-hidden"
          style={{
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <Typography variant="h5" className="text-grey_800">
            STICKERS
          </Typography>

          <div className="flex items-center mt-8">
            {emojiData?.map(({ id, img, name }: any) => {
              return (
                <div
                  className="border border-grey_100 px-8 py-4 rounded-lg mr-6"
                  key={id}
                  onClick={() => getSelectedCategory(name)}
                >
                  <img src={img} alt="imgg" />
                  <Typography variant="p2" className="mt-2 text-grey_400">
                    {name}
                  </Typography>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end mt-8">
            <CustomButton variant="secondary" onClick={toggleModal}>
              Close
            </CustomButton>
          </div>
        </div>
      )}
    </>
  );
};

export default EmojiModal;
