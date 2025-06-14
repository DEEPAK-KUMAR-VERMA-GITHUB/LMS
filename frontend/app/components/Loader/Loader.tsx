import React, { FC } from "react";
import "./Loader.css";

const Loader: FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
