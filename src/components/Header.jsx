import React from "react";
import logo from "./images/logo.png";

function Header() {
  return (
    <div
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        width: "100%",
        background: "teal",
        color: "white",
      }}
    >
      <div>
        {" "}
        <img
          src={logo}
          alt="My logo"
          style={{ width: "55px", height: "55px", padding: "5px" }}
        />{" "}
      </div>
      <div>
        {" "}
        <span style={{ fontWeight: "bold" }} className="header-name">
          كابي دردي شيدي -{" "}
          <span
            className=" 
                 font-['Zaghawa_Beria'] header-name "
          >
            kaby drdy shydy
          </span>
        </span>
      </div>
      <div>
        {" "}
        <img
          src={logo}
          alt="My logo"
          style={{ width: "55px", height: "55px", padding: "5px" }}
        />{" "}
      </div>
    </div>
  );
}

export default Header;
