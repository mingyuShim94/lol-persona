import React from "react";

const IconButton = ({ icon, onClickIcon = () => {} }) => {
  return (
    <div
      onClick={onClickIcon}
      className="flex flex-row justify-center items-center w-[36px] h-[36px] rounded-full  hover:bg-[rgba(144,144,144,0.5)] cursor-pointer"
    >
      {icon}
    </div>
  );
};

export default IconButton;
