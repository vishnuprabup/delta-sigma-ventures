import React from "react";

import CloseSvg from "../../svgs/CloseSvg";
import "./Modal.css";

const Modal = ({ setIsModalOpen, Content }) => {
  return (
    <div className="modal-container" onClick={() => setIsModalOpen(false)}>
      <div
        className="modal-inner-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-close">
          <span
            className="dsv-icon modal-icon"
            onClick={() => setIsModalOpen(false)}
          >
            <CloseSvg />
          </span>
        </div>
        <div className="modal-content">{Content}</div>
      </div>
    </div>
  );
};

export default Modal;
