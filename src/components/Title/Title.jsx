import React from "react";

const Title = (props) => {
  return (
    <div style={{ marginBottom: 15 }}>
      <label style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
        {props.title}
      </label>
      <hr
        style={{
          marginTop: 0,
          position: "absolute",
          border: "2px solid #4a5068",
          width: 50,
        }}
      />
    </div>
  );
};

export default Title;
