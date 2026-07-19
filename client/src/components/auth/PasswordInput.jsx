import { useState } from "react";
import {
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

export default function PasswordInput({
  label = "Password",
  name = "password",
  value,
  onChange,
}) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div className="relative">

      <FiLock
        className="
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          text-xl
          text-gray-300
        "
      />

      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        required
        className="
          peer
          w-full
          rounded-2xl
          border
          border-white/20
          bg-white/10
          py-4
          pl-14
          pr-14
          text-white
          placeholder-transparent
          backdrop-blur-xl
          outline-none
          transition-all
          duration-300

          focus:border-blue-400
          focus:bg-white/20
          focus:ring-2
          focus:ring-blue-500/40
        "
      />

      <label
        className="
          pointer-events-none
          absolute
          left-14
          top-4
          text-gray-300
          transition-all
          duration-300

          peer-placeholder-shown:top-4
          peer-placeholder-shown:text-base

          peer-focus:-top-2
          peer-focus:left-5
          peer-focus:bg-slate-900/80
          peer-focus:px-2
          peer-focus:text-xs
          peer-focus:text-blue-300

          peer-not-placeholder-shown:-top-2
          peer-not-placeholder-shown:left-5
          peer-not-placeholder-shown:bg-slate-900/80
          peer-not-placeholder-shown:px-2
          peer-not-placeholder-shown:text-xs
        "
      >
        {label}
      </label>

      <button
        type="button"
        onClick={() =>
          setShowPassword(!showPassword)
        }
        className="
          absolute
          right-5
          top-1/2
          -translate-y-1/2
          text-gray-300
          transition
          hover:text-white
        "
      >
        {showPassword ? (
          <FiEyeOff size={22} />
        ) : (
          <FiEye size={22} />
        )}
      </button>

    </div>
  );
}