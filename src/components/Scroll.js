import React from "react";

const Scroll = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        overflowY: "scroll",
        border: "5px solid white",
        height: "500px",
        width: "100%",
      }}
    >
      {props.children}
    </div>
  );
};

export default Scroll;
