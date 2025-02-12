import React from "react";

type ButtonProps = {
    text: string;
    buttonStyle: React.CSSProperties;
    icon?: React.ReactNode;
    onClick?: () => void;
}

export const Button = ({ text, buttonStyle, icon,onClick }: ButtonProps) => {
  return (
    <button
    onClick={onClick}
      className="px-3 py-[5px] flex justify-center gap-1 items-center text-[13px] cursor-pointer"
      style={buttonStyle}
    >
     {icon}{text}
    </button>
  );
};
