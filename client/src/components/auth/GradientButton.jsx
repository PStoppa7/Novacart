export default function GradientButton({
  children,
  loading = false,
}) {
  return (
    <button
      disabled={loading}
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-2xl
        bg-gradient-to-r
        from-blue-600
        via-indigo-600
        to-purple-600
        py-4
        font-bold
        text-white
        shadow-lg
        transition-all
        duration-300

        hover:scale-[1.02]
        hover:shadow-blue-500/50

        active:scale-95

        disabled:cursor-not-allowed
        disabled:opacity-70
      "
    >
      <span
        className="
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
          transition-transform
          duration-700
          group-hover:translate-x-full
        "
      />

      <span className="relative">
        {loading ? "Please wait..." : children}
      </span>
    </button>
  );
}