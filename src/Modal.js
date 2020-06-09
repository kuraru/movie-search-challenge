import React from "react";

// Modal try-out
// For the moment it is not in function
// instead I use the @material-ui Dialog component
const Modal = ({ closeHandler, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={closeHandler}>close</button>
      </section>
    </div>
  );
};

export default Modal;
