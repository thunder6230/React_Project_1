import React from "react";

interface ButtonProps {
  children: string | JSX.Element | JSX.Element[];
  version?: string;
  type?: "submit" | "button" | "reset";
  _isDisabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  children,
  version,
  type,
  _isDisabled,
}) => {
  return (
    <button type={type} className={`btn btn-${version}`} disabled={_isDisabled}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  _isDisabled: false,
  version: "primary",
  type: "button",
};

export default Button;
