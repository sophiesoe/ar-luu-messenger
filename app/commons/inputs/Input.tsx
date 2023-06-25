"use client";

import clsx from "clsx";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  placeholder,
  required,
  disabled,
  errors,
  register,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-slate-600 block text-sm font-medium leading-6"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          id={id}
          autoComplete={id}
          disabled={disabled}
          placeholder={placeholder}
          {...register(id, { required })}
          className={clsx(
            `
            placeholder:text-slate-400
            form-input
            block
            w-full
            rounded-lg
            border-0
            bg-transparent
            py-1.5
            shadow-sm
            ring-1
            ring-primary-100
            focus:ring-2
            focus:ring-primary-200
            sm:text-sm
            sm:leading-6
          `,
            errors[id] && "focus:ring-rose-300",
            disabled && "cursor-default opacity-50"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
