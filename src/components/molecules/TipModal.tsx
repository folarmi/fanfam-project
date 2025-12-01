import type { TipModalProps } from "@/lib/types";
import { useState } from "react";

const TipModal: React.FC<TipModalProps> = ({ recipient, onClose, onSend }) => {
  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  return (
    <div className="flex flex-col absolute left-[55%] top-[100%] bg-white shadow-2xl w-[368px] rounded-2xl border-2 border-grey_100 z-50 p-6">
      <h2 className="text-grey_800 font-bold text-lg">Send Tip</h2>

      <div className="flex my-6">
        <img
          src={recipient?.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-3">
          <div className="flex items-center mb-1">
            <span className="text-grey_900 font-semibold">
              {recipient?.name}
            </span>
          </div>
          <span className="text-grey_400 text-sm">@{recipient?.username}</span>
        </div>
      </div>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border border-grey_300 rounded-lg px-4 py-2 mb-4"
      />

      <textarea
        placeholder="Message (Optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border border-grey_300 rounded-lg px-4 py-2 mb-4 resize-none"
        rows={3}
      />

      <div className="flex items-center justify-end gap-4">
        <button
          onClick={onClose}
          className="px-6 py-2 border border-grey_300 rounded-lg hover:bg-grey_100"
        >
          Cancel
        </button>
        <button
          onClick={() => onSend?.({ amount, message })}
          className="px-6 py-2 bg-blue_500 text-white rounded-lg hover:bg-blue_600"
        >
          Send Tip
        </button>
      </div>
    </div>
  );
};

export { TipModal };
