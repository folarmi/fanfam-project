import React from "react";
import ReactDOM from "react-dom";

const CollectionModal = ({ children }: any) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {children}
    </div>,
    document.body
  );
};

export default CollectionModal;
