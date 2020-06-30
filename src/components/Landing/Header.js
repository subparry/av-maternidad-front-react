import React from "react";
import { APP_NAME } from "../../support/constants";
import "./styles/header.scss";

const Header = () => {
  return (
    <section
      data-testid="header-section"
      className="header-section header-background"
    >
      <h1 className="text-giant text-white normal">{APP_NAME}</h1>
      <h2 className="text-md text-white light italic">
        Una crianza consciente crea adultos sanos...
      </h2>
    </section>
  );
};

export default Header;
