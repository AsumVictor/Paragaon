import { FormInputProps } from "@/types/inputs";
import React from "react";

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  required = false,
  placeholder = "",
}) => {
  return (
    <div className="mb-1">
      <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={typeof value === "string" ? value : ""}
        checked={typeof value === "boolean" ? value : false}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg border ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200`}
        required={required}
      />
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormInput;
