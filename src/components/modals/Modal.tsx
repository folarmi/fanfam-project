import React from "react";

const Modal = ({ show, toggleModal, children, ifClose = true }: any) => {
  if (!show) {
    return null;
  }

  return (
    <>
      {show && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm"
          onClick={toggleModal}
        ></div>
      )}

      <div className="fixed inset-0 bg-transparent bg-opacity-50  flex items-center justify-center z-50">
        {ifClose && (
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={toggleModal}
          >
            &times;
          </button>
        )}
        {children}
      </div>
    </>
  );
};

export default Modal;
