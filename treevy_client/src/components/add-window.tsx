import React from "react";

function AddWindow(props: any) {
  const showHideClassName = props.show ? "modal d-block" : "modal d-none";
  return (
    <div className={props.showHideClassName}>
      <div className="modal-container">
        <a
          href="javascript:;"
          className="modal-close"
          onClick={props.handleClose}
        >
          cancel
        </a>
      </div>
    </div>
  );
}

export default AddWindow;
