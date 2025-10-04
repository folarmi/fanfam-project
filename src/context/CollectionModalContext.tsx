import React, { createContext, useContext, useState, ReactNode } from "react";
import ReactDOM from "react-dom";

// Define the shape of the context state and actions
interface ModalContextProps {
  isModalOpen: boolean;
  showModal: (content: ReactNode) => void;
  hideModal: () => void;
}

// Create the context with an empty default value
const ModalContext = createContext<ModalContextProps | undefined>(undefined);

// Custom hook to use the Modal context
export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

// Provider component to wrap around parts of your app that need access to the modal context
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const showModal = (content: ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, showModal, hideModal }}>
      {children}
      {isModalOpen &&
        modalContent &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 flex justify-end items-center z-50">
            {modalContent}
          </div>,
          document.body
        )}
    </ModalContext.Provider>
  );
};
