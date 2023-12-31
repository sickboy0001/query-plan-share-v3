import React from "react";

type Props = {
  children: string;
  handleClick?: () => Promise<void> | void;
  handleMouseDown?: () => Promise<void> | void;
};
function Button(props: Props) {
  const { children, handleClick, handleMouseDown } = props;

  return (
    <button
      className="w-full"
      onClick={() => handleClick && handleClick()}
      onMouseDown={() => handleMouseDown && handleMouseDown()}
    >
      {children}
    </button>
  );
}

export default Button;
