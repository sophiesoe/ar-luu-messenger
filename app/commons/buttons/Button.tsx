"use client";
import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  secondary,
  danger,
  disabled,
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `
      flex
      justify-center
      rounded-lg
      px-3
      py-2
      text-sm
      font-semibold
      tracking-wider
      transition-colors
      duration-500
      focus-visible:outline
      focus-visible:outline-2
      
    `,
        disabled && "cursor-default opacity-50",
        fullWidth && "w-full",
        secondary ? "text-black" : "text-white",
        danger &&
          "bg-danger-300 hover:bg-danger-200 focus-visible:outline-danger-400",
        !secondary &&
          !danger &&
          "bg-primary-300 hover:bg-primary-400 focus-visible:outline-primary-400"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
