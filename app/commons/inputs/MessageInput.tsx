"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  placeholder,
  type,
  required,
  register,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        autoComplete={id}
        {...register(id, { required })}
        className="
          w-full
          rounded-full
          bg-white
          px-4 
          py-2
          font-light
          focus:outline-none
        "
      />
    </div>
  );
};

export default MessageInput;
