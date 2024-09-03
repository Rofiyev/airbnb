"use client";

import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Textarea: FC<TextAreaProps> = ({
  errors,
  id,
  label,
  register,
  disabled,
  required,
}) => {
  return (
    <div className="w-full relative">
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        rows={4}
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed resize-y 
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
          `}
      />
      <label
        className={`absolute w-11/12 bg-white text-md duration-150 transform -translate-y-3 top-[14px] left-4 z-10 origin-[0] 
         peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3
         ${errors[id] ? "text-rose-500" : "text-zinc-400"}
          `}
      >
        {label}
      </label>
    </div>
  );
};

export default Textarea;
