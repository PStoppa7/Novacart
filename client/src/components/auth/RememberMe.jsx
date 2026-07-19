export default function RememberMe({
  checked,
  onChange,
}) {
  return (
    <label className="flex items-center gap-3 text-white">

      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="
          h-5
          w-5
          rounded
          accent-blue-600
        "
      />

      <span className="text-sm">
        Remember Me
      </span>

    </label>
  );
}