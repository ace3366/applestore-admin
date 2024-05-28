import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { modalAction } from "../../store/modal";
import { createPortal } from "react-dom";
export default function ({ children }) {
  let modalRoot = document.getElementById("modal-root");

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  if (!modalRoot) {
    const newModal = document.createElement("div");
    newModal.id = "modal-root";
    document.body.appendChild(newModal);
    modalRoot = newModal;
  }
  return createPortal(
    // backdrop
    <main
      onClick={() => {
        dispatch(modalAction.modalToggle());
      }}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        isOpen ? "visible bg-black/40" : "invisible"
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`bg-white rounded-xl shadow transition-all w-1/3 ${
          isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {children}
      </div>
    </main>,
    modalRoot
  );
}
