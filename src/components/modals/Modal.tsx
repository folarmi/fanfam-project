// /* eslint-disable @typescript-eslint/no-explicit-any */

// const Modal = ({ show, toggleModal, children, ifClose = true }: any) => {
//   if (!show) {
//     return null;
//   }

//   return (
//     <>
//       {show && (
//         <div
//           className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm"
//           onClick={toggleModal}
//         ></div>
//       )}

//       <div className="fixed inset-0 bg-transparent bg-opacity-50  flex items-center justify-center z-50">
//         {ifClose && (
//           <button
//             className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//             onClick={toggleModal}
//           >
//             &times;
//           </button>
//         )}
//         {children}
//       </div>
//     </>
//   );
// };

// export default Modal;

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createPortal } from "react-dom";

const Modal = ({ show, toggleModal, children, ifClose = true }: any) => {
  if (!show) return null;

  return createPortal(
    <div className="fixed inset-0 z-[2147483647] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={toggleModal}
      />

      {/* Modal content */}
      <div className="relative z-[2147483647]">
        {ifClose && (
          <button
            type="button"
            className="absolute -top-10 right-0 text-white text-3xl hover:text-gray-300"
            onClick={toggleModal}
          >
            &times;
          </button>
        )}

        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
