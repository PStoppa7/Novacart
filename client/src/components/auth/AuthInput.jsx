import { FiMail, FiUser } from "react-icons/fi";

export default function AuthInput({
  icon = "user",
  label,
  type = "text",
  name,
  value,
  onChange,
}) {
  const Icon = icon === "email" ? FiMail : FiUser;

  return (
    <div className="relative">

      <Icon
        className="
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          text-gray-300
          text-xl
        "
      />

      <input
        type={type}
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
          py-5
          pl-7
          pr-3
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

    </div>
  );
}